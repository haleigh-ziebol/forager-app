import React, { useState } from 'react';
import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';

function ObservationMap() {

  const [ selected, setSelected ] = useState({});
  const observationList = useSelector(store => store.observation.userObservationList)


  const { isLoaded } = useLoadScript({

  googleMapsApiKey: 'API',
  });
  const mapStyle = {        
    height: "50vh",
    width: "100%"};

    const onSelect = (observation) => {
      setSelected(observation);
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
            <div>
            <GoogleMap
              mapContainerStyle={mapStyle}
              center={defaultProps.center}
              zoom={10}
            >
              { ( observationList.length > 0) && 
                observationList.map((observation) => {
                  return <Marker 
                    position={{lat: parseFloat(observation.location[0]), lng: parseFloat(observation.location[1])}} 
                    key={observation.id} 
                    onClick={() => onSelect(observation)}
                  />;
                })
              } 

              {
                  selected.location && 
                  (
                    <InfoWindow
                    position={{lat: parseFloat(selected.location[0]), lng: parseFloat(selected.location[1])}}
                    clickable={true}
                    onCloseClick={() => setSelected({})}
                  >
                    <p>{selected.id}</p>
                  </InfoWindow>
                  )
              }
            </GoogleMap>
            </div>
          )}
        </div>
      );

}

export default ObservationMap;