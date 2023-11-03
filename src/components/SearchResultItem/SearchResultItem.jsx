import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

//MUI components
import { TableRow, TableCell } from '@mui/material';

function SearchResultItem({ species }) {
  const history = useHistory();
  const user = useSelector((store) => store.user);

  return (
      <TableRow
        key={species.id}
        className={(species.user_id == user.id) ? "species-found" : ""}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          <i>{species.scientific_name}</i>
          <img 
            alt="info"
            width={"20px"}
            height={"20px"}
            src={`Site_SVG/info.svg`}
            onClick={() => history.push(`/info/${species.id}`)}
          />
        </TableCell>
        <TableCell align="right">{species.common_name}</TableCell>
        <TableCell align="right">{species.growth_type}</TableCell>
      </TableRow>
  );
}

export default SearchResultItem;
