// combine all reducers we define
import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';

// courses acts as courses: courses
// accessesd as state.courses elsewhere
const rootReducer = combineReducers({
  courses,
  authors
});

export default rootReducer;
