import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';

class CoursesPage extends React.Component {
  // initialize state
  constructor(props, context) {
    super (props, context);
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);

  }

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  redirectToAddCoursePage () {
    browserHistory.push('/course');
  }

  render () {
    // destructure this.props
    const {courses} = this.props;
    return (
      <div>
        <h1>Courses</h1>
        <input
          type="submit"
          value="Add Course"
          className="btn btn-primary"
          onClick={this.redirectToAddCoursePage} />
        <CourseList courses={courses} />
      </div>
    );
  }
}

// validate PropTypes
CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired
};

// Redux functions
// get the state from the rootReducer store
// it can be then be accessed as props by the component
function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  };
}

// binds actions in courseActions and wraps them in the dispatch function
// they can then be accessed by this.props.
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
