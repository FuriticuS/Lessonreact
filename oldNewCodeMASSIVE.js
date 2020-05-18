// ------------------------------------- СТАРАЯ запись
import Message from "./src/components/dialogs/message/Message";

let oldArray = ['Dima','Misha','Sveta','Vasya'];
let newArray = oldArray.map( (name) => {
    if (isMaleName(name)) {
        return 1;
    }
    namese {
        return 0;
    }
});

console.log(newArray); // - [1, 1, 0, 1]

// ------------------------------------- ОБНОВЛЕННАЯ запись

let oldArray = ['Dima','Misha','Sveta','Vasya'];
let newArray = oldArray.map( (name) => {
    return isMaleName(name) ? 1 : 0;
});

console.log(newArray); // - [1, 1, 0, 1]


// ------------------------------------- НОВАЯ запись (в одну строчку если функция только !!!возвращает!!! то в одну строчку)
let oldArray = ['Dima','Misha','Sveta','Vasya'];
let newArray = oldArray.map( name => isMaleName(name) ? 1 : 0 );

console.log(newArray); // - [1, 1, 0, 1]





// --------------------------------------------------- для REACT !!!!!!!!!!

// ------------------------------------- ОБНОВЛЕННАЯ запись
let oldArray = ['Dima','Misha','Sveta','Vasya'];
let newArray = oldArray.map( name => {
    return "li"+name+"li";
});

console.log(newArray); // - ['<li>Dima</li>','<li>Misha</li>','<li>Sveta</li>','<li>Vasya</li>']

// ------------------------------------- НОВАЯ запись (в одну строчку если функция только !!!возвращает!!! то в одну строчку)
let oldArray = ['Dima','Misha','Sveta','Vasya'];
let newArray = oldArray.map( name => return `<li>${name}</li>` );

console.log(newArray); // - ['<li>Dima</li>','<li>Misha</li>','<li>Sveta</li>','<li>Vasya</li>']





// --------------------------------------------------- для REACT !!!!!!!!!!

// ------------------------------------- ОБНОВЛЕННАЯ запись
let oldArray = ['World','Home','Green','Black'];
let newArray = oldArray.map( word => {
    return {
        eng: el,
        rus: translateIntoRu(el) // -- translateIntoRu() - функция перевода
    }
});

console.log(newArray); // - [{eng:'World',ru:'Мир'},{eng:'Home',ru:'Дом'},{eng:'Green',ru:'Зеленый'},{eng:'Black',ru:'Черный'}]

// ------------------------------------- НОВАЯ запись (в одну строчку если функция только !!!возвращает!!! то в одну строчку)
let oldArray = ['World','Home','Green','Black'];
let newArray = oldArray.map( word => ({
    eng: el,
    rus: translateIntoRu(el) // -- translateIntoRu() - функция перевода
}) );

console.log(newArray); // - [{eng:'World',ru:'Мир'},{eng:'Home',ru:'Дом'},{eng:'Green',ru:'Зеленый'},{eng:'Black',ru:'Черный'}]

// ------------------------------------- НОВАЯ запись (в одну строчку для компоненты React)
let oldArray = ['World','Home','Green','Black'];
let newArray = oldArray.map( word => (<Message eng={word.eng} ru={word.ru}/>) );

console.log(newArray); // - [<Message eng='World' ru='Мир' /> , <Message eng='Home' ru='Дом' /> , <Message eng='Green' ru='Зеленый' /> ,<Message eng='Black' ru='Черный' /> ]
