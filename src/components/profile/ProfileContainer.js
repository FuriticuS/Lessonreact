import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {authUser, getStatus, savePhoto, saveProfile, updateStatus} from "../../redux/reducer/profilePage";
import {WithAuthRedirect} from "../hoc/WithAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    // можно не использовать тк ничего внутри не происходит кроме получения props
    constructor(props) {
        super(props);
    }

    // т.к. повторяется логика в componentDidMount и componentDidUpdate сделаем вспомогательную функцию
    refreshProfile() {
        // достанем user-id из url нашего profile
        let userID = this.props.match.params.userId;

        // покажет того user который забит руками в userID если мы не выберем в user конкретного
        // мой ID = моему аккаунту на сайте https://social-network.samuraijs.com/account
        if (!userID) {
            //userID = 8581; // - это мой личный id
            // мой id есть в authReducer в initialState = userId: null,
            // но надо сделать redirect на страницу userID
            userID = this.props.authorizedUserId; // - берем из пропсов из mapStateToProps
            //но если опять userID необнаружен то отправим на страницу регистрации
            if (!userID) {
                this.props.history.path('/login')
            }
        }
        this.props.authUser(userID);
        this.props.getStatus(userID);
    }

    //метод жизненного цикла - методы которые есть у обьекта, который создан с помощью этого класса
    // и React работает с этим обьектом через эти методы
    componentDidMount() {
        this.refreshProfile();
    }

    // когда произошло обновление компоненты, изменился либо url либо какие-либо данные
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId != prevProps.match.params.userId){
            this.refreshProfile();
        }
    }

    render() {

        return (
            <div>
                {/*props для компоненты Profile*/}
                <Profile
                    {...this.props}
                    //владелец cтраницы - если владелец то = true на других страницах пользователей false
                    owner={!this.props.match.params.userId}
                    profile={this.props.profile}
                    status={this.props.status}
                    updateStatus={this.props.updateStatus}
                    savePhoto={this.props.savePhoto}
                    saveProfile={this.props.saveProfile}
                />

            </div>
        )
    }
};

// пропсы для страницы Profile
let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status, // - взяли из profilePageReducer
        authorizedUserId: state.auth.userId, // - взяли из redux-store
        isAuth: state.auth.isAuth, // - взяли из redux-store
    }
}

//Это утилита из Redux для удобства вывода нескольких функций подряд
// ProfileContainer -> WithAuthRedirect -> withRouter -> connect
let ProfileContainerCompose = compose(
    connect(mapStateToProps, {authUser, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    WithAuthRedirect
)(ProfileContainer);

// компонент вида HOC - high order component который делает проверку логина
//let AuthRedirectComponent = WithAuthRedirect(ProfileContainer);




// перед выводом компоненты ProfileContainer мы еще раз ее прогоним через новый Container - старая запись
// для работы с URLом компоненты (чтобы записать данные с URL)
// и получилась НОВАЯ компонента ProfileContainer
// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

// создаем наши коннекты по переменным и редьюсеры и передаем их в profile - старая запись
// connect сам сделает вызов с переменными и сделает автоматически dispatch
// export default connect(mapStateToProps, {authUser}) (WithUrlDataContainerComponent);

export default ProfileContainerCompose;
