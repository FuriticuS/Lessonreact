import React from "react";
import LoginReduxForm from "./LoginReduxForm";

//передача всех значений из формы которые ввел user
const onSubmit = (formData) => {
    console.log(formData);
}

class Login extends React.Component {

    render() {
        return(
            <div>
                <h1>Login</h1>

                <LoginReduxForm onSubmit={onSubmit}/>

            </div>
        );
    }
}

export default Login;
