import React, { useState, Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GetClientIdStep from './getClientIdStep/getClientIdStep.js';
import AuthCallback from './authCallback/authCallback.js';

import './App.css';

library.add(faPlayCircle);

const App = () => {
  const [tokenData, setTokenData] = useState({});

  return (
    <div className="App">
      <div className="container">
        <Router>
          <div>
            <Route path="/auth/callback"
              render={(props) => <AuthCallback {...props} onReceivedAccessToken={setTokenData} />} />
            <Route path="/*"
              render={(props) => <GetClientIdStep {...props} accessToken={tokenData} />} />
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
