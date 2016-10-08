import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { rtm, channels, chat } from 'slack';
import { load as emojiLoader, parse as emojiParser } from 'gh-emoji';
import User from './User';

class ReactSlackChat extends Component {
  constructor(args) {
    super(args);
    // Create Bot
    this.bot = rtm.client();
    // setup state
    this.state = {
      // failed flag
      failed: false,
      // List of Online users
      onlineUsers: [],
      channels: [],
      activeChannel: [],
      messages: [],
      postMyMessage: '',
      refreshTime: 2000,
      chatbox: {
        active: false,
        channelActiveView: false,
        chatActiveView: false
      },
      messageFormatter: {
        emoji: false
      }
    };
    // Bind Slack Message functions
    this.loadMessages = this.loadMessages.bind(this);
    this.getUserImg = this.getUserImg.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.postMessage = this.postMessage.bind(this);
    // Bind UI Animation functions
    this.openChatBox = this.openChatBox.bind(this);
    this.closeChatBox = this.closeChatBox.bind(this);
    this.goToChatView = this.goToChatView.bind(this);
    this.goToChannelView = this.goToChannelView.bind(this);
    // Utils
    this.displayFormattedMessage = this.displayFormattedMessage.bind(this);

    // Initiate Emoji Library
    emojiLoader()
      .then(() => {
        this.setState({
          messageFormatter: {
            emoji: true
          }
        });
      })
      .catch((err) => console.log(`Cant initiate emoji library ${err}`));
    // Connect bot
    this.connectBot(this)
      .then((data) => {
        console.log('got data', data);
        this.setState({
          onlineUsers: data.onlineUsers,
          channels: data.channels
        });
      })
      .catch((err) => {
        console.log('could not intialize slack bot', err);
        this.setState({
          failed: true
        });
      });
  }

  arraysIdentical(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  displayFormattedMessage(message) {
    // messages text
    let messageText = message.text;
    // who's message is this?
    const myMessage = message.username === this.props.botName;
    // check if emoji library is enabled
    if (this.state.messageFormatter.emoji) {
      messageText = emojiParser(messageText);
    }
    return <div className={classNames('chat__msgRow', myMessage ? 'mine' : 'notMine')} key={message.ts}>
      {
        myMessage
          ? this.props.userImage
            ? <img src={this.props.userImage} className='user__contact__photo' />
            : <div className='user__contact__generated__image'>{this.props.botName.charAt(0)}</div>
          : null
      }
      <div className='chat__message' dangerouslySetInnerHTML={{__html: messageText}}></div>
      {
        // Show remote users image only if message isn't customers
        !myMessage
          ? <img src={this.getUserImg(message.user)} alt='' className='chat__contact__photo' />
          : null
      }
    </div>
  }

  isValidOnlineUser(user) {
    // return true if
    // user should be active / online
    // user.presence === 'active' &&
    return !user.is_bot &&
      // And is NOT a bot
      // slackbot hack, it thinks its not a bot :/
      user.name.indexOf('slackbot') === -1;
  }

  connectBot() {
    return new Promise((resolve, reject) => {
      try {
        // start the bot, get the initial payload
        this.bot.started((payload) => {
          console.log(payload);
          // Create new User object for each online user found
          // Add to our list only if the user is valid
          const onlineUsers = [];
          // extract and resolve return the users
          payload.users.map((user) => this.isValidOnlineUser(user)
            ? onlineUsers.push(new User(user))
            : null
          );
          // get the channels we need
          const channels = [];
          payload.channels.map((channel) => {
            // This channel is requested
            this.props.channelId.indexOf(channel.id) > -1 ? channels.push(channel) : null;
          })
          return resolve({ channels, onlineUsers });
        });
        // tell the bot to listen
        this.bot.listen({ token: this.props.apiToken });
      } catch (err) {
        return reject(err);
      }
    });
  }

  loadMessages(channel) {
    const that = this;
    // define loadMessages function
    const getMessagesFromSlack = () => {
      const messagesLength = that.state.messages.length;
      channels.history({
        token: this.props.apiToken,
        channel: channel.id
      }, (err, data) => {
        if (err) {
          console.log(`There was an error loading messages for ${channel.name}. ${err}`);
          return this.setState({
            failed: true
          });
        }
        // loaded channel history
        console.log('got data', data);
        // Scroll down only if the stored messages and received messages are not the same
        // reverse() mutates the array
        if (!this.arraysIdentical(this.state.messages, data.messages.reverse())) {
          // if div is already scrolled to bottom, scroll down again just incase a new message has arrived
          setTimeout(() => {
            const chatMessages = this.refs.reactSlakChatMessages;
            chatMessages.scrollHeight < chatMessages.scrollTop + 550 ||
              messagesLength === 0
              ? chatMessages.scrollTop = chatMessages.scrollHeight
              : null;
          }, 0);
        }

        return this.setState({
          messages: data.messages
        });
      });
    };
    // Call it once
    getMessagesFromSlack();
    // Set this channel as active channel
    // Set the function to be called at regular intervals
    this.setState({
      activeChannel: channel,
      chatbox: {
        active: true,
        channelActiveView: false,
        chatActiveView: true
      },
      // get the history of channel at regular intevals
      activeChannelInterval: setInterval(getMessagesFromSlack, this.state.refreshTime)
    });
  }

  getUserImg(userId) {
    let image;
    this.state.onlineUsers.map((user) => {
      if (user.id === userId) {
        image = user.image;
      }
    });
    return image;
  }

  handleChange(e) {
    this.setState({
      postMyMessage: e.target.value
    });
    if (e.key === 'Enter') {
      console.log('do postMessage');
      this.postMessage(this.state.postMyMessage);
    }
    return;
  }

  postMessage(text) {
    console.log('Posting message');
    chat.postMessage({
      token: this.props.apiToken,
      channel: this.state.activeChannel.id,
      text,
      username: this.props.botName
    }, (err, data) => {
      if (err) {
        console.log('failed to post', data, 'err:', err);
        return;
      }
      console.log('Successfully posted message', text, 'response:', data);
      // Adjust scroll height
      setTimeout(() => {
        const chatMessages = this.refs.reactSlakChatMessages;
        chatMessages.scrollTop = chatMessages.scrollHeight
      }, this.state.refreshTime);
      this.setState({
        postMyMessage: ''
      });
      this.forceUpdate();
    })
  }

  goToChannelView(e) {
    // Close Chat box only if not already open
    if (this.state.chatbox.active) {
      this.setState({
        chatbox: {
          active: true,
          channelActiveView: true,
          chatActiveView: false,
        },
        messages: []
      });
      // Clear load messages time interval
      if (this.state.activeChannelInterval) {
        clearInterval(this.state.activeChannelInterval);
      }
    }
    e.stopPropagation();
    return false;
  }

  goToChatView(e, channel) {
    // Close Chat box only if not already open
    if (this.state.chatbox.active) {
      this.setState({
        chatbox: {
          active: true,
          channelActiveView: false,
          chatActiveView: true,
        }
      });
      this.loadMessages(channel);
    }
    e.stopPropagation();
    return false;
  }

  openChatBox(e) {
    // Open Chat box only if not already open
    if (!this.state.chatbox.active) {
      this.setState({
        chatbox: {
          active: true,
          channelActiveView: true,
          chatActiveView: false,
        }
      });
    }
    e.stopPropagation();
    return false;
  }

  closeChatBox(e) {
    // Close Chat box only if not already open
    if (this.state.chatbox.active) {
      this.setState({
        chatbox: {
          active: false,
          channelActiveView: false,
          chatActiveView: false,
        }
      });
      // Clear load messages time interval
      if (this.state.activeChannelInterval) {
        clearInterval(this.state.activeChannelInterval);
      }
    }
    e.stopPropagation();
    return false;
  }

  componentDidMount() {
    // Attach click listener to dom to close chatbox if clicked outside
    addEventListener('click', (e) => {
      // Check if chatbox is active
      return this.state.chatbox.active ? this.closeChatBox(e) : null
    });
  }

  render() {
    // If Slack communications have failed or errored out
    // do not render anything
    if (this.state.failed) {
      return false;
    }
    // Looks like nothing failed, let's start to render our chatbox
    const chatbox = <div>
      <div className={classNames('card transition', this.state.chatbox.active ? 'active' : '', this.state.chatbox.chatActiveView ? 'chat-active' : '')} onClick={this.openChatBox}>
        <div className='help-header'>
          <h2 className='transition'>{this.props.helpText || 'Help?'}</h2>
          <h2 className='sub-text'>Click on a channel to interact.</h2>
        </div>
        <div className='card_circle transition'></div>
        <div className={classNames('channels transition', this.state.chatbox.channelActiveView ? 'channel-active' : '')}>
          {
            this.state.channels.map((channel) =>
            <div className='contact' key={channel.id} onClick={ (e) => this.goToChatView(e, channel) }>
              <img src='http://discoverycrc.com/wp-content/uploads/2014/09/Community-Icon.png' alt='' className='contact__photo' />
              <span className='contact__name'>{channel.name}</span>
              <span className='contact__status online'></span>
            </div>
            )
          }
        </div>
        <div className={classNames('chat')}>
          <div className='chat-header'>
            <span className='chat__back' onClick={this.goToChannelView}></span>
            <div className='chat__person'>
              <span className='chat__status'>status</span>
              <span className='chat__online active'></span>
              <span className='chat__name'>{this.state.activeChannel.name}</span>
              <img src='http://discoverycrc.com/wp-content/uploads/2014/09/Community-Icon.png' alt='' className='channel__header__photo' />
            </div>
          </div>
          <div className='chat__messages' ref='reactSlakChatMessages'>
            <div className='chat__msgRow mine'>
              <div className='chat__message'>Such SVG, much Javascript, very CSS!</div>
            </div>
            <div className='chat__msgRow notMine'>
              <div className='chat__message'>Wow!</div>
            </div>
            {
              this.state.messages.map((message) => this.displayFormattedMessage(message))
            }
          </div>
          <input type='text' className='chat__input'
            value={this.state.postMyMessage}
            placeholder='Enter your message...'
            onKeyPress={(e) => e.key === 'Enter' ? this.postMessage(this.state.postMyMessage) : null}
            onChange={ (e) => this.handleChange(e) }
          />
        </div>
      </div>
    </div>;

    return (
      <div>
        {chatbox}
      </div>
    );
  }
}

// PropTypes validation
ReactSlackChat.propTypes = {
  apiToken: PropTypes.string.isRequired,
  channelId: PropTypes.array.isRequired,
  botName: PropTypes.string,
  helpText: PropTypes.string,
  userImage: PropTypes.string
};

export default ReactSlackChat;
