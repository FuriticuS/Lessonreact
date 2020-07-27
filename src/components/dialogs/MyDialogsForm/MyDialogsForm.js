import React from "react";
import {Field, reduxForm} from "redux-form";
import {TextArea} from "../../FormsControls/FormsControls";
import {maxLengthCreator, requiredField} from "../../../utils/validators/validators";

// для проверки на максимальную длину сообщения в 30символов
const  mMaxLengthField = maxLengthCreator(30);

const MyDialogsForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                component={TextArea}
                name={"newMessagesText"}
                placeholder={"Введите свое сообщение ProfilePage"}

                //проверка на заполнение
                validate={[requiredField,mMaxLengthField]}
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
