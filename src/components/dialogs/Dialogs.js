import React from "react";
import DialogItem from "./dialog-item/DialogItem";
import Message from "./message/Message";

import './dialogs.css';

const Dialogs = (props) => {
    let dialogElements = props.dialogsPage.dialogsData.map( (dialog) =>
        <DialogItem
            id={dialog.id}
            name={dialog.name}
            age={dialog.age}
            avatar={dialog.avatarUrl}
            key={dialog.id}
        />);

    // теперь данные берем у родительского файла через props
    let messagesElements = props.dialogsPage.textData.map((text) =>
        <Message
            id={text.id}
            text={text.text}
            key={text.id}
        />);

    // добавление сообщения
    let addNewMessage = React.createRef();

    // сторона UI
    let addMessage = () => {
        props.addNewMessage();
    }

    // сторона BLL
    let onChangeTextarea = (event) => {
        let message = event.target.value;
        props.updateMessageText(message);
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
