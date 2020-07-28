import React from "react";
import LoginReduxForm from "./LoginReduxForm";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {login, logout} from "../../redux/reducer/auth-reducer";

const Login = (props) => {

    // проверка данных + отправка на сервер
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    }

    // если пользователь залогинен то перейти на страницу profile
    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return(
        <div>
            <h1>Login</h1>

            <LoginReduxForm onSubmit={onSubmit}/>

        </div>
    );
}

// берем auth из state в redux-store
let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
    }
}

export default connect(mapStateToProps, {login})(Login);
