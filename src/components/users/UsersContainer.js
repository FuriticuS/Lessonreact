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


//------------------------------------------container 1-----------------------------------------------------//
//-- принимает весь State целиком уже с redux через redux-store и хранит данные для страницы user с props = user
let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProcess: state.usersPage.followingInProcess
    }
}

//-- закинем вторым параметром ссылки на нужные action create из файла userPage
export default connect(mapStateToProps,{
    follow:followAC,
    unfollow:unFollowAC,
    setCurrentPage: setCurrentPageAC,
    toggleFollowingProgress:toggleFollowingProgress,
    getPages:getPagesThunkCreator,
    getUsers: getUsersThunkCreator})(UsersAPIComponent);
