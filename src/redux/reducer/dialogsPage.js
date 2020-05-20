// ------ action type сделаем переменные для все type в наших функциях
const ADD_NEW_MESSAGE = 'ADD-NEW-MESSAGE';
const UPDATE_MESSAGE_TEXT = 'UPDATE-MESSAGE-TEXT';

//для нашего Redux зададим начальные значения
let initialState = {
    dialogsData: [
        {
            id: 1,
            name: "Dima",
            age: 24,
            avatarUrl: 'https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png'
        },
        {
            id: 2,
            name: "Sveta",
            age: 27,
            avatarUrl: 'https://www.pngarts.com/files/3/Avatar-PNG-High-Quality-Image.png'
        },
        {
            id: 3,
            name: "Lena",
            age: 29,
            avatarUrl: 'https://www.pngarts.com/files/3/Avatar-PNG-High-Quality-Image.png'
        },
        {
            id: 4,
            name: "Oleg",
            age: 23,
            avatarUrl: 'https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png'
        },
        {
            id: 5,
            name: "Sasha",
            age: 21,
            avatarUrl: 'https://www.pngarts.com/files/3/Avatar-PNG-High-Quality-Image.png'
        }
    ],

    textData: [
        {id: 1, text: 'Hi'},
        {id: 2, text: 'Hello'},
        {id: 3, text: 'Whats up?'},
        {id: 4, text: 'Its ok'},
        {id: 5, text: 'Lets go'},
        {id: 6, text: 'Cool'},
    ],

    newMessagesText: 'Введите сообщение для страницы Dialogs',
}

const dialogsPageReducer = (state = initialState, action) => {
    // вместо if используем switch
    switch (action.type) {
        case ADD_NEW_MESSAGE:
            let newMessages = {
                id: 7,
                text: state.newMessagesText
            }
            return{
                ...state,
                newMessagesText : 'Введите сообщение для страницы Dialogs',
                textData: [...state.textData, newMessages],
            }

        case UPDATE_MESSAGE_TEXT:
            return{
                ...state,
                newMessagesText: action.newMessage
            }

        default:
            return state;
    }
}

// ------ функции Action create, которые хранят тип для наших функций
// ------ page Dialogs
export const addNewMessageActionCreator = () => {
    return {
        type: ADD_NEW_MESSAGE
    }
}

export const updateMessageTextActionCreator = (message) => {
    return {
        type:UPDATE_MESSAGE_TEXT,
        newMessage:message
    }
}

export default dialogsPageReducer;
