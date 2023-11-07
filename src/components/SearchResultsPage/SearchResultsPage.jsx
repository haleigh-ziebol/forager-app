import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

//child components
import SearchResultItem from '../SearchResultItem/SearchResultItem';

//MUI components
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';


function SearchResultsPage() {
  const speciesResults = useSelector(store => store.search.searchResults[0].data);
  const searchTerms = useSelector(store => store.search.searchResults[0].searchTerms);
  const regionList = useSelector((store) => store.plants.regionList);
  const user = useSelector((store) => store.user);

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
      const searchRegion = regionList.find(x => x.id == searchTerms.region);
      setRegion(searchRegion.name)
      console.log(searchRegion)
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
  
  //transforms search terms for string in display
  useEffect(() => {
    if (searchTerms.region) { //protects against race condition
    console.log(searchTerms);
    transformRegion();
    transformGrowth();
    transformSpecies();
    }
  }, [searchTerms]);


  return (
    <div className="container">
      <div className='box-item5'>
        <h2>Search Results:</h2>
        <Button onClick={() => history.push('/search')}variant="outlined" style={{backgroundColor: "#E6CFC1", color: "#484E6B", margin: "0 50px 0"}}>Try a Different Search</Button>
     </div>
     <div className='box-item5'>
      {species == "ANY" ? 
        <p>{speciesResults.length} results for species from {region} region, with {species} name and {growthType} growth type.</p>
        : <p>{speciesResults.length} results for species from {region} region, with a name including "{species}" and {growthType} growth type.</p> 
      }
      <div className='oneline' style={{marginRight:"50px"}}>
        <input 
          type="checkbox"
          name="filter-observations"
          id="filter-observations"
          value="filter-observations"
          checked={filterObservations}
          onChange={() => setFilterObservations(!filterObservations)}
        />
        <p htmlFor="filter-observations"> Filter Out Species I've Observed </p>
      </div>
    </div>
    { speciesResults == "" && 
      <div>
      <p>No Results Found!</p>
      </div>
    }

    { speciesResults !== "" &&
      <div>

<TableContainer>
      <Table sx={{ maxWidth: 1400, m:'0px 0px 0px 20px'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Scientific Name </TableCell>
            <TableCell align="right">Common Name(s)</TableCell>
            <TableCell align="right">Growth Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

        {speciesResults?.map((species) => {
              if (filterObservations && species.user_id == user.id) {
                return <div></div>
              }
              else {
                return <SearchResultItem species={species} />
              }
            })}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
    }

    </div>
  );
}

export default SearchResultsPage;
