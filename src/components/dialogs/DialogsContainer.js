import React from "react";
import Dialogs from "./Dialogs";

// ------ import функции CONNECT для нашей компоненты
import {connect} from "react-redux";

// ------ import функции Action create, которые хранят тип для наших функций, из reducer
import {addNewMessageActionCreator} from "../../redux/reducer/dialogsPage";
import {WithAuthRedirect} from "../hoc/WithAuthRedirect";
import {compose} from "redux";

// ------ определение функций для CONNECT
// -- функции с данными где State это State = Store.getState();
let mapStateToProp = (State)=> {
    return {
        dialogsPage: State.dialogsPage,
        newMessagesText: State.dialogsPage.newMessagesText
    }
}

//Это утилита из Redux для удобства вывода нескольких функций подряд
//compose — это библиотека с уже готовыми компонентами высшего порядка. Идея в том, чтобы писать stateless-компоненты и разделять код на логические части
// берем Dialogs кидаем в  WithAuthRedirect кидаем в Connect
let DialogsContainer = compose(
    connect(mapStateToProp, {
        addNewMessage: addNewMessageActionCreator
    }),
    WithAuthRedirect)
(Dialogs);

// компонент вида HOC - high order component который делает проверку логина - старая запись
// let AuthRedirectComponent = WithAuthRedirect(Dialogs);

//-- закинем вторым параметром ссылки на нужные dispatch action create бывший mapDispatchToProps - старая запись
// const DialogsContainer = connect(mapStateToProp, {
//     addNewMessage: addNewMessageActionCreator,
//     updateMessageText: updateMessageTextActionCreator
// }) (AuthRedirectComponent);

export default DialogsContainer;
