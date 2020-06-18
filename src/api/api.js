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

