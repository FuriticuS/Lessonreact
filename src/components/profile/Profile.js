import React from "react";

import "./profile.css";

// импорт постов
import Info from "./info/Info";
import MypostsContainer from "./Myposts/MypostsContainer";

const Profile = (props) => {
  return (
      <div className="profile">

          <Info />

          <MypostsContainer
              Store={props.Store}
          />

      </div>
  );
};

export default Profile;
