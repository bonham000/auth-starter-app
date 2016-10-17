import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import Counter from './containers/Counter';
import About from './components/About/About';

export default (
  <Route component={App}>
    <Route path='/' name='home' component={Counter} />
    <Route path='/about' name='about' component={About} />
  </Route>
);
