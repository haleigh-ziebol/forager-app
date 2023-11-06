import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, MarkerF, useLoadScript, InfoWindowF } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

//child components
import ObsItemList from '../ObsItemList/ObsItemList';
import ObsItemMap from '../ObsItemMap/ObsItemMap';


//MUI components
import { Box, Button, Modal, Card, List } from '@mui/material';


//styling
import './Observations.css';
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

//format date for selector
function alterDate (string) {
  return string.substr(0,10)
}

function Observations() {

  const [ selected, setSelected ] = useState({});
  const [mapView, setMapView] = useState(true);
  const [observationModal, setObservationModal] = useState(false);
  const [observationForModal, setObservationForModal] =useState({});

  const user = useSelector((store) => store.user);
  const observationList = useSelector(store => store.observation.userObservationList);
  const userRegion = useSelector(store => store.userdata.userRegion)
  const highlightObs = useSelector(store => store.observation.observationToHighlight)

  const dispatch = useDispatch();
  const history = useHistory();

  //fetches observationList
  useEffect(() => {
    console.log('fetching observation list for user id', user.id);
    // dispatch an action to get observation list
    dispatch({type:'FETCH_USER_OBSERVATIONS', payload: {user_id: user.id}})
  }, []);


  // code modifies bounds when map and observationList changed
  //from Joe Daniels (https://joedaniels123.medium.com/how-to-update-map-bounds-in-react-google-maps-api-when-a-markers-prop-changes-8bb05818cf4c)
  const [map, setMap] = useState(null);
  const onLoad = useCallback((map) => setMap(map), []);

  //sets bounds based on # of observations (0, 1, >1)
  const setBounds = () => {
    if (observationList.length >1 ) {
      const bounds = new window.google.maps.LatLngBounds();
      observationList.map(observation => {
        bounds.extend({
          lat: parseFloat(observation.location[0]),
          lng: parseFloat(observation.location[1]),
        });
      });
      map.fitBounds(bounds);
    } 
    else if (observationList.length == 1) {
      map.setZoom(6);
      map.setCenter({lat: parseFloat(observationList[0].location[0]), lng: parseFloat(observationList[0].location[1])})
    } 
    else {
      map.setZoom(6);
      map.setCenter({lat: parseFloat(userRegion[0].center[0]), lng: parseFloat(userRegion[0].center[1])})
    }
  }

  useEffect(() => {
    if (map) {
      setBounds();
    }
  }, [map, observationList]);
  //end code modified from Joe Daniels

  const { isLoaded } = useLoadScript({

  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
  });
  const mapStyle = {        
    height: "50vh",
    width: "50wh",
  };

  //for infoWindow
  const onSelect = (observation, index) => {
    setSelected({observation: observation, index: index});
  }

  //resets highlighted obs after timeout 
  useEffect(() => {
    if (highlightObs.id !== "") {
      const timer = setTimeout(() => {
        dispatch({type: 'RESET_HIGHLIGHT'})
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [highlightObs]);

  //sets observation modal
  const modalSelect = (observation) => {
    setObservationModal(true);
    setObservationForModal(observation)
  }

  return (
    <div className="observation-container">
      <Modal
        open={observationModal}
        style={style}
      >
        <div className='pic-modal'>
          <button onClick={() => setObservationModal(false)}>x</button>
          <Card key={observationForModal.id} sx={{ width: 300, p:'2rem', m:'10px', bgcolor: '#FFF4F4', color:'#484E6B'}}>
      <div className="box-item5">
        {/* <p><b>Observation #{i+1}</b></p>        */}
      </div>
        <p><b>Date:</b> {alterDate(observationForModal.id.date_observed)}</p>
        <div className="box-item5">
        <p><b>Scientific Name: </b><i>{observationForModal.id.scientific_name}</i></p>
        <img
          className='img-button' 
          alt="info"
          width={"17px"}
          height={"17px"}
          src={`Site_SVG/info.svg`}
          onClick={() => history.push(`/info/${observationForModal.id.species_id}`)}
        />
      </div>
      <p><b>Common Name(s): </b>{observationForModal.id.common_name}</p>
      <p><b>Growth Type: </b>{observationForModal.id.growth_type}</p>
      <p><b>Notes:</b> {observationForModal.id.notes !== "" ? observationForModal.id.notes : 'N/A'}</p>
      <p><b>Photo:</b> {observationForModal.id.photo == "" &&  "N/A"}</p>
      { (observationForModal.id.photo !== "") &&
        <img 
          alt={`photo_obs_id${observationForModal.id.id}`}
          width={"150px"}
          height={"200px"}
          src={observationForModal.id.photo}
        />
      }
    </Card>
        </div>
      </Modal>
      {mapView && <div className="obsmap">
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : ( 
          <div>
          <GoogleMap
            onLoad={onLoad}
            mapContainerStyle={mapStyle}
          >
            { ( observationList.length > 0) && 
              observationList.map((observation, i) => {
                return <MarkerF 
                  position={{lat: parseFloat(observation.location[0]), lng: parseFloat(observation.location[1])}} 
                  key={observation.id} 
                  // onClick={() => onSelect(observation, i+1)}
                  onClick={() => modalSelect(observation)}
                  animation={observation.id==highlightObs.id ? google.maps.Animation.BOUNCE : null}
                />
              })
            } 
            {
                (selected.observation) && 
                (
                  <InfoWindowF
                  position={{lat: parseFloat(selected.observation.location[0]), lng: parseFloat(selected.observation.location[1])}}
                  clickable={true}
                  onCloseClick={() => setSelected({})}
                >
                  <p>{selected.index}</p>
                </InfoWindowF>
                )
            }
          </GoogleMap>
          </div>
        )}
      </div>}
      <div className="observation-info">
      <div className ="observation-header">
        <div className="box-item1">
          <div className='oneline'><h2>My Finds:</h2> <h3 style={{marginLeft:'15px'}}>[<i>{observationList.length}</i>]</h3></div>
          {observationList.length > 0 && 
          <div>
            { mapView && <Button onClick={() => setMapView(false)} variant="outlined" style={{backgroundColor: "#E6CFC1", color: "#484E6B"}}>List View</Button>}
            { !mapView && <Button onClick={() => setMapView(true)} variant="outlined" style={{backgroundColor: "#E6CFC1", color: "#484E6B"}}>Map View</Button> }
          </div>}
        </div>
      <div className ="observations-body">
      {observationList.length == 0 && 
            <div>
              <p>None for now!</p>
              <button onClick={()=> history.push('/addObservation')}>Add A Find</button>
            </div>
          }
        {!mapView && 
          <Box component="div" sx={{ overflow: 'auto' }} className="observation-container-list">
            { ( observationList.length > 0) && 
              observationList.map((observation, i) => {
                return <ObsItemList observation={observation} i={i} />
              })
            }
          </Box>
        }
        {mapView && 
          <List className="observation-container-map" sx={{ maxHeight: "380px", overflow:"auto", maxWidth:"550px"}}>
          { ( observationList.length > 0) && 
            observationList.map((observation, i) => {
              return <ObsItemMap  i={i} observation={observation} />
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

export default Observations;