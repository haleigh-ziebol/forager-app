import { combineReducers } from 'redux';

//reducer for new observation coordinates
const speciesSearchResponse = (state = [], action) => {
    switch (action.type) {
      case 'SET_SPECIES_RESPONSE':
        return [action.payload];
      default:
        return state;
    }
  };
  
  
  //reducer for users observations
  const regionSearchResponse = (state = [], action) => {
    switch (action.type) {
      case 'SET_REGION_RESPONSE':
        return action.payload;
      default:
        return state;
    }
  };

    //reducer for users observations
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