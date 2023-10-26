import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//child components
import Observations from '../Observations/Observations';

//styling
import './ProfilePage.css'

function ProfilePage() {

  const user = useSelector((store) => store.user);
  const userRegion = useSelector(store => store.userdata.userRegion)

  return (
    <div className="badge-container">
      <div className="profile-info">
          <img 
           alt={user.icon}
            width={"100px"}
            height={"100px"}
            src={`Profile_SVG/${user.icon}-svgrepo-com.svg`}
          />
          <p>Badges:</p>
      </div>
      <Observations />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default ProfilePage;
