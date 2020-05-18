import {NavLink} from "react-router-dom";
import React from "react";

import './dialogItem.css';

const DialogItem = (props) => {

    // переменная для получения пути
    let path = "/dialogs/"+props.id;

    return(
        <li className="dialogs-users-item active">
            {/*аватар*/}
            <img src={props.avatar} alt="ava-post"/>

            <NavLink to={path} >{props.name} {props.age}</NavLink>
        </li>
    )
};

export default DialogItem;
