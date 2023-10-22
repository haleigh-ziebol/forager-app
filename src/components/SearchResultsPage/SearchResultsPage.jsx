import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';


function SearchResultsPage() {

  const params = useParams();
  const [searchType, setSearchType] = useState('')

  const speciesResults = useSelector(store => store.search.searchResults[0]);

  //sets results page
  useEffect(() => {
    console.log('setting results type');
    setSearchType(params.type)
  }, []);



  return (
    <div className="container">
      { speciesResults == "" && <p>no results found!</p> }

      { searchType == 'growth' &&

      <table>
        <thead>
        <tr>
          <th>Common Name(s)</th>
          <th>Scientific Name</th>
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
          <th>Common Name(s)</th>
          <th>Scientific Name</th>
          <th>Growth Type</th>
        </tr>
        </thead>
        <tbody>
          {speciesResults?.map((species, i) => {
            return (<tr key={i}>
                <td>{species.common_name}</td>
                <td>{species.scientific_name}</td>
                <td>{species.growth_type}</td>
              </tr>)
          })}
        </tbody>
      </table>
      }

    </div>
  );
}

export default SearchResultsPage;
