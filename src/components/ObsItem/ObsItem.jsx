import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ObsItem( { observation } ) {

  //controls option buttons for observations
  let [displayToggle, setDisplayToggle] = useState(true);

  const user = useSelector((store) => store.user);


  const history = useHistory();
  const dispatch = useDispatch();
 
  const handleEdit = () => {
    history.push(`/edit/${observation.id}`); //routes to edit page
  }

  const handleDelete = () => {
    //send user_id with payload
    dispatch({type:'DELETE_OBSERVATION', payload:{id: observation.id, user_id: user.id}})

  }

  return (
    <div key={observation.id}>
      <p>Observation # {observation.id}</p>       
      {(displayToggle == true) ? 
      <button onClick={() => setDisplayToggle(false)}>+</button> 
      : 
      <div>
        <button onClick={()=> setDisplayToggle(true)}>-</button>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
      }
      <p>Date:{JSON.stringify(observation.date_observed)}</p>
       <p>{observation.scientific_name}</p>
      <p>Notes: {observation.notes}</p>
  
    </div>
  );
}

export default ObsItem;
