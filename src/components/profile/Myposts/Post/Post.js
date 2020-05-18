import React from "react";

import './post.css';

// ----- props ----- это имя параметра для функции
// значения props - это атрибуты нашего тега (КОМПОНЕНТЫ, тк она рисуется как тег)
const Post = (props)=> {
    return(
        <li className="myposts-item">
            <img src="https://klike.net/uploads/posts/2019-03/1551511801_1.jpg" alt="ava-post"/>

            {/*props.message - это значение атрибута message тега <Post />*/}
            <p>я сообщение номер {props.id} - {props.message}</p>

            <div className="mypost-like">
                <span>likes - {props.likesCount}</span>
            </div>

        </li>
    );
};

export default Post;
