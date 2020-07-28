import React from "react";
import {Field} from "redux-form";
import {inputForm} from "../../FormsControls/FormsControls";
import {maxLengthCreator, requiredField, touchCheck} from "../../../utils/validators/validators";

// кол-во символов в полях ввода
const maxLength = maxLengthCreator(30);

const LoginForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>

            {/*1. устанавливаем redux-form*/}
            {/*2. добавляем в redux-store (import { reducer as formReducer } from 'redux-form')*/}
            {/*3. указываем в reducers - именно form: formReducer */}
            {/*4. добавляем hoc от redux-form = ContactForm = reduxForm в нашем случае LoginReduxForm*/}
            {/*5. заполняем строковые имя беря имя в form*/}
            {/*6. LoginReduxForm добавляем в Login вместо прямого пути в LoginForm*/}
            {/*7. меняем input на Field*/}
            {/*8. добавляем свойство name*/}
            {/*9. добавляем form'e onSubmit={props.handleSubmit} который приходт в пропсах от form-redux*/}
            {/*10. компоненте LoginReduxForm дать атрибут onSubmit={}*/}
            {/*11. в компоненте LoginReduxForm сделать функцию для сбора инфы с input onSubmit*/}

            <div className="name">
                <Field component={inputForm} name={"email"} placeholder={"email"} validate={[requiredField,maxLength]}/>
            </div>

            <div className="password">
                <Field component={inputForm} name={"password"} placeholder={"password"} type={"password"} validate={[requiredField,maxLength]}/>
            </div>

            <div className="remember-checkbox">
                <Field component={inputForm} name={"rememberMe"} type={"checkbox"} validate={[touchCheck]}/> remeber me
            </div>

            <div className="btn">
                <button>login</button>
            </div>

        </form>
    );

}

export default LoginForm;
