import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import React, {useState, useEffect} from "react";
import { useDispatch } from 'react-redux';

function SearchMap() {

  const { isLoaded } = useLoadScript({

  googleMapsApiKey: 'KEY',
  });
  const mapStyle = {        
    height: "50vh",
    width: "100%"};

    let [observedLng, setObservedLng] = useState('');
    let [observedLat, setObservedLat] = useState('');

    let dispatch = useDispatch();
    
    // function to display coordinates in pop-up window on map click
    const handleClick = ({x, y, lat, lng, event}) => {
        setObservedLat(lat);
        setObservedLng(lng);
        console.log(lat, lng)
        const action = { type: 'ADD_OBSERVATION_COORDS', payload: [lat, lng]};
        dispatch(action);
    }

    //eventually set to center of region/state
    const defaultProps = {
        center: {
          lat: 40.430076,
          lng: -100.960810
        },
        zoom: 4
      };

      return (
        <div className="map">
          {!isLoaded ? (
            <h1>Loading...</h1>
          ) : (
            <GoogleMap
              mapContainerStyle={mapStyle}
              center={defaultProps.center}
              zoom={10}
              onClick={handleClick}
            >
              { ( observedLat !== '') && <Marker position={{ lat: observedLat, lng: observedLng }} />}
            </GoogleMap>
          )}
        </div>
      );

}

export default SearchMap;