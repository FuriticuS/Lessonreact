import React from "react";
import Myposts from "./Myposts";

// ------ import функции Action create, которые хранят тип для наших функций, из reducer
import {addPostActionCreator, updatePostTextActionCreator} from "../../../redux/reducer/profilePage";
import StoreContext from "../../../redux/StoreContext";

const MypostsContainer = (props) => {

    return (
        <StoreContext.Consumer >
            { (Store)=> {
                // наш файл state где хранятся все данные
                let state = Store.getState();

                // сторона UI
                let addPost= () => {
                    state.dispatch(addPostActionCreator()); // ---- функция добавления нового поста УЖЕ из STORE
                }

                //------------------------------ функция обработчик события на изменения в textarea

                // сторона BLL
                let onPostChange = (words) => {
                    let text = updatePostTextActionCreator(words); // current - свойства объекта !!!!!!
                    state.dispatch(text); // ---- функция прокидывания букв из textarea через BLL в UI УЖЕ из STORE
                }

                return (
                        <Myposts
                            postData={state.profilePage.postData}
                            addPostMyposts={addPost}
                            newPostText={state.profilePage.newPostText}
                            updatePostText={onPostChange}
                        />
                    )
                }
            }
        </StoreContext.Consumer>
    );
};

export default MypostsContainer;
