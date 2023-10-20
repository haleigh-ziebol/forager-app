import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function SearchGrowthType () {

    const growthTypePlants = useSelector((store) => store.search.growthTypeSearchResponse)
    
    const growthTypes = ["Tree", "Shrub", "Forb", "Vine"]
    const [searchGrowthType, setSearchGrowthType] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSearch = (event) => {
        event.preventDefault();
        dispatch({ type:'SEARCH_GROWTH_TYPE' , payload: {searchTerm: searchGrowthType} })
        history.push('/results/growth')
    }

    return(
        
        <div>
            {JSON.stringify(growthTypePlants)}
            <form onSubmit={handleSearch}>
                <label htmlFor="growth_types">Select Type:</label>
                <select
                    id="growth_type"
                    value={searchGrowthType}
                    onChange={(event) => setSearchGrowthType(event.target.value)}
                    required
                >
                    {growthTypes.map((growth, i) => {
                        return <option key={i} value={growth}>{growth}</option>;
                    })}
                </select>
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchGrowthType;