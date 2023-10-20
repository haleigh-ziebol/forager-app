import { combineReducers } from 'redux';

//reducer for species search results
const speciesSearchResponse = (state = [], action) => {
    switch (action.type) {
      case 'SET_SPECIES_RESPONSE':
        return [action.payload];
      default:
        return state;
    }
  };
  
  
  //reducer region search results
  const regionSearchResponse = (state = [], action) => {
    switch (action.type) {
      case 'SET_REGION_RESPONSE':
        return action.payload;
      default:
        return state;
    }
  };

    //reducer for growth type search results
    const growthTypeSearchResponse = (state = [], action) => {
      switch (action.type) {
        case 'SET_GROWTH_TYPE_RESPONSE':
          return action.payload;
        default:
          return state;
      }
    };

  export default combineReducers({
    speciesSearchResponse,
    regionSearchResponse,
    growthTypeSearchResponse
  });