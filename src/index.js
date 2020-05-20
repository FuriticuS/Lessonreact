import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import {BrowserRouter} from "react-router-dom";
//------ библиотека react-redux со своим Store
import {Provider} from "react-redux";

import App from './App';

import Store from "./redux/state";

import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
    // нужен для работы с Router
    <BrowserRouter>

        <Provider Store={Store}>
            <App />
        </Provider>

    </BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();
