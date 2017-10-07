import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ReactSlackChat } from '../ReactSlackChat';
import './App.css';

class App extends Component {
  syntaxHighlight(json) {
    if (typeof json !== 'string') {
      json = JSON.stringify(json, undefined, 4);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    // eslint-disable-next-line
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
  }

  createMarkup(dom) {
    return {__html: dom};
  }

  getIP() {
    // https://api.ipify.org?format=json
    const ipAPI = 'https://api.ipify.org?format=json';
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', ipAPI, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
  }

  render() {
    const getClientID = JSON.parse(this.getIP()).ip;
    const getClientAvatar = `https://robohash.org/${getClientID}`;

    const chat = <ReactSlackChat
    botName={getClientID}
    channels={[
      {
        name: 'cloudrunner-support'
      }
    ]}
    defaultChannel='cloudrunner-support'
    defaultMessage='Hi, how can I help you?'
    filterMessagesBy={{username: getClientID, thread_ts: ''}}
    apiToken='***REMOVED***'
    helpText='Need Help?'
    themeColor='#856090'
    debugMode={true}
    userImage={getClientAvatar}
    hooks={[
      {
        /* My Custom Hook */
        id: 'getSystemInfo',
        action: () => 'MY SYSTEM INFO!'
      }
    ]}
    />;

    const codeHighlight = this.createMarkup(this.syntaxHighlight(chat.props));

    return (
      <div className="App">
      <div className="App-header">
      <img src={`https://robohash.org/${new Date()}`} className="App-logo" alt="logo" />
      <h2>Welcome to <a className="gitLink" href="https://github.com/5punk/react-slack-chat">React Slack Chat</a></h2>
      <a href="https://github.com/5punk/react-slack-chat"><img className="ribbon" src="https://camo.githubusercontent.com/52760788cde945287fbb584134c4cbc2bc36f904/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f77686974655f6666666666662e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_white_ffffff.png" /></a>
      </div>
      <p className="App-intro">
      Here's an example configuration to load the widget.
      </p>
      <pre className="codeBlock">
      <p>&lt;ReactSlackChat</p>
      <pre dangerouslySetInnerHTML={codeHighlight} />
      <p>/&gt;</p>
      </pre>
      <div className="welp">
      <hr />
      <h1>Welp! How does all this magic work?</h1>
      <p>Easy! Read the TLDR <a href="https://github.com/5punk/react-slack-chat#react-slack-chat">setup instructions</a>.</p>
      </div>
      {chat}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root')
);
