import React from 'react';
import ReactDOM from 'react-dom';
import { ReactSlackChat } from './ReactSlackChat';
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
    <ReactSlackChat
      botName='avanish'
      apiToken='xoxp-63486550359-63478026502-88369567777-119aab37a7c7e018d79b316e0296c3da'
      channelId={['C1VELS4AW', 'C1VCPMYV9']}
      helpText='Need Help?'
      debugMode={true}
      userImage='http://www.iconshock.com/img_vista/FLAT/mail/jpg/robot_icon.jpg'
    />
  </div>,
  document.getElementById('root')
);
