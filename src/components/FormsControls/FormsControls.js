import React from "react";

import './FormsControls.css';

// 1 - создаем TextArea
// 2 - делаем реструктуризацию в пропсах - исключаем input и meta, и добавляем все остальные пропсы
// 3 - экспорт в нужный Field, добавление атрибута component={TextArea}
// 4 - в meta обычно приходит touched, error, warning - можем взять из пропсов
export const TextArea = ({input, meta, ...props}) => {

    const showError = meta.touched && meta.error;

    return (
        <div className={"formControl"+" "+(showError ? "error" :"")}>
            <textarea  {...input} {...props}/>
            {showError && <span>{meta.error}</span>}
        </div>
    )
}

// 1 - создаем inputForm для нашей компоненты login
export const inputForm = ({input, meta, ...props}) => {
    const showError = meta.touched && meta.error;

    return (
        <div className={"formControl"+" "+(showError ? "error" :"")}>
            <input {...input} {...props}/>
            {showError && <span>{meta.error}</span>}
        </div>
    )
}

// Объеденим все проверки инпутов и textarea  в одну проверку минимизация
// export const FormControl = (props) => {
//     const showError = meta.touched && meta.error;
//
//     return (
//         <div className={"formControl"+" "+(showError ? "error" :"")}>
//             {props.children}
//             {showError ? <span>{meta.error}</span>: <span>Все ок</span>}
//         </div>
//     )
// }
//
// export const TextAreaSmall = (props) => {
//     const {input, meta, child, ...restProps} = props;
//     return (
//         <FormControl {...props}>
//             <textarea  {...input} {...restProps}/>
//         </FormControl>
//     )
// }
//
// export const InputSmall = (props) => {
//     const {input, meta, child, ...restProps} = props;
//     return (
//         <FormControl {...props}>
//             <input  {...input} {...restProps}/>
//         </FormControl>
//     )
// }


