import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
        <div className="landing-text">
          <h1>keep track of your finds</h1>
          <h1>earn foraging badges</h1>
          <button onClick={()=> history.push('/about')}>About</button>
        </div>
    </div>
  );
}

export default LandingPage;
