import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import { rtm, channels, chat } from 'slack';
import { load as emojiLoader, parse as emojiParser } from 'gh-emoji';

import User from './User';
import styles from './ReactSlackChat.scss';

export class ReactSlackChat extends Component {
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
      messages: [],
      postMyMessage: '',
      postMyFile: '',
      chatbox: {
        active: false,
        channelActiveView: false,
        chatActiveView: false
      }
    };
    // Set class variables
    this.refreshTime = 2000;
    this.activeChannel = [];
    this.activeChannelInterval = null;
    this.messageFormatter = {
      emoji: false // default
    };
    this.fileUploadTitle = `Posted by ${this.props.botName}`;
    // Bind Slack Message functions
    this.loadMessages = this.loadMessages.bind(this);
    this.getUserImg = this.getUserImg.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.postMessage = this.postMessage.bind(this);
    this.postFile = this.postFile.bind(this);
    this.isSystemMessage = this.isSystemMessage.bind(this);
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
        this.messageFormatter = {
          emoji: true
        };
      })
      .catch((err) => this.debugLog(`Cant initiate emoji library ${err}`));
    // Connect bot
    this.connectBot(this)
      .then((data) => {
        this.debugLog('got data', data);
        this.setState({
          onlineUsers: data.onlineUsers,
          channels: data.channels
        });
      })
      .catch((err) => {
        this.debugLog('could not intialize slack bot', err);
        this.setState({
          failed: true
        });
      });
  }

  debugLog(...args) {
    if (process.env.NODE_ENV !== 'production' || this.props.debugMode) {
      return console.log('[ReactSlackChat]', ...args);
    }
  }

  arraysIdentical(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  isSystemMessage(message) {
    const systemMessageRegex = /<@.[^|]*[|].*>/;
    return systemMessageRegex.test(message.text) &&
      message.text.indexOf(message.user) > -1;
  }

  hasEmoji(text) {
    const chatHasEmoji = /(:[:a-zA-Z\/_]*:)/;
    return chatHasEmoji.test(text);
  }

  hasAttachment(text) {
    // Get image url REGEX: uploaded a file: <(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*))
    // 1st match will give us full match
    // 2nd match will give us complete attachment URL
    const systemAttachmentAttached = /uploaded a file: <(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*))/;
    return text.match(systemAttachmentAttached);
  }

  displayFormattedMessage(message) {
    // messages text
    let messageText = message.text;
    // who's message is this?
    const myMessage = message.username === this.props.botName;
    // Check to see if this is a Slack System message?
    if (this.isSystemMessage(message)) {
      // message.text is a system message
      // try to see if it has an attachment in it
      const hasAttachment = this.hasAttachment(message.text);
      if (hasAttachment && hasAttachment[0]) {
        // An attachment is found
        // Point to file available for download
        if (hasAttachment[1]) {
          // image file found
          const didIPostIt = message.text.indexOf(this.fileUploadTitle) > -1;
          const fileNameFromUrl = hasAttachment[1].split('/');
          return <div className={classNames(styles.chat__msgRow, didIPostIt ? styles.mine : styles.notMine)} key={message.ts}>
            {
              didIPostIt
                // show customer image
                ? <img src={this.props.userImage} className={styles.user__contact__photo} alt='userIcon' />
                : null
            }
            <div className={classNames(styles.chat__message, didIPostIt ? styles.mine : styles.notMine)}>
              <strong>Sent an Attachment: </strong>
              <span>{fileNameFromUrl[fileNameFromUrl.length - 1]}</span>
              <hr/>
              <a href={hasAttachment[1]} target='_blank'>
                <span>Click to Download</span>
              </a>
            </div>
            {
              // Show remote users image only if message isn't customers
              !didIPostIt
                ? this.getUserImg(message.user || message.username)
                : null
            }
          </div>;
        }
      }
      // else we display a system message that doesn't belong to
      // anyone
      return <div className={classNames(styles.chat__msgRow)} key={message.ts}>
        <div className={classNames(styles.chat__message, styles.system__message)} dangerouslySetInnerHTML={{__html: messageText}}>
        </div>
      </div>;
    }
    // check if user was mentioned by anyone else remotely
    const wasIMentioned = !myMessage && message.text.indexOf(`@${this.props.botName}`) > -1;
    const textHasEmoji = this.hasEmoji(messageText);
    // check if emoji library is enabled
    if (this.messageFormatter.emoji && textHasEmoji) {
      // parse plain text to emoji
      messageText = emojiParser(messageText);
    }
    return <div className={classNames(styles.chat__msgRow, myMessage ? styles.mine : styles.notMine)} key={message.ts}>
      {
        myMessage
          // show customer image
          ? <img src={this.props.userImage} className={styles.user__contact__photo} alt='userIcon' />
          : null
      }
      {
        textHasEmoji
        // dangerouslySetInnerHTML only if text has Emoji
        ? <div className={classNames(styles.chat__message, wasIMentioned ? styles.mentioned : '')} dangerouslySetInnerHTML={{__html: messageText}}></div>
        // else display it normally
        : <div className={classNames(styles.chat__message, wasIMentioned ? styles.mentioned : '')}>
            {messageText}
          </div>
      }
      {
        // Show remote users image only if message isn't customers
        !myMessage
          ? this.getUserImg(message.user || message.username)
          : null
      }
    </div>;
  }

  isValidOnlineUser(user) {
    // return true if
    // user should be active / online
    // user.presence === 'active' &&
    return !user.is_bot;
      // And is NOT a bot
      // slackbot hack, it thinks its not a bot :/
      // && user.name.indexOf('slackbot') === -1;
  }

  connectBot() {
    return new Promise((resolve, reject) => {
      try {
        // start the bot, get the initial payload
        this.bot.started((payload) => {
          this.debugLog(payload);
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
          });
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
          this.debugLog(`There was an error loading messages for ${channel.name}. ${err}`);
          return this.setState({
            failed: true
          });
        }
        // loaded channel history
        this.debugLog('got data', data);
        // Scroll down only if the stored messages and received messages are not the same
        // reverse() mutates the array
        if (!this.arraysIdentical(this.state.messages, data.messages.reverse())) {
          // Got new messages
          return this.setState({
            messages: data.messages
          }, () => {
            // if div is already scrolled to bottom, scroll down again just incase a new message has arrived
            const chatMessages = this.refs.reactSlakChatMessages;
            chatMessages.scrollTop = (chatMessages.scrollHeight < chatMessages.scrollTop + 550 ||
              messagesLength === 0)
              ? chatMessages.scrollHeight
              : chatMessages.scrollTop;
          });
        }
        return;
      });
    };
    // Call it once
    getMessagesFromSlack();
    // Set the function to be called at regular intervals
    // get the history of channel at regular intevals
    this.activeChannelInterval = setInterval(getMessagesFromSlack, this.refreshTime);
  }

  getUserImg(userId) {
    let image;
    this.state.onlineUsers.map((user) => {
      if (user.id === userId) {
        image = user.image;
      }
    });
    const imageToReturn = image
      ? <img src={image} className={styles.chat__contact__photo} alt='mentionedUserImg' />
      : <div className={styles.user__contact__generated__image}>{userId.charAt(0)}</div>;
    return imageToReturn;
  }

  handleChange(e) {
    this.setState({
      postMyMessage: e.target.value
    });
    return;
  }

  handleFileChange(e) {
    this.debugLog('Going to upload', e.target.value, e.target);
    const fileToUpload = this.refs.chat__upload.files[0];
    return this.setState({
      postMyFile: e.target.value,
      // show the loader
      fileUploadLoader: true
      // Upload file in callback of this setstate
    }, () => this.postFile(fileToUpload, () => this.setState({
      // Upload is done, once this callback is hit
      // We can take off the value and hide the loader
      postMyFile: '',
      fileUploadLoader: false
    })));
  }

  postFile(fileToUpload, cb) {
    this.debugLog('UPLOADING', fileToUpload);
    const options = {
      token: this.props.apiToken,
      title: this.fileUploadTitle, // change the regex in this.hasAttachment if you change this
      filename: fileToUpload.name,
      filetype: 'auto',
      channels: this.activeChannel.id
    };
    const form = new FormData();
    form.append('token', options.token);
    form.append('filename', options.filename);
    form.append('title', options.title);
    form.append('filetype', options.filetype);
    form.append('channels', options.channels);
    form.append('file', new Blob([fileToUpload]));
    const request = new XMLHttpRequest();
    request.open('POST', 'https://slack.com/api/files.upload');
    request.send(form);
    request.onload = () => {
      if (request.status !== 200) {
        this.debugLog('There was an error uploading the file. Response:', request.status, request.responseText);
      }
      return cb();
    };
  }

  postMessage(text) {
    if (text !== '') {
      return chat.postMessage({
        token: this.props.apiToken,
        channel: this.activeChannel.id,
        text,
        username: this.props.botName
      }, (err, data) => {
        if (err) {
          this.debugLog('failed to post', data, 'err:', err);
          return;
        }
        this.debugLog('Successfully posted message', text, 'response:', data);
        this.setState({
          postMyMessage: '',
          sendingLoader: false
        }, () => {
          // Adjust scroll height
          setTimeout(() => {
            const chatMessages = this.refs.reactSlakChatMessages;
            chatMessages.scrollTop = chatMessages.scrollHeight;
          }, this.refreshTime);
        });
        return this.forceUpdate();
      });
    }
  }

  goToChannelView(e) {
    // stop propagation so we can prevent any other click events from firing
    e.stopPropagation();
    // Close Chat box only if not already open
    if (this.state.chatbox.active) {
      this.setState({
        chatbox: {
          active: true,
          channelActiveView: true,
          chatActiveView: false
        },
        messages: []
      });
      this.activeChannel = [];
      // Clear load messages time interval
      if (this.activeChannelInterval) {
        clearInterval(this.activeChannelInterval);
        this.activeChannelInterval = null;
      }
    }
    return false;
  }

  goToChatView(e, channel) {
    // stop propagation so we can prevent any other click events from firing
    e.stopPropagation();
    // Close Chat box only if not already open
    if (this.state.chatbox.active) {
      this.activeChannel = channel;
      this.setState({
        chatbox: {
          active: true,
          channelActiveView: false,
          chatActiveView: true
        }
      }, () => this.loadMessages(channel));
      // Set this channel as active channel
    }
    return false;
  }

  openChatBox(e) {
    // stop propagation so we can prevent any other click events from firing
    e.stopPropagation();
    // persist click event to stopPropagation later
    e.persist();
    // Open Chat box only if not already open
    if (!this.state.chatbox.active) {
      this.setState({
        chatbox: {
          active: true,
          channelActiveView: true,
          chatActiveView: false
        }
      }, () => {
        // Look to see if an active channel was already chosen...
        if (Object.keys(this.activeChannel).length > 0) {
          // If yes, load that chat view instead
          this.goToChatView(e, this.activeChannel);
        }
      });
    }
    return false;
  }

  closeChatBox(e) {
    // stop propagation so we can prevent any other click events from firing
    e.stopPropagation();
    // Close Chat box only if not already open
    if (this.state.chatbox.active) {
      this.setState({
        chatbox: {
          active: false,
          channelActiveView: false,
          chatActiveView: false
        }
      }, () => {
        // Clear load messages time interval
        if (this.activeChannelInterval) {
          clearInterval(this.activeChannelInterval);
        }
      });
    }
    return false;
  }

  componentDidMount() {
    // Attach click listener to dom to close chatbox if clicked outside
    addEventListener('click', (e) => {
      // Check if chatbox is active
      return this.state.chatbox.active ? this.closeChatBox(e) : null;
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
      <div className={classNames(styles.card, styles.transition, this.state.chatbox.active ? styles.active : '', this.state.chatbox.chatActiveView ? styles.chatActive : '')} onClick={this.openChatBox}>
        <div className={styles.helpHeader}>
          <h2 className={styles.transition}>{this.props.helpText || 'Help?'}</h2>
          <h2 className={styles.subText}>Click on a channel to interact.</h2>
        </div>
        <div className={classNames(styles.card_circle, styles.transition)}></div>
        <div className={classNames(styles.channels, styles.transition, this.state.chatbox.channelActiveView ? styles.channelActive : '')}>
          {
            this.state.channels.map((channel) =>
            <div className={styles.contact} key={channel.id} onClick={ (e) => this.goToChatView(e, channel) }>
              <img src='http://discoverycrc.com/wp-content/uploads/2014/09/Community-Icon.png' alt='contactIcon' className={styles.contact__photo} />
              <span className={styles.contact__name}>{channel.name}</span>
              <span className={classNames(styles.contact__status, styles.online)}></span>
            </div>
            )
          }
        </div>
        <div className={classNames(styles.chat)}>
          <div className={styles.chatHeader}>
            <span className={styles.chat__back} onClick={this.goToChannelView}></span>
            <div className={styles.chat__person}>
              <span className={styles.chat__status}>status</span>
              <span className={classNames(styles.chat__online, styles.active)}></span>
              <span className={styles.chat__name}>{this.activeChannel.name}</span>
              <img src='http://discoverycrc.com/wp-content/uploads/2014/09/Community-Icon.png' alt='channelIcon' className={styles.channel__header__photo} />
            </div>
          </div>
          <div className={styles.chat__messages} ref='reactSlakChatMessages'>
            {
              this.state.messages.map((message) => this.displayFormattedMessage(message))
            }
          </div>
          <div>
            {
              this.state.fileUploadLoader
              ? <div className={styles.chat__file__uploading}>
                <span className={styles.loading}>Uploading</span>
              </div>
              : null
            }
            {
              !this.state.fileUploadLoader
              ? <div>
                  <div className={styles.attachment}>
                    <label htmlFor='chat__upload' className={styles.attachmentIcon}>
                      <input
                        type='file'
                        id='chat__upload'
                        className={styles.chat__upload}
                        ref='chat__upload'
                        value={this.state.postMyFile}
                        onChange={(e) => this.handleFileChange(e)}
                      />
                    </label>
                  </div>
                  <input type='text' className={styles.chat__input}
                    value={this.state.postMyMessage}
                    placeholder='Enter your message...'
                    onKeyPress={(e) => e.key === 'Enter' ? this.postMessage(this.state.postMyMessage) : null}
                    onChange={ (e) => this.handleChange(e) }
                  />
              </div>
              : null
            }
          </div>
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
  userImage: PropTypes.string,
  debugMode: PropTypes.bool
};
