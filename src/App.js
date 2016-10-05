import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    const chatbox = <div className='chatbox'>
      <div className='demo'>
        <svg className='sidebar' viewBox='0 0 300 500'>
          <path className='s-path' fill='#999' d='M0,0 50,0 a0,250 0 1,1 0,500 L0,500' />
        </svg>
        <div className='static'>
          <div className='static__text'>Pull white sidebar to the right</div>
        </div>
        <div className='sidebar-content'>
          <div className='contact'>
            <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/elastic-man.png' alt='' className='contact__photo' />
            <span className='contact__name'>Ethan Hawke</span>
            <span className='contact__status online'></span>
          </div>
        </div>
        <div className='chat'>
          <span className='chat__back'></span>
          <span className='chat__status'>status</span>
          <div className='chat__person'>
            <span className='chat__online active'></span>
            <span className='chat__name'>Huehue Huehue</span>
          </div>
          <div className='chat__messages'>
            <div className='chat__msgRow'>
              <div className='chat__message mine'>Such SVG, much Javascript, very CSS!</div>
            </div>
            <div className='chat__msgRow'>
              <div className='chat__message notMine'>Wow!</div>
            </div>
            <div className='chat__msgRow'>
              <div className='chat__message notMine'>Very elastic! Such easings!</div>
            </div>
            <div className='chat__msgRow'>
              <div className='chat__message mine'>
                Check out my other <a href='http://codepen.io/suez/public/' target='_blank'>pens</a>
              </div>
            </div>
          </div>
          <input type='text' className='chat__input' placeholder='Your message' />
        </div>
      </div>
    </div>;

    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Welcome to React</h2>
        </div>
        <p className='App-intro'>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {chatbox}
      </div>
    );
  }
}

export default App;
