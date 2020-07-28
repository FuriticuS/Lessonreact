import React from "react";
import {NavLink} from "react-router-dom";

import './header.css';


const Header = (props) => {
    return(
        <header className="header">
            {/*ссылка на главную*/}
            <NavLink to={'/'}><img src="https://s2.logaster.com/static/v3/img/products/logo.png" alt="logo"/></NavLink>

            {/*блок регистрации*/}
            <div className="loginBlock">
                {
                    // если мы авторизованы то покажем одно если нет то другое
                    props.isAuth
                        ? <div>Пользователь залогинен и его логин = {props.login} <button onClick={props.logout}>Logout</button></div>
                        : <NavLink to={'/login'}>Login</NavLink>
                }

            </div>
        </header>
    );
};

export default Header;
