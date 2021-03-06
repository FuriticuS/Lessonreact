// ------ action type сделаем переменные для всех type в наших функциях
import {authUser, loginUser, logoutUser, securityAPI} from "../../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

//для нашего запроса посмотрим API документацию и зададим для переменных их нулевые значения
let initialState = {
    // данные из документашки с back API - userId, email, login
    userId: null,
    email: null,
    login: null,
    //если залогинен то true
    isAuth: false,
    captchaUrl: null
};

//------------------------------------------------------------------- action's
//создаем редьюсор для login и добавляем его в коллекцию redux-store
const authReducer = (state = initialState, action) => {

    // для нашей функции state = this._State.profilePage
    // вместо if используем switch
    switch (action.type) {

        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                // получим state и перезапишем его
                ...state,
                // все данные лежат в action (state тоже)
                // - payload - в ней лежит userId, email, login, isAuth
                ...action.payload
            };
        default :
            return state;
    }
}

//------------------------------------------------- action-creators
// --- задача этой функции вернуть объект action
// --- упаковываем action в объект который будет задиспачен в reducer
export const setAuthUserData = (userId, email, login, isAuth) => {
    return {
        type: SET_USER_DATA,
        payload: {
            userId,
            email,
            login,
            isAuth
        }
    }
}

// --- для capthca
export const getCaptchaUrlSuccess = (captchaUrl) => {
    return{
        type: GET_CAPTCHA_URL_SUCCESS,
        payload: {captchaUrl}
    }
}


//-------------------------------------------------thunk for header авторизация
// добавляем новое = await и async
export const getAuthUserData = () => async (dispatch) => {

    // get запрос на адрес https://social-network.samuraijs.com/api/1.0/ хотим получить users
    let response = await authUser();
    //делаем проверку зарегистрирован пользователь или нет
    // response - приходит с запросом с сервера, в нем лежит data, в дате лежит resultCode - eckjdbt в документашке API
    if (response.data.resultCode === 0) {
        // response.data - метод axios, а data->userId , data->email, data->login - это в документашке api описание в разделе Properties
        let {id, login, email} = response.data.data;

        // если все ок до dispatch
        dispatch(setAuthUserData(id, email, login, true));
    }
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
export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await loginUser(email, password, rememberMe, captcha, true);

    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    }
        // если в поле к примеру ПАРОЛЬ введено неправильное значение
        // где login - название нашей формы, а email - где проблема
        // чтобы сервер сам нам описал ошибку заведем переменную в которую будет записываться массив ошибок
        // где response.data.messages.length название и длина сообщения с сервера
        // https://social-network.samuraijs.com/docs#auth_login_post здесь все ответы
    // где _error реакция на все ошибки в форме
    else {
        // если ответ с сервера(resultCode) = 10 (это условие backenda)
        if(response.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }

        let errorMessages = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        dispatch(stopSubmit("login", {_error: errorMessages}));
    }
};

// 1 - создаем thunk для logout
// 2 - в setAuthUserData добавляем переменную isAuth
// 3 - в isAuth передать false
// 4 - занулить все наши значения в dispatch
// 5 - в Header компоненте создаем кнопку logout
// 6 - создаем событие onClick={props.logout} где ждем пропсы от контейнейрной компоненты
// 7 - в HeaderContainer в методе connect конектим наш logout из auth-reducer
export const logout = () => async (dispatch) => {
    let response = await logoutUser()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
}


//------------------------------------------------- thunk функция для Captcha
// 1 - в api сделали запрос
// 2 - в reducer сделали thunk
// 3 - смотрим все в документашке для зарпосов на серве
// 4 - у нас есть security/get-captcha-url которая возращает data обьект со свойством url
// 5 - добавляем captchaUrl в initialState с нулевым первым значением
// 6 - делаем action-creator с GET_CAPTCHA_URL_SUCESS под именем getCaptchaUrlSuccess
// 7 - добавляем в наш action case с GET_CAPTCHA_URL_SUCESS
// 8 - добавляем в thunk наш action = getCaptchaUrlSuccess() для выполнения результата
// 9 - нашу thunk для captcha можно добавить в другую санку - в нашем случае login
// 10 - если captchaUrl изменится то мы пользователю покажем картинку (в initial state)
// 11 - в Login.js зафиксить изменения captchaUrl и если она не NULL то показать картинку пользователю
// 12 - прокинуть с помощью props в логин форму
// 13 - сделать проверку captchaUrl null или нет
export const getCaptchaUrl = () => async (dispatch) => {
    let response = await securityAPI.getCaptchaUrl();
    // проверку делать не надо т.к. капча прийдет в обязательном порядке
    let captchaUrl = response.data.url;

    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export default authReducer;

// после создания REDUCER - мы должны его зписать в reducer-store, чтобы могли его вызвать
