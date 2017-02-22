import React from 'react';
import ReactDOM from 'react-dom';
import { ReactSlackChat } from '../ReactSlackChat';
import logo from './logo.svg';
import './index.css';

ReactDOM.render(
  <div className='App'>
    <div className='App-header'>
      <div dangerouslySetInnerHTML={{__html: logo}} className='App-logo' alt='logo' />
      <h2>Welcome to React</h2>
    </div>
    <p className='App-intro'>
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
    <ReactSlackChat
      botName='avanish'
      apiToken='xoxb-111120916065-BLAH'
      channelNames={['random', 'test', 'test22']}
      helpText='Need Help?'
      debugMode={true}
      userImage='http://www.iconshock.com/img_vista/FLAT/mail/jpg/robot_icon.jpg'
      hooks={[
        {
          /* My Custom Hook */
          id: 'getSystemInfo',
          action: () => 'MY SYSTEM INFO!'
        }
      ]}
    />
  </div>,
  document.getElementById('root')
);
