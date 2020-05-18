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
        postData: State.profilePage.postData,
        newPostText: State.profilePage.newPostText
    }
}
// -- функции с call-back
let mapDispatchToProps = (dispatch) => {
    // сторона UI
    let addPost= () => {
        dispatch(addPostActionCreator()); // ---- функция добавления нового поста УЖЕ из STORE
    }

    //------------------------------ функция обработчик события на изменения в textarea
    // сторона BLL
    let onPostChange = (words) => {
        let text = updatePostTextActionCreator(words); // current - свойства объекта !!!!!!
        dispatch(text); // ---- функция прокидывания букв из textarea через BLL в UI УЖЕ из STORE
    }

    return {
        addPostMyposts: {addPost},
        updatePostText: {onPostChange}
    }
}

const MypostsContainer = connect(mapStateToProps, mapDispatchToProps)(Myposts);

export default MypostsContainer;
