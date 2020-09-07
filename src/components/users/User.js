import React from "react";
import {NavLink} from "react-router-dom";

import './user.css';

const User = (props) => {

    return (
        <div className="user">

            <div className="left-user">
                <div className="left-user-img">
                    <NavLink to={'/profile/' + props.id}>
                        {/*если в запросе user.photos.small нет картинки (NULL) то захардкодим иконкой своей*/}
                        <img
                            src={props.photos.small != null ? props.photos.small : "https://image.flaticon.com/icons/png/512/17/17797.png"}
                            alt="avatar"/>
                    </NavLink>
                </div>

                <div className="left-user-button">
                    {/*если user follow то покажем одну кнопку если нет то другую*/}
                    {props.followed
                        ?
                        <button disabled={props.followingInProcess.some(id => id === props.id)} onClick={() => {
                            props.unfollow(props.id)
                        }}>Unfollow</button>
                        :
                        <button disabled={props.followingInProcess.some(id => id === props.id)} onClick={() => {
                            props.follow(props.id)
                        }}>Follow</button>
                    }
                </div>
            </div>

            <div className="right-user">
                <div className="right-user-name">
                    <div className="right-user-name-user">{props.name}</div>
                    <div className="right-user-name-status">{props.status}</div>
                </div>
                <div className="right-user-city">
                    <div className="right-user-city-country">{"user.location.country"}</div>
                    <div className="right-user-city-city">{"user.location.city"}</div>
                </div>
            </div>
        </div>
    )
}

export default User;
