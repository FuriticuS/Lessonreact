import React from "react";

import './myposts.css';

// импорт одного поста
import Post from "./Post/Post";

const Myposts = (props) => {

    let mypostsData = props.profilePage.postData.map( (post) =>
        <Post
            id={post.id}
            message={post.post}
            likesCount={post.likes}
            key={post.id}
        />
    );

    //----------------------------- функция добавления постов со state (с BLL)
    let newPostElement = React.createRef();

    // сторона UI
    let addPost= () => {
        props.addPost(); // ---- функция добавления нового поста УЖЕ из STORE
    }

    //------------------------------ функция обработчик события на изменения в textarea

    // сторона BLL
    let onPostChange = (event) => {
        let text = event.target.value; // current - свойства объекта !!!!!!
        props.updatePostText(text); // ---- функция прокидывания букв из textarea через BLL в UI УЖЕ из STORE
    }

    //------------------------------ функция обнуления в textarea
    let onClickTextarea = () => {
        newPostElement.current.value = ''; // current - свойства объекта !!!!!!
    }

    return (
        <div className="myposts">
            <h2>New Posts</h2>

            <div className="add-post">
                <textarea
                    ref={newPostElement}
                    value={props.newPostText}

                    onChange={onPostChange}
                    onClick={onClickTextarea}
                />
                <button onClick={addPost}>Add post</button>
            </div>

            <ul className="myposts-block">

                { mypostsData }

            </ul>

        </div>
    );
};

export default Myposts;
