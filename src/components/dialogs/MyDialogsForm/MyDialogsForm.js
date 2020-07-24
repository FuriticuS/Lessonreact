import React from "react";
import {Field, reduxForm} from "redux-form";

const MyDialogsForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                component={"textarea"}
                name={"newMessagesText"}
                placeholder={"Введите свое сообщение ProfilePage"}
            />
            <button>Add post</button>
        </form>
    );
};

// добавление нашей формы в redux-form
const MyDialogsFormRedux = reduxForm({
    form:"dialogMyDialogsForm"
})(MyDialogsForm );

export default MyDialogsFormRedux;
