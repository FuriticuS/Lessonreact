import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../../../utils/validators/validators";
import {TextArea} from "../../../FormsControls/FormsControls";

const  mMaxLengthField = maxLengthCreator(30);

const MyPostsForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                component={TextArea}
                name={"newMessagesPostText"}
                placeholder={"Введите свое сообщение"}

                //проверка на заполнение
                validate={[requiredField,mMaxLengthField]}
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
