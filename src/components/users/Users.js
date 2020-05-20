import React from "react";

import './user.css';

const Users = (props) => {

    if (props.users.length == 0) {
        // пока нет сервера временно создадим юзеров
        let usersData = [
            {id:1,followed:true, photoUrl:'https://cdn0.iconfinder.com/data/icons/avatar-78/128/12-512.png',fullName: 'Dmitri', status:'I am a boss', location: {city:'Minsk',country:'Belarus'}},
            {id:2,followed:false, photoUrl:'https://cdn0.iconfinder.com/data/icons/avatar-78/128/12-512.png',fullName: 'Dinya', status:'I am a boss two', location: {city:'Moscow',country:'Russia'}},
            {id:3,followed:true, photoUrl:'https://cdn0.iconfinder.com/data/icons/avatar-78/128/12-512.png',fullName: 'Danya', status:'I am a boy', location: {city:'Kiev',country:'Ukraine'}}
        ];

        props.setUsers(usersData);
    }

    return (
        <div>
            {
                props.users.map(user=> <div key={user.id}>
                    <div className="left-user">
                        <div className="left-user-img">
                            <img src={user.photoUrl} alt="avatar"/>
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
                            <div className="right-user-name-user">{user.fullName}</div>
                            <div className="right-user-name-status">{user.status}</div>
                        </div>
                        <div className="right-user-city">
                            <div className="right-user-city-country">{user.location.country}</div>
                            <div className="right-user-city-city">{user.location.city}</div>
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
}

export default Users;
