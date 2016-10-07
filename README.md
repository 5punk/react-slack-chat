# React Slack Chat

A beautiful Gooey / Material Design Slack Chat Web Integrating Widget.

Throw your website visitors into a Slack Channel Community, where they can search for answers or get replies from online Slack Users.

## Pre Requisites

1. Setup a Slack Bot
2. Note the API Token

Note: Do not post / publish your Secret API Token as Plain Text to a public Github Repository.

## Installation

Install React Slack Chat by

`npm install --save react-slack-chat`


### Example Usage:
```
import ReactSlackChat from 'react-slack-chat';

class App extends Component {
  render() {
    return (
        <ReactSlackChat
          botName='5punk-bot'
          apiToken='xoxp-63486550359-63sfes26502-88fewfw67777-119aab37r32r32r316e0296c3da'
          channelId={['C1CSMYV9']}
        />
      )
  }
}
```
