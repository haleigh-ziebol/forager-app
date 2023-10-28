import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

//saga function to retrieve common name info from DB
function* fetchCommonPlantData() {
  try {
    const plantsResponse = yield axios.get('/api/plants/common');
    yield put({ type: 'SET_COMMON', payload: plantsResponse.data});
  } catch (error) {
    console.log(error);
  }
}

//saga function to retrieve scientific name plant info from DB
function* fetchScientificPlantData() {
  try {
    const plantsResponse = yield axios.get('/api/plants/scientific');
    yield put({ type: 'SET_SCIENTIFIC', payload: plantsResponse.data});
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

//root saga for plants
function* plantsSaga() {
  yield takeEvery('FETCH_COMMON', fetchCommonPlantData);
  yield takeEvery('FETCH_SCIENTIFIC', fetchScientificPlantData);
  yield takeEvery('FETCH_REGIONS', fetchRegions);
}
  
export default plantsSaga;