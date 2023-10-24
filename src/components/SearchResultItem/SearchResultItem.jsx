import React from 'react';


function SearchResultItem({ species }) {

  return (
        <tr className={(species.user_id !== null) ? "species-found" : ""} key={1}>
                <td key={1}>{species.scientific_name}</td>
                <td key={2}>{species.common_name}</td>
                <td key={3}>{species.growth_type}</td>
      </tr>
  );
}

export default SearchResultItem;
