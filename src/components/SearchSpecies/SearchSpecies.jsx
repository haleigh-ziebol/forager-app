import React, { useState, useEffect }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


function SearchSpecies () {

    const [searchSpecies, setSearchSpecies] = useState('');


    // const handleSearch = (event) => {
    //     event.preventDefault();
    //     dispatch({ type:'SEARCH_SPECIES' , payload: {searchTerm: '?region=1&name=Ace&type=Tree'} });
    //     history.push('/results/species');

    // }

    return(
        <div>
                <input type="text" onChange={(event)=>setSearchSpecies(event.target.value)} 
                value={searchSpecies} placeholder="search term"/>
        </div>
    )
}

export default SearchSpecies;