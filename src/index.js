import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import {BrowserRouter} from "react-router-dom";
import App from './App';

import Store from "./redux/redux-store";

import * as serviceWorker from "./serviceWorker";


//------------------- функция для перерисовки дерева при изменении или добавлении новых данных
// ----- передаем ее в subscribe()
let rerenderEntireTreeIndex = () => {
    ReactDOM.render(
        // нужен для работы с Router
        <BrowserRouter>
            <App

            Store={Store}

            appState={Store.getState()}

            //--- вызываем только один метод dispatch в котором все наши функции
            dispatch={Store.dispatch.bind(Store)}

            />
        </BrowserRouter>, document.getElementById('root'));
}
//------------------- вызов функции перерисовки!!!!!!!!
rerenderEntireTreeIndex(Store.getState());
// ------------------------------------------- функция call-back для перерисовки дом дерева
// ---- передаем ее в State (точее берем ее от туда для отрисовки дерева)
Store.subscribe(()=> {
    let state = Store.getState();
    rerenderEntireTreeIndex(state);
});

serviceWorker.unregister();

