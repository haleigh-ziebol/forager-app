import { combineReducers } from 'redux';

//reducer for new observation latitude
const plantList = (state = [], action) => {
    switch (action.type) {
      case 'SET_PLANTS':
        return action.payload;
      default:
        return state;
    }
  };
  

  export default combineReducers({
    plantList,
  });