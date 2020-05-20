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
        dialogsPage: State.dialogsPage,
        newMessagesText: State.dialogsPage.newMessagesText
    }
}
// -- функции с call-back
let mapDispatchToProps = (dispatch)=> {
    return {
        addNewMessage: () => {
            dispatch(addNewMessageActionCreator());
        },
        updateMessageText: (text)=> {
            dispatch(updateMessageTextActionCreator(text));
        }
    }
}

// ------ в первых скобках = настройках компоненты , во вторых скобках для какой компоненты
const DialogsContainer = connect(mapStateToProp, mapDispatchToProps) (Dialogs);

export default DialogsContainer;
