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
        const regionalPlantsResponse = yield axios.get(`/api/search/region/${action.payload.region_id}`);
        yield put({ type: 'SET_REGIONAL_PLANTS', payload: regionalPlantsResponse.data});
    } catch (error) {
        console.log(error);
    }
  }
  

  function* plantsSaga() {
    yield takeEvery('FETCH_PLANTS', fetchPlantData);
    yield takeEvery('FETCH_REGIONS', fetchRegions);
    yield takeEvery('SEARCH_REGION', fetchRegionalPlants);
  }
  
  export default plantsSaga;