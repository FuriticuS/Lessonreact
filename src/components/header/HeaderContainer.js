import React from "react";
import Header from "./Header";
import {logout} from "../../redux/reducer/auth-reducer";
import {connect} from "react-redux";

//в первой функции запрос + отрисовка компоненты
class HeaderContainer extends React.Component{

    render() {
        return(
            <Header {...this.props}/>
        );
    }
};

//во второй функции данные
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

//в третьей функции созданный action create - сразу во второй параметр connect`a
export default connect(mapStateToProps, {logout})(HeaderContainer);
