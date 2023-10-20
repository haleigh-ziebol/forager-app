import { combineReducers } from 'redux';

//reducer for list of plants
const plantList = (state = [], action) => {
    switch (action.type) {
      case 'SET_PLANTS':
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

//reducer for regional plants
const regionalPlantsList = (state = [], action) => {
  switch (action.type) {
    case 'SET_MIDWEST':
      return action.payload;
    default:
      return state;
  }
};


  export default combineReducers({
    plantList,
    regionList,
    regionalPlantsList,
  });