import React from 'react';
import {Route} from "react-router-dom";

import './css/Reset-styles.css';
import './css/App.css';

import Header from "./components/header/Header";
import Navigation from "./components/navigation/Navigation";
import Profile from "./components/profile/Profile";
import News from "./components/news/News";
import Music from "./components/music/Music";
import Settings from "./components/settings/Settings";
import DialogsContainer from "./components/dialogs/DialogsContainer";

// пример - функция для вывода компоненты
let settingsPage = ()=> <Settings /> ;

const App = (props) => {
    return (
        <div className="app-wrapper">
            <Header/>

            {/*МЕНЮ слева*/}
            <Navigation name={props.appState.dialogsPage.dialogsData} userItem={props.appState.sidebar.userData}/>

            <div className="content">

                {/*данные находятся в state.js*/}
                <Route path='/profile' render={ () => <Profile/>
                    }/>
                <Route path='/dialogs' render={ () => <DialogsContainer/>
                    }/>
                <Route path='/news' render={ () => <News /> }/>
                <Route path='/music' render={ () => <Music /> }/>

                {/*можно вызвать как имя функции*/}
                <Route path='/settings' render={ settingsPage }/>

            </div>

        </div>
    );
};

export default App;
