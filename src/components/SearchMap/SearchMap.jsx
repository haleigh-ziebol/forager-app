import { useEffect, useState, useCallback } from 'react';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';

function SearchMap() {
  const dispatch = useDispatch();
  const userRegion = useSelector(store => store.userdata.userRegion);
  const coordinates = useSelector(store => store.observation.newObservationCoords)
  
  const { isLoaded } = useLoadScript({

  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
  });
  const mapStyle = {        
    height: "50vh",
    width: "75%"};

  const onMapClick = (e) => {
    dispatch({ type: 'NEW_COORDINATES', payload: {lat: e.latLng.lat(), lng: e.latLng.lng()} })
  };

  //modified from Joe Daniels (https://joedaniels123.medium.com/how-to-update-map-bounds-in-react-google-maps-api-when-a-markers-prop-changes-8bb05818cf4c)
  const [map, setMap] = useState(null);
  const onLoad = useCallback((map) => setMap(map), []);

  //sets based on whether user has set coordinates
  const setCoordCenter = () => {
    if (coordinates[0].lat !== "") {
      map.setCenter({lat: parseFloat(coordinates[0].lat), lng: parseFloat(coordinates[0].lng)})
    } 
    else if (userRegion.id !== "") {
      map.setZoom(5);
      map.setCenter({lat: parseFloat(userRegion[0].center[0]), lng: parseFloat(userRegion[0].center[1])})
    }
    else {
      map.setCenter({lat: 40.5, lng: -98.2});
      map.setZoom(5);
    }
  }

  useEffect(() => {
    if (map) {
      setCoordCenter();
    }
  }, [map, coordinates, userRegion.id]);
  //end code modified from Joe Daniels

  useEffect(() => {
    dispatch({ type: 'RESET_COORDINATES'})
  
  }, []);

      return (
        <div className="searchmap">
          {!isLoaded ? (
            <h1>Loading...</h1>
          ) : (
            <div>
            <GoogleMap
              mapContainerStyle={mapStyle}
              // center={userRegion.length >0 ? {lat: parseFloat(userRegion[0].center[0]), lng: parseFloat(userRegion[0].center[1])} : defaultProps.coords}
              // zoom={5}
              onClick={onMapClick}
              onLoad={onLoad}
            >
              { ( coordinates.length > 0) && <MarkerF position={coordinates[0]} />} 
            </GoogleMap>
            </div>
          )}
        </div>
      );

}

export default SearchMap;