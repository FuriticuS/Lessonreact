import React from "react";

import "./profile.css";

import MypostsContainer from "./Myposts/MypostsContainer";
// импорт постов
import Info from "./info/Info";


const Profile = (props) => {
  return (
      <div className="profile">

          <Info
              owner={props.owner}
              profile={props.profile}
              status={props.status}
              updateStatus={props.updateStatus}
              savePhoto={props.savePhoto}
              saveProfile={props.saveProfile}
          />

          <MypostsContainer />

      </div>
  );
};

export default Profile;
