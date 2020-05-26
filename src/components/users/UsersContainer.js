import React from "react";
import * as axios from "axios";
import Users from "./Users";

import {connect} from "react-redux";

import {
    followAC,
    unFollowAC,
    setUserAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    toggleIsFetchingAC
} from "../../redux/reducer/userPage";

import Preloader from "../preloader/Preloader";
import preloader from "./img/loader.gif";

//------------------------------------------container 2-----------------------------------------------------//
// создадим классовую компоненту
class UsersAPIComponent extends React.Component {

    // можно не использовать тк ничего внутри не происходит кроме получения props
    constructor(props) {
        super(props);
    }

    // метод который вызовется только при открытии странички User
    // вызов будет только после отрисовки компоненты User
    componentDidMount() {
        //--- отображение preloader перед началом запроса
        this.props.toggleIsFetching(true);
        // get запрос на адрес https://social-network.samuraijs.com/api/1.0/ хотим получить users
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            //--- конец отображения preloader после запроса
            this.props.toggleIsFetching(false);
            // получаем ответ и записывам его
            this.props.setUsers(response.data.items);
            this.props.setTotalUsersCount(response.data.totalCount);
        });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);

        //--- отображение preloader перед началом запроса
        this.props.toggleIsFetching(true);

        // get запрос на адрес https://social-network.samuraijs.com/api/1.0/ хотим получить users
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response => {
            //--- конец отображения preloader после запроса
            this.props.toggleIsFetching(false);
            // получаем ответ и записывам его
            this.props.setUsers(response.data.items);
        });
    }

    // метод который возращает JSX (обязательно нужен в классовой компоненте)
    render() {
        return(
            <div>
                {/*preloader для наших страниц*/}
                {this.props.isFetching ? <Preloader /> : null}

                <Users
                    totalUsersCount = {this.props.totalUsersCount}
                    pageSize = {this.props.pageSize}
                    currentPage = {this.props.currentPage}
                    users={this.props.users}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}

                    onPageChanged={this.onPageChanged}
                />
            </div>
        )
    }
}


//------------------------------------------container 1-----------------------------------------------------//
//-- принимает весь State целиком уже с redux через redux-store и хранит данные для страницы user с props = user
let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
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
        },
        toggleIsFetching: (isFetching) => {
            dispatch(toggleIsFetchingAC(isFetching));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UsersAPIComponent);
