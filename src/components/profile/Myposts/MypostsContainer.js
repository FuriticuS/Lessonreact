import React from "react";
import Myposts from "./Myposts";

// ------ import функции CONNECT для нашей компоненты
import {connect} from "react-redux";

// ------ import функции Action create, которые хранят тип для наших функций, из reducer
import {addPostActionCreator, updatePostTextActionCreator} from "../../../redux/reducer/profilePage";

// ------ определение функций для CONNECT
// -- функции с данными где State это State = Store.getState();
let mapStateToProps = (State) => {
    return {
        profilePage: State.profilePage,
        newPostText: State.profilePage.newPostText
    }
}
// -- функции с call-back
let mapDispatchToProps = (dispatch) => {
      return {
        addPost: () => {
            dispatch(addPostActionCreator());
        },
        updatePostText: (words)=> {
            dispatch(updatePostTextActionCreator(words));
        }
    }
}

const MypostsContainer = connect(mapStateToProps, mapDispatchToProps)(Myposts);

export default MypostsContainer;
