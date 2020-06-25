import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {authUser} from "../../redux/reducer/profilePage";

class ProfileContainer extends React.Component {

    // можно не использовать тк ничего внутри не происходит кроме получения props
    constructor(props) {
        super(props);
    }

    //метод жизненного цикла - методы которые есть у обьекта, который создан с помощью этого класса
    // и React работает с этим обьектом через эти методы
    componentDidMount() {

        // достанем user-id из url нашего profile
        let userID = this.props.match.params.userId;

        if (!userID) {
            userID = 2;
        }

        this.props.authUser(userID);
    }

    render() {
        //------------------------------ функция Redirect если пользователь незалогинен
        if (this.props.isAuth === false) return <Redirect to={'/login'}/>;

        return (
            <div>
                {/*props для компоненты Profile*/}
                <Profile {...this.props} profile={this.props.profile}/>

            </div>
        )
    }
};

// пропсы для страницы Profile
let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth,
    }
}

// перед выводом компоненты ProfileContainer мы еще раз ее прогоним через новый Container
// для работы с URLом компоненты (чтобы записать данные с URL)
// и получилась НОВАЯ компонента ProfileContainer
let WithUrlDataContainerComponent = withRouter(ProfileContainer);

// создаем наши коннекты по переменным и редьюсеры и передаем их в profile
// connect сам сделает вызов с переменными и сделает автоматически dispatch
export default connect(mapStateToProps, {authUser}) (WithUrlDataContainerComponent);
