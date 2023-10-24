import { combineReducers } from 'redux';
  
  //reducer for wikipedia info
  const wikiSpeciesData = (state = {}, action) => {
    switch (action.type) {
      case 'SET_SPECIES_INFO':
        return {...wikiSpeciesData, database: action.payload};
      case 'SET_WIKI_TEXT_DATA':
        return {...wikiSpeciesData, text: action.payload};
      case 'SET_WIKI_IMAGE_DATA':
        return {...wikiSpeciesData, image: action.payload};
      default:
        return state;
    }
  };

  export default combineReducers({
    wikiSpeciesData,
  });