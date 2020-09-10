import React from "react";
import ProfileStatusWithHooks from "../ProfileHooks/ProfileStatusWithHooks";
import {Field, reduxForm} from "redux-form";
import {inputForm, TextArea} from "../../FormsControls/FormsControls";

import './ProfileDataForm.css';
import {requiredField, touchCheck} from "../../../utils/validators/validators";

const ProfileDataForm = (props) => {
    // заглушка если нет фотки у user
    const userPhoto = "https://image.flaticon.com/icons/png/512/17/17797.png";

    // загрузка фотки на сервер
    const onMainPhotoSelected = (e) => {
        // если длина файлов есть то выбери массив файлов или 1 файл
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }

    return (
        // отправка данных с помощью onSubmit
        <form className="edit-profile" onSubmit={props.handleSubmit}>

            <div className="myPoto">
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>

                {/*если нет фотки то заглушку*/}
                <img src={props.profile.photos.large || userPhoto} alt="logos-foto" className="logos-foto"/>

                <h1>Avatar</h1>
                {/*если нет фотки то заглушку*/}
                <img src={props.profile.photos.small || userPhoto} alt="logo-small" className="logo-small"/>

                {/*сделаем кнопку загрузки изображений на сервер*/}
                {
                    props.owner &&
                    <input type={"file"} onChange={onMainPhotoSelected}/>
                }
            </div>

            {/*------------------------------------------------------ поля формы*/}
            {/* с помощью redux-form сделаем форму где createField - наш ручной элемент из FormsControls*/}
            <div className="post-form-div">Мое имя FULLNAME - {<Field component={inputForm} name={"fullName"} placeholder={"Full name"} />}</div>

            <div className="post-form-div">Обо мне - {<Field component={inputForm} name={"aboutMe"} placeholder={"About me"} />}</div>

            <div className="contacts">
                <h3>Contacts:</h3>
                {/*Object.keys - метод в котором можно получить ключи объекта*/}
                {/*с помощью map вытащим сам key и значение по key*/}
                {
                    Object.keys(props.profile.contacts).map((key) => {
                        return (
                            <div key={key} className="post-form-div-contact">
                                {key}:<Field component={inputForm} name={"contacts"+key} placeholder={"contacts"+key} validate={requiredField}/>
                            </div>
                        )
                    })
                }
            </div>

            {/*checkbox*/}
            <div className="job-status post-form-div">
                Ищу работу:{<Field component={inputForm} name={"lookingForAJob"} type={"checkbox"} validate={[touchCheck]}/>}
            </div>

            {/*textarea для skills*/}
            <div className="post-form-div">
                <p>My skills:</p>
                {<Field name="lookingForAJobDescription" placeholder={"My skills"} component={TextArea}/>}
            </div>

            {/*Если ошибка в полях ввода отобразить блок*/}
            {
                props.error &&

                <div className="error-message">
                    {props.error}
                </div>
            }

            {/*кнопка сохранить плюс перейти на страницу профиля*/}
            {
                props.owner && <button onClick={props.onEditMode}>Сохранить</button>
            }

        </form>
    );
};

let ProfileReduxForm = reduxForm({
    form: 'edit-profile',
})(ProfileDataForm);

export default ProfileReduxForm;
