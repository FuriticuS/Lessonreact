import React from "react";

import "./profile.css";

import MypostsContainer from "./Myposts/MypostsContainer";
// импорт постов
import Info from "./info/Info";


const Profile = () => {
  return (
      <div className="profile">

          <Info />

          <MypostsContainer />

      </div>
  );
};

export default Profile;
