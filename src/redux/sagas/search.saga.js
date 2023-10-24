import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* searchSpecies( action ) {
  try {
    console.log(action.payload)
      const searchURL = yield `?species=${action.payload.species}&region=${action.payload.region}&type=${action.payload.growth_type}`
      const speciesResponse = yield axios.get(`/api/search/${searchURL}`);
      yield put({ type: 'SET_SPECIES_RESPONSE', payload: {data: speciesResponse.data , searchTerms: action.payload}});
  } catch (error) {
      console.log(error);
  }
}
  
function* searchRegion( action ) {
  try {
      const regionalPlantsResponse = yield axios.get(`/api/search/region/${action.payload.searchTerm}`);
      yield put({ type: 'SET_SPECIES_RESPONSE', payload: regionalPlantsResponse.data});
  } catch (error) {
      console.log(error);
  }
}


  function* observationSaga() {
    yield takeEvery('SEARCH_SPECIES', searchSpecies);
    yield takeEvery('SEARCH_REGION', searchRegion);
    // yield takeEvery('SEARCH_GROWTH_TYPE', searchGrowthType);
  }
  
  export default observationSaga;