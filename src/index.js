import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { takeEvery, put, all } from 'redux-saga/effects';
import axios from 'axios';

import App from './components/App/App';


//reducer for new observation latitude
const newObservationLat = (state = null, action) => {
  switch (action.type) {
    case 'NEW_LATITUDE':
      return action.payload.lat;
    default:
      return state;
  }
};

//reducer for new observation longitude
const newObservationLng = (state = null, action) => {
  switch (action.type) {
    case 'NEW_LONGITUDE':
      return action.payload.lng;
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

//saga function to retrieve observations from DB
function* fetchUserObservations() {
  try {
      const observationsResponse = yield axios.get('/api/observation/user');
      yield put({ type: 'SET_USER_OBSERVATIONS', payload: observationsResponse.data});
  } catch (error) {
      console.log(error);
  }
}

//saga function to add observation to DB
function* addNewObservation(action) {
  try {
    yield axios.post('/api/observation', action.payload);
    yield put({ type: 'FETCH_USER_OBSERVATIONS' });
  } catch (error) {
      console.log('error posting observation', error);
  }    
}

//saga function to add observation coords
function* addObservationCoords(action) {
  try {
    const lat = {lat: action.payload[0]};
    const lng = {lng: action.payload[1]};
    yield put({ type: 'NEW_LONGITUDE', lng});
    yield put({ type: 'NEW_LATITUDE', lat});
  } catch (error) {
      console.log('error posting observation', error);
  }    
}

function* rootSaga() { //also known as watcherSaga
  yield all ([
    takeEvery('FETCH_USER_OBSERVATIONS', fetchUserObservations),
    takeEvery('ADD_NEW_OBSERVATION', addNewObservation),
    takeEvery('ADD_OBSERVATION_COORDS', addObservationCoords),
  ])
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({ newObservationLat, newObservationLng, userObservationsList }),

  applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('react-root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
