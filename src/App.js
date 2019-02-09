import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

import './App.css';

import GetClientIdStep from './getClientIdStep/getClientIdStep.js';

library.add(faPlayCircle);

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <GetClientIdStep />
        </div>
      </div>
    );
  }
}

export default App;
