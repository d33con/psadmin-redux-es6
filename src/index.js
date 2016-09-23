import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux'; // attaches store to react container components
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import {loadCourses} from './actions/courseActions';
import {loadAuthors} from './actions/authorActions';
import './styles/styles.css'; // webpack can import CSS files
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';

// creates an instance of our store to be passed to Provider
const store = configureStore();

// pass the actions to be dispatched
store.dispatch(loadCourses());
store.dispatch(loadAuthors());

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
