import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';

export class ManageCoursePage extends React.Component {
  // initialize state
  constructor(props, context) {
    super (props, context);

      this.state = {
        course: Object.assign({}, this.props.course),
        errors: {},
        saving: false
      };

      // bind component methods
      this.updateCourseState = this.updateCourseState.bind(this);
      this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // check if we have requested a new course (if id has changed)
    // if so update state
    if (this.props.course.id != nextProps.course.id) {
      // necessary to populate form if exisiting course is loaded directly
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  // handle form changes
  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters';
      formIsValid = false;
    }

    this.setState ({ errors: errors });
    return formIsValid;
  }

  saveCourse(event) {
    event.preventDefault();

    if(!this.courseFormIsValid()) {
      return;
    }

    this.setState({ saving: true });
    this.props.actions.saveCourse(this.state.course)
      .then(() => this.redirect())
      .catch(error => { // handle errors
        toastr.error(error);
        this.setState({ saving: false });
      });
  }

  // redirect after saving using context
  redirect() {
    this.setState({ saving: false });
    toastr.success('Course saved');
    this.context.router.push('/courses');
  }

  render () {
    return (
        <CourseForm
          allAuthors={this.props.authors}
          course={this.state.course}
          errors={this.state.errors}
          onChange={this.updateCourseState}
          onSave={this.saveCourse}
          saving={this.state.saving} />
    );
  }
}

// validate PropTypes
ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// pull in React Router context so router is available on this.context.Router
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id) {
  // filter the courses to return an array of matched courses by id
  const course = courses.filter(course => course.id == id);
  // return first item
  if(course.length) return course[0];
  // else
  return null;
}

// Redux functions
// get the state from the rootReducer store
// it can be then be accessed as props by the component
function mapStateToProps(state, ownProps) {

  // get course id from path '/course/:id' coming from routes.js
  const courseId = ownProps.params.id;

  // empty object to populate the form
  let course = {id: '', watchHRef: '', title: '', authorId: '', length: '', category: ''};

  // if course id present (ie. editing an exisiting course)
  // and at least 1 course exists
  if(courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  // transform data received from api into suitable format for dropdown menu
  const authorsFormattedForDropdown = state.authors.map((author) => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  return {
    course: course,
    authors: authorsFormattedForDropdown
  };
}

// binds actions in courseActions and wraps them in the dispatch function
// they can then be accessed by this.props.actions
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
