import React from 'react';

import AddObsForm from '../AddFindForm/AddFindForm';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function AddFindPage() {
  return (
    <div className="container">
      <AddObsForm />
    </div>
  );
}

export default AddFindPage;
