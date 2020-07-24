import React from "react";
import DialogItem from "./dialog-item/DialogItem";
import Message from "./message/Message";
import MyDialogsFormRedux from "./MyDialogsForm/MyDialogsForm";

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


    //передача всех значений из формы которые ввел user в dialogsPage - reducer
    const addNewDialog = (values) => {
        props.addNewMessage(values.newMessagesText); // - название нашего textarea
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

                <MyDialogsFormRedux onSubmit={addNewDialog}/>

            </div>

        </div>
    );
};

export default Dialogs;
