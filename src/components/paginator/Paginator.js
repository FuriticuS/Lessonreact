import React, {useState} from "react";

import './paginator.css';

const Paginator = (props) => {
    // высчитывает количество кнопочек(страниц), округляем их в большую сторону и отображаем
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    // создаем вывод страниц по 10 шт
    let portionCount = Math.ceil(pagesCount / props.portionSize);

    // берем state из реакта - глобальный стейт
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber-1)*props.portionSize + 1;
    let rightPortionPageNumber = portionNumber*props.portionSize;

    console.log(portionNumber, props.portionSize, pagesCount, props.portionSize);

    return (
        <div className="paginator">

            {/*переход на первую страницу*/}
            { portionNumber > 1 &&
                <button onClick={() => setPortionNumber(1)}>&lArr;</button>
            }

            {/*переход на 1 страницу назад*/}
            { portionNumber > 1 &&

                <button onClick={ () => setPortionNumber(portionNumber - 1)}>&larr;</button>

            }
            {/*вывод страниц по 10 шт */}
            <ul className="page-number">
                {pages.filter(p => p>= leftPortionPageNumber && p<= rightPortionPageNumber).map((p) => {
                    return (
                        <li
                            className={props.currentPage === p && "selectedPage"}
                            onClick={() => {
                                props.onPageChanged(p);
                            }}>
                            {p}
                        </li>
                    )
                })}
            </ul>

            {/*переход на 1 страницу вперед*/}
            { portionCount > portionNumber &&
                <button onClick={() => setPortionNumber(portionNumber + 1)}>&rarr;</button>
            }

            {/*переход на последнюю страницу*/}
            { portionCount > portionNumber &&
                <button onClick={() => setPortionNumber(portionCount)}>&rArr;</button>
            }

        </div>
    )
}

export default Paginator;
