import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import ObservationMap from '../ObservationMap/ObservationMap';

function UserPage() {

  const user = useSelector((store) => store.user);
  const observationList = useSelector(store => store.observation.userObservationList)

  const dispatch = useDispatch();

  //fetches observationList
  useEffect(() => {
      console.log('fetching observation list');
      // dispatch an action to get observation list
      dispatch({type:'FETCH_USER_OBSERVATIONS', payload: {user_id: user.id}})
  }, []);

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>

      <ObservationMap />
      <div>
        { ( observationList.length > 0) && 
                observationList.map((observation) => {
                  return <div key={observation.id}>
                    <p>OBS ID: {observation.id}</p>
                  </div>;
                })
        } 
      </div>
      {JSON.stringify(process.env)}
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
