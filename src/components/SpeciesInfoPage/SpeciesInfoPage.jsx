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
        <Card sx={{ p:'2rem', bgcolor:'#FFF4F4', color:'#484E6B', display:"block"}} className='background1'>
          <h3>Species Info</h3> <hr/>
            <div className="oneline2"><h4>Common Name:</h4><h3 style={{marginLeft:"20px"}}>{speciesInfo.database.common_name}</h3></div>
            <div className='oneline2'><h4>Scientific Name:</h4> <h3 style={{marginLeft:"20px"}}><i>{speciesInfo.database.scientific_name}</i></h3></div>
            <div className="oneline2"><h4>Growth Type:</h4><h3 style={{marginLeft:"20px"}}>{speciesInfo.database.growth_type}</h3></div>
            <img src={speciesInfo.image}
            alt={speciesInfo.database.scientific_name}
            />
            <br/>
            <p><b>Basic Info:</b></p>
            <p style={{whiteSpace: "pre-wrap", lineHeight:"150%"}}>{parsedWikiText}</p> {/*pre-wrap deals with \n from wikitext parser */}
            <div className='box-item4'>
              <p><b>Source: </b><a href={`https://en.wikipedia.org/wiki/${speciesInfo.link}`} >Wikipedia </a> </p>
              <p><b>More Info: </b><a href={`https://plants.sc.egov.usda.gov/home/plantProfile?symbol=${speciesInfo.database.USDA_CODE}`} >USDA</a></p>
            </div>
          </Card>
      </div>
    )
}

export default SpeciesInfoPage;