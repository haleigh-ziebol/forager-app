import React from 'react';
import { useHistory } from 'react-router-dom';


    //wikipedia API call for text and image
      //send species to search router?
        //need scientific name, but snip after var send scientific name 
    //process text with wtf_wiki
    //display image
    

function SearchResultItem({ species }) {
  const history = useHistory();

  return (
        <tr className={(species.user_id !== null) ? "species-found" : ""} key={1} onClick={() => history.push(`/info/${species.id}`)}>
                <td key={1}>{species.scientific_name}</td>
                <td key={2}>{species.common_name}</td>
                <td key={3}>{species.growth_type}</td>
      </tr>
  );
}

export default SearchResultItem;
