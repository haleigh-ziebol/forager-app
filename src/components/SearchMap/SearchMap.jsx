import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import React, {useState, useEffect} from "react";
import { useDispatch } from 'react-redux';

function SearchMap({marker, setMarker}) {

  const { isLoaded } = useLoadScript({

  googleMapsApiKey: 'API KEY',
  });
  const mapStyle = {        
    height: "50vh",
    width: "100%"};

  const onMapClick = (e) => {
      setMarker([
        {
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        }
      ]);
    };


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
              onClick={onMapClick}
            >
              { ( marker.length !== 0) && <Marker position={marker[0]} />} 
            </GoogleMap>
          )}
        </div>
      );

}

export default SearchMap;