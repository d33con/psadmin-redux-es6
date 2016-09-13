// holds all author action creators
import * as types from './actionTypes';
import AuthorApi from '../api/mockAuthorApi';

export function loadAuthorSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

// thunk
export function loadAuthors() {
  return function(dispatch) {
    // api call goes here
    return AuthorApi.getAllAuthors().then(authors => {
      // dispatch action creator
      dispatch(loadAuthorSuccess(authors));
    }).catch(error => {
      throw (error);
    });
  };
}
