// ------ action type сделаем переменные для все type в наших функциях
import {getPages, getUsers} from "../../api/api";
import * as api from "../../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
//для кнопки follow
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

//для нашего Redux зададим начальные значения
let initialState = {
    users:[ ],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    //loader кнопки follow
    followingInProcess: []
};

const userPageReducer = (state = initialState, action) => {

    // для нашей функции state = this._State.profilePage
    // вместо if используем switch
    switch (action.type) {
        // если надо зафоловить user
        // 1 - возвращаем копию всего state
        // 2 - в этом state делаем копию user
        // 3 - и конкретному user тоже делаем копию
        //тоже самое что и users: [...state.users]
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId)
                    {
                        return {...user, followed: true}
                    }
                    return user;
                })
            };
        //тоже самое что и users: [...state.users]
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId)
                    {
                        return {...user, followed: false}
                    }
                    return user;
                })
            };

            //с сервера прийдут юзеры и будет их отрисовка
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }

        //действие для клика по кнопкам страниц номера
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage //выбираем ту страницу по которой кликнули
            }

        // --- вывод страниц users
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.count
            }

        // --- preloader страницы users
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }

        // --- loader для follow на странице users
        case  TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProcess: action.followingInProcess
                    ? [...state.followingInProcess, action.userId]
                    : state.followingInProcess.filter(id => id != action.userId)
            }

        default :
            return state;
    }
}

// --- задает тип для user follow или unfollow
export const followAC = (userId) => {
    return {
        type:UNFOLLOW,
        userId
    }
}

export const unFollowAC = (userId) => {
    return {
        type:FOLLOW,
        userId
    }
}
// --- получаем список user с сервера и записывать его, setatь userов
export const setUserAC = (users) => {
    return {
        type: SET_USERS,
        users
    }
}
// --- получаем текущую страницу на которой мы и какая активна
export const setCurrentPageAC = (currentPage) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage: currentPage
    }
}
// --- установить общее количество пользователей
export const setTotalUsersCountAC = (totalUsersCount) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        count: totalUsersCount
    }
}
//--- preloader для страницы users
export const toggleIsFetchingAC = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching: isFetching
    }
}
//--- loader для follow на странице users
export const toggleFollowingProgress = (followingInProcess, userId) => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        followingInProcess: followingInProcess,
        userId: userId
    }
}

//-------------------------------------------------thunk for UserContainer.js
export const getPagesThunkCreator = (currentPage,pageSize) => {
    return (dispath) => {
        //--- задиспачим отображение preloader перед началом запроса
        dispath(toggleIsFetchingAC(true));
        //--- задиспачим отображение выбранной страницы
        dispath(setCurrentPageAC(currentPage));

        // get запрос из папки api для получения кол-ва страниц
        getPages(currentPage, pageSize).then(data => {
            //--- задиспачим конец отображения preloader после запроса
            dispath(toggleIsFetchingAC(false));
            // получаем ответ и записывам его
            dispath(setUserAC(data.items));
            dispath(setTotalUsersCountAC(data.totalCount));
        });
    }
}

//-------------------------------------------------thunk for UserContainer.js
export const getUsersThunkCreator = (pageNumber, pageSize) => {
    return (dispatch) => {

        dispatch(setCurrentPageAC(pageNumber));

        //--- отображение preloader перед началом запроса
        dispatch(toggleIsFetchingAC(true));

        // get запрос из папки api для получения всех users
        getUsers(pageNumber, pageSize).then(data => {
            //--- конец отображения preloader после запроса
            dispatch(toggleIsFetchingAC(false));
            // получаем ответ и записывам его
            dispatch(setUserAC(data.items));
        });

    }
}

//-------------------------------------------------thunk for User.js
export const follow = (userId) => {
    return (dispatch) => {
        // loader для ожидания follow
        dispatch(toggleFollowingProgress(true, userId));

        // запрос на подписку
        api.postFollow(userId).then(response => {
            // удачный ответ после запроса === 0
            if (response.data.resultCode === 0) {
                dispatch(followAC(userId));
            }
            // loader после окончания ожидания unfollow
            dispatch(toggleFollowingProgress(false, userId));
        });
    }
}

//-------------------------------------------------thunk for User.js
export const unfollow = (userId) => {
    return (dispatch) => {
        // loader для ожидания follow
        dispatch(toggleFollowingProgress(true, userId));
        // запрос на отписку
        api.delUnfollow(userId).then(response => {
            // удачный ответ после запроса === 0
            if (response.data.resultCode === 0) {
                dispatch(unFollowAC(userId));
            }
            // loader после окончания ожидания unfollow
            dispatch(toggleFollowingProgress(false, userId));
        });
    }
}

export default userPageReducer;
