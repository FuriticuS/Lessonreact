import React from 'react'
import {reduxForm } from 'redux-form'
import LoginForm from "./LoginForm/LoginForm";

let LoginReduxForm = reduxForm({
    form: 'login',
})(LoginForm);

export default LoginReduxForm;
