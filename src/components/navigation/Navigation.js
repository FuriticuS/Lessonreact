import React from "react";
import {NavLink} from "react-router-dom";

import './navigation.css';
import Friends from "./friends/Friends";

const Navigation = (props) => {
    let userFriend = props.userItem.map( (friends) => <Friends logo = {friends.logo} name = {friends.name}/>);

    return(
        <nav className="navigation">
            <ul>
                {/*a href="" - это обычные ссылки а нам надо NavLink to=""*/}
                {/*при NavLink добавляется к каждой ссылке класс .active */}

                <li><NavLink to="/profile" activeClassName={"active"}>Profile</NavLink></li>
                <li><NavLink to="/dialogs">Messages</NavLink></li>
                <li><NavLink to="/news">News</NavLink></li>
                <li><NavLink to="/music">Music</NavLink></li>

                <li className="navigation-settings"><NavLink to="/settings">Settings</NavLink></li>
            </ul>

            {/*старая запись*/}
            {/*<Friends name={props.name}/>*/}

            <div className="friends">
                <h2>Friends</h2>

                <ul className="friends-list">
                    {userFriend}
                </ul>

            </div>

        </nav>
    );
};

export default Navigation;
