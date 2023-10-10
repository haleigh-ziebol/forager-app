import GoogleMapReact from 'google-map-react';
import React, {useState, useEffect} from "react";
import styled from 'styled-components';

import Marker from '../Marker/Marker';
const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

function GoogleMap() {
    // const [places, setPlaces] = useState([]);

    // const fetchData = async () => {
    //   fetch('http://localhost:3000/mapping/')
    //     .then((response) => {
    //       console.log(response.data)
    //     })
    // };
  
    // useEffect(() => {
    //   fetchData(); // run when page loads
    // }, []);
  
    // if (!places || places.length === 0) {
    //   return null;
    // }


    const defaultProps = {
        center: {
          lat: 40.430076,
          lng: -100.960810
        },
        zoom: 4
      };

    return (
      <Wrapper>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyBJQIPTWAiYWst0JmOL7Qadmfb6zUIYRyk' }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}>
          {/* {observations.map((obs) => ( */}
            {/* <Marker
              key='0'
              text='observation'
              lat='44.9778'
              lng='93.001'
            /> */}
          {/* ))} */}
          </GoogleMapReact>
      </Wrapper>
    )

}

export default GoogleMap;