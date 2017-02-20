# React Slack Chat

![Build Status](https://travis-ci.org/5punk/react-slack-chat.svg?branch=master)
![Node Version](https://img.shields.io/badge/node-v6-blue.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/5punk/react-slack-chat/badge.svg)](https://snyk.io/test/github/5punk/react-slack-chat)

A Beautiful Gooey / Material Design Slack Chat Web Integrating Widget. This widget can be integrated as a Live Chat / Help Desk / Discussions for Special Interest Sites.

Give your users the Perfect Support / Engagement experience, with the comfort of Slack.

Throw your website visitors into a Slack Channel Community, where they can search for answers or get replies from online Slack Users.

![Image of React Component In Action](https://github.com/5punk/react-slack-chat/blob/master/docs/ReactSlackChat.gif?raw=true)

## Pre Requisites

1. Setup a [Slack Bot](https://api.slack.com/bot-users) for your team.
2. Encode / Obfuscate the apiToken if you need to publish it to a public Github Repository.

Note: Do not post / publish your Secret API Token as Plain Text to a public Github Repository.

## Installation

Install React Slack Chat by

`npm install --save react-slack-chat`


## Example Usage:
```
import { ReactSlackChat } from 'react-slack-chat';

class App extends Component {
  render() {
    return (
        <ReactSlackChat
          botName='5punk-bot'
          apiToken='xoxp-63486550359-63sfes26502-88fewfw67777-119aab37r32r32r316e0296c3da'
          channelId={['C1CSMYV9']}
          helpText='Optional Help Text'
          userImage='http://www.iconshock.com/img_vista/FLAT/mail/jpg/robot_icon.jpg'
          debugMode={true}
          hooks={[
            {
              /* My Custom Hook */
              id: 'getSystemInfo',
              action: () => 'MY SYSTEM INFO!'
            }
          ]}
        />
      )
  }
}
```

## Options

Below are a list of props the `<ReactSlackChat />` component accepts

  * `botname`: [UNIQUE] [REQUIRED] The name of the user / bot. Can be Visitor ID / IP address etc.
  * `apiToken`: [REQUIRED] The API Token for the bot you created for your team. You can create one [here](https://api.slack.com/bot-users).
  * `channelId`: [REQUIRED] At least one slack channel id needs to be passed for the first channel view.
  * `userImage`: [REQUIRED] An image URL for the user / bot (Does not need to be unique).
  * `helpText`: [OPTIONAL] The Help Text visible on the minimized view of the chat Widget.
  * `hooks`: [OPTIONAL] Custom Action Hooks, let's administrators execute commands. In the format `$=>@botName:HOOK_ID`. Example: `$=>@5punk:getCurrentPath`
  * `debugMode`: [OPTIONAL] Pass a boolean (`true`/`false`) flag to start debug logs.

## Default System Hooks

ReactSlackChat gives you a few hooks ready to use out of the box.
Call any hook with the following command via the Slack Backend

`$=>@botName:HOOK_ID`

They're documented below:

  * `getCurrentPath`: Returns location of the window of the Client.
  * `getPlatform`: Returns the OS of the Client.
  * `getScreenshot`: Returns the current screenshot of the Client's window / app view.

Feel free to add your own custom hooks. It'll allow you to get any information from the Client or perform any action / function on the Client App.

## Screenshots

### Screenshot Hook (System Default)
![Image of Custom Hooks](https://github.com/5punk/react-slack-chat/blob/master/docs/screenshotHook.png?raw=true)

### Custom Hooks
![Image of Custom Hooks](https://github.com/5punk/react-slack-chat/blob/master/docs/customHooks.png?raw=true)

### Mobile View
![Image of Mobile View](https://github.com/5punk/react-slack-chat/blob/master/docs/mobileView.png?raw=true)

### Tag a Customer
![Image of Special Mentions](https://github.com/5punk/react-slack-chat/blob/master/docs/specialMentions.png?raw=true)

#### Features

* Multiple channel support
* Attachments
* No Server needed!
* Custom Hooks
* Responsive Mobile support
* Special message UI if user is mentioned
* Auto generated user icons if `userImage` is not supplied
* Material UI with Animations
* Remembers selected channel
* Emoji support
* Auto scroll on new messages
