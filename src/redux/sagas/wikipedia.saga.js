import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';
  

//saga function to get information from wikipedia API
function* searchWikipediaImage(action) {
  try {
    const wikipediaResponse = yield axios.get(`/api/wikipedia/image/${action.payload}`); // gets wikipedia data for observation
    const object = yield Object.values(wikipediaResponse.data)[0].thumbnail.source
    yield put({ type: 'SET_WIKI_IMAGE_DATA', payload: object}); // sends to reducer
  } catch (error) {
      console.log(error);
  }
}

function* searchWikipediaText(action) {
  try {
        const wikipediaResponse = yield axios.get(`/api/wikipedia/text/${action.payload}`); // gets wikipedia data for observation
        console.log("wiki:", wikipediaResponse)
        let object = yield Object.values(wikipediaResponse.data)[0]
        // let object2 = yield Object.values(wikipediaResponse.data)[1]
        console.log(object)
        // console.log(object2)
        if (object.includes("#REDIRECT")) {
          let hi = yield object.replace("#REDIRECT [[", "")
          const string = yield hi.split("]")[0].split(" ").join("_")
          const bye = yield string.split(" ").join("_")
          yield put({type: 'SEARCH_WIKI_IMAGE', payload: bye});
          const redirectResponse = yield axios.get(`/api/wikipedia/text/${bye}`); // gets wikipedia data for observation
          object = yield Object.values(redirectResponse.data)[0]
        }
        yield put({ type: 'SET_WIKI_TEXT_DATA', payload: object}); // sends to reducer
  } catch (error) {
      console.log(error);
  }
}

// search DB for species info
function* searchSpecies(action) {
  try {
        const DBResponse = yield axios.get(`/api/search/id/${action.payload}`); // gets wikipedia data for observation
        yield put({type: 'SET_SPECIES_INFO', payload: DBResponse.data}); // set reducer
        const name = yield DBResponse.data.scientific_name;
        const searchTerm = yield name.split(" ")[0] + "_" + name.split(" ")[1];
        yield put({type: 'SET_LINK_TEXT', payload: searchTerm});
        yield put({type: 'SEARCH_WIKI_TEXT', payload: searchTerm});
        yield put({type: 'SEARCH_WIKI_IMAGE', payload: searchTerm});
  } catch (error) {
      console.log(error);
  }
}


function* observationSaga() {
  yield takeEvery('GET_SPECIES', searchSpecies);
  yield takeEvery('SEARCH_WIKI_IMAGE', searchWikipediaImage);
  yield takeEvery('SEARCH_WIKI_TEXT', searchWikipediaText);
}

export default observationSaga;