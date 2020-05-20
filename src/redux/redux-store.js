import {combineReducers, createStore} from "redux";

//reducer
import profilePageReducer from "./reducer/profilePage";
import dialogsPageReducer from "./reducer/dialogsPage";
import sidebarReducer from "./reducer/sidebar";
import userPageReducer from "./reducer/userPage";

// объеденим наши созданные reducer в один
let reducers = combineReducers({
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
    sidebar: sidebarReducer,
    usersPage: userPageReducer
});

let Store = createStore(reducers);

window.store = Store;

export default Store;
