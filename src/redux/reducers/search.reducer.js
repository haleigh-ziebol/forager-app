import { combineReducers } from 'redux';

//reducer for species search results
const searchResults = (state = [], action) => {
    switch (action.type) {
      case 'SET_SPECIES_RESPONSE':
        return [action.payload];
      default:
        return state;
    }
  };
  

  export default combineReducers({
    searchResults,
  });