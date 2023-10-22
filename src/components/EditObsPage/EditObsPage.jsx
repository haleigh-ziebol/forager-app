import React from 'react';

import EditObsForm from '../EditObsForm/EditObsForm';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function EditObsPage() {
  return (
    <div className="container">
      <EditObsForm />
    </div>
  );
}

export default EditObsPage;
