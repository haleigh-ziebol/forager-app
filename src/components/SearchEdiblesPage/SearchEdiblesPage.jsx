import React, { useState, useEffect } from 'react';

import SearchRegion from '../SearchRegion/SearchRegion';
import SearchGrowthType from '../SearchGrowthType/SearchGrowthType';

function SearchEdiblesPage() {

  const [searchType, setSearchType] = useState({speciesType: false, regionType: false, growthType: false})
  const [searchTerms, setSearchTerms] = useState({species: "", region: "", growth_type: ""})


  const submitSearch = (event) => {
    event.preventDefault();

  }

  return (
    <div className="container">
      <h1>Search Edibles</h1>
      <form onSubmit={submitSearch}>
        <fieldset>
        <legend>Search Terms:</legend>
          <div>
            <input 
              type="checkbox"
              name="species"
              id="species"
              value="species"
              checked={searchType.speciesType}
              onChange={() => setSearchType({...searchType, speciesType: !searchType.speciesType})}
            />
            <label htmlFor="species"> Species
            </label>
            {searchType.speciesType && 
            <div>
              <input type="text" onChange={(event)=>setSearchTerms({...searchTerms, species: event.target.value})} 
              value={searchTerms.species} placeholder="search term"/>
            </div>
            }
          </div>
          
          <div>
            <input 
              type="checkbox"
              name="region"
              id="region"
              value="region"
              checked={searchType.regionType}
              onChange={() => setSearchType({...searchType, regionType: !searchType.regionType})}
            />
            <label htmlFor="region"> Region
            </label>
            {searchType.regionType && <SearchRegion />}
          </div>
          <div>
            <input 
              type="checkbox"
              name="growth_type"
              id="growth_type"
              value="growth_type"
              checked={searchType.growthType}
              onChange={() => setSearchType({...searchType, growthType: !searchType.growthType})}
            />
            <label htmlFor="growth_type"> Plant Type
            </label>
            {searchType.growthType && <SearchGrowthType />}
          </div>
        </fieldset>
        <button type="submit">Search!</button>
      </form>

    </div>
  );
}

export default SearchEdiblesPage;
