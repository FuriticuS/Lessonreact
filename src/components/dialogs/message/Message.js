import React from "react";

import './message.css';

const Message = (props) => {
    return(
        <li className="dialogs-messages-item">
            <div className="messages-item-left">{props.text}</div>
            <div className="messages-item-right">{props.text}</div>
        </li>
    )
};

export default Message;
