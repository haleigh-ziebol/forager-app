import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';

function SearchMap() {
  const dispatch = useDispatch();

  const coordinates = useSelector(store => store.observation.newObservationCoords)

  const { isLoaded } = useLoadScript({

  googleMapsApiKey: 'APIKEY',
  });
  const mapStyle = {        
    height: "50vh",
    width: "100%"};

  const onMapClick = (e) => {
    dispatch({ type: 'NEW_COORDINATES', payload: {lat: e.latLng.lat(), lng: e.latLng.lng()} })
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
              { ( coordinates.length > 0) && <Marker position={coordinates[0]} />} 
            </GoogleMap>
          )}
        </div>
      );

}

export default SearchMap;