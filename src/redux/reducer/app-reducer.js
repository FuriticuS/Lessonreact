// ------ проверка авторизации пользователя для отображения страниц
import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

// проверка по типу
export const initializedSuccess = () => ({
    type: INITIALIZED_SUCCESS
})

//для нашей загрузки всех старниц сделаем переменную для проверки
let initialState = {
    initialized : false,
};

//создаем редьюсор для проверки авторизации и добавляем его в коллекцию redux-store
const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                // получим state и перезапишем его
                ...state,
                initialized: true,
            };
        default :
            return state;
    }
}

// создаем thunk'у для initializedSuccess
// в которой 1 - проверка авторизации
// 2 - иницилизация авторизации
// 3 - когда только зарезолвишься тогда и запцскай initializedSuccess
export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());

    promise.then(() => {
        dispatch(initializedSuccess());
    })
}

export default appReducer;

// после создания REDUCER - мы должны его зписать в reducer-store, чтобы могли его вызвать
