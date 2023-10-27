import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* searchSpecies( action ) {
  try {
    console.log(action.payload)
      const searchURL = yield `?species=${action.payload.species}&region=${action.payload.region}&type=${action.payload.growth_type}`
      const speciesResponse = yield axios.get(`/api/search/${searchURL}`);
      yield console.log(speciesResponse)
      yield put({ type: 'SET_SPECIES_RESPONSE', payload: {data: speciesResponse.data , searchTerms: action.payload}});
      yield console.log({data: speciesResponse.data , searchTerms: action.payload})
  } catch (error) {
      console.log(error);
  }
}

function* badgeUserRegion( action ) {
  try {
    const badgeResponse = yield axios.get(`/api/search/badge/?region=${action.payload.region}&id=${action.payload.user_id}`);
    yield console.log(badgeResponse)
      yield put({ type: 'SET_BADGE_USER_REGION', payload: badgeResponse.data });
  } catch (error) {
      console.log(error);
  }
}

function* observationSaga() {
  yield takeEvery('SEARCH_SPECIES', searchSpecies);
  yield takeEvery('BADGE_USER_REGION', badgeUserRegion);
}
  
  export default observationSaga;