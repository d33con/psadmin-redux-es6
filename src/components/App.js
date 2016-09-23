//Top level component
// This component handles the App template used on every page
import React, {PropTypes} from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header
          loading={this.props.loading}
        />
        {this.props.children} {/* components passed from React Router*/}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  //debugger;
  return {
    // converts to a boolean
    loading: state.ajaxCallsInProgress > 0
  };
}

export default connect(mapStateToProps)(App);
