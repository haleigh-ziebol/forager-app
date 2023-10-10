import React, {useState}from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import wtf from 'wtf_wikipedia';

function SpeciesInfo() {

    const speciesData = useSelector(store => store.observation.wikiSpeciesData[0]);

    const modifyWikiData = (speciesData) => {
        console.log(speciesData)
        // const text = wtf(speciesData).text();
        // console.log(text)
    }
    // const speciesData = useSelector(store => store.wikiSpeciesData[0]);

    // const text = wtf(speciesData).text();
    // console.log(text)

    const dispatch = useDispatch();
    const textOfData = JSON.stringify(speciesData);
    console.log(textOfData)
    if (typeof textOfData == 'string') {
        const arrayData = textOfData.split('=')
        console.log(arrayData)
        const indexSplit = arrayData.findIndex((element) => element == 'Uses')-2;
        console.log(indexSplit)
        const subArray = arrayData.slice(0,indexSplit)
        console.log(subArray)
        const newText = subArray.join(" ");
        console.log(newText)
        const descriptionText = wtf(newText).text();
        console.log(descriptionText)
    }



    // on load, dispatch the saga action
    useEffect(() => {
      console.log('in useEffect');
      const action = { type: 'SEARCH_WIKI', payload:"Rhus_glabra" };
      dispatch(action);
    }, []);

    // // on load, dispatch the saga action
    // useEffect(() => {
    //     console.log('in useEffect');
    //     if (speciesData.length !== 0) {
    //         modifyWikiData(speciesData);
    //     }
    //   }, [speciesData]);

    return(
        <div>
            {}
        </div>
    )
}

export default SpeciesInfo;