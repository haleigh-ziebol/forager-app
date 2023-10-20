import React, { useState, useEffect } from 'react';

import SearchSpecies from '../SearchSpecies/SearchSpecies';
import SearchRegion from '../SearchRegion/SearchRegion';
import SearchGrowthType from '../SearchGrowthType/SearchGrowthType';

function SearchEdiblesPage() {

  const [searchType, setSearchType] = useState('')

  const handleChange = (event) => {
    setSearchType(event.target.value);
  }

  return (
    <div className="container">
      <p>Search By</p>
      <fieldset>
        <div>
          <input 
            type="radio"
            name="species"
            id="species"
            value="species"
            checked={searchType === 'species'}
            onChange={handleChange}
          />
          <label htmlFor="species"> Species
          </label>
          {searchType=="species" && <SearchSpecies />}
        </div>
        <div>
          <input 
            type="radio"
            name="region"
            id="region"
            value="region"
            checked={searchType === 'region'}
            onChange={handleChange}
          />
          <label htmlFor="region"> Region
          </label>
          {searchType == "region" && <SearchRegion />}
        </div>
        <div>
          <input 
            type="radio"
            name="growth_type"
            id="growth_type"
            value="growth_type"
            checked={searchType === 'growth_type'}
            onChange={handleChange}
          />
          <label htmlFor="growth_type"> Plant Type
          </label>
          {searchType=="growth_type" && <SearchGrowthType />}
        </div>
      </fieldset>
    </div>
  );
}

export default SearchEdiblesPage;
