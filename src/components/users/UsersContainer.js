import React from "react";
import Users from "./Users";

import {connect} from "react-redux";

import {
    followAC,
    unFollowAC,
    setCurrentPageAC,
    toggleFollowingProgress,
    getPagesThunkCreator,
    getUsersThunkCreator
} from "../../redux/reducer/userPage";

import Preloader from "../preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProcess, getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUser
} from "../../redux/reducer/user-selectors";

//------------------------------------------container -----------------------------------------------------//
// создадим классовую компоненту
class UsersAPIComponent extends React.Component {

    // можно не использовать тк ничего внутри не происходит кроме получения props
    constructor(props) {
        super(props);
    }

    // метод который вызовется только при открытии странички User
    // вызов будет только после отрисовки компоненты User
    componentDidMount() {
        //--- вызов всех диспачей с функции connect(внизу)
        this.props.getPages(this.props.currentPage, this.props.pageSize);
    }

    // получаем новые странички
    onPageChanged = (pageNumber) => {
        //--- вызов всех диспачей с функции connect(внизу)
        this.props.getUsers(pageNumber, this.props.pageSize);
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
                    followingInProcess={this.props.followingInProcess}

                    onPageChanged={this.onPageChanged}
                />
            </div>
        )
    }
}

//------------------------------------------container -----------------------------------------------------//
//-- принимает весь State целиком уже с redux через redux-store и хранит данные для страницы user с props = user, позже мы его пробросили через user-selectors и получили все функции
let mapStateToProps = (state) => {
    return {
        users: getUser(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProcess: getFollowingInProcess(state)
    }
}

//Это утилита из Redux для удобства вывода нескольких функций подряд
// UsersAPIComponent -> WithAuthRedirect -> withRouter -> connect
let UserContainerCompose = compose(
    // WithAuthRedirect, - проверка авторизации пользователя(можно отключить)
    connect(mapStateToProps,{
    follow:followAC,
    unfollow:unFollowAC,
    setCurrentPage: setCurrentPageAC,
    toggleFollowingProgress:toggleFollowingProgress,
    getPages:getPagesThunkCreator,
    getUsers: getUsersThunkCreator}))(UsersAPIComponent)

//-- закинем вторым параметром ссылки на нужные action create из файла userPage
export default UserContainerCompose;
