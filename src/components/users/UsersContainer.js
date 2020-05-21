import React from "react";
import Users from "./Users";

import {connect} from "react-redux";

import {followAC,unFollowAC,setUserAC} from "../../redux/reducer/userPage";

//-- принимает весь State целиком уже с redux через redux-store и хранит данные для страницы user с props = user
let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users
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
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Users);
