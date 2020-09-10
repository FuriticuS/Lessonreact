import React, {useState} from "react";
import Preloader from "../../preloader/Preloader";
import ProfileData from "../ProfileData/ProfileData";
import ProfileDataForm from "../ProfileDataForm/ProfileDataForm";

import './info.css';

const Info = (props) => {

    // для edit mode
    let [editMode, setEditMode] = useState(false);

    // метод onSubmit для отправки данных с формы
    const onSubmit = (formData) => {
        props.saveProfile(formData).then( () => {
            //выход со страницы редактирования
            setEditMode(false);
        });
    }

    if (!props.profile) {
        return (
            <Preloader/>
        )
    }

    return (
        <div className="info">

            <div className="content-head">
                <img src="https://of-crimea.ru/plug/Peschanye-plyazhi-Kryma.jpg" alt="beach"/>
            </div>

            {/*editmode сделаем с помощью хуков, тоесть state дает реакт свой*/}
            {/*если это наша страница то отобразить кнопку редактирования*/}
            {
                editMode ?
                    <ProfileDataForm
                        status={props.status}
                        updateStatus={props.updateStatus}
                        profile={props.profile}
                        initialValues={props.profile} //стартовые(прошлые) значения в инпутах
                        owner={props.owner} // наши кнопки save и картинка
                        onSubmit={onSubmit}
                    />
                    : <ProfileData
                        status={props.status}
                        updateStatus={props.updateStatus}
                        profile={props.profile}
                        owner={props.owner}
                        onEditMode={ () => setEditMode(true)}
                    />
            }

        </div>
    );
};

export default Info;
