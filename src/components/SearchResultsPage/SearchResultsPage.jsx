import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

//child components
import SearchResultItem from '../SearchResultItem/SearchResultItem';


function SearchResultsPage() {
  const speciesResults = useSelector(store => store.search.searchResults[0].data);
  const searchTerms = useSelector(store => store.search.searchResults[0].searchTerms);
  const regionList = useSelector((store) => store.plants.regionList);

  const [filterObservations, setFilterObservations] = useState(false);

  const [region, setRegion] = useState("")
  const [species, setSpecies] = useState("")
  const [growthType, setGrowthType] = useState("");
  const history = useHistory();

  const transformRegion = () => {
    if (searchTerms.region === '%') {
      setRegion("ANY")
    }
    else {
      const regionString = regionList.find(x => x.id == searchTerms.region);
      setRegion(regionString.name)
    }
  }

  const transformGrowth = () => {
    if (searchTerms.growth_type === '%') {
      setGrowthType("ANY")
    }
    else {
      const growthString = searchTerms.growth_type.replace(/%/g, "");
      setGrowthType(growthString)
    }
  }

  const transformSpecies = () => {
    if (searchTerms.species === '%') {
      setSpecies("ANY")
    }
    else {
      const speciesString = searchTerms.species.replace(/%/g, "");
      setSpecies(speciesString)
    }
  }

  const transformAll = () => {
    transformRegion();
    transformGrowth();
    transformSpecies();
  }
  
  //transforms search terms for string in display
  useEffect(() => {
    transformAll();
  }, [searchTerms]);


  return (
    <div className="container">
     <h2>Search Results:</h2>
     {species == "ANY" ? 
     <p>{speciesResults.length} results for {region} region, {species} name and {growthType} growth type.</p>
    : <p>{speciesResults.length} results for {region} region, name including "{species}" and {growthType} growth type.</p> }
     <label htmlFor="filter-observations"> Filter Out Species I've Observed </label>
     <input 
        type="checkbox"
        name="filter-observations"
        id="filter-observations"
        value="filter-observations"
        checked={filterObservations}
        onChange={() => setFilterObservations(!filterObservations)}
    />
    <br/>
    <button onClick={() => history.push('/search')}>Try a Different Search</button>
     {/* <p>{`Your search for ${species} species in the ${region} region returned ${speciesResults.length} results.`}</p> */}
    { speciesResults == "" && 
      <div>
      <p>No Results Found!</p>
      </div>
    }

    { speciesResults !== "" &&
      <div>
        <table>
          <thead>
          <tr>
            <th>Scientific Name</th>
            <th>Common Name(s)</th>
            <th>Growth Type</th>
          </tr>
          </thead>
          <tbody>
            {speciesResults?.map((species) => {
              if (filterObservations && species.user_id !== null) {
                return <div></div>
              }
              else {
                return <SearchResultItem species={species} />
              }
            })}
          </tbody>
        </table>
      </div>
    }

    </div>
  );
}

export default SearchResultsPage;
