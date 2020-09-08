import React from "react";
import Preloader from "../../preloader/Preloader";
import ProfileStatusWithHooks from "../ProfileHooks/ProfileStatusWithHooks";

import './info.css';

const Info = (props) => {

    const userPhoto = "https://image.flaticon.com/icons/png/512/17/17797.png";

    if (!props.profile) {
        return (
            <Preloader />
        )
    }

    return (
        <div className="info">

            <div className="content-head">
                <img src="https://of-crimea.ru/plug/Peschanye-plyazhi-Kryma.jpg" alt="beach"/>
            </div>

            <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>

            <div className="posts">
                {/*если нет фотки то заглушку*/}
                <img src={props.profile.photos.large || userPhoto} alt="logos-foto" className="logos-foto"/>

                <h1>Avatar</h1>
                {/*если нет фотки то заглушку*/}
                <img src={props.profile.photos.small || userPhoto} alt="logo-small" className="logo-small"/>
                <p>Мое имя - {props.profile.fullName}</p>
                <p>{props.profile.abouMe}</p>

                <h2>Contacts</h2>
                <ul>
                    <li>facebook - {props.profile.contacts.facebook}</li>
                    <li>vk - {props.profile.contacts.vk}</li>
                    <li>insta - {props.profile.contacts.instagram}</li>
                    <li>github - {props.profile.contacts.github}</li>
                </ul>

                <p>что я ищу - {props.profile.lookingForAJobDescription}</p>

            </div>

        </div>
    );
};

export default Info;
