import React from "react";
import Dialogs from "./Dialogs";

// ------ import функции Action create, которые хранят тип для наших функций, из reducer
import {addNewMessageActionCreator, updateMessageTextActionCreator} from "../../redux/reducer/dialogsPage";
import StoreContext from "../../redux/StoreContext";

const DialogsContainer = (props) => {

    return (
        <StoreContext.Consumer>
            { (Store) => {

                    // наш файл state где хранятся все данные
                    let state = Store.getState();

                    // сторона UI
                    let addMessage = () => {
                        Store.dispatch(addNewMessageActionCreator());
                    }

                    // сторона BLL
                    let onChangeTextarea = (text) => {
                        let message = updateMessageTextActionCreator(text);
                        Store.dispatch(message);
                    }

                    return (
                        <Dialogs
                            addMessage={addMessage}
                            onChangeTextarea={onChangeTextarea}

                            dialogsData={state.dialogsPage.dialogsData}
                            textData={state.dialogsPage.textData}
                            newMessagesText = {state.dialogsPage.newMessagesText}

                            dialogsPage = {state.dialogsPage}
                        />
                    )
                }

            }
        </StoreContext.Consumer>
    );
};

export default DialogsContainer;
