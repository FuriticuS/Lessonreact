import React from "react";
import Profile from "./Profile";
import * as axios from "axios";
import profilePageReducer, {setUserProfile} from "../../redux/reducer/profilePage";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Preloader from "../preloader/Preloader";

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

        // get запрос на адрес https://social-network.samuraijs.com/api/1.0/ хотим получить users
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userID).then(response => {
            // получаем ответ и записывам весь файл с API со всеми данными
            this.props.setUserProfile(response.data);
        });
    }

    render() {
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
        profile: state.profilePage.profile
    }
}

// перед выводом компоненты ProfileContainer мы еще раз ее прогоним через новый Container
// для работы с URLом компоненты (чтобы записать данные с URL)
// и получилась НОВАЯ компонента ProfileContainer
let WithUrlDataContainerComponent = withRouter(ProfileContainer);

// создаем наши коннекты по переменным и редьюсеры и передаем их в profile
// connect сам сделает вызов с переменными и сделает автоматически dispatch
export default connect(mapStateToProps, {setUserProfile:setUserProfile}) (WithUrlDataContainerComponent);
