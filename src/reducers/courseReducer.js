// accepts a state and a function and returns a new state
import * as types from '../actions/actionTypes';
import initialState from './initialState';

// default state is an array
// action comes from courseActions
// add this reducer to rootReducer also
export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.LOAD_COURSES_SUCCESS:
      // return the courses passed in on the action
      return action.courses;

    case types.CREATE_COURSE_SUCCESS:
      // immutable so create a new copy of state to return
      return [
        ...state,
        Object.assign({}, action.course)
      ];

    case types.UPDATE_COURSE_SUCCESS:
      // create a new copy of state
      return [
        // get a list of courses not being updated
        ...state.filter(course => course.id !== action.course.id),
        // then include the new course in a copy of that array
        Object.assign({}, action.course)
      ];

    default:
      return state;
  }
}
