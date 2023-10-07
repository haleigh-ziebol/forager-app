import React, { useState } from 'react';
import {useSelector} from 'react-redux';


function Markers() {

  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Functional Component');

  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
}

export default Markers;