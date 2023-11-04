import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

//MUI components
import { Button } from '@mui/material';

function LandingPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="home">
        <img 
          alt={"foraging basket"}
          width={"689px"}
          height={"589px"}
          src={`Site_SVG/home.svg`}
        />
        <div style={{margin:"50px"}}>
          <h1>keep track of your finds</h1>
          <h1>earn foraging badges</h1>
          <Button onClick={()=> history.push('/about')}variant="outlined" style={{backgroundColor: "#E6CFC1", color: "#484E6B"}}>About</Button>
        </div>
    </div>
  );
}

export default LandingPage;
