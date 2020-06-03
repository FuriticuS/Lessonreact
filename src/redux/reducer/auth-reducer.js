// ------ action type сделаем переменные для всех type в наших функциях
const SET_USER_DATA = 'SET_USER_DATA';

//для нашего запроса посмотрим API документацию и зададим для переменных их нулевые значения
let initialState = {
    // данные из документашки с back API - userId, email, login
    userId: null,
    email: null,
    login: null,
    //если залогинен то true
    isAuth: false
};

//создаем редьюсор для login и добавляем его в коллекцию redux-store
const authReducer = (state = initialState, action) => {

    // для нашей функции state = this._State.profilePage
    // вместо if используем switch
    switch (action.type) {

        case SET_USER_DATA:
            return {
                // получим state и перезапишем его
                ...state,
                // все данные лежат в action (state тоже)
                ...action.data, // - некая data в которой будет лежать userId, email, login
                //если залогинен то true
                isAuth: true
            };

        default :
            return state;
    }
}

// --- задача этой функции вернуть объект action
// --- упаковываем action в объект который будет задиспачен в reducer
export const setAuthUserData = (userId, email, login) => {
    return {
        type:SET_USER_DATA,
        data:{
            userId,
            email,
            login
        }
    }
}

export default authReducer;

// после создания REDUCER - мы должны его зписать в reducer-store, чтобы могли его вызвать
