import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//child components
import Observations from '../Observations/Observations';

//styling
import './ProfilePage.css'
import Badges from '../Badges/Badges';

function ProfilePage() {

  const user = useSelector((store) => store.user);
  const userRegion = useSelector(store => store.userdata.userRegion)

  return (
    <div className="profile-container background">
      <div className="profile-info">
        <div className="box-item2 center">
          <img 
            alt={user.icon}
            width={"100px"}
            height={"100px"}
            src={`Site_SVG/profile-icon/${user.icon}.svg`}
          />
          <p><i>Username:  </i>{user.username}</p>
          <p><i>Region: </i> {userRegion.length > 0 && userRegion[0].name}</p>
        </div>
        <Badges/>
      </div>
      <Observations />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default ProfilePage;
