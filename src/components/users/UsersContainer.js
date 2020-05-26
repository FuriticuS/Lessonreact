import React from "react";
import Users from "./Users";

import {connect} from "react-redux";

import {followAC, unFollowAC, setUserAC, setCurrentPageAC, setTotalUsersCountAC} from "../../redux/reducer/userPage";

//-- принимает весь State целиком уже с redux через redux-store и хранит данные для страницы user с props = user
let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }
}
//-- служит для того чтобы передавать call-back для компоненты User (функции которые компонента может вызывать)
let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId));
        },
        unfollow: (userId) => {
            dispatch(unFollowAC(userId));
        },
        setUsers: (user) => {
            dispatch(setUserAC(user));
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber));
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setTotalUsersCountAC(totalCount));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Users);
