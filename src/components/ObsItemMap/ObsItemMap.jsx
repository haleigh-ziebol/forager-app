import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

//child components
import GrowthIcons from '../GrowthIcons/GrowthIcons';

//MUI components
import ListItem from '@mui/material/ListItem';
import { Modal, Box } from '@mui/material';

//format date for selector
function alterDate (string) {
  return string.substr(0,10)
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  height: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};

function ObsItemMap( { observation, i } ) {

  //controls option buttons for observations
  let [displayToggle, setDisplayToggle] = useState(true);
  let [picModal, setPicModal] = useState(false);

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
    <ListItem alignItems="flex-start" key={observation.id} className='outlined box-item1' sx={{bgcolor: '#FFF4F4', m:'0px 0px 5px 0px', color:'#484E6B'}}>
      <div className='box-item2'>
        <p><b>Observation #{i+1}</b></p>
        <p>Date: <b>{alterDate(observation.date_observed)}</b></p>
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
            width={"17px"}
            height={"17px"}
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
        <div className='box-item3'>
          <p>Scientific Name: <b><i>{observation.scientific_name}</i></b></p>
          <img 
            className='img-button'
            alt="info"
            width={"17px"}
            height={"17px"}
            src={`Site_SVG/info.svg`}
            onClick={() => history.push(`/info/${observation.species_id}`)}
          />
        </div>
        <div>
          <p>Common Name: <b>{observation.common_name.split(",")[0]}</b></p>
        </div>
      </div>
      <div className='box-item6'>
        <p>Notes: {observation.notes !== "" ? observation.notes : 'N/A'}</p>
        <div className="box-item3">
        <GrowthIcons growth_type={observation.growth_type} />
        { observation.photo == "" ?
          <img 
            className='no-pic'
            alt="no picture"
            width={"30px"}
            height={"30px"}
            src={`Site_SVG/click-icon/no-pic.svg`}
          />
        :
          <img 
            className='img-button'
            alt="picture"
            width={"30px"}
            height={"30px"}
            src={`Site_SVG/click-icon/pic.svg`}
            onClick={()=>setPicModal(true)}
          />
        }
      </div>

        <Modal
          open={picModal}
          style={style}
        >
          <div>
            <button onClick={() => setPicModal(false)}>x</button>
          <img 
            alt={`photo_obs_id${observation.id}`}
            width={"450px"}
            height={"600px"}
            src={observation.photo}
          />
          </div>
        </Modal>
      </div>
    </ListItem>
  );
}

export default ObsItemMap;
