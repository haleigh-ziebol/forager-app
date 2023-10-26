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

function* observationSaga() {
  yield takeEvery('SEARCH_SPECIES', searchSpecies);
}
  
  export default observationSaga;