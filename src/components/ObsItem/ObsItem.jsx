import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';



//format date for selector
function alterDate (string) {
  return string.substr(0,10)
}

function ObsItem( { observation } ) {

  //controls option buttons for observations
  let [displayToggle, setDisplayToggle] = useState(true);

  const user = useSelector((store) => store.user);


  const history = useHistory();
  const dispatch = useDispatch();
 
  const handleEdit = () => {
    console.log("observation:", observation)
    dispatch({type: 'OBSERVATION_TO_EDIT', payload: observation})
    history.push(`/editObservation/${observation.id}`);
  }

  const handleDelete = () => {
    //send user_id with payload
    console.log('observation id:', observation.id)
    dispatch({type:'DELETE_OBSERVATION', payload:{id: observation.id, user_id: user.id}})

  }

  return (
    <div key={observation.id}>
      <p>Observation # {(observation.id)}</p>       
      {(displayToggle == true) ? 
      <button onClick={() => setDisplayToggle(false)}>+</button> 
      : 
      <div>
        <button onClick={()=> setDisplayToggle(true)}>-</button>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
      }
      <p>Date: {alterDate(observation.date_observed)}</p>
       <p>{observation.scientific_name}</p>
      <p>Notes: {observation.notes}</p>
      <button onClick={() => history.push(`/info/${observation.id}`)}>more info</button>
  
    </div>
  );
}

export default ObsItem;
