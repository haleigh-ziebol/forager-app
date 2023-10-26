import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

//child components
import SearchResultItem from '../SearchResultItem/SearchResultItem';


function SearchResultsPage() {
  const speciesResults = useSelector(store => store.search.searchResults[0].data);
  const searchTerms = useSelector(store => store.search.searchResults[0].searchTerms);
  const regionList = useSelector((store) => store.plants.regionList);

  const [transformedSearchTerms, setTransformedSearchTerms] = useState({region: "", species: "", growth_type:""})
  const [filterObservations, setFilterObservations] = useState(false);

  const [region, setRegion] = useState("")
  const [species, setSpecies] = useState("")
  const history = useHistory();

  // const transformRegion = () => {
  //   if (searchTerms.region === '%') {
  //     setTransformedSearchTerms({...state, region: "ANY"});
  //     setRegion("ANY")
  //   }
  //   else {
  //     const regionString = regionList.find(x => x.id == searchTerms.region);
  //     setTransformedSearchTerms({...state, region: region.name});
  //     setRegion(regionString)
  //   }
  // }

  // const transformGrowth = () => {
  //   if (searchTerms.growth_type === '%') {
  //     setTransformedSearchTerms({...state, growth_type: "ANY"});
  //   }
  //   else {
  //     const growthString = searchTerms.growth_type.replace(/%/g, "");
  //     setTransformedSearchTerms({...state, growth_type: growthString});
  //   }
  // }

  // const transformSpecies = () => {
  //   if (searchTerms.species === '%') {
  //     setTransformedSearchTerms({...state, species: "ANY"});
  //     setSpecies("ANY")
  //   }
  //   else {
  //     const speciesString = searchTerms.species.replace(/%/g, "");
  //     setTransformedSearchTerms({...state, species: speciesString});
  //     setSpecies(speciesString)
  //   }
  // }

  // const transformAll = () => {
  //   transformRegion();
  //   transformGrowth();
  //   transformSpecies();
  // }
  
  // // //transforms search terms for string in display
  // // useEffect(() => {
  // //   transformSpecies();
  // // }, [speciesResults]);

  // useEffect(() => {
  //   transformRegion();
  // }, [speciesResults]);

  // useEffect(() => {
  //   transformGrowth();
  // }, [speciesResults]);


  return (
    <div className="container">
     <h2>Search Results:</h2>
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
