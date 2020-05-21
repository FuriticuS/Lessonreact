import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import {BrowserRouter} from "react-router-dom";
//------ библиотека react-redux со своим Store
import {Provider} from "react-redux";
import Store from "./redux/redux-store";
import State from "./redux/State";

import App from './App';

import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
    // нужен для работы с Router
    <BrowserRouter>

        <Provider store={Store}>
            <App appState={State.getState()}/>
        </Provider>

    </BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();
