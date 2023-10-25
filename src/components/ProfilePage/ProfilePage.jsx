import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

//child components
import ObservationMap from '../ObsMap/ObsMap';
import ObsItemList from '../ObsItemList/ObsItemList';
import ObsItemMap from '../ObsItemMap/ObsItemMap';

//MUI components
import List from '@mui/material/List';

//styling
import './ProfilePage.css'

function ProfilePage() {

  const user = useSelector((store) => store.user);
  const observationList = useSelector(store => store.observation.userObservationList);
  const userRegion = useSelector(store => store.userdata.userRegion)

  const dispatch = useDispatch();
  const history = useHistory();

  const [mapView, setMapView] = useState(true)

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
      {mapView && <ObservationMap /> }
      <div className="observation-info">
        <div className ="observations-header">
          <div><h1>My Observations:</h1>
        </div>
        <div className ="observations-body">
            {observationList.length > 0 && 
            <div>
              { mapView && <button onClick={() => setMapView(false)}>List View</button>}
              { !mapView && <button onClick={() => setMapView(true)}>Map View</button> }
            </div>}
          {observationList.length == 0 && 
            <div>
              <p>None for now!</p>
              <button onClick={()=> history.push('/addObservation')}>Add A Find</button>
            </div>
          }
          {!mapView && <div className="observation-container-list">
            { ( observationList.length > 0) && 
              observationList.map((observation, i) => {
                return <ObsItemList className="observation-blocks" observation={observation} i={i} />
              })
            }
          </div>}
          {mapView && 
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            { ( observationList.length > 0) && 
              observationList.map((observation, i) => {
                return <ObsItemMap className="" i={i} observation={observation} />
              })
            }
            </List>
          }
        </div> 
        </div>
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default ProfilePage;
