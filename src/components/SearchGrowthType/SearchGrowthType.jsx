import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function SearchGrowthType () {
    const growthTypes = ["Tree", "Shrub", "Forb", "Vine"]
    const [searchGrowthType, setSearchGrowthType] = useState('');

    const handleSearch = () => {

    }

    return(
        
        <div>
            <form onSubmit={handleSearch}>
                <label htmlFor="growth_types">Select Region:</label>
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