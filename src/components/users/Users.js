import React from "react";

import './user.css';
import * as axios from "axios";

let Users = (props) => {

    let getUsers = () => {
        if (props.users.length === 0) {
            // get запрос на адрес https://social-network.samuraijs.com/api/1.0/ хотим получить users
            axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
                // получаем ответ и записывам его
                props.setUsers(response.data.items);
            });
        }
    }

    return (
        <div>
            {
                props.users.map(user => <div className="users" key={user.id}>
                    <div className="left-user">
                        <div className="left-user-img">
                        {/*если в запросе user.photos.small нет картинки (NULL) то захардкодим иконкой своей*/}
                            <img src={user.photos.small != null ? user.photos.small : "https://image.flaticon.com/icons/png/512/17/17797.png"} alt="avatar"/>
                        </div>

                        <div className="left-user-button">
                            {/*если user follow то покажем одну кнопку если нет то другую*/}
                            {user.followed
                                ? <button onClick={ ()=>{props.follow(user.id)} }>UnFollow</button>
                                : <button onClick={ ()=>{props.unfollow(user.id)} }>Follow</button>
                            }
                        </div>
                    </div>

                    <div className="right-user">
                        <div className="right-user-name">
                            <div className="right-user-name-user">{user.name}</div>
                            <div className="right-user-name-status">{user.status}</div>
                        </div>
                        <div className="right-user-city">
                            <div className="right-user-city-country">{"user.location.country"}</div>
                            <div className="right-user-city-city">{"user.location.city"}</div>
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
}

export default Users;