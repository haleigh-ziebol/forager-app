import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function SearchRegion () {

    const regionList = useSelector((store) => store.plants.regionList);
    const [searchRegion, setSearchRegion] = useState('');
    const dispatch = useDispatch();

    //fetches regions for form selector
    useEffect(() => {
        console.log('fetching region list');
        dispatch({type:'FETCH_REGIONS'})
    }, []);

    const handleSearch = () => {

    }

    return(
        
        <div>
            <form onSubmit={handleSearch}>
                <label htmlFor="regions">Select Region:</label>
                <select
                id="regions"
                    value={searchRegion}
                    onChange={(event) => setSearchRegion(event.target.value)}
                    required
                >
                    {regionList.map((region) => {
                        return <option key={region.id} value={region.id}>{region.name}</option>;
                    })}
                </select>
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchRegion;