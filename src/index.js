import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route, browserHistory, IndexRoute, IndexRedirect } from 'react-router';
import reduxThunk from 'redux-thunk';
import Parse from 'parse';


import App from './components/app';
import rootReducer from './rootReducer';
import { Colors } from './config/styles';
import { AUTH_USER } from './components/Auth/AuthTypes';
import { UPDATE_USER } from './components/UserTypes';
import { AuthView, ForgotPasswordView, ResetPasswordView } from './components/Auth';
import DriverListView from './components/Drivers/DriverListView';
import AreaListView from './components/Areas/AreaListView';
import RideListView from './components/Rides/RideListView';
import PassengerListView from './components/Passengers/PassengerListView';
import './../sass/style.scss';
import { PARSE_SERVER_URL, APPLICATION_ID } from './config/globals';

const createStoreWithMiddleware = compose(applyMiddleware(reduxThunk)(createStore));
const store = createStoreWithMiddleware(rootReducer);

Parse.initialize(APPLICATION_ID, "some_key_generated");
Parse.applicationId = APPLICATION_ID;
Parse.serverURL = PARSE_SERVER_URL;
Parse.clientKey = "some_key_generated";
Parse.javascriptKey = "some_key_generated";

let redirect = "/"; // eslint-disable-line
const currentUser = Parse.User.current();

window.doot = "doot doot here's your toot 🎺💀";

if (currentUser) {
  store.dispatch({ type: AUTH_USER, payload: currentUser });
  store.dispatch({ type: UPDATE_USER, payload: currentUser });
  if (location.pathname !== '/') {
    redirect = `/${location.pathname}`;
  } else {
    browserHistory.push('/drivers');
  }
}

document.body.style.backgroundColor = Colors.white;

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to={redirect} />
        <IndexRoute component={AuthView} authType="signin" />
        <Route path="signup" component={AuthView} authType="signup" />
        <Route path="forgot-password" component={ForgotPasswordView} />
        <Route path="reset-password" component={ResetPasswordView} />
        <Route path="drivers" component={DriverListView} />
        <Route path="areas" component={AreaListView} />
        <Route path="rides" component={RideListView} />
        <Route path="passengers" component={PassengerListView} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.page-container')
);
