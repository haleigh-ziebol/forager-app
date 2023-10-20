import { combineReducers } from 'redux';

//reducer for user region
const userRegion = (state = [], action) => {
  switch (action.type) {
    case 'SET_USER_REGION':
      return action.payload;
    default:
      return state;
  }
};


  export default combineReducers({
    userRegion,

  });