import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import wtf from 'wtf_wikipedia';

//MUI components
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';



function SpeciesInfoPage() {

    const dispatch = useDispatch();
    const params = useParams()

    const speciesInfo = useSelector(store => store.wikipedia.wikiSpeciesData)

    const [parsedWikiText, setParsedWikiText] = useState("")


    // on load, dispatch the saga action
    useEffect(() => {
      console.log('clear reducer');
      const action = { type: 'CLEAR_INFO'};
      dispatch(action);
    }, []);

    // on load, dispatch the saga action
    useEffect(() => {
      console.log('in useEffect');
      const action = { type: 'GET_SPECIES', payload: parseFloat(params.id) };
      dispatch(action);
    }, []);

    useEffect(() => {
        console.log('convert wikitext');
        if (speciesInfo.text !== null && !speciesInfo.text.includes("REDIRECT")) {
            const hi = speciesInfo.text.replace("#REDIRECT [[", "")
            const parsed = wtf(hi).text();
            setParsedWikiText(parsed)
        }
      }, [speciesInfo]);


    return(
       <div className="container center">
        <Card sx={{ maxWidth: 4/5, p:'2rem', bgcolor:'#FFF4F4', color:'#484E6B'}} className='background1'>
          <h1>Species Info</h1>
            <h2>Common Name: {speciesInfo.database.common_name}</h2>
            <h2>Scientific Name: <i>{speciesInfo.database.scientific_name}</i></h2>
            <h2>Growth Type: {speciesInfo.database.growth_type}</h2>
            <img src={speciesInfo.image}
            alt={speciesInfo.database.scientific_name}
            />
            <br/>
            <p>Basic Info:</p>
            <p style={{whiteSpace: "pre-wrap"}}>{parsedWikiText}</p> {/*pre-wrap deals with \n from wikitext parser */}
            <p>Source: <a href={`https://en.wikipedia.org/wiki/${speciesInfo.link}`} >Wikipedia </a> </p>
            <p> More Info: <a href={`https://plants.sc.egov.usda.gov/home/plantProfile?symbol=${speciesInfo.database.USDA_CODE}`} >USDA</a></p>
          </Card>
      </div>
    )
}

export default SpeciesInfoPage;