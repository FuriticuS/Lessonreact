import React from "react";

class ProfileStatus extends React.Component{

   state = {
       editMode:false,
       // локальный статус = статус из пропсов пока его не начали менять
       status: this.props.status,
   }

   // клик по статусу чтобы его изменить БЕРЕМ ИЗ ЛОКАЛЬНОГО СТЕЙТА !!!!!!
   activateEditMode = () => {
       // метод из Reat.Component котороый перезапишет обьект который мы передаем  (сво-ва обьекта)
       this.setState({
           editMode:true,
       });
   }

    // клик по статусу чтобы его изменить БЕРЕМ ИЗ ЛОКАЛЬНОГО СТЕЙТА !!!!!!
    deActivateEditMode = () => {
        // метод из Reat.Component котороый перезапишет обьект который мы передаем  (сво-ва обьекта)
        this.setState({
            editMode:false,
        });

        // статус когда обновили
        this.props.updateStatus(this.state.status);
    }

    // функция для того чтобы менять состояние state input (печатать слова в инпуте) для сохранения его в локальном сторе
    onStatusChange = (e) => {
       this.setState({
           status: e.currentTarget.value
       })
    }

    // функция которая перезаписывает новые данные беря их из локального стейта и сохраняя в глобальном
    componentDidUpdate(prevProps,prevState) {

       if (prevProps.status !== this.props.status) {
           this.setState({
               status: this.props.status,
           });
       }
    }

    render() {
        return (
            <div className="status">

                {/*если не меняется поле ввода input*/}
                {!this.state.editMode &&
                    <div className="status-my">
                        <span onClick={this.activateEditMode}>{!this.props.status ? 'Статуса нет': this.props.status}</span>
                    </div>
                }

                {/*если мы вносим новые слова в input*/}
                {this.state.editMode &&
                    <div className="status-new">
                        <input
                            onChange={this.onStatusChange}
                            autoFocus={true}
                            onBlur={this.deActivateEditMode}
                            value={this.state.status}/>
                    </div>
                }

            </div>
        );
    }
};

export default ProfileStatus;
