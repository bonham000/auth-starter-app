import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import Counter from './containers/Counter';
import About from './components/About/About';
import SignupPage from './containers/SignupPage'

export default (
  <Route name = 'home' component = {App}>
  	<Route path = '/' name = 'about' component = {About} />
  	<Route path = 'signup' name = 'signup' component = {SignupPage} />
    <Route path = 'counter' name = 'counter' component = {Counter} />
  </Route>
);
