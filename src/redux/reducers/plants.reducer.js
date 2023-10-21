import { combineReducers } from 'redux';

//reducer for list of common names
const commonNamesList = (state = [], action) => {
    switch (action.type) {
      case 'SET_COMMON':
        return action.payload;
      default:
        return state;
    }
};

//reducer for list of scientific names
const scientificNamesList = (state = [], action) => {
  switch (action.type) {
    case 'SET_SCIENTIFIC':
      return action.payload;
    default:
      return state;
  }
};

//reducer for list of regions
const regionList = (state = [], action) => {
  switch (action.type) {
    case 'SET_REGIONS':
      return action.payload;
    default:
      return state;
  }
};


  export default combineReducers({
    scientificNamesList,
    commonNamesList,
    regionList,
  });