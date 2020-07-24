import {applyMiddleware, combineReducers, createStore} from "redux";

//reducer
import profilePageReducer from "./reducer/profilePage";
import dialogsPageReducer from "./reducer/dialogsPage";
import sidebarReducer from "./reducer/sidebar";
import userPageReducer from "./reducer/userPage";
import authReducer from "./reducer/auth-reducer";

//form
import { reducer as formReducer } from 'redux-form';

//импорт thunk после установки пакета
import thunkMiddleware from "redux-thunk";

// объеденим наши созданные reducer в один
let reducers = combineReducers({
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
    sidebar: sidebarReducer,
    usersPage: userPageReducer,
    auth: authReducer,
    form: formReducer,
});

// где applyMiddleware промежуточные слои для диспатчей
let Store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = Store;

export default Store;
