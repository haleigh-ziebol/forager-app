import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, MarkerF, useLoadScript, InfoWindowF } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';

//set center to user Region if observation List is empty


function ObservationMap() {

  const [ selected, setSelected ] = useState({});
  const observationList = useSelector(store => store.observation.userObservationList);

  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => setMap(map), []);
  
  
  // useEffect code modifies bounds when map and observationList changed
  //from Joe Daniels (https://joedaniels123.medium.com/how-to-update-map-bounds-in-react-google-maps-api-when-a-markers-prop-changes-8bb05818cf4c)
  useEffect(() => {
    if (map) {
      const bounds = new window.google.maps.LatLngBounds();
      observationList.map(observation => {
        bounds.extend({
          lat: parseFloat(observation.location[0]),
          lng: parseFloat(observation.location[1]),
        });
      });
      map.fitBounds(bounds);
    }
  }, [map, observationList]);

  const { isLoaded } = useLoadScript({

  googleMapsApiKey: 'KEY',
  });
  const mapStyle = {        
    height: "50vh",
    width: "100%"};

    const onSelect = (observation) => {
      setSelected(observation);
    }


    const OPTIONS = {
      //minZoom: 10,
    }

    //eventually set to center of region/state
    const defaultProps = {
        center: {
          lat: 40.430076,
          lng: -100.960810
        }
      };

      return (
        <div className="map">
          {!isLoaded ? (
            <h1>Loading...</h1>
          ) : (
            <div>
            <GoogleMap
              onLoad={onLoad}
              mapContainerStyle={mapStyle}
              // center ={}
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