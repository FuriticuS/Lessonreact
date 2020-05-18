import React from "react";

import './freinds.css'

const Friends = (props) => {
    return (
        <li>
            <img src={props.logo} alt="logoName"/>
            {props.name}
        </li>
    )
}

export default Friends;
