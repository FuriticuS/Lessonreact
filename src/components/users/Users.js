import React from "react";
import Paginator from "../paginator/Paginator";
import User from "./User";

import './user.css';

const Users = (props) => {

    return (
        <div className="users">
            {/*Paginator - компонента для вывода страниц пользователей в нормальном виде*/}
            <Paginator
                currentPage={props.currentPage}
                onPageChanged={props.onPageChanged}
                totalUsersCount={props.totalUsersCount}
                pageSize={props.pageSize}
            />

            <div className="users-page">
                {/*компонента для вывода пользователей*/}
                {props.users.map(user => <User
                    key={user.id}

                    id={user.id}
                    user={user.user}
                    name={user.name}
                    status={user.status}
                    photos={user.photos}

                    followed={props.follow}
                    unfollow={props.unfollow}
                    followingInProcess={props.followingInProcess}
                />)
                }
            </div>

        </div>
    )
}

export default Users;
