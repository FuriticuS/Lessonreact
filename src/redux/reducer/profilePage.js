// ------ action type сделаем переменные для все type в наших функциях
const ADD_POST = 'ADD-POST';
const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT';

//для нашего Redux зададим начальные значения
let initialState = {
    postData: [
        {id: 1, post: 'как все начиналось? ', likes: 5},
        {id: 2, post: 'фото без подписи', likes: 7},
        {id: 3, post: 'снимки без текста', likes: 3},
        {id: 4, post: 'быть для высокой конверсии', likes: 5},
        {id: 5, post: 'В странах СНГ ситуация', likes: 8}
    ],
    newPostText: 'Введите сообщение для страницы Profile'
};

const profilePageReducer = (state = initialState, action) => {

    // для нашей функции state = this._State.profilePage
    // вместо if используем switch

    switch (action.type) {
        // case - возможные варианты type
        case ADD_POST :
            // взяли из функции addPosts()
            let newPost= {
                id:6,
                post: state.newPostText,
                likes: 0
            };

            return {
                ...state,
                postData: [...state.postData, newPost],
                newPostText :'Введите сообщение для страницы Profile',
            }

        case UPDATE_POST_TEXT :
            return {
                ...state,
                newPostText: action.newText
            }

        default :
            return state;

    }
}

// ------ функции Action create, которые хранят тип для наших функций
// ------ page Profile
export const addPostActionCreator = () => {
    return {
        type:ADD_POST
    }
}

export const updatePostTextActionCreator = (text) => {
    return {
        type:UPDATE_POST_TEXT,
        newText: text
    }
}

export default profilePageReducer;
