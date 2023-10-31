import React from 'react';
import { useHistory } from 'react-router-dom';

//MUI components
import { TableRow, TableCell } from '@mui/material';

function SearchResultItem({ species }) {
  const history = useHistory();

  return (
      <TableRow
        key={species.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {species.scientific_name}
        </TableCell>
        <TableCell align="right">{species.common_name}</TableCell>
        <TableCell align="right">{species.growth_type}</TableCell>
      </TableRow>
    
      //   <tr className={(species.user_id !== null) ? "species-found" : ""} key={1} onClick={() => history.push(`/info/${species.id}`)}>
      //           <td key={1}>{species.scientific_name}  
      //             <img 
      //               alt="info"
      //               width={"10px"}
      //               height={"10px"}
      //               src={`Site_SVG/info.svg`}
      //               onClick={() => history.push(`/info/${species.id}`)}
      //             />
      //           </td>
      //           <td key={2}>{species.common_name}</td>
      //           <td key={3}>{species.growth_type}</td>
      // </tr>
  );
}

export default SearchResultItem;
