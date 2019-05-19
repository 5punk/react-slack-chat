# React Slack Chat

![Build Status](https://travis-ci.org/5punk/react-slack-chat.svg?branch=master)
![Node Version](https://img.shields.io/badge/node-v9-blue.svg)
![React](https://img.shields.io/badge/React-v16.8-lightblue.svg)
![Babel](https://img.shields.io/badge/Babel-v7-yellow.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/5punk/react-slack-chat/badge.svg)](https://snyk.io/test/github/5punk/react-slack-chat)

[-> DEMO](https://5punk.github.io/react-slack-chat/)

A Server-less Beautiful Gooey / Material Design Slack Chat Web Integrating Widget. This widget can be integrated as a Live Chat / Help Desk / Discussions for Special Interest Sites in **Solo Single Customer Mode (1:1)** or **Community Chat (Shoutbox) Mode**.

Give your users the Perfect Support / Engagement experience, with the comfort of Slack.

Throw your website visitors into a Slack Channel Community, where they can search for answers or get replies from online Slack Users.

![Image of React Component In Action](https://github.com/5punk/react-slack-chat/blob/master/docs/ReactSlackChat.gif?raw=true)

## Pre Requisites

1. Setup a [Slack Bot](https://my.slack.com/services/new/bot) for your team. Note your API token.
2. [Base64 encode](https://www.base64encode.org/) your newly created API token and fasten your seat-belts.

## Installation

Install React Slack Chat by

`npm install --save react-slack-chat`

## Example Usage:

Due to the heavy nature of the `getScreenshot` default system hook (Read about hooks below).
I've split the library into 2 consumables.

- `react-slack-chat`: The default import from consuming this library. There are no default system hooks, you are free to supply your own custom hooks (Documented below).

- `react-slack-chat-with-default-hooks.js`: Has all the default sytem hooks [documented below](https://github.com/5punk/react-slack-chat/blob/master/README.md#default-system-hooks), you can still add and pass custom keyword based action hooks.

Consuming the default import / lite version:

`import { ReactSlackChat } from 'react-slack-chat';`

Consuming the library with [default system hooks](https://github.com/5punk/react-slack-chat/blob/master/README.md#default-system-hooks):

`import { ReactSlackChat } from 'react-slack-chat/dist/react-slack-chat-with-default-hooks';`


### [Code snippet](https://github.com/5punk/react-slack-chat/blob/master/src/components/App/App.js) from [Demo App](https://5punk.github.io/react-slack-chat/):

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
              action: () => Promise.resolve('MY SYSTEM INFO!')
            }
          ]}
        />
      )
  }
}
```

## Options

Below are a list of props the `<ReactSlackChat />` component accepts

- `botname`: [UNIQUE][required] The name of the user / bot. Can be Visitor ID / Email ID / CorpID / IP address etc.
- `apiToken`: [REQUIRED][String] The [BASE64 ENCODED](https://www.base64encode.org/) API Token for the bot you created for your team. You can create one [here](https://my.slack.com/services/new/bot).
- `channels`: [REQUIRED][Array] At least one slack channel object needs to be passed for the first channel view. Refer example above.
- `userImage`: [REQUIRED][String] An image URL for the user / bot (Does not need to be unique).
- `helpText`: [OPTIONAL][String] The Help Text visible on the minimized view of the chat Widget.
- `themeColor`: [OPTIONAL][String] A Hex Color value accent you want the widget to be themed with, stylish stuff.
- `hooks`: [OPTIONAL][Array] Custom Action Hooks, let's administrators execute commands. Executed in Slack with the format `$=>@botName:HOOK_ID`. Example: `$=>@5punk:getCurrentPath`
- `debugMode`: [OPTIONAL] Pass a boolean (`true`/`false`) flag to start debug logs.
- `defaultChannel`: [OPTIONAL][String] Channel name to bypass the channel list and go directly to a specific channel.
- `defaultMessage`: [OPTIONAL][String] Prepend a default message to the beginning of the message list, such as an automatic greeting when a user first joins the channel.
- `singleUserMode`: [OPTIONAL][Boolean] Pass a boolean to filter messages so the user only sees his/her messages and replies directed at the user in threads on the Slack side.
- `closeChatButton`: [OPTIONAL][Boolean] Pass a boolean to add an "x" close button in the corner of the chat window instead of going back to channel list and minimizing.

## Default System Hooks

> All hooks can **ONLY be executed by Administrators** only if the site customer / visitor has the chat window open. Admins are usually the **team members** that belong to the Slack Team (Backend).

> All responses of hooks, are **only visible** to the backend Administrators (Visible to the members in the Slack App).

ReactSlackChat ships in two flavors. The lite version (default import) ships with **NO** default system hooks.

The package imported from the path `react-slack-chat/dist/react-slack-chat-with-default-hooks` gives you a few hooks ready to use out of the box.

An Admin can call any hook with the following command via the Slack App Backend

`$=>@botName:HOOK_ID`

They're documented below:

- `getCurrentPath`: Returns location of the window of the Client.
- `getPlatform`: Returns the OS of the Client.
- `getScreenshot`: Returns the current screenshot of the Client's window / app view.

Feel free to add your own custom hooks. It'll allow you to get any information from the Client or perform any action / function on the Client App.

Submit your ideas for innovative hooks or feature requests.

## Custom Hooks

> All hooks can **ONLY be executed by Administrators** only if the site customer / visitor has the chat window open. Admins are usually the **team members** that belong to the Slack Team (Backend).

> All responses of hooks, are **only visible** to the backend Administrators (Visible to the members in the Slack App).

Adding custom hooks is easy. Just pass an array of actionable custom hooks as a prop to the library. The default lite version and _heavier_ library that ships with some basic default system hooks, both support custom hooks.

You're expected to follow the format: 
```
{
  id: [STRING],
  action: [PROMISE] // Any action that you want each customer / visitor on your widget / app to execute
}
```

The promise has to be resolved to allow you to create async functions and actions on different Action IDs the Slack Admins try to execute.

An example of hooks passed as a prop can be:

```
hooks={[
  {
    /* My Custom Hook */
    id: 'getIPAddress',
    action: () => IPAddress.get() // returns a promise
  },
  {
    id: 'showHelpWizard',
    action: () => {
       return dispatch(showHelpWizard(true))
        .then(data => //success)
        .fail(uILogger.error('FAILED'))
    } 
  },
  .
  .
  .
]}
```


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

- Multiple channel support
- Attachments
- No Server needed!
- Custom Hooks
- Responsive Mobile support
- Special message UI if user is mentioned
- Auto generated user icons if `userImage` is not supplied
- Material UI with Animations
- Remembers selected channel
- Emoji support
- Auto scroll on new messages
