import React from 'react';

import AddObsForm from '../AddObsForm/AddObsForm';
import SpeciesInfo from '../SpeciesInfo/SpeciesInfo';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function AddObsPage() {
  return (
    <div className="container">
      {/* <SpeciesInfo /> */}
      <AddObsForm />
    </div>
  );
}

export default AddObsPage;
