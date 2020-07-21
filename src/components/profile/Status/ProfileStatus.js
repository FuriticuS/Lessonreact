import React from "react";

import './ProfileStatus.css'

class ProfileStatus extends React.Component{

   state = {
       editMode:false,
       title:'Титле',
   }

   // клик по статусу чтобы его изменить БЕРЕМ ИЗ ЛОКАЛЬНОГО СТЕЙТА !!!!!!
   activateEditMode = () => {
       // метод из Reat.Component котороый перезапишет обьект который мы передаем  (сво-ва обьекта)
       this.setState({
           editMode:true,
           title:'Титлес измененный',
       });
   }

    // клик по статусу чтобы его изменить БЕРЕМ ИЗ ЛОКАЛЬНОГО СТЕЙТА !!!!!!
    deActivateEditMode = () => {
        // метод из Reat.Component котороый перезапишет обьект который мы передаем  (сво-ва обьекта)
        this.setState({
            editMode:false,
            title:'Титлес измененный',
        });
    }

    render() {
        return (
            <div className="status">
                {!this.state.editMode &&
                    <div className="status-my">
                        <span onClick={this.activateEditMode.bind(this)}>{this.props.status}</span>
                    </div>
                }

                {this.state.editMode &&
                    <div className="status-new">
                        <input autoFocus={true} onBlur={this.deActivateEditMode.bind(this)} type="text" value={this.props.status}/>
                    </div>
                }

            </div>
        );
    }
};

export default ProfileStatus;
