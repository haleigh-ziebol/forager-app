import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* searchSpecies( action ) {
  try {
    console.log(action.payload)
      const searchURL = yield `?species=${action.payload.species}&region=${action.payload.region}&type=${action.payload.growth_type}`
      const speciesResponse = yield axios.get(`/api/search/${searchURL}`);
      yield put({ type: 'SET_SPECIES_RESPONSE', payload: {data: speciesResponse.data , searchTerms: action.payload}});
      yield console.log({searchTerms: action.payload})
  } catch (error) {
      console.log(error);
  }
}

function* badgeUserRegion( action ) {
  try {
    const badgeResponse = yield axios.get(`/api/search/badge/species/?id=${action.payload.user_id}`);
    yield console.log(badgeResponse)
      yield put({ type: 'SET_BADGE_USER_REGION', payload: badgeResponse.data });
  } catch (error) {
      console.log(error);
  }
}

function* badgeBerries( action ) {
  try {
    const badgeResponse = yield axios.get(`/api/search/badge/berries/?id=${action.payload.user_id}`);
    yield console.log(badgeResponse)
      yield put({ type: 'SET_BADGE_BERRIES', payload: badgeResponse.data });
  } catch (error) {
      console.log(error);
  }
}

function* badgeTrees( action ) {
  try {
    const badgeResponse = yield axios.get(`/api/search/badge/tree/?id=${action.payload.user_id}`);
    yield console.log(badgeResponse)
      yield put({ type: 'SET_BADGE_TREE', payload: badgeResponse.data });
  } catch (error) {
      console.log(error);
  }
}



function* observationSaga() {
  yield takeEvery('SEARCH_SPECIES', searchSpecies);
  yield takeEvery('BADGE_USER_REGION', badgeUserRegion);
  yield takeEvery('BADGE_BERRIES', badgeBerries);
  yield takeEvery('BADGE_TREES', badgeTrees);

}
  
export default observationSaga;