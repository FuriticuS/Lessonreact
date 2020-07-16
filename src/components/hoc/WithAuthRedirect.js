import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

// пропсы для страницы Profile
let mapStateToPropsForRedirect = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

// компонент вида HOC - high order component
export const WithAuthRedirect = (Component) => {

    class RedirectComponent extends React.Component {
        render() {
            //------------------------------ функция Redirect если пользователь незалогинен
            if (this.props.isAuth === false) return <Redirect to={'/login'}/>;

            return <Component {...this.props} />
        }
    }

    let AuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return AuthRedirectComponent;
}
