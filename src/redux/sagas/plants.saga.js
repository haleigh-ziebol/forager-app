import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

//saga function to retrieve plant info from DB
function* fetchPlantData() {
  try {
    const plantsResponse = yield axios.get('/api/plants');
    yield put({ type: 'SET_PLANTS', payload: plantsResponse.data});
  } catch (error) {
    console.log(error);
  }
}

//saga to retrieve region info from DB
function* fetchRegions() {
  try {
    const regionResponse = yield axios.get('/api/plants/regions');
    yield put({ type: 'SET_REGIONS', payload: regionResponse.data});
  } catch (error) {
    console.log(error);
  }
}

  function* fetchRegionalPlants() {
    try {
        const midwestResponse = yield axios.get('/api/search/region/1');
        yield put({ type: 'SET_MIDWEST', payload: midwestResponse.data});
        const northeastResponse = yield axios.get('/api/search/region/2');
        yield put({ type: 'SET_NORTHEAST', payload: northeastResponse.data});
        const southeastResponse = yield axios.get('/api/search/region/3');
        yield put({ type: 'SET_SOUTHEAST', payload: southeastResponse.data});
        const southwestResponse = yield axios.get('/api/search/region/4');
        yield put({ type: 'SET_SOUTHWEST', payload: southwestResponse.data});
        const westResponse = yield axios.get('/api/search/region/5');
        yield put({ type: 'SET_WEST', payload: westResponse.data});
    } catch (error) {
        console.log(error);
    }
  }
  

  function* plantsSaga() {
    yield takeEvery('FETCH_PLANTS', fetchPlantData);
    yield takeEvery('FETCH_REGIONS', fetchRegions);
    yield takeEvery('SEARCH_REGIONS', fetchRegionalPlants);
  }
  
  export default plantsSaga;