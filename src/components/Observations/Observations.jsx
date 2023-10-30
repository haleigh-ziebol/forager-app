import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, MarkerF, useLoadScript, InfoWindowF } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

//child components
import ObsItemList from '../ObsItemList/ObsItemList';
import ObsItemMap from '../ObsItemMap/ObsItemMap';


//MUI components
import List from '@mui/material/List';

function Observations() {

  const [ selected, setSelected ] = useState({});
  const [mapView, setMapView] = useState(true)

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

  googleMapsApiKey: process.env.GOOGLE_MAPS_KEY,
  });
  const mapStyle = {        
    height: "50vh",
    width: "50wh",
  };

  const onSelect = (observation, index) => {
    setSelected({observation: observation, index: index});
  }

  return (
    <div className="observation-container">
      {mapView && <div className="map">
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
                  onClick={() => onSelect(observation, i+1)}
                />;
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
            {
                (highlightObs.id !== 0) && 
                (
                  <InfoWindowF
                  position={{lat: parseFloat(highlightObs.location[0]), lng: parseFloat(highlightObs.location[1])}}
                  clickable={true}
                  onCloseClick={() => dispatch({type: 'RESET_HIGHLIGHT'})}
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
      <div className ="observations-header">
        <div>
          <h1>My Finds:</h1>
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

export default Observations;