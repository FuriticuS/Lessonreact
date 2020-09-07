import React, { Suspense } from 'react';

import {Route, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/reducer/app-reducer";

import Navigation from "./components/navigation/Navigation";
import Settings from "./components/settings/Settings";
import HeaderContainer from "./components/header/HeaderContainer";
import Login from "./components/login/Login";
import Preloader from "./components/preloader/Preloader";

import './css/Reset-styles.css';
import './css/App.css';

// lazy load - ленивая загрузка, компоненты подгружаются когда надо
const DialogsContainer = React.lazy(() => import("./components/dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/profile/ProfileContainer"));
const UsersContainer = React.lazy(() => import("./components/users/UsersContainer"));
const News = React.lazy(() => import("./components/news/News"));
const Music = React.lazy(() => import("./components/music/Music"));

class App extends React.Component {

    // проверка авторизации пользователя
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {

        // если мы не авторизированы верни прелоадер
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className="app-wrapper">
                <HeaderContainer/>

                {/*МЕНЮ слева*/}
                <Navigation name={this.props.appState.dialogsPage.dialogsData}
                            userItem={this.props.appState.sidebar.userData}/>

                <div className="content">

                    {/*данные находятся в state.js*/}
                    <Route path='/profile/:userId?' render={() =>
                        <Suspense fallback={<Preloader />}>
                            <ProfileContainer/>
                        </Suspense>
                    }/>
                    <Route path='/dialogs' render={() =>
                        <Suspense fallback={<Preloader />}>
                            <DialogsContainer/>
                        </Suspense>
                    }/>
                    <Route path='/news' render={() =>
                        <Suspense fallback={<Preloader />}>
                            <News/>
                        </Suspense>}/>

                    <Route path='/music' render={() =>
                        <Suspense fallback={<Preloader />}>
                            <Music/>
                        </Suspense>}/>

                    {/*можно вызвать как имя функции*/}
                    <Route path='/users' render={() =>
                        <Suspense fallback={<Preloader />}>
                            <UsersContainer/>
                        </Suspense>
                    }/>

                    {/*можно вызвать как имя функции*/}
                    <Route path='/settings' render={() => <Settings/>}/>

                    {/*можно вызвать как имя функции*/}
                    <Route path='/login' render={() => <Login/>}/>

                </div>

            </div>
        );
    }
}

// проверка в appreducer иницилизации initialState = initialized - true или false
const mapStateToProps = (state) => ({
    initialized: state.appReducer.initialized
})

//в connecte получаем пропсы авторизации плюс функцию проверки по пропсам авторизован или нет
// объединяем compose все функции для Route
export default compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))
(App);
