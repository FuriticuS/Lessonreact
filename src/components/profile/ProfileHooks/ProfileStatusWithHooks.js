import React, {useEffect, useState} from "react";

const ProfileStatusWithHooks = (props) => {
    // hook
    // функция которая вначале скажет что наш State = false - для проверки
    // запишем в виде реструризации массива где 1 эл = 1 элементу массива, 2=2 и тд
    // 2-ое значение в этом массиве это функция которую мы будем менять
    // делаем столько хуков сколько надо для компоненты
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);


    //----------------------------hook синхронизации для вывода нашего статуса в input
    // при изменении статуса - сохраняется статус на сервере - перерисовывается наш value inputa
    // выполняется только когда будут изменения на странице
    // если props.status не такой как был раньше запусти useEffect
    useEffect( ()=> {
        setStatus(props.status);
    }, [props.status]);

    // ------------------------------------------------------------- функции для изменения статуса
    // клик по статусу чтобы его изменить БЕРЕМ ИЗ ХУКА !!!!!!
    const activateEditMode = () => {
        // функция из хука useState
        setEditMode(true);
    }

    // клик по статусу чтобы его изменить БЕРЕМ ИЗ ХУКА !!!!!!
    const deActivateEditMode = () => {
        // метод из Хука который перезапишет обьект который мы передаем  (сво-ва обьекта)
        setEditMode(false);

        // статус когда обновили
        props.updateStatus(status);
    }

    // ------------------------------------------------------------- функции вывода статуса
    // функция для того чтобы менять состояние state input (печатать слова в инпуте) для сохранения его в локальном стейте
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div className="status">

            {/*если не меняется поле ввода input*/}
            {!editMode &&
                <div className="status-my">
                    <span onClick={activateEditMode}>{!status ? 'Статуса нет': status}</span>
                </div>
            }

            {/*если мы вносим новые слова в input*/}
            {editMode &&
                <div className="status-new">
                    <input
                        onBlur={deActivateEditMode}
                        autoFocus={true}
                        onChange={onStatusChange}
                        value={status}
                    />
                </div>
            }

        </div>
    );
};

export default ProfileStatusWithHooks;
