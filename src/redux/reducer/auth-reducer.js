// ------ action type сделаем переменные для всех type в наших функциях
import {authUser, loginUser, logoutUser} from "../../api/api";

const SET_USER_DATA = 'SET_USER_DATA';

//для нашего запроса посмотрим API документацию и зададим для переменных их нулевые значения
let initialState = {
    // данные из документашки с back API - userId, email, login
    userId: null,
    email: null,
    login: null,
    //если залогинен то true
    isAuth: false
};

//создаем редьюсор для login и добавляем его в коллекцию redux-store
const authReducer = (state = initialState, action) => {

    // для нашей функции state = this._State.profilePage
    // вместо if используем switch
        switch (action.type) {

            case SET_USER_DATA:
                return {
                    // получим state и перезапишем его
                    ...state,
                    // все данные лежат в action (state тоже)
                    // - payload - в ней лежит userId, email, login, isAuth
                    ...action.payload,
                };

        default :
            return state;
    }
}

// --- задача этой функции вернуть объект action
// --- упаковываем action в объект который будет задиспачен в reducer
export const setAuthUserData = (userId, email, login, isAuth) => {
    return {
        type:SET_USER_DATA,
        payload:{
            userId,
            email,
            login,
            isAuth
        }
    }
}

//-------------------------------------------------thunk for header авторизация
export const getAuthUserData = () => (dispatch) => {

    // get запрос на адрес https://social-network.samuraijs.com/api/1.0/ хотим получить users
    authUser().then(response => {
        //делаем проверку зарегистрирован пользователь или нет
        // response - приходит с запросом с сервера, в нем лежит data, в дате лежит resultCode - eckjdbt в документашке API
        if (response.data.resultCode === 0) {
            // response.data - метод axios, а data->userId , data->email, data->login - это в документашке api описание в разделе Properties
            let {id, login, email} = response.data.data;

            // если все ок до dispatch
           dispatch(setAuthUserData(id, email, login, true));
        }

    });
}

//------------------------------------------------- thunk функция для аторизации прямо с сайта
// 1 - создаем thunk для логанизации
// 2 - в api.js создаем Post запрос для авторизации на сервере (73 строка)
// 3 - в api.js создаем logout с помощью запроса delete
// 4 - обращаемся в нашей thunk к созданным функциям login и logout
// 5 - если все хорошо тогда вызываем thunk getAuthUserData чтобы отобразить login в хедере
// 6 - создаем thunk для logout
// 7 - передаем значение true для isAuth в getAuthUserData в dispatch(setAuthUserData(true))
// 8 - создаем hoc компоненту для копоненты Login и ей в connect передаем (login и logout)
// 9 - создаем собыетие для пропсов LoginReduxForm onSubmit={onSubmit}
// 10 - создаем mapStateToProps который возьмет reducer isAuth в redux-store
// 11 - если все успешно и isAuth = true то redirect на страницу profile
export const login = (email, password, rememberMe) => (dispatch) => {
    loginUser(email, password, rememberMe, true).then(
        response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData());
            }
        }
    );
}
// 1 - создаем thunk для logout
// 2 - в setAuthUserData добавляем переменную isAuth
// 3 - в isAuth передать false
// 4 - занулить все наши значения в dispatch
// 5 - в Header компоненте создаем кнопку logout
// 6 - создаем событие onClick={props.logout} где ждем пропсы от контейнейрной компоненты
// 7 - в HeaderContainer в методе connect конектим наш logout из auth-reducer
// 8 -
export const logout = () => (dispatch) => {
    logoutUser().then(
        response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        }
    );
}


export default authReducer;

// после создания REDUCER - мы должны его зписать в reducer-store, чтобы могли его вызвать
