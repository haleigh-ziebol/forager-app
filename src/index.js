import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { takeEvery, put, all } from 'redux-saga/effects';
import axios from 'axios';

import App from './components/App/App';

//sample reducer
const plantList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PLANT':
      return [ ...state, action.payload ];
    case 'SET_PLANTS':
      return action.payload;
    default:
      return state;
  }
};

//sample saga function
function* fetchPlants() {
  try {
      const elementsResponse = yield axios.get('/api/plant');
      yield put({ type: 'SET_PLANTS', payload: elementsResponse.data});
  } catch (error) {
      console.log(error);
  }
}

//another sample saga function
function* addPlant(action) {
  try {
    yield axios.post('/api/plant', action.payload);
    yield put({ type: 'FETCH_PLANTS' });
  } catch (error) {
      console.log('error posting a plant', error);
  }    
}

function* rootSaga() { //also known as watcherSaga
  yield all ([
    takeEvery('FETCH_PLANTS', fetchPlants),
    takeEvery('ADD_PLANT', addPlant),
  ])
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({  }),

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
