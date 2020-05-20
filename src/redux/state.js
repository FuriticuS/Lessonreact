// ------ import reducer для наших компонент
import profilePageReducer from "./reducer/profilePage";
import dialogsPageReducer from "./reducer/dialogsPage";
import sidebarReducer from "./reducer/sidebar";

// ------ объект ООП в котором будут храниться наши массивы(они же свойства) и методы(они же функции)
let Store = {
    //--- все наши данные
    _State : {

        // разобьем на подобьект для понимания где что находится
        profilePage: {
            postData: [
                {id: 1, post: 'как все начиналось? ', likes: 5},
                {id: 2, post: 'фото без подписи', likes: 7},
                {id: 3, post: 'снимки без текста', likes: 3},
                {id: 4, post: 'быть для высокой конверсии', likes: 5},
                {id: 5, post: 'В странах СНГ ситуация', likes: 8}
            ],
            newPostText: 'Введите сообщение для страницы Profile'
        },

        dialogsPage: {
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
        },

        sidebar: {
            userData:[
                {
                    logo: "https://gordonua.com/img/article/1880/74_tn.jpg",
                    name: "Alex"
                },
                {
                    logo: "https://bigpicture.ru/wp-content/uploads/2019/04/grandbeauty00.jpg",
                    name: "Lora"
                },
                {
                    logo: "https://i.pinimg.com/originals/e8/83/7b/e8837b00067930f307a825c2ff74f3fa.jpg",
                    name: "Sveta"
                }

            ]
        }

    },
    //--- метод возврата State
    getState() {
        return this._State;
    },

    //--- метод перерисовка дерева нулевая функция
    _callSubscriber() {
        console.log('state changed');
    },
    //--- метод перерисовка дерева
    subscribe(observer) {
        this._callSubscriber = observer; // observer - это наблюдатель за изменениями
    },

    //--- один метод dispatch() для всех функций который принимает ОБЬЕКТ action и смотрит TYPE
    //--- к примеру action может быть {type:addPost}
    dispatch(action) {

        // работа с reducer
        this._State.profilePage = profilePageReducer(this._State.profilePage, action);

        this._State.dialogsPage = dialogsPageReducer(this._State.dialogsPage, action);

        this._State.sidebar.userData = sidebarReducer(this._State.sidebar.userData, action);

        // уведомить подписчика об изменениях в UI
        this._callSubscriber(this._State);
    }

};

export default Store;
