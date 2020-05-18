import {combineReducers, createStore} from "redux";

//reducer
import profilePageReducer from "./reducer/profilePage";
import dialogsPageReducer from "./reducer/dialogsPage";
import sidebarReducer from "./reducer/sidebar";

// объеденим наши созданные reducer в один
let reducers = combineReducers({
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
    sidebar: sidebarReducer,
});

let Store = createStore(reducers);

export default Store;
