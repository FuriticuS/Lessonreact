import React from "react";
import Header from "./Header";
import * as axios from "axios";
import {setAuthUserData} from "../../redux/reducer/auth-reducer";
import {connect} from "react-redux";

//в первой функции запрос + отрисовка компоненты
class HeaderContainer extends React.Component{

    // после загрузки всей компоненты
    componentDidMount() {
        // get запрос на адрес https://social-network.samuraijs.com/api/1.0/ хотим получить users
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`,{
            withCredentials: true, // чтобы пропустил сервак и дал ответ
        }).then(response => {
            //делаем проверку зарегистрирован пользователь или нет
            // response - приходит с запросом с сервера, в нем лежит data, в дате лежит resultCode - eckjdbt в документашке API
            if (response.data.resultCode === 0) {
                // response.data - метод axios, а data->userId , data->email, data->login - это в документашке api описание в разделе Properties
                let {id, email, login} = response.data.data;

                // если все ок до dispatch
                this.props.setAuthUserData(id, email, login);
            }

        });
    }

    render() {
        return(
            <Header {...this.props}/>
        );
    }
};

//во второй функции данные
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

//в третьей функции созданный action create - сразу во второй параметр connecta

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);
