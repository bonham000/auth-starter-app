import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import Counter from './containers/Counter';
import About from './components/About/About';

export default (
  <Route>
  	<Route path = '/' name = 'home' component = {App} />
    <Route path = 'counter' name = 'counter' component = {Counter} />
    <Route path = 'about' name = 'about' component = {About} />
  </Route>
);
