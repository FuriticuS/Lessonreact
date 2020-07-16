import React from "react";
import Dialogs from "./Dialogs";

// ------ import функции CONNECT для нашей компоненты
import {connect} from "react-redux";

// ------ import функции Action create, которые хранят тип для наших функций, из reducer
import {addNewMessageActionCreator, updateMessageTextActionCreator} from "../../redux/reducer/dialogsPage";
import {WithAuthRedirect} from "../hoc/WithAuthRedirect";

// ------ определение функций для CONNECT
// -- функции с данными где State это State = Store.getState();
let mapStateToProp = (State)=> {
    return {
        dialogsPage: State.dialogsPage,
        newMessagesText: State.dialogsPage.newMessagesText
    }
}

// компонент вида HOC - high order component который делает проверку логина
let AuthRedirectComponent = WithAuthRedirect(Dialogs);

//-- закинем вторым параметром ссылки на нужные dispatch action create бывший mapDispatchToProps
const DialogsContainer = connect(mapStateToProp, {
    addNewMessage: addNewMessageActionCreator,
    updateMessageText: updateMessageTextActionCreator
}) (AuthRedirectComponent);

export default DialogsContainer;
