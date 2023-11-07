import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

//child components
import GrowthIcons from '../GrowthIcons/GrowthIcons';

//MUI components
import ListItem from '@mui/material/ListItem';
import { Modal } from '@mui/material';

//format date for selector
function alterDate (string) {
  const clip = string.substr(0,10).replaceAll("-", "");
  return clip.replace(/(\d{4})(\d{2})(\d{2})/,"$2/$3/$1")
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
    <ListItem alignItems="flex-start" key={observation.id} className='outlined box-item4' sx={{bgcolor: '#FFF4F4', m:'0px 0px 5px 0px', color:'#484E6B'}}>
        <div className="box-item10" style={{marginTop:"15px", marginRight:"10px", marginLeft:"10px"}}>
          <div className='oneline2'>
            <img 
              className='img-button'
              alt="marker"
              width="30px"
              height="30px"
              src={`Site_SVG/marker.svg`}
              onClick={() => dispatch({type:'OBSERVATION_TO_HIGHLIGHT', payload: { id: observation.id, location: observation.location}})}
            />
            <p2><b>Observation #{i+1}</b></p2>
          </div>
          <p style={{marginTop:"20px"}}>Date: <b>{alterDate(observation.date_observed)}</b></p>
          <div className='box-item4' style={{marginTop:"15px"}}>
              <GrowthIcons growth_type={observation.growth_type}/>
              <img
                style={{marginRight:"7px"}}
                className='img-button'
                title="species info"
                alt="info"
                width={"30px"}
                height={"30px"}
                src={`Site_SVG/click-icon/info-bold.svg`}
                onClick={() => history.push(`/info/${observation.species_id}`)}
              />
              <div className="oneline">
              { observation.photo == "" ?
                <img 
                  className='no-pic'
                  title="no photo available"
                  alt="no picture"
                  width={"30px"}
                  height={"30px"}
                  src={`Site_SVG/click-icon/no-pic.svg`}
                />
              :
                <img 
                  className='img-button'
                  title="view photo"
                  alt="picture"
                  width={"25px"}
                  height={"25px"}
                  src={`Site_SVG/click-icon/photo.svg`}
                  onClick={()=>setPicModal(true)}
                />
              }
              <div className="box-item4" style={{marginLeft:"10px"}}>
                {(displayToggle == true) ? 
                <img 
                  className='img-button'
                  alt="plus"
                  width={"25px"}
                  height={"25px"}
                  src={`Site_SVG/plus.svg`}
                  onClick={() => setDisplayToggle(false)}
                />
                : 
                <div>
                  <img 
                    className='img-button'
                    alt="minus"
                    width={"17px"}
                    height={"17px"}
                    src={`Site_SVG/minus.svg`}
                    onClick={() => setDisplayToggle(true)}
                  />
                  <img 
                    className='img-button'
                    alt="edit"
                    width={"17px"}
                    height={"17px"}
                    src={`Site_SVG/edit.svg`}
                    onClick={handleEdit}
                  />
                  <img 
                    className='img-button'
                    alt="delete"
                    width={"17px"}
                    height={"17px"}
                    src={`Site_SVG/delete.svg`}
                    onClick={handleDelete}
                  />
                </div>
                }
              </div>
            </div>
          </div>
          </div>
          <div className='box-item10' style={{marginTop:"50px", maxWidth:"300px", marginRight:"10px"}}>
            <p>Scientific Name: <b><i>{observation.scientific_name}</i></b></p>
            <p>Common Name: <b>{observation.common_name.split(",")[0]}</b></p>
          </div>
        <Modal
          open={picModal}
          style={style}
        >
          <div className='pic-modal'>
            <button style={{backgroundColor: "#484E6B", color:"#EEFFF1" }} onClick={() => setPicModal(false)}>x</button>
          <img 
            alt={`photo_obs_id${observation.id}`}
            width={"450px"}
            height={"600px"}
            src={observation.photo}
          />
          </div>
        </Modal>
    </ListItem>
  );
}

export default ObsItemMap;
