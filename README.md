# React Slack Chat

![Build Status](https://travis-ci.org/5punk/react-slack-chat.svg?branch=master)
![Node Version](https://img.shields.io/badge/node-v6-blue.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/5punk/react-slack-chat/badge.svg)](https://snyk.io/test/github/5punk/react-slack-chat)

[DEMO](http://avanishpathak.com/react-slack-chat/)

A Beautiful Gooey / Material Design Slack Chat Web Integrating Widget. This widget can be integrated as a Live Chat / Help Desk / Discussions for Special Interest Sites in **Solo Single Customer Mode (1:1)** or **Community Chat (Shoutbox) Mode**.

Give your users the Perfect Support / Engagement experience, with the comfort of Slack.

Throw your website visitors into a Slack Channel Community, where they can search for answers or get replies from online Slack Users.

![Image of React Component In Action](https://github.com/5punk/react-slack-chat/blob/master/docs/ReactSlackChat.gif?raw=true)

## Pre Requisites

1. [Pollyfill babel](https://babeljs.io/docs/usage/polyfill/). Your app has to do it to avoid multiple instancing errors from `babel-polyfill`.
2. Setup a [Slack Bot](https://my.slack.com/services/new/bot) for your team. Note your API token.
3. [Base64 encode](https://www.base64encode.org/) your newly created API token and fasten your seat-belts.

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
          botName='5punk-unique-id' // VisitorID, CorpID, Email, IP address etc.
          apiToken='base64-encoded-api-token-119aab37r32r32r316e0296c3da'
          channels={[
          {
            name: 'random'
          },
          {
            name: 'test',
            id: 'C48SAX4',
            icon: ''
          },
          {
            name: 'test22',
            id: '',
            icon: './logo.svg'
          }]}
          helpText='Optional Help Text'
          themeColor='#856090'
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

  * `botname`: [UNIQUE] [REQUIRED] The name of the user / bot. Can be Visitor ID / Email ID / CorpID / IP address etc.
  * `apiToken`: [REQUIRED] The [BASE64 ENCODED](https://www.base64encode.org/) API Token for the bot you created for your team. You can create one [here](https://my.slack.com/services/new/bot).
  * `channels`: [REQUIRED] At least one slack channel object needs to be passed for the first channel view. Refer example above.
  * `userImage`: [REQUIRED] An image URL for the user / bot (Does not need to be unique).
  * `helpText`: [OPTIONAL] The Help Text visible on the minimized view of the chat Widget.
  * `themeColor`: [OPTIONAL] A Hex Color value accent you want the widget to be themed with, stylish stuff.
  * `hooks`: [OPTIONAL] Custom Action Hooks, let's administrators execute commands. In the format `$=>@botName:HOOK_ID`. Example: `$=>@5punk:getCurrentPath`
  * `debugMode`: [OPTIONAL] Pass a boolean (`true`/`false`) flag to start debug logs.
  * `defaultChannel`: [OPTIONAL] Channel name to bypass the channel list and go directly to a specific channel.
  * `defaultMessage`: [OPTIONAL] Prepend a default message to the beginning of the message list, such as an automatic greeting when a user first joins the channel.
  * `singleUserMode`: [OPTIONAL] Pass a boolean to filter messages so the user only sees his/her messages and replies directed at the user in threads on the Slack side.
  * `closeChatButton`: [OPTIONAL] Pass a boolean to add an "x" close button in the corner of the chat window instead of going back to channel list and minimizing.


## Default System Hooks

> All hooks can **ONLY be executed by Administrators**. Admins are usually the **team members** that belong to the Slack Team (Backend).

> All responses of hooks, are **only visible** to the backend Administrators (Visible to the members in the Slack App).


ReactSlackChat gives you a few hooks ready to use out of the box.
An Admin can call any hook with the following command via the Slack App Backend

`$=>@botName:HOOK_ID`

They're documented below:

  * `getCurrentPath`: Returns location of the window of the Client.
  * `getPlatform`: Returns the OS of the Client.
  * `getScreenshot`: Returns the current screenshot of the Client's window / app view.

Feel free to add your own custom hooks. It'll allow you to get any information from the Client or perform any action / function on the Client App.

Submit your ideas for innovative hooks or feature requests.

## Screenshots

### Screenshot Hook (System Default)
![Image of Custom Hooks](https://github.com/5punk/react-slack-chat/blob/master/docs/screenshotHook.png?raw=true)

### Custom Hooks

Run the same hook against multiple botUsers (Clients). Hook responses are not visible to non admins / Clients.

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
