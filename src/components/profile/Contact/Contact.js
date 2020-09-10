import React from "react";

const Contact = (props) => {
    return(
        <div className="contact">
            <span>{props.contactTitle}:{props.contactValue}</span>
        </div>
    )
}

export default Contact;
