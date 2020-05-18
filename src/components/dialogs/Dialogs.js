import React from "react";

import './dialogs.css';

import DialogItem from "./dialog-item/DialogItem";
import Message from "./message/Message";

const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogElements = state.dialogsData.map( (dialog) =>
        <DialogItem
            id={dialog.id}
            name={dialog.name}
            age={dialog.age}
            avatar={dialog.avatarUrl}
        />);

    // теперь данные берем у родительского файла через props
    let messagesElements = state.textData.map((text) =>
        <Message
            id={text.id}
            text={text.text}
        />);

    // добавление сообщения
    let addNewMessage = React.createRef();

    // сторона UI
    let addMessage = () => {
        props.addMessage();
    }

    // сторона BLL
    let onChangeTextarea = () => {
        let message = addNewMessage.current.value;
        props.onChangeTextarea(message);
    }

    //------------------------------ функция обнуления в textarea
    let onClickTextareaa = () => {
        addNewMessage.current.value = '';
    }

    return (
        <div className="dialogs">

            {/*--------------------------------список людей в чате*/}
            <ul className="dialogs-users">
                { dialogElements }
            </ul>

            {/*--------------------------------текст сообщений в чате*/}
            <ul className="dialogs-messages">
                {messagesElements}
            </ul>

            <div className="dialogs-form">
                <textarea
                    ref={addNewMessage}
                    value={props.newMessagesText}

                    onChange={onChangeTextarea}
                    onClick={onClickTextareaa}
                />
                <button onClick={addMessage}>Добавить сообщение</button>
            </div>

        </div>
    );
};

export default Dialogs;
