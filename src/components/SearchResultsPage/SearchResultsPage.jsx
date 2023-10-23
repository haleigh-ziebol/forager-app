import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

//child components
import SearchResultItem from '../SearchResultItem/SearchResultItem';


function SearchResultsPage() {

  const speciesResults = useSelector(store => store.search.searchResults[0].data[0]);
  const searchTerms = useSelector(store => store.search.searchResults[0].searchTerms);



  return (
    <div className="container">
      { speciesResults == "" && <p>no results found!</p> }

      { searchType == 'growth' &&

      <table>
        <thead>
        <tr>
          <th>Scientific Name</th>
          <th>Common Name(s)</th>
        </tr>
        </thead>
        <tbody>
          {speciesResults?.map((species, i) => {
            return (<tr key={i}>
                <td>{species.common_name}</td>
                <td>{species.scientific_name}</td>
              </tr>)
          })}
        </tbody>
      </table>
      }

      { (searchType == 'species'|| searchType=='region') &&
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
      }

    </div>
  );
}

export default SearchResultsPage;
