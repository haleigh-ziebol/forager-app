import React, { useState, useEffect }from 'react';
import { useDispatch, useSelector } from 'react-redux';

function SearchSpecies () {

    const speciesList = useSelector(store => store.plants.plantList);
    const [searchSpecies, setSearchSpecies] = useState('');

    
    const dispatch = useDispatch();

     //fetches species for form selector
    useEffect(() => {
        console.log('fetching species list');
        // dispatch an action to load plants from DB
        dispatch({type:'FETCH_PLANTS'})
    }, []);

    const handleSearch = () => {
        dispatch({ type:'SEARCH_SPECIES' , payload: {searchTerm: searchSpecies} })
    }

    return(
        <div>
            <p>Species</p>
            {JSON.stringify(speciesList)}
        </div>
    )
}

export default SearchSpecies;