// ------ action type сделаем переменные для все type в наших функциях
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';

//для нашего Redux зададим начальные значения
let initialState = {
    users:[ ],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1
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


        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.count
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

export default userPageReducer;
