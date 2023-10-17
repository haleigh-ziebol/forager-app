import React from 'react';

import NewObservationForm from '../NewObservationForm/NewObservationForm';
import SpeciesInfo from '../SpeciesInfo/SpeciesInfo';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
    <div className="container">
      <p>Info Page</p>
      <SpeciesInfo />
      <NewObservationForm />
    </div>
  );
}

export default InfoPage;
