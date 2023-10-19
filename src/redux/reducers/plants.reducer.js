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

//reducer for midwest plants
const midwestList = (state = [], action) => {
  switch (action.type) {
    case 'SET_MIDWEST':
      return action.payload;
    default:
      return state;
  }
};

//reducer for northeast plants
const northeastList = (state = [], action) => {
  switch (action.type) {
    case 'SET_NORTHEAST':
      return action.payload;
    default:
      return state;
  }
};
  
//reducer for southeast plants
const southeastList = (state = [], action) => {
  switch (action.type) {
    case 'SET_SOUTHEAST':
      return action.payload;
    default:
      return state;
  }
};

//reducer for southwest plants
const southwestList = (state = [], action) => {
  switch (action.type) {
    case 'SET_SOUTHWEST':
      return action.payload;
    default:
      return state;
  }
};

//reducer for west plants
const westList = (state = [], action) => {
  switch (action.type) {
    case 'SET_WEST':
      return action.payload;
    default:
      return state;
  }
};

  export default combineReducers({
    plantList,
    regionList,
    midwestList,
    northeastList,
    southeastList,
    southwestList,
    westList
  });