// проверка на обязательное поле
// 1 - создаем функцию проверку
// 2 - вешаем на Field-поле нашу проверку = добавление атрибута validate={[]}
// 3 - создаем компоненту к примеру textArea для стилевой обработки ошибок
export const requiredField = value => {
    if (value) {
        return undefined;
    }

    return 'Вы ничего не ввели';
}

// максимальная длина сообщения 30 старый код и новый это thunk Creator
// export const maxLengthField = maxlength => {
//     if (maxlength && maxlength.length > 30) {
//         return 'Ваше сообщение больше 30 символов';
//     }
//     return undefined;
// }
export const maxLengthCreator = (inputLength) => (maxlength) => {
    if (maxlength && maxlength.length > inputLength) {
        return `Ваше сообщение больше ${inputLength} символов`;
    }
    return undefined;
}

// не нажат checkbox
export const touchCheck = (checked) => {
    if (!checked) {
        return `Вы не нажали - Remember me`;
    }
}
