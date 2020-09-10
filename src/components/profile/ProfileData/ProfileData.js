import React from "react";
import ProfileStatusWithHooks from "../ProfileHooks/ProfileStatusWithHooks";
import Contact from "../Contact/Contact";

const ProfileData = (props) => {
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
        <div className="posts">

            {
                props.owner && <button onClick={props.onEditMode}>Редактировать</button>
            }

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

            <p>Мое имя FULLNAME - {props.profile.fullName}</p>
            <p>{props.profile.aboutMe}</p>

            <div className="contacts">
                <h3>Contacts:</h3>
                {/*Object.keys - метод в котором можно получить ключи объекта*/}
                {/*с помощью map вытащим сам key и значение по key*/}
                {
                    Object.keys(props.profile.contacts).map((key) => {
                        return (
                            <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
                        )
                    })
                }
            </div>

            <div className="job-status">
                Ищу работу: {props.profile.lookingForAJob ? "да" : "нет"}
            </div>

            {props.profile.lookingForAJobDescription &&
            <div>
                <p>My skils:</p>
                <ul>
                    <li>HTML</li>
                    <li>JS</li>
                    <li>JQUERY</li>
                    <li>REACT</li>
                    <li>REDUX</li>
                </ul>
            </div>
            }

        </div>
    );
};

export default ProfileData;
