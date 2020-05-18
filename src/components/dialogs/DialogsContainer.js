import React from "react";
import Dialogs from "./Dialogs";

// ------ import функции Action create, которые хранят тип для наших функций, из reducer
import {addNewMessageActionCreator, updateMessageTextActionCreator} from "../../redux/reducer/dialogsPage";

const DialogsContainer = (props) => {

    // наш файл state где хранятся все данные
    let state = props.Store.getState().dialogsPage;

    // сторона UI
    let addMessage = () => {
        props.Store.dispatch(addNewMessageActionCreator());
    }

    // сторона BLL
    let onChangeTextarea = (text) => {
        let message = updateMessageTextActionCreator(text);
        props.Store.dispatch(message);
    }

    return (
        <Dialogs
            addMessage={addMessage}
            onChangeTextarea={onChangeTextarea}

            dialogsData={state.dialogsData}
            textData={state.textData}
            newMessagesText = {state.newMessagesText}

            dialogsPage = {state}
        />
    );
};

export default DialogsContainer;
