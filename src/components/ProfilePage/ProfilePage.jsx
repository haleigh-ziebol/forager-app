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
      console.log('fetching observation list for user id', user.id);
      // dispatch an action to get observation list
      dispatch({type:'FETCH_USER_OBSERVATIONS', payload: {user_id: user.id}})
  }, []);


  return (
    <div className="profile-container">
      <div className="profile-info">
          <img 
           alt={user.icon}
            width={"100px"}
            height={"100px"}
            src={`Profile_SVG/${user.icon}-svgrepo-com.svg`}
          />
          <h2>Welcome, {user.username}!</h2>
          <p>Region: {userRegion.length > 0 && userRegion[0].name}</p>
      </div>
      <ObservationMap />
      <div className="observation-info">
        <div className ="observation-header">
          <div><h1>My Observations:</h1>
        </div>
        <div className ="observation-body">
            {observationList.length > 0 && 
            <div><button>List</button><button>Map</button> </div>}
          </div>
          {observationList.length == 0 && <p>None for now!</p>}
          { ( observationList.length > 0) && 
                  observationList.map((observation) => {
                    return <ObsItem observation={observation} />
                  })
          } 
        </div>
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default ProfilePage;
