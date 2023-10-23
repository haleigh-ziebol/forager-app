import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* searchSpecies( action ) {
  try {
    console.log(action.payload)
      // const searchURL = yield `?species=${action.payload.species}&region=${action.payload.region}&type=${action.payload.growth_type}`
      const searchURL = yield `?species=%&region=1&type=%`
      const speciesResponse = yield axios.get(`/api/search/${searchURL}`);
      yield put({ type: 'SET_SPECIES_RESPONSE', payload: speciesResponse.data});
  } catch (error) {
      console.log(error);
  }
}


// function* searchSpecies( action ) {
//   try {
//     console.log(action.payload)
//       const speciesResponse = yield axios.get(`/api/search/species/${action.payload.searchTerm}`);
//       yield put({ type: 'SET_SPECIES_RESPONSE', payload: speciesResponse.data});
//   } catch (error) {
//       console.log(error);
//   }
// }

  
  function* searchRegion( action ) {
    try {
        const regionalPlantsResponse = yield axios.get(`/api/search/region/${action.payload.searchTerm}`);
        yield put({ type: 'SET_SPECIES_RESPONSE', payload: regionalPlantsResponse.data});
    } catch (error) {
        console.log(error);
    }
  }


  function* searchGrowthType( action ) {
    try {
      yield console.log('searching for growth type', action.payload.searchTerm )
        const growthTypeResponse = yield axios.get(`/api/search/type/${action.payload.searchTerm}`);
        yield put({ type: 'SET_SPECIES_RESPONSE', payload: growthTypeResponse.data});
    } catch (error) {
        console.log(error);
    }
  }

  function* observationSaga() {
    yield takeEvery('SEARCH_SPECIES', searchSpecies);
    yield takeEvery('SEARCH_REGION', searchRegion);
    yield takeEvery('SEARCH_GROWTH_TYPE', searchGrowthType);
  }
  
  export default observationSaga;