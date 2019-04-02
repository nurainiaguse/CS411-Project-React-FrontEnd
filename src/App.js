import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import SearchPage from './SearchPage.js';
import TestPage from './TestPage.js';

class App extends Component {
  render() {
    return (
		<Router>
			<Switch>
				<Route exact path="/" component={SearchPage}/>
				<Route exact path="/test" component={TestPage}/>
			</Switch>
			</Router>
		)
  }
}

export default App;
