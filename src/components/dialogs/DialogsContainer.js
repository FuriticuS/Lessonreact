import React from "react";
import Dialogs from "./Dialogs";

// ------ import функции CONNECT для нашей компоненты
import {connect} from "react-redux";

// ------ import функции Action create, которые хранят тип для наших функций, из reducer
import {addNewMessageActionCreator, updateMessageTextActionCreator} from "../../redux/reducer/dialogsPage";

// ------ определение функций для CONNECT
// -- функции с данными где State это State = Store.getState();
let mapStateToProp = (State)=> {
    return {
        dialogsData: State.dialogsPage.dialogsData,
        textData: State.dialogsPage.textData,
        newMessagesText: State.dialogsPage.newMessagesText,
        dialogsPage: State.dialogsPage
    }
}
// -- функции с call-back
let mapDispatchToProps = (dispatch)=> {
    // сторона UI
    let addMessage = () => {
        dispatch(addNewMessageActionCreator());
    }

    // сторона BLL
    let onChangeTextarea = (text) => {
        let message = updateMessageTextActionCreator(text);
        dispatch(message);
    }

    return {
        addMessage: {addMessage},
        onChangeTextarea: {onChangeTextarea}
    }
}

// ------ в первых скобках = настройках компоненты , во вторых скобках для какой компоненты
const DialogsContainer = connect(mapStateToProp, mapDispatchToProps) (Dialogs);

export default DialogsContainer;
