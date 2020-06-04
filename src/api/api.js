import * as axios from "axios";

// axios запрос для компоненты UsersContainer c параметрами currentPage и pageSize, которые зададим при вызове, чтобы получить кол-ва страниц
export const getPages = (currentPage = 1,pageSize = 10)=> {
    return axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`, {withCredentials: true});
}

// axios запрос для компоненты UsersContainer c параметрами currentPage и pageSize, которые зададим при вызове, чтобы получить users
export const getUsers = (pageNumber, pageSize)=> {
    return axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${pageSize}`, {withCredentials: true});
}
