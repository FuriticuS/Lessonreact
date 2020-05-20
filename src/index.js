import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import {BrowserRouter} from "react-router-dom";
//------ библиотека react-redux со своим Store
import {Provider} from "react-redux";
import Store from "./redux/redux-store";

import App from './App';

import State from "./redux/State";

import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
    // нужен для работы с Router
    <BrowserRouter>

        <Provider Store={Store}>
            <App appState={Store.getState()}/>
        </Provider>

    </BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();
