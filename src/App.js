import React from 'react';
import {Route, withRouter} from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import News from "./components/news/News";
import Music from "./components/music/Music";
import Settings from "./components/settings/Settings";
import DialogsContainer from "./components/dialogs/DialogsContainer";
import UsersContainer from "./components/users/UsersContainer";
import ProfileContainer from "./components/profile/ProfileContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import Login from "./components/login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/reducer/app-reducer";
import Preloader from "./components/preloader/Preloader";

import './css/Reset-styles.css';
import './css/App.css';

class App extends React.Component {

    // проверка авторизации пользователя
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {

        // если мы не авторизированы верни прелоадер
        if (!this.props.initialized) {
            return <Preloader />
        }

        return (
            <div className="app-wrapper">
                <HeaderContainer/>

                {/*МЕНЮ слева*/}
                <Navigation name={this.props.appState.dialogsPage.dialogsData}
                            userItem={this.props.appState.sidebar.userData}/>

                <div className="content">

                    {/*данные находятся в state.js*/}
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>
                    }/>
                    <Route path='/dialogs' render={() => <DialogsContainer/>
                    }/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>

                    {/*можно вызвать как имя функции*/}
                    <Route path='/users' render={() => <UsersContainer/>}/>

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
