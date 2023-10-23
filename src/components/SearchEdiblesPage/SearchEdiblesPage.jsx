import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SearchGrowthType from '../SearchGrowthType/SearchGrowthType';

function SearchEdiblesPage() {

  const [searchType, setSearchType] = useState({speciesType: false, regionType: false, growthType: false})
  const [searchTerms, setSearchTerms] = useState({species: "", region: "", growth_type: ""})

  const regionList = useSelector((store) => store.plants.regionList);

  const dispatch = useDispatch();

  //fetches regions for form selector
  useEffect(() => {
      console.log('fetching region list');
      dispatch({type:'FETCH_REGIONS'})
  }, []);

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
            {searchType.regionType && 
            <select
            id="regions"
                value={searchTerms.region}
                onChange={(event)=>setSearchTerms({...searchTerms, species: event.target.value})} required
            >
                {regionList.map((region) => {
                    return <option key={region.id} value={region.id}>{region.name}</option>;
                })}
            </select>}
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
