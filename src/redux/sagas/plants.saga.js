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
  

  function* plantsSaga() {
    yield takeEvery('FETCH_PLANTS', fetchPlantData);
  }
  
  export default plantsSaga;