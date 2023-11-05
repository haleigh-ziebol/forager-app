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
          <div>
          <img 
            alt={user.icon}
            width={"90px"}
            height={"90px"}
            src={`Site_SVG/profile-icon/${user.icon}.svg`}
          />
          </div>
          <div>
            <span sx={{display:"inline-block"}}><p>Username: <b>{user.username}</b></p></span>
          <span sx={{display:"inline-block"}}><p>Region: <b>{userRegion.length > 0 && userRegion[0].name}</b></p></span>
          </div>
        </div>
        <Badges/>
      </div>
      <Observations />
    </div>
  );
}

export default ProfilePage;
