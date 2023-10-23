import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, MarkerF, useLoadScript, InfoWindowF } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';

function ObservationMap() {

  const [ selected, setSelected ] = useState({});
  const observationList = useSelector(store => store.observation.userObservationList);
  const userRegion = useSelector(store => store.userdata.userRegion)

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

  googleMapsApiKey: 'KEY',
  });
  const mapStyle = {        
    height: "50vh",
    width: "50wh",
  };

  const onSelect = (observation) => {
    setSelected(observation);
  }


  const OPTIONS = {
    //minZoom: 3,
  }

      return (
        <div className="map">
          {!isLoaded ? (
            <h1>Loading...</h1>
          ) : (
            <div>
            <GoogleMap
              onLoad={onLoad}
              mapContainerStyle={mapStyle}
             options={OPTIONS}
            >
              { ( observationList.length > 0) && 
                observationList.map((observation) => {
                  return <MarkerF 
                    position={{lat: parseFloat(observation.location[0]), lng: parseFloat(observation.location[1])}} 
                    key={observation.id} 
                    onClick={() => onSelect(observation)}
                  />;
                })
              } 

              {
                  selected.location && 
                  (
                    <InfoWindowF
                    position={{lat: parseFloat(selected.location[0]), lng: parseFloat(selected.location[1])}}
                    clickable={true}
                    onCloseClick={() => setSelected({})}
                  >
                    <p>{selected.id}</p>
                  </InfoWindowF>
                  )
              }
            </GoogleMap>
            </div>
          )}
        </div>
      );

}

export default ObservationMap;