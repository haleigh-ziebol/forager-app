import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

//saga function to retrieve plant info from DB
function* fetchUserRegion(action) {
  try {

    const userRegionResponse = yield axios.get(`/api/userdata/region/${action.payload.region}`);
    yield put({ type: 'SET_USER_REGION', payload: userRegionResponse.data});
  } catch (error) {
    console.log(error);
  }
}

  function* userdataSaga() {
    yield takeEvery('FETCH_USER_REGION', fetchUserRegion);
  }
  
  export default userdataSaga;