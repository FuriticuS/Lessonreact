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

//-- закинем вторым параметром ссылки на нужные dispatch action create бывший mapDispatchToProps
const DialogsContainer = connect(mapStateToProp, {
    addNewMessage: addNewMessageActionCreator,
    updateMessageText: updateMessageTextActionCreator
}) (Dialogs);

export default DialogsContainer;
