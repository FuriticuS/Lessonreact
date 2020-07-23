import * as axios from "axios";

// так как везде url одинаковый создадим переменную - 1 вариант сокращения кода
const baseUrl = `https://social-network.samuraijs.com/api/1.0/`;

//создаем axios с условиями для всех запросов - 2 вариант сокращения кода
const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    'API-KEY':'614a97b4-e7f5-4aa7-8483-5a00861c0bf2',
});

//создаем axios с условиями для всех запросов - 2 вариант сокращения кода
export const getProfile = (userID) => {
    // get запрос на адрес https://social-network.samuraijs.com/api/1.0/ хотим получить users
    return instance.get(`profile/` + userID);
};

// axios запрос для компоненты UsersContainer c параметрами currentPage и pageSize, которые зададим при вызове, чтобы получить кол-ва страниц
export const getPages = (currentPage = 1,pageSize = 10)=> {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => {
        return response.data;
    });
}

// axios запрос для компоненты UsersContainer c параметрами currentPage и pageSize, которые зададим при вызове, чтобы получить users
export const getUsers = (pageNumber, pageSize)=> {
    return instance.get(`users?page=${pageNumber}&count=${pageSize}`).then(response => {
        return response.data;
    });
}

// axios запрос для получения users для header
export const authUser = () => {
    return instance.get(`auth/me`);
}

// axios запрос на отписку unfollow для users
export const delUnfollow = (userId) => {
    return instance.delete(`follow/${userId}`);
};

// axios запрос на подписку follow для users
export const postFollow = (userId) => {
    return instance.post(`follow/${userId}`);
};


//------------------------------------------------------------------ для компоненты Profile
// axios запрос на profile для получения данных с API и полученные данные переносим в ProfileContainer
// карта переноса = api.js ->
// profilePage(добавить в initialState - сделать const тип - добавить в reducer case по типу - сделать Action create для status - создать thunk для get запроса) ->
// ProfileContainer (делаем map для status в mapStateToProps - делаем connect для методов get и update - запихиваем в componentDidMount - передаем в компоненту новые пропсы как status={this.props.status} и updateStatus={this.props.updateStatus}) ->
// Profile (прокидываем пропсы в наш компонент Info как status={props.status} updateStatus={props.updateStatus}) ->
// Info (прокидываем пропсы в наш компонент ProfileStatus как status={props.status} updateStatus={props.updateStatus}) ->
// ProfileStatus (добавляем activateEditMode добавляем deActivateEditMode добавляем в input все наши данные)

export const pofileAPI = {
    getProfile(userId){
        return instance.get(`profile/`+userId);
    },
    getStatus(userId) {
        return instance.get(`profile/status/`+userId);
    },
    // для изменения статуса отправляет пут запрос и заменяем статус старый на новый статус
    // status - это имя на сервере для статуса
    // text - это что мы изменили
    updateStatus(text){
        return instance.put(`profile/status`, {status: text});
    }
};

