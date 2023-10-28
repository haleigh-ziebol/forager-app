import { combineReducers } from 'redux';
  
//reducer for wikipedia info
const wikiSpeciesData = (state = {database: "", text: "", image: "", link: "", redirect: ""}, action) => {
  switch (action.type) {
    case 'SET_SPECIES_INFO':
      return {...state, database: action.payload};
    case 'SET_LINK_TEXT':
      return {...state, link: action.payload};
    case 'SET_WIKI_TEXT_DATA':
      return {...state, text: action.payload};
    case 'SET_WIKI_IMAGE_DATA':
      return {...state, image: action.payload};
    case 'CLEAR_INFO':
      return {database: "", text: "", image: "", link: "", redirect: ""};
    default:
      return state;
  }
};

export default combineReducers({
  wikiSpeciesData,
});