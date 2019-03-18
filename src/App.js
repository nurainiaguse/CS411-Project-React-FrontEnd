import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SearchPage from './SearchPage.js';

class App extends Component {
  render() {
    return (
      <div className="container">
       <SearchPage/>
      </div>
    );
  }
}

export default App;
