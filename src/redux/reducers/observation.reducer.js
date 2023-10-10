import { combineReducers } from 'redux';

//reducer for new observation latitude
const newObservationLat = (state = null, action) => {
    switch (action.type) {
      case 'NEW_LATITUDE':
        return action.payload;
      default:
        return state;
    }
  };
  
  //reducer for new observation longitude
  const newObservationLng = (state = null, action) => {
    switch (action.type) {
      case 'NEW_LONGITUDE':
        return action.payload;
      default:
        return state;
    }
  };
  
  //reducer for users observations
  const userObservationsList = (state = [], action) => {
    switch (action.type) {
      case 'ADD_OBSERVATION':
        return [ ...state, action.payload ];
      case 'SET_USER_OBSERVATIONS':
        return action.payload;
      default:
        return state;
    }
  };
  
  //reducer for wikipedia info
  const wikiSpeciesData = (state = [], action) => {
    switch (action.type) {
      case 'SET_WIKI_DATA':
        return [action.payload];
      default:
        return state;
    }
  };

  export default combineReducers({
    newObservationLat,
    newObservationLng,
    userObservationsList,
    wikiSpeciesData
  });