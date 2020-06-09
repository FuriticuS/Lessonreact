import * as axios from "axios";

// так как везде url одинаковый создадим переменную - 1 вариант сокращения кода
const baseUrl = `https://social-network.samuraijs.com/api/1.0/`;

//создаем axios с условиями для всех запросов - 2 вариант сокращения кода
const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    'API-KEY':'614a97b4-e7f5-4aa7-8483-5a00861c0bf2',
});

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

// axios запрос на отписку unfollow для users
export const delUnfollow = (user) => {
    instance.delete(`follow/${user.id}`).then(response => {
        return response.data;
    })
};

// axios запрос на подписку follow для users
export const postFollow = (user) => {
    instance.post(`follow/${user.id}`).then(response => {
        return response.data;
    })
};

