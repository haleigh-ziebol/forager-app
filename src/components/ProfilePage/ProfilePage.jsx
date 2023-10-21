import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ObservationMap from '../ObsMap/ObsMap';
import './ProfilePage.css'
import ObsItem from '../ObsItem/ObsItem';

function ProfilePage() {

  const user = useSelector((store) => store.user);
  const observationList = useSelector(store => store.observation.userObservationList);
  const userRegion = useSelector(store => store.userdata.userRegion)

  const dispatch = useDispatch();

  //fetches observationList
  useEffect(() => {
      console.log('fetching observation list');
      // dispatch an action to get observation list
      dispatch({type:'FETCH_USER_OBSERVATIONS', payload: {user_id: user.id}})
  }, []);

  //fetches user region
  useEffect(() => {
      console.log('fetching region name');
      dispatch({type:'FETCH_USER_REGION', payload: {region: user.region_id}})
  }, []);

  return (
    <div className="profile-container">
      <div className="profile">
          <img 
           alt={user.icon}
            width={"100px"}
            height={"100px"}
            src={`Profile_SVG/${user.icon}-svgrepo-com.svg`}
          />
          <h2>Welcome, {user.username}!</h2>
          <p>Region: {userRegion.length > 0 && userRegion[0].name}</p>
      </div>
      <div className="profile-map">
        <ObservationMap />
        <div>
          { ( observationList.length > 0) && 
                  observationList.map((observation) => {
                    return <ObsItem observation={observation} />
                  })
          } 
        </div>
      </div>
      {JSON.stringify(observationList)}
      {JSON.stringify(process.env)}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default ProfilePage;
