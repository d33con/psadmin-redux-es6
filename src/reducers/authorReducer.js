// accepts a state and a function and returns a new state
import * as types from '../actions/actionTypes';
import initialState from './initialState';

// action comes from courseActions
// state comes from initialState
// add this reducer to rootReducer also
export default function authorReducer(state = initialState.authors, action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;

    default:
      return state;
  }
}
