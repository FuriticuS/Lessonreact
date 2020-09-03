// селектор для страницы user-container который будет отдавать все данные для map
// селектор принимает на входе state и возвращает какое-то значение, в нашем случае часть state
export const getUser = (state) => {
    return state.usersPage.users;
}

export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
}

export const getFollowingInProcess = (state) => {
    return state.usersPage.followingInProcess;
}

