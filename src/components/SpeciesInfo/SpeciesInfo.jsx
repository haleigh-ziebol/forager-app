import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import wtf from 'wtf_wikipedia';

function SpeciesInfo() {

    const speciesData = useSelector(store => store.observation.wikiSpeciesData[0]);

    const dispatch = useDispatch();



    // on load, dispatch the saga action
    useEffect(() => {
      console.log('in useEffect');
      const action = { type: 'SEARCH_WIKI', payload:"Rhus_glabra" };
      dispatch(action);
    }, []);

    return(
        <div>
            {}
        </div>
    )
}

export default SpeciesInfo;