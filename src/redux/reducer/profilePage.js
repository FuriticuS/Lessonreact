// ------ action type сделаем переменные для все type в наших функциях
import {getProfile, profileAPI} from "../../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST';
// сетаем для страницы профайл наши данные юзера -> потом export по нашему типу
const SET_USER_PROFILE = 'SET_USER_PROFILE';
// сетаем для страницы профайл наш статус юзера -> потом export по нашему типу
const SET_STATUS = 'SET_STATUS';
// удаление поста
const DELETE_POST='DELETE_POST';
// добавление фото к своему аккаунту
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';
// обновление данных с формы для профайла
const SAVE_PROFILE_SUCCES = 'SAVE_PROFILE_SUCCES';


//для нашего Redux зададим начальные значения
let initialState = {
    postData: [
        {id: 1, post: 'как все начиналось? ', likes: 5},
        {id: 2, post: 'фото без подписи', likes: 7},
        {id: 3, post: 'снимки без текста', likes: 3},
        {id: 4, post: 'быть для высокой конверсии', likes: 5},
        {id: 5, post: 'В странах СНГ ситуация', likes: 8}
    ],
    newPostText: 'Введите сообщение для страницы Profile',
    // сначала наш стейт с profile: null (без изменений)
    profile: null,
    // status нашего user
    status: "",
};

const profilePageReducer = (state = initialState, action) => {

    // для нашей функции state = this._State.profilePage
    // вместо if используем switch

    switch (action.type) {
        // case - возможные варианты type
        case ADD_POST :
            // взяли из функции addPosts()
            let newPost= {
                id:6,
                post: action.newMessagesPostText,
                likes: 2
            };

            return {
                ...state,
                postData: [...state.postData, newPost]
            }

        // отрисовываем наш стейт со всеми изменениями -> изначально создаем переменную profile: null в initialState
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }

        //когда status прийдет с сервака я хочу его засетать прийдет status сделать action нового status
        case SET_STATUS:
            return {
                ...state,
                status: action.status,
            }

        // удаление поста
        case DELETE_POST: {
            return {
                ...state,
                postData: state.postData.filter(p => p.id != action.postId)
            }
        }

        // сохранение новой картинки
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos:action.photos}
            }
        }

        default :
            return state;
    }
}

// --------------------------------------------------------------------------------------- types
// ------ функции Action create, которые хранят тип для наших функций
// ------ page Profile
export const addPostActionCreator = (newMessagesPostText) => {
    return {
        type:ADD_POST,
        newMessagesPostText
    }
}

export const setStatus = (status) => {
    return{
        type: SET_STATUS,
        status: status,
    }
}

// удаление поста
export const deletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId: postId
    }
};

// export по нашему типу чтобы получить все данные c user -> добавляем в case
export const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile: profile
    }
}

// сохранение картинки где photos - название картинки на серваке
export const savePhotoSucces = (photos) => {
    return {
        type: SAVE_PHOTO_SUCCESS,
        photos: photos
    }
}

// --------------------------------------------------------------------------------------- dispatch

// thunk export по нашему типу чтобы получить все данные c user -> добавляем в case
export const authUser = (userID) => async (dispatch) => {
    // get запрос на адрес https://social-network.samuraijs.com/api/1.0/ хотим получить users
    let response = await getProfile(userID);
    // получаем ответ и записывам весь файл с API со всеми данными
    dispatch(setUserProfile(response.data));
}

// thunk для status по нашему типу чтобы получить все данные c status -> добавляем в case
// get запрос для userID
export const getStatus = (userID) => async (dispatch) => {
    let response = await profileAPI.getStatus(userID)
    dispatch(setStatus(response.data));
}

// thunk для UPDATEstatus по нашему типу чтобы обновить status на серваке-> добавляем в case
// указываем что и какой status надо обновить
export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    //смотрим в документашку чтобы понять что прийдет в ответ https://social-network.samuraijs.com/docs#profile_status_put = если 0 то ок если 1 то ошибка
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

//thunk для savePhoto в компоненте Info
export const savePhoto = (file) => async (dispatch) =>{
    let response = await profileAPI.savePhoto(file);

    //если ответ после сохранения не равен 1
    // все фотки и данные об аккаунте лежат в response.data
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSucces(response.data.data.photos));
    }
}

//thunk для saveProfile в компоненте Info
// тк сервер ничего не делает а только сохраняет новые данные то будет вызывать thunk authUser с обновленным getState
export const saveProfile = (profile) => async (dispatch, getState) =>{

    const userId = getState().auth.userId;

    let response = await profileAPI.saveProfile(profile);

    if (response.data.resultCode === 0){
        dispatch(authUser(userId));
    }

    else {
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}));
        dispatch(stopSubmit("edit-profile", {"contacts": {"facebook":response.data.messages[0]}}));
        return Promise.reject(response.data.messages[0]);
    }
}


export default profilePageReducer;
