import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

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
    const lat = action.payload[0];
    const lng = action.payload[1];
    try {
      yield put({ type: 'NEW_LONGITUDE', payload: lng});
      yield put({ type: 'NEW_LATITUDE', payload: lat});
    } catch (error) {
        console.log('error posting observation', error);
    }    
  }
  
  //saga function to get information from wikipedia API
  function* searchWikipedia(action) {
    try {
          const wikipediaResponse = yield axios.get(`/api/wikipedia/search/${action.payload}`); // gets wikipedia data for observation
          yield put({ type: 'SET_WIKI_DATA', payload: wikipediaResponse.data}); // sends to reducer
    } catch (error) {
        console.log(error);
    }
  }

  function* observationSaga() {
    yield takeEvery('FETCH_USER_OBSERVATIONS', fetchUserObservations);
    yield takeEvery('ADD_NEW_OBSERVATION', addNewObservation);
    yield takeEvery('ADD_OBSERVATION_COORDS', addObservationCoords);
    yield takeEvery('SEARCH_WIKI', searchWikipedia);
  }
  
  export default observationSaga;