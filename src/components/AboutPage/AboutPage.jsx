import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p>
          Foragers have special spots they visit every year and are always looking for new wild edibles! 
          On this app users input the location and species along with photos and notes for their foraging spot. 
          This data is stored on a map where they can view, edit and delete finds. 
          When they input a new species, it counts toward regional foraging badges that a user can earn.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
