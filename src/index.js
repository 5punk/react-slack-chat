import React from 'react';
import ReactDOM from 'react-dom';
import ReactSlackChat from './ReactSlackChat';
import logo from './logo.svg';
import './index.css';

ReactDOM.render(
  <div className='App'>
    <div className='App-header'>
      <img src={logo} className='App-logo' alt='logo' />
      <h2>Welcome to React</h2>
    </div>
    <p className='App-intro'>
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
    <ReactSlackChat apiToken='' />
  </div>,
  document.getElementById('root')
);
