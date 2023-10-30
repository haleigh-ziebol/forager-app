import { useEffect, useState } from 'react';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';

function SearchMap() {
  const dispatch = useDispatch();
  const userRegion = useSelector(store => store.userdata.userRegion);

  const coordinates = useSelector(store => store.observation.newObservationCoords)
  
  const { isLoaded } = useLoadScript({

  googleMapsApiKey: process.env.GOOGLE_MAPS_KEY,
  });
  const mapStyle = {        
    height: "50vh",
    width: "75%"};

  const onMapClick = (e) => {
    dispatch({ type: 'NEW_COORDINATES', payload: {lat: e.latLng.lat(), lng: e.latLng.lng()} })
  };

  const defaultProps = {
    coords: {
      lat: 40.5,
       lng: -98.2
    },
  };

      return (
        <div className="map">
          {!isLoaded ? (
            <h1>Loading...</h1>
          ) : (
            <div>
            <GoogleMap
              mapContainerStyle={mapStyle}
              center={userRegion.length >0 ? {lat: parseFloat(userRegion[0].center[0]), lng: parseFloat(userRegion[0].center[1])} : defaultProps.coords}
              zoom={5}
              onClick={onMapClick}
            >
              { ( coordinates.length > 0) && <MarkerF position={coordinates[0]} />} 
            </GoogleMap>
            </div>
          )}
        </div>
      );

}

export default SearchMap;