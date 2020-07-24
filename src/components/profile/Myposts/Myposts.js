import React from "react";
// импорт одного поста
import Post from "./Post/Post";

import './myposts.css';
import MyPostFormRedux from "./MyPostForm/MyPostsForm";

const Myposts = (props) => {

    let mypostsData = props.profilePage.postData.map( (post) =>
        <Post
            id={post.id}
            message={post.post}
            likesCount={post.likes}
            key={post.id}
        />
    );

    //передача всех значений из формы которые ввел user в profilePage - reducer
    const addNewPostMessages = (value) => {
        props.addPost(value.newMessagesPostText); // - название нашего textarea
    }

    return (
        <div className="myposts">
            <h2>New Posts</h2>

            <div className="add-post">

                <MyPostFormRedux onSubmit={addNewPostMessages}/>

            </div>

            <ul className="myposts-block">

                { mypostsData }

            </ul>

        </div>
    );
};

export default Myposts;
