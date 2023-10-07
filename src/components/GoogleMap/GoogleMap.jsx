import GoogleMapReact from 'google-map-react';
import React, {useState, useEffect} from "react";
import axios from 'axios';

import Markers from '../Markers/Markers';

function Map() {
    let[markerData, setMarkerData] = useState([]);
    const AnyReactComponent = ({ text }) => <div>{text}</div>;

    //fetch marker data
    const fetchData = () => {
    axios.get('http://localhost:3000/mapping/')
    .then((response) =>{
      console.log(response.data);
      setMarkerData(response.data);
    })
    .catch((error) => {
      console.log(error)
    })
     }

    //runs fetchData
    useEffect(() => {
        fetchData(); //run when page loads
      }, [])

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
                bootstrapURLKeys={{ key: "HIDDEN" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}>
                </GoogleMapReact>
                <div>
                lat={40.955413}
                lng={-99.337844}
                text="My Marker"
                </div>
        </div>
    )

}

export default Map;