import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import {BrowserRouter} from "react-router-dom";
//------ библиотека react-redux со своим Store
import {Provider} from "react-redux";

import App from './App';

import Store from "./redux/redux-store";

import * as serviceWorker from "./serviceWorker";


//------------------- функция для перерисовки дерева при изменении или добавлении новых данных
// ----- передаем ее в subscribe()
let rerenderEntireTree = () => {
    ReactDOM.render(
        // нужен для работы с Router
        <BrowserRouter>

            <Provider Store={Store}>
                <App

                Store={Store}
                appState={Store.getState()}
                //--- вызываем только один метод dispatch в котором все наши функции
                dispatch={Store.dispatch.bind(Store)}

                />
            </Provider>

        </BrowserRouter>, document.getElementById('root'));
}
//------------------- вызов функции перерисовки!!!!!!!!
rerenderEntireTree();
// ------------------------------------------- функция call-back для перерисовки дом дерева
// ---- передаем ее в State (точее берем ее от туда для отрисовки дерева)
Store.subscribe(()=> {
    rerenderEntireTree();
});

serviceWorker.unregister();
