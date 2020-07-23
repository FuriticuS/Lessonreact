import React from "react";

class LoginForm extends React.Component {

    render() {
        return(
            <form>

                <div className="name">
                    <input placeholder={"login"}/>
                </div>

                <div className="password">
                    <input placeholder={"password"}/>
                </div>

                <div className="remember-checkbox">
                    <input type={"checkbox"}/> remeber me
                </div>

                <div className="btn">
                    <button>login</button>
                </div>

            </form>
        );
    }
}

export default LoginForm;
