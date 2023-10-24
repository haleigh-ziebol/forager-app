import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

//child components
import SearchResultItem from '../SearchResultItem/SearchResultItem';


function SearchResultsPage() {

  const speciesResults = useSelector(store => store.search.searchResults[0].data);
  const searchTerms = useSelector(store => store.search.searchResults[0].searchTerms);
  const regionList = useSelector((store) => store.plants.regionList);

  const [transformedSearchTerms, setTransformedSearchTerms] = useState({region: "", species: "", growth_type:""})

  const transformRegion = () => {
    if (searchTerms.region === '%') {
      setTransformedSearchTerms({...transformedSearchTerms, region: "ANY"});
    }
    else {
      const region = regionList.find(x => x.id == searchTerms.region);
      setTransformedSearchTerms({...transformedSearchTerms, region: region.name});
    }
  }

  const transformGrowth = () => {
    if (searchTerms.growth_type === '%') {
      setTransformedSearchTerms({...transformedSearchTerms, growth_type: "ANY"});
    }
    else {
      const growthString = searchTerms.growth_type.replace(/%/g, "");
      setTransformedSearchTerms({...transformedSearchTerms, growth_type: growthString});
    }
  }

  const transformSpecies = () => {
    if (searchTerms.species === '%') {
      setTransformedSearchTerms({...transformedSearchTerms, species: "ANY"});
    }
    else {
      const speciesString = searchTerms.species.replace(/%/g, "");
      setTransformedSearchTerms({...transformedSearchTerms, species: speciesString});
    }
  }

  const transformAll = () => {
    transformRegion();
    transformGrowth();
    transformSpecies();
  }
  
  //transforms search terms for string in display
  useEffect(() => {
    transformSpecies();
  }, [speciesResults]);

  useEffect(() => {
    transformRegion();
  }, [speciesResults]);

  useEffect(() => {
    transformGrowth();
  }, [speciesResults]);


  return (
    <div className="container">
     <h2>Search Results:</h2>
     {JSON.stringify(transformedSearchTerms)}
    { speciesResults == "" && 
      <div>
      <p>No Results Found!</p>
      <button>Try a Different Search</button>
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
              return <SearchResultItem species={species} />
            })}
          </tbody>
        </table>
      </div>
    }

    </div>
  );
}

export default SearchResultsPage;
