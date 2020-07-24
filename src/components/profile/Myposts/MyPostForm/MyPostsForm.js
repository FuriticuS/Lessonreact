import React from "react";
import {Field, reduxForm} from "redux-form";

const MyPostsForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                component={"textarea"}
                name={"newMessagesPostText"}
                placeholder={"Введите свое сообщение"}
            />
            <button>Add post</button>
        </form>
    );
};

// redux store для нашей form
const MyPostFormRedux = reduxForm({
    form: "profileMyPostForm"
})(MyPostsForm);

export default MyPostFormRedux;
