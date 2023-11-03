import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

//MUI components
import ListItem from '@mui/material/ListItem';

//format date for selector
function alterDate (string) {
  return string.substr(0,10)
}

function ObsItemMap( { observation, i } ) {

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
    dispatch({type:'DELETE_OBSERVATION', payload:{id: observation.id, user_id: user.id}})//image: observation.photo for delete route

  }

  return (
    <ListItem alignItems="flex-start" key={observation.id}>
      <div className="box-item2">
        <p>Observation # {i+1}</p>
        <div className="box-grid">
        <img 
            className='img-button'
            alt="marker"
            width="20px"
            height="20px"
            src={`Site_SVG/marker.svg`}
            onClick={() => dispatch({type:'OBSERVATION_TO_HIGHLIGHT', payload: { id: observation.id, location: observation.location}})}
          />
          {(displayToggle == true) ? 
          <img 
            className='img-button'
            alt="plus"
            width={"20px"}
            height={"20px"}
            src={`Site_SVG/plus.svg`}
            onClick={() => setDisplayToggle(false)}
          />
          : 
          <div>
            <img 
              className='img-button'
              alt="minus"
              width={"20px"}
              height={"20px"}
              src={`Site_SVG/minus.svg`}
              onClick={() => setDisplayToggle(true)}
            />
            <img 
              className='img-button'
              alt="edit"
              width={"20px"}
              height={"20px"}
              src={`Site_SVG/edit.svg`}
              onClick={handleEdit}
            />
            <img 
              className='img-button'
              alt="delete"
              width={"20px"}
              height={"20px"}
              src={`Site_SVG/delete.svg`}
              onClick={handleDelete}
            />
          </div>
          }
        </div>
      </div>
      <div className="box-item2">
        <div>
          <p>Scientific Name: <i>{observation.scientific_name}</i></p>
          <img 
            className='img-button'
            alt="info"
            width={"20px"}
            height={"20px"}
            src={`Site_SVG/info.svg`}
            onClick={() => history.push(`/info/${observation.species_id}`)}
          />
        </div>
      <p>Date: {alterDate(observation.date_observed)}</p>
      </div>
      <p>Notes: {observation.notes !== "" ? observation.notes : 'N/A'}</p>
      { (observation.photo !== "") &&
        <img 
          alt={`photo_obs_id${observation.id}`}
          width={"40px"}
          height={"80px"}
          src={observation.photo}
        />
      }
    </ListItem>
  );
}

export default ObsItemMap;
