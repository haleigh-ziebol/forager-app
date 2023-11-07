import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

//MUI components
import Card from '@mui/material/Card';


//format date for selector
function alterDate (string) {
  const clip = string.substr(0,10).replaceAll("-", "");
  return clip.replace(/(\d{4})(\d{2})(\d{2})/,"$2/$3/$1")
}

function ObsModal( { observation, i, setObservationModal} ) {

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
    dispatch({type:'DELETE_OBSERVATION', payload:{id: observation.id, user_id: user.id}}) //image: observation.photo for delete route

  }

  return (
    <Card key={observation.id} sx={{ width: 300, p:'2rem', m:'10px', bgcolor: '#FFF4F4', color:'#484E6B'}} className="boxshadow">
      <div className='box-item8'>
        <button style={{backgroundColor: "#484E6B", color:"#EEFFF1" }} onClick={() => setPicModal(false)} onClick={() => setObservationModal(false)} >X</button>
      </div>
      <div className="oneline2">
        <p><b>Observation #{i+1}</b></p>       
        {(displayToggle == true) ? 
          <img 
            className='img-button'
            alt="plus"
            width={"17px"}
            height={"17px"}
            src={`Site_SVG/plus.svg`}
            onClick={() => setDisplayToggle(false)}
            style={{marginLeft:"20px"}}
          />
        : 
        <div>
          <img 
            className='img-button'
            alt="minus"
            width={"25px"}
            height={"25px"}
            src={`Site_SVG/minus.svg`}
            onClick={() => setDisplayToggle(true)}
          />
          <img 
            className='img-button'
            alt="edit"
            width={"25px"}
            height={"25px"}
            src={`Site_SVG/edit.svg`}
            onClick={handleEdit}
            />
          <img 
            className='img-button'
            alt="delete"
            width={"25px"}
            height={"25px"}
            src={`Site_SVG/delete.svg`}
            onClick={handleDelete}
          />
        </div>
        }
      </div>
        <p><b>Date:</b> {alterDate(observation.date_observed)}</p>
        <div className="oneline2">
        <p><b>Scientific Name: </b><i>{observation.scientific_name}</i></p>
        <img
          className='img-button' 
          alt="info"
          width={"17px"}
          height={"17px"}
          src={`Site_SVG/info.svg`}
          onClick={() => history.push(`/info/${observation.species_id}`)}
        />
      </div>
      <p><b>Common Name(s): </b>{observation.common_name}</p>
      <p><b>Growth Type: </b>{observation.growth_type}</p>
      <p><b>Notes:</b> {observation.notes !== "" ? observation.notes : 'N/A'}</p>
      <p><b>Photo:</b> {observation.photo == "" &&  "N/A"}</p>
      { (observation.photo !== "") &&
        <img 
          alt={`photo_obs_id${observation.id}`}
          width={"150px"}
          height={"200px"}
          src={observation.photo}
        />
      }
    </Card>
  );
}

export default ObsModal;
