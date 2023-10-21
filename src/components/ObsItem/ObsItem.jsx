import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ObsItem( { observation } ) {

  let [displayToggle, setDisplayToggle] = useState(true);

  return (
    <div key={observation.id}>
      <p>Observation # {observation.id}</p>       
      {(displayToggle == true) ? 
      <button onClick={() => setDisplayToggle(false)}>?</button> 
      : 
      <div>
        <button onClick={()=> setDisplayToggle(true)}>X</button>
        <button>Edit</button>
        <button>Delete</button>
      </div>
      }
      <p>Date:{JSON.stringify(observation.date_observed)}</p>
       <p>{observation.scientific_name}</p>
      <p>Notes: {observation.notes}</p>
  
    </div>
  );
}

export default ObsItem;
