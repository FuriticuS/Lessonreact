//для нашего Redux зададим начальные значения
let initialState = {
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

const sidebarReducer = (state = initialState, action) => {

    switch (action.type) {
        default:
            return state;
    }
}

export default sidebarReducer;
