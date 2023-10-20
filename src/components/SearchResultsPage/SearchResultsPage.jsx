import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';


function SearchResultsPage() {

  const params = useParams();
  const [searchType, setSearchType] = useState('')

  const speciesResults = useSelector(store => store.search.speciesSearchResponse);
  const regionResults = useSelector(store => store.search.regionSearchResponse);
  const growthTypeResults = useSelector(store => store.search.growthTypeSearchResponse);


  //sets results page
  useEffect(() => {
    console.log('setting results type');
    setSearchType(params.type)
  }, []);



  return (
    <div className="container">
      { searchType == 'growth' &&

<table>
<tr>
  <th>Common Name(s)</th>
  <th>Scientific Name</th>
</tr>
{growthTypeResults.map((species, i) => {
          return (<tr key={i}>
          <td>{species.common_name}</td>
          <td>{species.scientific_name}</td>
        </tr>)
      })}
</table>

      }


    </div>
  );
}

export default SearchResultsPage;
