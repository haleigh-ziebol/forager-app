import React, { useState, useEffect } from 'react';
import { GoogleMap, MarkerF, useLoadScript, InfoWindowF } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';


function ObservationMap() {

  const [ selected, setSelected ] = useState({});
  const [newCoordList, setNewCoordList] = useState([]);
  const observationList = useSelector(store => store.observation.userObservationList);

  //sets results page
  useEffect(() => {
    let newArray = []
    for (let i=0; i<observationList.length; i++) {
      let coordObject = {lat: parseFloat(observationList[0].location[0]), lng: parseFloat(observationList[0].location[1])}
      newArray.push( coordObject)
    }
    setNewCoordList(newArray);
    console.log(newCoordList)
  }, []);


  const { isLoaded } = useLoadScript({

  googleMapsApiKey: 'KEY',
  });
  const mapStyle = {        
    height: "50vh",
    width: "100%"};

    const onSelect = (observation) => {
      setSelected(observation);
    }

    const onLoad = (map) => {
      const bounds = new google.maps.LatLngBounds();
      newCoordList.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
      map.fitBounds(bounds);
    };

    const OPTIONS = {
      // minZoom: 7,
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
              // center={defaultProps.center}
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