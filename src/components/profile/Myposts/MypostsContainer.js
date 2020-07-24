import React from "react";
import Myposts from "./Myposts";

// ------ import функции CONNECT для нашей компоненты
import {connect} from "react-redux";


// ------ import функции Action create, которые хранят тип для наших функций, из reducer
import {addPostActionCreator} from "../../../redux/reducer/profilePage";

// ------ определение функций для CONNECT
// -- функции с данными где State это State = Store.getState();
let mapStateToProps = (State) => {
    return {
        profilePage: State.profilePage,
        newPostText: State.profilePage.newPostText
    }
}

//-- закинем вторым параметром ссылки на нужные dispatch action create бывший mapDispatchToProps
const MypostsContainer = connect(mapStateToProps,{
    addPost: addPostActionCreator,
})(Myposts);

export default MypostsContainer;
