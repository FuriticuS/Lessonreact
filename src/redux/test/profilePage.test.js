// тест для profilePageReducer
// проверка что входящие данные от нас (жесткие) дают на выходе положительный результат
// в нашем привере = у нас есть state из 5 сообщений мы action добавляем 6 сообщение
// проверка осуществляется путем изменения длины массива
import profilePageReducer, {addPostActionCreator, deletePost} from "../reducer/profilePage";

let state = {
    postData: [
        {id: 1, post: 'как все начиналось? ', likes: 5},
        {id: 2, post: 'фото без подписи', likes: 7},
        {id: 3, post: 'снимки без текста', likes: 3},
        {id: 4, post: 'быть для высокой конверсии', likes: 5},
        {id: 5, post: 'В странах СНГ ситуация', likes: 8}
    ]
}

it('new post should be added', () => {

    let action = addPostActionCreator('test text');

    let newState = profilePageReducer(state,action);

    expect(newState.postData.length).toBe(6);
});

it('add new post should be correct', () => {

    let action = addPostActionCreator('test text');

    let newState = profilePageReducer(state,action);

    //проверка что 6 элемент массива стал 'test text'
    expect(newState.postData[5].post).toBe('test text');
});

it('deleted post should be correct', () => {

    let action = deletePost(1);

    let newState = profilePageReducer(state,action);

    //проверка что 6 элемент массива стал 'test text'
    expect(newState.postData.length).toBe(4);
});
