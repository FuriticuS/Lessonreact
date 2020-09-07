import React from "react";

import './paginator.css';

const Paginator = (props) => {
    // высчитывает количество кнопочек(страниц), округляем их в большую сторону и отображаем
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div className="paginator">
            {/*страницы для получения пользователей (с 1 по 54)*/}
            <ul className="page-number">
                {pages.map(page => {
                    return (
                        <li
                            className={props.currentPage === page && "selectedPage"}
                            onClick={() => {
                                props.onPageChanged(page);
                            }}>
                            {page}
                        </li>
                    )
                })}
            </ul>

        </div>
    )
}

export default Paginator;
