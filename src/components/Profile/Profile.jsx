import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import GoogleMap from '../GoogleMap/GoogleMap'


function Profile() {

  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Functional Component');

  return (
    <div>
        <h2>{heading}</h2>
        <GoogleMap />
    </div>
  );
}

export default Profile;
