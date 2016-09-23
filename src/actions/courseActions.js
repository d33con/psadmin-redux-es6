// holds course action creators
import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

// course is the same as course: course
// shorthand property name
export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

// thunks
export function loadCourses() {
  return function(dispatch) {
    // dispatch ajax call state updater
    dispatch(beginAjaxCall());
    // api call goes here
    return courseApi.getAllCourses().then(courses => {
      // dispatch action creator
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      throw (error);
    });
  };
}

export function saveCourse(course) {
  return function(dispatch) {
    // dispatch ajax call state updater
    dispatch(beginAjaxCall());
    return courseApi.saveCourse(course).then(course => {
      // if course.id update
      course.id ? dispatch(updateCourseSuccess(course)) :
      // else create new course
      dispatch(createCourseSuccess(course));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw (error);
    });
  };
}
