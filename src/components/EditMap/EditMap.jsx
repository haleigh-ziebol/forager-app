import { useEffect, useState, useCallback } from 'react';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';

function EditMap() {
  const dispatch = useDispatch();
  const userRegion = useSelector(store => store.userdata.userRegion);
  const coordinates = useSelector(store => store.observation.newObservationCoords)
  const observationToEdit = useSelector(store => store.observation.observationToEdit);

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

  //sets center based on whether user has set coordinates different from observservation to edit
  const setCoordCenter = () => {
    if (coordinates[0].lat !== "" && coordinates[0].lat !== parseFloat(observationToEdit.location[0])) {
      map.setCenter({lat: parseFloat(coordinates[0].lat), lng: parseFloat(coordinates[0].lng)})
      console.log('helloo set center to coords')
    } 
    else {
      map.setCenter({lat: parseFloat(observationToEdit.location[0]), lng: parseFloat(observationToEdit.location[1])});
      map.setZoom(9);
    }
  }

  //sets center of map on changes from vars
  useEffect(() => {
    if (map) {
      setCoordCenter();
    }
  }, [map, coordinates, observationToEdit]);
  //end code modified from Joe Daniels


  //sets coordinates of observationToEdit in map onLoad
  useEffect(() => {
    dispatch({ type: 'NEW_COORDINATES', payload: {lat: parseFloat(observationToEdit.location[0]), lng: parseFloat(observationToEdit.location[1])} })
    console.log("set obsevation coords")
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

export default EditMap;