import React from "react";

import './user.css';
import {NavLink} from "react-router-dom";
import {follow, unfollow} from "../../redux/reducer/userPage";

const Users = (props) => {
    // высчитывает количество кнопочек(страниц), округляем их в большую сторону и отображаем
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            {/*страницы для получения пользователей (с 1 по 54)*/}
            <ul className="page-number">
                {pages.map(page => {
                    return (
                        <li
                            className={props.currentPage === page && "selectedPage"}
                            onClick={() => {
                                props.onPageChanged(page);
                            }}>
                            {page}
                        </li>
                    )
                })}
            </ul>

            {/*вывод полученных пользователей через axios*/}
            {props.users.map(user => <div className="users" key={user.id}>

                    <div className="left-user">
                        <div className="left-user-img">
                            <NavLink to={'/profile/' + user.id}>
                                {/*если в запросе user.photos.small нет картинки (NULL) то захардкодим иконкой своей*/}
                                <img
                                    src={user.photos.small != null ? user.photos.small : "https://image.flaticon.com/icons/png/512/17/17797.png"}
                                    alt="avatar"/>
                            </NavLink>
                        </div>

                        <div className="left-user-button">
                            {/*если user follow то покажем одну кнопку если нет то другую*/}
                            {user.followed
                                ?
                                <button disabled={props.followingInProcess.some(id => id === user.id)} onClick={() => {props.unfollow(user.id)}}>Unfollow</button>
                                :
                                <button disabled={props.followingInProcess.some(id => id === user.id)} onClick={() => {props.follow(user.id)}}>Follow</button>
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
