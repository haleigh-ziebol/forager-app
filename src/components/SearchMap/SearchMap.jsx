import GoogleMapReact from 'google-map-react';
import React, {useState, useEffect} from "react";
import { useDispatch } from 'react-redux';

import Marker from '../Marker/Marker';

function SearchMap() {
    let [observedLng, setObservedLng] = useState('');
    let [observedLat, setObservedLat] = useState('');

    let dispatch = useDispatch();
    
    // function to display coordinates in pop-up window on map click
    const handleClick = ({x, y, lat, lng, event}) => {
        setObservedLat(lat);
        setObservedLng(lng);
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
        <div style={{ height: '50vh', width: '50%' }}>
            <GoogleMapReact
            bootstrapURLKeys={{ key: 'KEY' }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            onClick={handleClick}
            >
              <Marker
                key='1'
                text='observation'
                lat={observedLat}
                lng={observedLng}
              />
          </GoogleMapReact>
      </div>
    )

}

export default SearchMap;