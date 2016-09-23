// holds all author action creators
import * as types from './actionTypes';
import AuthorApi from '../api/mockAuthorApi';
import {beginAjaxCall} from './ajaxStatusActions';

export function loadAuthorSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

// thunk
export function loadAuthors() {
  return function(dispatch) {
    // dispatch ajax call state updater
    dispatch(beginAjaxCall());
    // api call goes here
    return AuthorApi.getAllAuthors().then(authors => {
      // dispatch action creator
      dispatch(loadAuthorSuccess(authors));
    }).catch(error => {
      throw (error);
    });
  };
}
