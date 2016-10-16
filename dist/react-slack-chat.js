(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactSlackChat"] = factory(require("react"));
	else
		root["ReactSlackChat"] = factory(root["react"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ReactSlackChat = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(3);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _slack = __webpack_require__(4);

	var _ghEmoji = __webpack_require__(142);

	var _User = __webpack_require__(143);

	var _User2 = _interopRequireDefault(_User);

	__webpack_require__(144);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ReactSlackChat = exports.ReactSlackChat = function (_Component) {
	  _inherits(ReactSlackChat, _Component);

	  function ReactSlackChat(args) {
	    _classCallCheck(this, ReactSlackChat);

	    // Create Bot
	    var _this = _possibleConstructorReturn(this, (ReactSlackChat.__proto__ || Object.getPrototypeOf(ReactSlackChat)).call(this, args));

	    _this.bot = _slack.rtm.client();
	    // setup state
	    _this.state = {
	      // failed flag
	      failed: false,
	      // List of Online users
	      onlineUsers: [],
	      channels: [],
	      messages: [],
	      postMyMessage: '',
	      chatbox: {
	        active: false,
	        channelActiveView: false,
	        chatActiveView: false
	      }
	    };
	    // Set class variables
	    _this.refreshTime = 2000;
	    _this.activeChannel = [];
	    _this.activeChannelInterval = null;
	    _this.messageFormatter = {
	      emoji: false //default
	    };
	    // Bind Slack Message functions
	    _this.loadMessages = _this.loadMessages.bind(_this);
	    _this.getUserImg = _this.getUserImg.bind(_this);
	    _this.handleChange = _this.handleChange.bind(_this);
	    _this.postMessage = _this.postMessage.bind(_this);
	    // Bind UI Animation functions
	    _this.openChatBox = _this.openChatBox.bind(_this);
	    _this.closeChatBox = _this.closeChatBox.bind(_this);
	    _this.goToChatView = _this.goToChatView.bind(_this);
	    _this.goToChannelView = _this.goToChannelView.bind(_this);
	    // Utils
	    _this.displayFormattedMessage = _this.displayFormattedMessage.bind(_this);

	    // Initiate Emoji Library
	    (0, _ghEmoji.load)().then(function () {
	      _this.messageFormatter = {
	        emoji: true
	      };
	    }).catch(function (err) {
	      return _this.debugLog('Cant initiate emoji library ' + err);
	    });
	    // Connect bot
	    _this.connectBot(_this).then(function (data) {
	      _this.debugLog('got data', data);
	      _this.setState({
	        onlineUsers: data.onlineUsers,
	        channels: data.channels
	      });
	    }).catch(function (err) {
	      _this.debugLog('could not intialize slack bot', err);
	      _this.setState({
	        failed: true
	      });
	    });
	    return _this;
	  }

	  _createClass(ReactSlackChat, [{
	    key: 'debugLog',
	    value: function debugLog() {
	      console.log(("production"));
	      if (("production") !== 'production' || this.props.debugMode) {
	        var _console;

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        return (_console = console).log.apply(_console, ['[ReactSlackChat]'].concat(args));
	      }
	    }
	  }, {
	    key: 'arraysIdentical',
	    value: function arraysIdentical(a, b) {
	      return JSON.stringify(a) === JSON.stringify(b);
	    }
	  }, {
	    key: 'displayFormattedMessage',
	    value: function displayFormattedMessage(message) {
	      // messages text
	      var messageText = message.text;
	      // who's message is this?
	      var myMessage = message.username === this.props.botName;
	      // check if emoji library is enabled
	      if (this.messageFormatter.emoji) {
	        // parse plain text to emoji
	        messageText = (0, _ghEmoji.parse)(messageText);
	      }
	      // check if user was mentioned by anyone else remotely
	      var wasIMentioned = !myMessage && message.text.indexOf('@' + this.props.botName) > -1;
	      return _react2.default.createElement(
	        'div',
	        { className: (0, _classnames2.default)('chat__msgRow', myMessage ? 'mine' : 'notMine'), key: message.ts },
	        myMessage
	        // show customer image
	        ? this.props.userImage ? _react2.default.createElement('img', { src: this.props.userImage, className: 'user__contact__photo' }) : _react2.default.createElement(
	          'div',
	          { className: 'user__contact__generated__image' },
	          this.props.botName.charAt(0)
	        ) : null,
	        _react2.default.createElement('div', { className: (0, _classnames2.default)('chat__message', wasIMentioned ? 'mentioned' : ''), dangerouslySetInnerHTML: { __html: messageText } }),

	        // Show remote users image only if message isn't customers
	        !myMessage ? _react2.default.createElement('img', { src: this.getUserImg(message.user), alt: '', className: 'chat__contact__photo' }) : null
	      );
	    }
	  }, {
	    key: 'isValidOnlineUser',
	    value: function isValidOnlineUser(user) {
	      // return true if
	      // user should be active / online
	      // user.presence === 'active' &&
	      return !user.is_bot &&
	      // And is NOT a bot
	      // slackbot hack, it thinks its not a bot :/
	      user.name.indexOf('slackbot') === -1;
	    }
	  }, {
	    key: 'connectBot',
	    value: function connectBot() {
	      var _this2 = this;

	      return new Promise(function (resolve, reject) {
	        try {
	          // start the bot, get the initial payload
	          _this2.bot.started(function (payload) {
	            _this2.debugLog(payload);
	            // Create new User object for each online user found
	            // Add to our list only if the user is valid
	            var onlineUsers = [];
	            // extract and resolve return the users
	            payload.users.map(function (user) {
	              return _this2.isValidOnlineUser(user) ? onlineUsers.push(new _User2.default(user)) : null;
	            });
	            // get the channels we need
	            var channels = [];
	            payload.channels.map(function (channel) {
	              // This channel is requested
	              _this2.props.channelId.indexOf(channel.id) > -1 ? channels.push(channel) : null;
	            });
	            return resolve({ channels: channels, onlineUsers: onlineUsers });
	          });
	          // tell the bot to listen
	          _this2.bot.listen({ token: _this2.props.apiToken });
	        } catch (err) {
	          return reject(err);
	        }
	      });
	    }
	  }, {
	    key: 'loadMessages',
	    value: function loadMessages(channel) {
	      var _this3 = this;

	      var that = this;
	      // define loadMessages function
	      var getMessagesFromSlack = function getMessagesFromSlack() {
	        var messagesLength = that.state.messages.length;
	        _slack.channels.history({
	          token: _this3.props.apiToken,
	          channel: channel.id
	        }, function (err, data) {
	          if (err) {
	            _this3.debugLog('There was an error loading messages for ' + channel.name + '. ' + err);
	            return _this3.setState({
	              failed: true
	            });
	          }
	          // loaded channel history
	          _this3.debugLog('got data', data);
	          // Scroll down only if the stored messages and received messages are not the same
	          // reverse() mutates the array
	          if (!_this3.arraysIdentical(_this3.state.messages, data.messages.reverse())) {
	            // Got new messages
	            return _this3.setState({
	              messages: data.messages
	            }, function () {
	              // if div is already scrolled to bottom, scroll down again just incase a new message has arrived
	              var chatMessages = _this3.refs.reactSlakChatMessages;
	              chatMessages.scrollHeight < chatMessages.scrollTop + 550 || messagesLength === 0 ? chatMessages.scrollTop = chatMessages.scrollHeight : null;
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
	  }, {
	    key: 'getUserImg',
	    value: function getUserImg(userId) {
	      var image = void 0;
	      this.state.onlineUsers.map(function (user) {
	        if (user.id === userId) {
	          image = user.image;
	        }
	      });
	      return image;
	    }
	  }, {
	    key: 'handleChange',
	    value: function handleChange(e) {
	      this.setState({
	        postMyMessage: e.target.value
	      });
	      if (e.key === 'Enter') {
	        this.debugLog('do postMessage');
	        this.postMessage(this.state.postMyMessage);
	      }
	      return;
	    }
	  }, {
	    key: 'postMessage',
	    value: function postMessage(text) {
	      var _this4 = this;

	      this.debugLog('Posting message');
	      _slack.chat.postMessage({
	        token: this.props.apiToken,
	        channel: this.activeChannel.id,
	        text: text,
	        username: this.props.botName
	      }, function (err, data) {
	        if (err) {
	          _this4.debugLog('failed to post', data, 'err:', err);
	          return;
	        }
	        _this4.debugLog('Successfully posted message', text, 'response:', data);
	        // Adjust scroll height
	        setTimeout(function () {
	          var chatMessages = _this4.refs.reactSlakChatMessages;
	          chatMessages.scrollTop = chatMessages.scrollHeight;
	        }, _this4.refreshTime);
	        _this4.setState({
	          postMyMessage: ''
	        });
	        _this4.forceUpdate();
	      });
	    }
	  }, {
	    key: 'goToChannelView',
	    value: function goToChannelView(e) {
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
	  }, {
	    key: 'goToChatView',
	    value: function goToChatView(e, channel) {
	      var _this5 = this;

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
	        }, function () {
	          return _this5.loadMessages(channel);
	        });
	        // Set this channel as active channel
	      }
	      return false;
	    }
	  }, {
	    key: 'openChatBox',
	    value: function openChatBox(e) {
	      var _this6 = this;

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
	        }, function () {
	          // Look to see if an active channel was already chosen...
	          if (Object.keys(_this6.activeChannel).length > 0) {
	            // If yes, load that chat view instead
	            _this6.goToChatView(e, _this6.activeChannel);
	          }
	        });
	      }
	      return false;
	    }
	  }, {
	    key: 'closeChatBox',
	    value: function closeChatBox(e) {
	      var _this7 = this;

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
	        }, function () {
	          // Clear load messages time interval
	          if (_this7.activeChannelInterval) {
	            clearInterval(_this7.activeChannelInterval);
	          }
	        });
	      }
	      return false;
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this8 = this;

	      // Attach click listener to dom to close chatbox if clicked outside
	      addEventListener('click', function (e) {
	        // Check if chatbox is active
	        return _this8.state.chatbox.active ? _this8.closeChatBox(e) : null;
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this9 = this;

	      // If Slack communications have failed or errored out
	      // do not render anything
	      if (this.state.failed) {
	        return false;
	      }
	      // Looks like nothing failed, let's start to render our chatbox
	      var chatbox = _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'div',
	          { className: (0, _classnames2.default)('card transition', this.state.chatbox.active ? 'active' : '', this.state.chatbox.chatActiveView ? 'chat-active' : ''), onClick: this.openChatBox },
	          _react2.default.createElement(
	            'div',
	            { className: 'help-header' },
	            _react2.default.createElement(
	              'h2',
	              { className: 'transition' },
	              this.props.helpText || 'Help?'
	            ),
	            _react2.default.createElement(
	              'h2',
	              { className: 'sub-text' },
	              'Click on a channel to interact.'
	            )
	          ),
	          _react2.default.createElement('div', { className: 'card_circle transition' }),
	          _react2.default.createElement(
	            'div',
	            { className: (0, _classnames2.default)('channels transition', this.state.chatbox.channelActiveView ? 'channel-active' : '') },
	            this.state.channels.map(function (channel) {
	              return _react2.default.createElement(
	                'div',
	                { className: 'contact', key: channel.id, onClick: function onClick(e) {
	                    return _this9.goToChatView(e, channel);
	                  } },
	                _react2.default.createElement('img', { src: 'http://discoverycrc.com/wp-content/uploads/2014/09/Community-Icon.png', alt: '', className: 'contact__photo' }),
	                _react2.default.createElement(
	                  'span',
	                  { className: 'contact__name' },
	                  channel.name
	                ),
	                _react2.default.createElement('span', { className: 'contact__status online' })
	              );
	            })
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: (0, _classnames2.default)('chat') },
	            _react2.default.createElement(
	              'div',
	              { className: 'chat-header' },
	              _react2.default.createElement('span', { className: 'chat__back', onClick: this.goToChannelView }),
	              _react2.default.createElement(
	                'div',
	                { className: 'chat__person' },
	                _react2.default.createElement(
	                  'span',
	                  { className: 'chat__status' },
	                  'status'
	                ),
	                _react2.default.createElement('span', { className: 'chat__online active' }),
	                _react2.default.createElement(
	                  'span',
	                  { className: 'chat__name' },
	                  this.activeChannel.name
	                ),
	                _react2.default.createElement('img', { src: 'http://discoverycrc.com/wp-content/uploads/2014/09/Community-Icon.png', alt: '', className: 'channel__header__photo' })
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'chat__messages', ref: 'reactSlakChatMessages' },
	              _react2.default.createElement(
	                'div',
	                { className: 'chat__msgRow mine' },
	                _react2.default.createElement(
	                  'div',
	                  { className: 'chat__message' },
	                  'Such SVG, much Javascript, very CSS!'
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'chat__msgRow notMine' },
	                _react2.default.createElement(
	                  'div',
	                  { className: 'chat__message' },
	                  'Wow!'
	                )
	              ),
	              this.state.messages.map(function (message) {
	                return _this9.displayFormattedMessage(message);
	              })
	            ),
	            _react2.default.createElement('input', { type: 'text', className: 'chat__input',
	              value: this.state.postMyMessage,
	              placeholder: 'Enter your message...',
	              onKeyPress: function onKeyPress(e) {
	                return e.key === 'Enter' ? _this9.postMessage(_this9.state.postMyMessage) : null;
	              },
	              onChange: function onChange(e) {
	                return _this9.handleChange(e);
	              }
	            })
	          )
	        )
	      );

	      return _react2.default.createElement(
	        'div',
	        null,
	        chatbox
	      );
	    }
	  }]);

	  return ReactSlackChat;
	}(_react.Component);

	// PropTypes validation


	ReactSlackChat.propTypes = {
	  apiToken: _react.PropTypes.string.isRequired,
	  channelId: _react.PropTypes.array.isRequired,
	  botName: _react.PropTypes.string,
	  helpText: _react.PropTypes.string,
	  userImage: _react.PropTypes.string,
	  debugMode: _react.PropTypes.bool
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _api = __webpack_require__(5);

	var _api2 = _interopRequireDefault(_api);

	var _api3 = __webpack_require__(22);

	var _api4 = _interopRequireDefault(_api3);

	var _bots = __webpack_require__(123);

	var _bots2 = _interopRequireDefault(_bots);

	var _auth = __webpack_require__(23);

	var _auth2 = _interopRequireDefault(_auth);

	var _channels = __webpack_require__(124);

	var _channels2 = _interopRequireDefault(_channels);

	var _chat = __webpack_require__(125);

	var _chat2 = _interopRequireDefault(_chat);

	var _dnd = __webpack_require__(126);

	var _dnd2 = _interopRequireDefault(_dnd);

	var _emoji = __webpack_require__(48);

	var _emoji2 = _interopRequireDefault(_emoji);

	var _files = __webpack_require__(127);

	var _files2 = _interopRequireDefault(_files);

	var _groups = __webpack_require__(128);

	var _groups2 = _interopRequireDefault(_groups);

	var _im = __webpack_require__(129);

	var _im2 = _interopRequireDefault(_im);

	var _mpim = __webpack_require__(130);

	var _mpim2 = _interopRequireDefault(_mpim);

	var _oauth = __webpack_require__(131);

	var _oauth2 = _interopRequireDefault(_oauth);

	var _reactions = __webpack_require__(132);

	var _reactions2 = _interopRequireDefault(_reactions);

	var _reminders = __webpack_require__(133);

	var _reminders2 = _interopRequireDefault(_reminders);

	var _pins = __webpack_require__(134);

	var _pins2 = _interopRequireDefault(_pins);

	var _rtm = __webpack_require__(135);

	var _rtm2 = _interopRequireDefault(_rtm);

	var _rtm3 = __webpack_require__(96);

	var _rtm4 = _interopRequireDefault(_rtm3);

	var _search = __webpack_require__(137);

	var _search2 = _interopRequireDefault(_search);

	var _stars = __webpack_require__(138);

	var _stars2 = _interopRequireDefault(_stars);

	var _team = __webpack_require__(139);

	var _team2 = _interopRequireDefault(_team);

	var _usergroups = __webpack_require__(140);

	var _usergroups2 = _interopRequireDefault(_usergroups);

	var _users = __webpack_require__(141);

	var _users2 = _interopRequireDefault(_users);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var describe = '\n  slack\n    api.client(token)\n    api.test(params, (err, data)=>)\n    auth.test(token, (err, data)=>)\n    bots.info\n    channels.archive({token, channel}, (err, data)=>)\n    channels.create({token, name}, (err, data)=>)\n    channels.history({token, channel}, (err, data)=>)\n    channels.info\n    channels.invite\n    channels.join\n    channels.kick\n    channels.leave\n    channels.list({token, exclude_archived}, (err, data)=>)\n    channels.mark\n    channels.rename\n    channels.setPurpose\n    channels.setTopic\n    channels.unarchive\n    chat.delete\n    chat.postMessage({token, text, channel}, (err, data)=>)\n    chat.update\n    emoji.list\n    files.delete\n    files.info\n    files.list\n    files.upload\n    groups.archive\n    groups.close\n    groups.create\n    groups.createChild\n    groups.history\n    groups.info\n    groups.invite\n    groups.kick\n    groups.leave\n    groups.list\n    groups.mark\n    groups.open\n    groups.rename\n    groups.setPurpose\n    groups.setTopic\n    groups.unarchive\n    im.close\n    im.history\n    im.list\n    im.mark\n    im.open\n    mpim.close\n    mpim.history\n    mpim.list\n    mpim.mark\n    mpim.open\n    oauth.access({client_id, client_secret, code}, (err, data)=>)\n    pins.add\n    pins.list\n    pins.remove\n    reactions.add\n    reactions.get\n    reactions.list\n    reactions.remove\n    reminders.add\n    reminders.complete\n    reminders.delete\n    reminders.info\n    reminders.list\n    rtm.client()\n    rtm.start({token}, (err, data)=>)\n    search.all\n    search.files\n    search.messages\n    stars.add\n    stars.list\n    stars.remove\n    team.acccessLogs\n    team.billableInfo\n    team.info(token, (err, data)=>)\n    team.integrationLogs\n    team.profile.get\n    usergroups.create\n    usergroups.disable\n    usergroups.enable\n    usergroups.list\n    usergroups.update\n    usergroups.users.list\n    usergroups.users.update\n    users.getPresence\n    users.identity\n    users.info\n    users.list(token, (err, data)=>)\n    users.setActive\n    users.setPresence\n';

	exports.default = {
	  describe: describe,
	  api: { test: _api2.default, client: _api4.default },
	  auth: { test: _auth2.default },
	  bots: _bots2.default,
	  channels: _channels2.default,
	  chat: _chat2.default,
	  dnd: _dnd2.default,
	  emoji: { list: _emoji2.default },
	  files: _files2.default,
	  groups: _groups2.default,
	  im: _im2.default,
	  mpim: _mpim2.default,
	  oauth: { access: _oauth2.default },
	  reactions: _reactions2.default,
	  reminders: _reminders2.default,
	  pins: _pins2.default,
	  rtm: { client: _rtm2.default, start: _rtm4.default },
	  search: _search2.default,
	  stars: _stars2.default,
	  team: _team2.default,
	  usergroups: _usergroups2.default,
	  users: _users2.default
	};
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = apitest;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function apitest(params, callback) {
	  var ns = 'api.test';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = exec;

	var _httpplease = __webpack_require__(7);

	var _httpplease2 = _interopRequireDefault(_httpplease);

	var _queryString = __webpack_require__(17);

	var _queryString2 = _interopRequireDefault(_queryString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function exec(ns, json, callback) {

	  var query = _queryString2.default.stringify(json);
	  var baseUrl = 'https://slack.com/api/';
	  var url = '' + baseUrl + ns + '?' + query;
	  var rateLimit = 'You are sending too many requests. Please relax.';

	  _httpplease2.default.get(url, function (err, res) {
	    if (err) {
	      // if request failed bubble the error
	      callback(err);
	    } else if (res.body.error) {
	      // if Slack returns an error bubble the error
	      callback(Error(res.body.error));
	    } else if (typeof res.body === 'string' && res.body.includes(rateLimit)) {
	      // sometimes you need to chill out
	      callback(Error('rate_limit'));
	    } else {
	      // success! clean up the response
	      var _json = JSON.parse(res.body);
	      if (_json.ok) {
	        delete _json.ok;
	        callback(null, _json);
	      } else {
	        callback(Error(_json.error));
	      }
	    }
	  });
	  /// eom
	}
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var
	  cleanURL = __webpack_require__(8),
	  XHR = __webpack_require__(9),
	  delay = __webpack_require__(10),
	  RequestError = __webpack_require__(11),
	  Response = __webpack_require__(12),
	  Request = __webpack_require__(13),
	  extend = __webpack_require__(15),
	  once = __webpack_require__(16);

	var i,
	    createError = RequestError.create;

	function factory(defaults, plugins) {
	  defaults = defaults || {};
	  plugins = plugins || [];

	  function http(req, cb) {
	    var xhr, plugin, done, k, timeoutId, supportsLoadAndErrorEvents;

	    req = new Request(extend(defaults, req));

	    for (i = 0; i < plugins.length; i++) {
	      plugin = plugins[i];
	      if (plugin.processRequest) {
	        plugin.processRequest(req);
	      }
	    }

	    // Give the plugins a chance to create the XHR object
	    for (i = 0; i < plugins.length; i++) {
	      plugin = plugins[i];
	      if (plugin.createXHR) {
	        xhr = plugin.createXHR(req);
	        break; // First come, first serve
	      }
	    }
	    xhr = xhr || new XHR();

	    req.xhr = xhr;

	    // Use a single completion callback. This can be called with or without
	    // an error. If no error is passed, the request will be examined to see
	    // if it was successful.
	    done = once(delay(function(rawError) {
	      clearTimeout(timeoutId);
	      xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = xhr.ontimeout = xhr.onprogress = null;

	      var err = getError(req, rawError);

	      var res = err || Response.fromRequest(req);
	      for (i = 0; i < plugins.length; i++) {
	        plugin = plugins[i];
	        if (plugin.processResponse) {
	          plugin.processResponse(res);
	        }
	      }

	      // Invoke callbacks
	      if (err && req.onerror) req.onerror(err);
	      if (!err && req.onload) req.onload(res);
	      if (cb) cb(err, err ? undefined : res);

	    }));

	    supportsLoadAndErrorEvents = ('onload' in xhr) && ('onerror' in xhr);
	    xhr.onload = function() { done(); };
	    xhr.onerror = done;
	    xhr.onabort = function() { done(); };

	    // We'd rather use `onload`, `onerror`, and `onabort` since they're the
	    // only way to reliably detect successes and failures but, if they
	    // aren't available, we fall back to using `onreadystatechange`.
	    xhr.onreadystatechange = function() {
	      if (xhr.readyState !== 4) return;

	      if (req.aborted) return done();

	      if (!supportsLoadAndErrorEvents) {
	        // Assume a status of 0 is an error. This could be a false
	        // positive, but there's no way to tell when using
	        // `onreadystatechange` ):
	        // See matthewwithanm/react-inlinesvg#10.

	        // Some browsers don't like you reading XHR properties when the
	        // XHR has been aborted. In case we've gotten here as a result
	        // of that (either our calling `about()` in the timeout handler
	        // or the user calling it directly even though they shouldn't),
	        // be careful about accessing it.
	        var status;
	        try {
	          status = xhr.status;
	        } catch (err) {}
	        var err = status === 0 ? new Error('Internal XHR Error') : null;
	        return done(err);
	      }
	    };

	    // IE sometimes fails if you don't specify every handler.
	    // See http://social.msdn.microsoft.com/Forums/ie/en-US/30ef3add-767c-4436-b8a9-f1ca19b4812e/ie9-rtm-xdomainrequest-issued-requests-may-abort-if-all-event-handlers-not-specified?forum=iewebdevelopment
	    xhr.ontimeout = function() { /* noop */ };
	    xhr.onprogress = function() { /* noop */ };

	    xhr.open(req.method, req.url);

	    if (req.timeout) {
	      // If we use the normal XHR timeout mechanism (`xhr.timeout` and
	      // `xhr.ontimeout`), `onreadystatechange` will be triggered before
	      // `ontimeout`. There's no way to recognize that it was triggered by
	      // a timeout, and we'd be unable to dispatch the right error.
	      timeoutId = setTimeout(function() {
	        req.timedOut = true;
	        done();
	        try {
	          xhr.abort();
	        } catch (err) {}
	      }, req.timeout);
	    }

	    for (k in req.headers) {
	      if (req.headers.hasOwnProperty(k)) {
	        xhr.setRequestHeader(k, req.headers[k]);
	      }
	    }

	    xhr.send(req.body);

	    return req;
	  }

	  var method,
	    methods = ['get', 'post', 'put', 'head', 'patch', 'delete'],
	    verb = function(method) {
	      return function(req, cb) {
	        req = new Request(req);
	        req.method = method;
	        return http(req, cb);
	      };
	    };
	  for (i = 0; i < methods.length; i++) {
	    method = methods[i];
	    http[method] = verb(method);
	  }

	  http.plugins = function() {
	    return plugins;
	  };

	  http.defaults = function(newValues) {
	    if (newValues) {
	      return factory(extend(defaults, newValues), plugins);
	    }
	    return defaults;
	  };

	  http.use = function() {
	    var newPlugins = Array.prototype.slice.call(arguments, 0);
	    return factory(defaults, plugins.concat(newPlugins));
	  };

	  http.bare = function() {
	    return factory();
	  };

	  http.Request = Request;
	  http.Response = Response;
	  http.RequestError = RequestError;

	  return http;
	}

	module.exports = factory({}, [cleanURL]);

	/**
	 * Analyze the request to see if it represents an error. If so, return it! An
	 * original error object can be passed as a hint.
	 */
	function getError(req, err) {
	  if (req.aborted) return createError('Request aborted', req, {name: 'Abort'});

	  if (req.timedOut) return createError('Request timeout', req, {name: 'Timeout'});

	  var xhr = req.xhr;
	  var type = Math.floor(xhr.status / 100);

	  var kind;
	  switch (type) {
	    case 0:
	    case 2:
	      // These don't represent errors unless the function was passed an
	      // error object explicitly.
	      if (!err) return;
	      return createError(err.message, req);
	    case 4:
	      // Sometimes 4XX statuses aren't errors.
	      if (xhr.status === 404 && !req.errorOn404) return;
	      kind = 'Client';
	      break;
	    case 5:
	      kind = 'Server';
	      break;
	    default:
	      kind = 'HTTP';
	  }
	  var msg = kind + ' Error: ' +
	        'The server returned a status of ' + xhr.status +
	        ' for the request "' +
	        req.method.toUpperCase() + ' ' + req.url + '"';
	  return createError(msg, req);
	}


/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  processRequest: function(req) {
	    req.url = req.url.replace(/[^%]+/g, function(s) {
	      return encodeURI(s);
	    });
	  }
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = window.XMLHttpRequest;


/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	// Wrap a function in a `setTimeout` call. This is used to guarantee async
	// behavior, which can avoid unexpected errors.

	module.exports = function(fn) {
	  return function() {
	    var
	      args = Array.prototype.slice.call(arguments, 0),
	      newFunc = function() {
	        return fn.apply(null, args);
	      };
	    setTimeout(newFunc, 0);
	  };
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Response = __webpack_require__(12);
	var extractResponseProps = __webpack_require__(14);
	var extend = __webpack_require__(15);

	function RequestError(message, props) {
	  var err = new Error(message);
	  err.name = 'RequestError';
	  this.name = err.name;
	  this.message = err.message;
	  if (err.stack) {
	    this.stack = err.stack;
	  }

	  this.toString = function() {
	    return this.message;
	  };

	  for (var k in props) {
	    if (props.hasOwnProperty(k)) {
	      this[k] = props[k];
	    }
	  }
	}

	RequestError.prototype = extend(Error.prototype);
	RequestError.prototype.constructor = RequestError;

	RequestError.create = function(message, req, props) {
	  var err = new RequestError(message, props);
	  Response.call(err, extractResponseProps(req));
	  return err;
	};

	module.exports = RequestError;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Request = __webpack_require__(13);
	var extractResponseProps = __webpack_require__(14);

	function Response(props) {
	  this.request = props.request;
	  this.xhr = props.xhr;
	  this.headers = props.headers || {};
	  this.status = props.status || 0;
	  this.text = props.text;
	  this.body = props.body;
	  this.contentType = props.contentType;
	  this.isHttpError = props.status >= 400;
	}

	Response.prototype.header = Request.prototype.header;

	Response.fromRequest = function(req) {
	  return new Response(extractResponseProps(req));
	};


	module.exports = Response;


/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	function Request(optsOrUrl) {
	  var opts = typeof optsOrUrl === 'string' ? {url: optsOrUrl} : optsOrUrl || {};
	  this.method = opts.method ? opts.method.toUpperCase() : 'GET';
	  this.url = opts.url;
	  this.headers = opts.headers || {};
	  this.body = opts.body;
	  this.timeout = opts.timeout || 0;
	  this.errorOn404 = opts.errorOn404 != null ? opts.errorOn404 : true;
	  this.onload = opts.onload;
	  this.onerror = opts.onerror;
	}

	Request.prototype.abort = function() {
	  if (this.aborted) return;
	  this.aborted = true;
	  this.xhr.abort();
	  return this;
	};

	Request.prototype.header = function(name, value) {
	  var k;
	  for (k in this.headers) {
	    if (this.headers.hasOwnProperty(k)) {
	      if (name.toLowerCase() === k.toLowerCase()) {
	        if (arguments.length === 1) {
	          return this.headers[k];
	        }

	        delete this.headers[k];
	        break;
	      }
	    }
	  }
	  if (value != null) {
	    this.headers[name] = value;
	    return value;
	  }
	};


	module.exports = Request;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var extend = __webpack_require__(15);

	module.exports = function(req) {
	  var xhr = req.xhr;
	  var props = {request: req, xhr: xhr};

	  // Try to create the response from the request. If the request was aborted,
	  // accesssing properties of the XHR may throw an error, so we wrap in a
	  // try/catch.
	  try {
	    var lines, i, m, headers = {};
	    if (xhr.getAllResponseHeaders) {
	      lines = xhr.getAllResponseHeaders().split('\n');
	      for (i = 0; i < lines.length; i++) {
	        if ((m = lines[i].match(/\s*([^\s]+):\s+([^\s]+)/))) {
	          headers[m[1]] = m[2];
	        }
	      }
	    }

	    props = extend(props, {
	      status: xhr.status,
	      contentType: xhr.contentType || (xhr.getResponseHeader && xhr.getResponseHeader('Content-Type')),
	      headers: headers,
	      text: xhr.responseText,
	      body: xhr.response || xhr.responseText
	    });
	  } catch (err) {}

	  return props;
	};


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = extend

	function extend() {
	    var target = {}

	    for (var i = 0; i < arguments.length; i++) {
	        var source = arguments[i]

	        for (var key in source) {
	            if (source.hasOwnProperty(key)) {
	                target[key] = source[key]
	            }
	        }
	    }

	    return target
	}


/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	// A "once" utility.
	module.exports = function(fn) {
	  var result, called = false;
	  return function() {
	    if (!called) {
	      called = true;
	      result = fn.apply(this, arguments);
	    }
	    return result;
	  };
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strictUriEncode = __webpack_require__(18);
	var objectAssign = __webpack_require__(19);

	function encode(value, opts) {
		if (opts.encode) {
			return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
		}

		return value;
	}

	exports.extract = function (str) {
		return str.split('?')[1] || '';
	};

	exports.parse = function (str) {
		// Create an object with no prototype
		// https://github.com/sindresorhus/query-string/issues/47
		var ret = Object.create(null);

		if (typeof str !== 'string') {
			return ret;
		}

		str = str.trim().replace(/^(\?|#|&)/, '');

		if (!str) {
			return ret;
		}

		str.split('&').forEach(function (param) {
			var parts = param.replace(/\+/g, ' ').split('=');
			// Firefox (pre 40) decodes `%3D` to `=`
			// https://github.com/sindresorhus/query-string/pull/37
			var key = parts.shift();
			var val = parts.length > 0 ? parts.join('=') : undefined;

			key = decodeURIComponent(key);

			// missing `=` should be `null`:
			// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
			val = val === undefined ? null : decodeURIComponent(val);

			if (ret[key] === undefined) {
				ret[key] = val;
			} else if (Array.isArray(ret[key])) {
				ret[key].push(val);
			} else {
				ret[key] = [ret[key], val];
			}
		});

		return ret;
	};

	exports.stringify = function (obj, opts) {
		var defaults = {
			encode: true,
			strict: true
		};

		opts = objectAssign(defaults, opts);

		return obj ? Object.keys(obj).sort().map(function (key) {
			var val = obj[key];

			if (val === undefined) {
				return '';
			}

			if (val === null) {
				return encode(key, opts);
			}

			if (Array.isArray(val)) {
				var result = [];

				val.slice().forEach(function (val2) {
					if (val2 === undefined) {
						return;
					}

					if (val2 === null) {
						result.push(encode(key, opts));
					} else {
						result.push(encode(key, opts) + '=' + encode(val2, opts));
					}
				});

				return result.join('&');
			}

			return encode(key, opts) + '=' + encode(val, opts);
		}).filter(function (x) {
			return x.length > 0;
		}).join('&') : '';
	};


/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (str) {
		return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
			return '%' + c.charCodeAt(0).toString(16).toUpperCase();
		});
	};


/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = validate;

	var _api = __webpack_require__(21);

	var _api2 = _interopRequireDefault(_api);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function validate(method, params) {
	  // get all the requried params for this method
	  var required = _api2.default[method].filter(function (param) {
	    return param.required === 'Required';
	  });
	  // collect any missing params
	  var missing = required.filter(function (param) {
	    return typeof params[param.name] === 'undefined';
	  });
	  // optimisitcally assume the best
	  var err = false;
	  // but have a plan for the worst
	  if (missing.length) {
	    var bullets = missing.map(function (param) {
	      return '- ' + param.name + ' ... ' + param.description;
	    });
	    var msg = method + ' missing params:\n' + bullets.join('\n');
	    err = Error(msg);
	  }
	  return err;
	} //
	// validate returns an error object if any required params are missing
	//
	// example usage:
	//
	//   // token and id are required params
	//   function apiCall(params, callback) {
	//     let err = validate('api.signature', params)
	//     if (err) {
	//       callback(err)
	//     }
	//     else {
	//       // do api call
	//     }
	//   }
	//

	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = {
		"api.test": [
			{
				"name": "error",
				"example": "my_error",
				"required": "Optional",
				"description": "Error response to return\n"
			},
			{
				"name": "foo",
				"example": "bar",
				"required": "Optional",
				"description": "example property to return\n"
			}
		],
		"auth.revoke": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Optional",
				"description": "Authentication token\n"
			},
			{
				"name": "test",
				"example": "true",
				"required": "Optional",
				"description": "Setting this parameter to 1 triggers a testing mode where the specified token will not actually be revoked.\n"
			}
		],
		"auth.test": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: identify)\n"
			}
		],
		"bots.info": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: users:read)\n"
			},
			{
				"name": "bot",
				"example": "B12345678",
				"required": "Optional",
				"description": "Bot user to get info on\n"
			}
		],
		"channels.archive": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: channels:write)\n"
			},
			{
				"name": "channel",
				"example": "C1234567890",
				"required": "Required",
				"description": "Channel to archive\n"
			}
		],
		"channels.create": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: channels:write)\n"
			},
			{
				"name": "name",
				"example": "mychannel",
				"required": "Required",
				"description": "Name of channel to create\n"
			}
		],
		"channels.history": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: channels:history)\n"
			},
			{
				"name": "channel",
				"example": "C1234567890",
				"required": "Required",
				"description": "Channel to fetch history for.\n"
			},
			{
				"name": "latest",
				"example": "1234567890.123456",
				"required": "Optional, default=now",
				"description": "End of time range of messages to include in results.\n"
			},
			{
				"name": "oldest",
				"example": "1234567890.123456",
				"required": "Optional, default=0",
				"description": "Start of time range of messages to include in results.\n"
			},
			{
				"name": "inclusive",
				"example": "1",
				"required": "Optional, default=0",
				"description": "Include messages with latest or oldest timestamp in results.\n"
			},
			{
				"name": "count",
				"example": "100",
				"required": "Optional, default=100",
				"description": "Number of messages to return, between 1 and 1000.\n"
			},
			{
				"name": "unreads",
				"example": "1",
				"required": "Optional, default=0",
				"description": "Include unread_count_display in the output?\n"
			}
		],
		"channels.info": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: channels:read)\n"
			},
			{
				"name": "channel",
				"example": "C1234567890",
				"required": "Required",
				"description": "Channel to get info on\n"
			}
		],
		"channels.invite": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: channels:write)\n"
			},
			{
				"name": "channel",
				"example": "C1234567890",
				"required": "Required",
				"description": "Channel to invite user to.\n"
			},
			{
				"name": "user",
				"example": "U1234567890",
				"required": "Required",
				"description": "User to invite to channel.\n"
			}
		],
		"channels.join": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: channels:write)\n"
			},
			{
				"name": "name",
				"example": " ",
				"required": "Required",
				"description": "Name of channel to join\n"
			}
		],
		"channels.kick": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: channels:write)\n"
			},
			{
				"name": "channel",
				"example": "C1234567890",
				"required": "Required",
				"description": "Channel to remove user from.\n"
			},
			{
				"name": "user",
				"example": "U1234567890",
				"required": "Required",
				"description": "User to remove from channel.\n"
			}
		],
		"channels.leave": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: channels:write)\n"
			},
			{
				"name": "channel",
				"example": "C1234567890",
				"required": "Required",
				"description": "Channel to leave\n"
			}
		],
		"channels.list": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: channels:read)\n"
			},
			{
				"name": "exclude_archived",
				"example": "1",
				"required": "Optional, default=0",
				"description": "Don't return archived channels.\n"
			}
		],
		"channels.mark": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: channels:write)\n"
			},
			{
				"name": "channel",
				"example": "C1234567890",
				"required": "Required",
				"description": "Channel to set reading cursor in.\n"
			},
			{
				"name": "ts",
				"example": "1234567890.123456",
				"required": "Required",
				"description": "Timestamp of the most recently seen message.\n"
			}
		],
		"channels.rename": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: channels:write)\n"
			},
			{
				"name": "channel",
				"example": "C1234567890",
				"required": "Required",
				"description": "Channel to rename\n"
			},
			{
				"name": "name",
				"example": " ",
				"required": "Required",
				"description": "New name for channel.\n"
			}
		],
		"channels.setPurpose": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: channels:write)\n"
			},
			{
				"name": "channel",
				"example": "C1234567890",
				"required": "Required",
				"description": "Channel to set the purpose of\n"
			},
			{
				"name": "purpose",
				"example": "My Purpose",
				"required": "Required",
				"description": "The new purpose\n"
			}
		],
		"channels.setTopic": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: channels:write)\n"
			},
			{
				"name": "channel",
				"example": "C1234567890",
				"required": "Required",
				"description": "Channel to set the topic of\n"
			},
			{
				"name": "topic",
				"example": "My Topic",
				"required": "Required",
				"description": "The new topic\n"
			}
		],
		"channels.unarchive": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: channels:write)\n"
			},
			{
				"name": "channel",
				"example": "C1234567890",
				"required": "Required",
				"description": "Channel to unarchive\n"
			}
		],
		"chat.delete": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: chat:write:bot or chat:write:user)\n"
			},
			{
				"name": "ts",
				"example": "1405894322.002768",
				"required": "Required",
				"description": "Timestamp of the message to be deleted.\n"
			},
			{
				"name": "channel",
				"example": "C1234567890",
				"required": "Required",
				"description": "Channel containing the message to be deleted.\n"
			},
			{
				"name": "as_user",
				"example": "true",
				"required": "Optional",
				"description": "Pass true to delete the message as the authed user. Bot users in this context are considered authed users.\n"
			}
		],
		"chat.meMessage": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: chat:write:user)\n"
			},
			{
				"name": "channel",
				"example": "C1234567890",
				"required": "Required",
				"description": "Channel to send message to. Can be a public channel, private group or IM channel. Can be an encoded ID, or a name.\n"
			},
			{
				"name": "text",
				"example": "Hello world",
				"required": "Required",
				"description": "Text of the message to send.\n"
			}
		],
		"chat.postMessage": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: chat:write:bot or chat:write:user)\n"
			},
			{
				"name": "channel",
				"example": "C1234567890",
				"required": "Required",
				"description": "Channel, private group, or IM channel to send message to. Can be an encoded ID, or a name. See below for more details.\n"
			},
			{
				"name": "text",
				"example": "Hello world",
				"required": "Required",
				"description": "Text of the message to send. See below for an explanation of formatting. This field is usually required, unless you're providing only attachments instead.\n"
			},
			{
				"name": "parse",
				"example": "full",
				"required": "Optional",
				"description": "Change how messages are treated. Defaults to none. See below.\n"
			},
			{
				"name": "link_names",
				"example": "1",
				"required": "Optional",
				"description": "Find and link channel names and usernames.\n"
			},
			{
				"name": "attachments",
				"example": "[{\"pretext\": \"pre-hello\", \"text\": \"text-world\"}]",
				"required": "Optional",
				"description": "Structured message attachments.\n"
			},
			{
				"name": "unfurl_links",
				"example": "true",
				"required": "Optional",
				"description": "Pass true to enable unfurling of primarily text-based content.\n"
			},
			{
				"name": "unfurl_media",
				"example": "false",
				"required": "Optional",
				"description": "Pass false to disable unfurling of media content.\n"
			},
			{
				"name": "username",
				"example": "My Bot",
				"required": "Optional",
				"description": "Set your bot's user name. Must be used in conjunction with as_user set to false, otherwise ignored. See authorship below.\n"
			},
			{
				"name": "as_user",
				"example": "true",
				"required": "Optional",
				"description": "Pass true to post the message as the authed user, instead of as a bot. Defaults to false. See authorship below.\n"
			},
			{
				"name": "icon_url",
				"example": "http://lorempixel.com/48/48",
				"required": "Optional",
				"description": "URL to an image to use as the icon for this message. Must be used in conjunction with as_user set to false, otherwise ignored. See authorship below.\n"
			},
			{
				"name": "icon_emoji",
				"example": ":chart_with_upwards_trend:",
				"required": "Optional",
				"description": "emoji to use as the icon for this message. Overrides icon_url. Must be used in conjunction with as_user set to false, otherwise ignored. See authorship below.\n"
			}
		],
		"chat.update": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: chat:write:bot or chat:write:user)\n"
			},
			{
				"name": "ts",
				"example": "1405894322.002768",
				"required": "Required",
				"description": "Timestamp of the message to be updated.\n"
			},
			{
				"name": "channel",
				"example": "C1234567890",
				"required": "Required",
				"description": "Channel containing the message to be updated.\n"
			},
			{
				"name": "text",
				"example": "Hello world",
				"required": "Required",
				"description": "New text for the message, using the default formatting rules.\n"
			},
			{
				"name": "attachments",
				"example": "[{\"pretext\": \"pre-hello\", \"text\": \"text-world\"}]",
				"required": "Optional",
				"description": "Structured message attachments.\n"
			},
			{
				"name": "parse",
				"example": "none",
				"required": "Optional",
				"description": "Change how messages are treated. Defaults to client, unlike chat.postMessage. See below.\n"
			},
			{
				"name": "link_names",
				"example": "1",
				"required": "Optional",
				"description": "Find and link channel names and usernames. Defaults to none. This parameter should be used in conjunction with parse. To set link_names to 1, specify a parse mode of full.\n"
			},
			{
				"name": "as_user",
				"example": "true",
				"required": "Optional",
				"description": "Pass true to update the message as the authed user. Bot users in this context are considered authed users.\n"
			}
		],
		"dnd.endDnd": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: dnd:write)\n"
			}
		],
		"dnd.endSnooze": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: dnd:write)\n"
			}
		],
		"dnd.info": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: dnd:read)\n"
			},
			{
				"name": "user",
				"example": "U1234",
				"required": "Optional",
				"description": "User to fetch status for (defaults to current user)\n"
			}
		],
		"dnd.setSnooze": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: dnd:write)\n"
			},
			{
				"name": "num_minutes",
				"example": "60",
				"required": "Required",
				"description": "Number of minutes, from now, to snooze until.\n"
			}
		],
		"dnd.teamInfo": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: dnd:read)\n"
			},
			{
				"name": "users",
				"example": "U1234,U4567",
				"required": "Optional",
				"description": "Comma-separated list of users to fetch Do Not Disturb status for\n"
			}
		],
		"emoji.list": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: emoji:read)\n"
			}
		],
		"files.comments.add": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: files:write:user)\n"
			},
			{
				"name": "file",
				"example": "F1234467890",
				"required": "Required",
				"description": "File to add a comment to.\n"
			},
			{
				"name": "comment",
				"example": "Everyone should take a moment to read this file.",
				"required": "Required",
				"description": "Text of the comment to add.\n"
			},
			{
				"name": "channel",
				"example": "C1234467890",
				"required": "Optional",
				"description": "Channel id (encoded) of which location to associate with the new comment.\n"
			}
		],
		"files.comments.delete": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: files:write:user)\n"
			},
			{
				"name": "file",
				"example": "F1234567890",
				"required": "Required",
				"description": "File to delete a comment from.\n"
			},
			{
				"name": "id",
				"example": "Fc1234567890",
				"required": "Required",
				"description": "The comment to delete.\n"
			}
		],
		"files.comments.edit": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: files:write:user)\n"
			},
			{
				"name": "file",
				"example": "F1234567890",
				"required": "Required",
				"description": "File containing the comment to edit.\n"
			},
			{
				"name": "id",
				"example": "Fc1234567890",
				"required": "Required",
				"description": "The comment to edit.\n"
			},
			{
				"name": "comment",
				"example": "Everyone should take a moment to read this file, seriously.",
				"required": "Required",
				"description": "Text of the comment to edit.\n"
			}
		],
		"files.delete": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: files:write:user)\n"
			},
			{
				"name": "file",
				"example": " ",
				"required": "Required",
				"description": "ID of file to delete.\n"
			}
		],
		"files.info": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: files:read)\n"
			},
			{
				"name": "file",
				"example": "F2147483862",
				"required": "Required",
				"description": "Specify a file by providing its ID.\n"
			},
			{
				"name": "count",
				"example": "20",
				"required": "Optional, default=100",
				"description": "Number of items to return per page.\n"
			},
			{
				"name": "page",
				"example": "2",
				"required": "Optional, default=1",
				"description": "Page number of results to return.\n"
			}
		],
		"files.list": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: files:read)\n"
			},
			{
				"name": "user",
				"example": "U1234567890",
				"required": "Optional",
				"description": "Filter files created by a single user.\n"
			},
			{
				"name": "channel",
				"example": "C1234567890",
				"required": "Optional",
				"description": "Filter files appearing in a specific channel, indicated by its ID.\n"
			},
			{
				"name": "ts_from",
				"example": "123456789",
				"required": "Optional, default=0",
				"description": "Filter files created after this timestamp (inclusive).\n"
			},
			{
				"name": "ts_to",
				"example": "123456789",
				"required": "Optional, default=now",
				"description": "Filter files created before this timestamp (inclusive).\n"
			},
			{
				"name": "types",
				"example": "images",
				"required": "Optional, default=all",
				"description": "Filter files by type:\n\n\nall - All files\nspaces - Posts\nsnippets - Snippets\nimages - Image files\ngdocs - Google docs\nzips - Zip files\npdfs - PDF files\n\n\nYou can pass multiple values in the types argument, like types=spaces,snippets.The default value is all, which does not filter the list.\n"
			},
			{
				"name": "count",
				"example": "20",
				"required": "Optional, default=100",
				"description": "Number of items to return per page.\n"
			},
			{
				"name": "page",
				"example": "2",
				"required": "Optional, default=1",
				"description": "Page number of results to return.\n"
			}
		],
		"files.revokePublicURL": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: files:write:user)\n"
			},
			{
				"name": "file",
				"example": "F1234567890",
				"required": "Required",
				"description": "File to revoke\n"
			}
		],
		"files.sharedPublicURL": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: files:write:user)\n"
			},
			{
				"name": "file",
				"example": "F1234567890",
				"required": "Required",
				"description": "File to share\n"
			}
		],
		"files.upload": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: files:write:user)\n"
			},
			{
				"name": "file",
				"example": "...",
				"required": "Optional",
				"description": "File contents via multipart/form-data. If omitting this parameter, you must submit content.\n"
			},
			{
				"name": "content",
				"example": "...",
				"required": "Optional",
				"description": "File contents via a POST variable. If omitting this parameter, you must provide a file.\n"
			},
			{
				"name": "filetype",
				"example": "php",
				"required": "Optional",
				"description": "A file type identifier.\n"
			},
			{
				"name": "filename",
				"example": "foo.txt",
				"required": "Required",
				"description": "Filename of file.\n"
			},
			{
				"name": "title",
				"example": "My File",
				"required": "Optional",
				"description": "Title of file.\n"
			},
			{
				"name": "initial_comment",
				"example": "Best!",
				"required": "Optional",
				"description": "Initial comment to add to file.\n"
			},
			{
				"name": "channels",
				"example": "C1234567890",
				"required": "Optional",
				"description": "Comma-separated list of channel names or IDs where the file will be shared.\n"
			}
		],
		"groups.archive": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: groups:write)\n"
			},
			{
				"name": "channel",
				"example": "G1234567890",
				"required": "Required",
				"description": "Private channel to archive\n"
			}
		],
		"groups.close": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: groups:write)\n"
			},
			{
				"name": "channel",
				"example": "G1234567890",
				"required": "Required",
				"description": "Private channel to close.\n"
			}
		],
		"groups.create": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: groups:write)\n"
			},
			{
				"name": "name",
				"example": " ",
				"required": "Required",
				"description": "Name of private channel to create\n"
			}
		],
		"groups.createChild": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: groups:write)\n"
			},
			{
				"name": "channel",
				"example": "G1234567890",
				"required": "Required",
				"description": "Private channel to clone and archive.\n"
			}
		],
		"groups.history": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: groups:history)\n"
			},
			{
				"name": "channel",
				"example": "G1234567890",
				"required": "Required",
				"description": "Private channel to fetch history for.\n"
			},
			{
				"name": "latest",
				"example": "1234567890.123456",
				"required": "Optional, default=now",
				"description": "End of time range of messages to include in results.\n"
			},
			{
				"name": "oldest",
				"example": "1234567890.123456",
				"required": "Optional, default=0",
				"description": "Start of time range of messages to include in results.\n"
			},
			{
				"name": "inclusive",
				"example": "1",
				"required": "Optional, default=0",
				"description": "Include messages with latest or oldest timestamp in results.\n"
			},
			{
				"name": "count",
				"example": "100",
				"required": "Optional, default=100",
				"description": "Number of messages to return, between 1 and 1000.\n"
			},
			{
				"name": "unreads",
				"example": "1",
				"required": "Optional, default=0",
				"description": "Include unread_count_display in the output?\n"
			}
		],
		"groups.info": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: groups:read)\n"
			},
			{
				"name": "channel",
				"example": "C1234567890",
				"required": "Required",
				"description": "Private channel to get info on\n"
			}
		],
		"groups.invite": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: groups:write)\n"
			},
			{
				"name": "channel",
				"example": "G1234567890",
				"required": "Required",
				"description": "Private channel to invite user to.\n"
			},
			{
				"name": "user",
				"example": "U1234567890",
				"required": "Required",
				"description": "User to invite.\n"
			}
		],
		"groups.kick": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: groups:write)\n"
			},
			{
				"name": "channel",
				"example": "G1234567890",
				"required": "Required",
				"description": "Private channel to remove user from.\n"
			},
			{
				"name": "user",
				"example": "U1234567890",
				"required": "Required",
				"description": "User to remove from private channel.\n"
			}
		],
		"groups.leave": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: groups:write)\n"
			},
			{
				"name": "channel",
				"example": "G1234567890",
				"required": "Required",
				"description": "Private channel to leave\n"
			}
		],
		"groups.list": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: groups:read)\n"
			},
			{
				"name": "exclude_archived",
				"example": "1",
				"required": "Optional, default=0",
				"description": "Don't return archived private channels.\n"
			}
		],
		"groups.mark": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: groups:write)\n"
			},
			{
				"name": "channel",
				"example": "G1234567890",
				"required": "Required",
				"description": "Private channel to set reading cursor in.\n"
			},
			{
				"name": "ts",
				"example": "1234567890.123456",
				"required": "Required",
				"description": "Timestamp of the most recently seen message.\n"
			}
		],
		"groups.open": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: groups:write)\n"
			},
			{
				"name": "channel",
				"example": "G1234567890",
				"required": "Required",
				"description": "Private channel to open.\n"
			}
		],
		"groups.rename": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: groups:write)\n"
			},
			{
				"name": "channel",
				"example": "C1234567890",
				"required": "Required",
				"description": "Private channel to rename\n"
			},
			{
				"name": "name",
				"example": " ",
				"required": "Required",
				"description": "New name for private channel.\n"
			}
		],
		"groups.setPurpose": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: groups:write)\n"
			},
			{
				"name": "channel",
				"example": "C1234567890",
				"required": "Required",
				"description": "Private channel to set the purpose of\n"
			},
			{
				"name": "purpose",
				"example": "My Purpose",
				"required": "Required",
				"description": "The new purpose\n"
			}
		],
		"groups.setTopic": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: groups:write)\n"
			},
			{
				"name": "channel",
				"example": "C1234567890",
				"required": "Required",
				"description": "Private channel to set the topic of\n"
			},
			{
				"name": "topic",
				"example": "My Topic",
				"required": "Required",
				"description": "The new topic\n"
			}
		],
		"groups.unarchive": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: groups:write)\n"
			},
			{
				"name": "channel",
				"example": "G1234567890",
				"required": "Required",
				"description": "Private channel to unarchive\n"
			}
		],
		"im.close": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: im:write)\n"
			},
			{
				"name": "channel",
				"example": "D1234567890",
				"required": "Required",
				"description": "Direct message channel to close.\n"
			}
		],
		"im.history": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: im:history)\n"
			},
			{
				"name": "channel",
				"example": "D1234567890",
				"required": "Required",
				"description": "Direct message channel to fetch history for.\n"
			},
			{
				"name": "latest",
				"example": "1234567890.123456",
				"required": "Optional, default=now",
				"description": "End of time range of messages to include in results.\n"
			},
			{
				"name": "oldest",
				"example": "1234567890.123456",
				"required": "Optional, default=0",
				"description": "Start of time range of messages to include in results.\n"
			},
			{
				"name": "inclusive",
				"example": "1",
				"required": "Optional, default=0",
				"description": "Include messages with latest or oldest timestamp in results.\n"
			},
			{
				"name": "count",
				"example": "100",
				"required": "Optional, default=100",
				"description": "Number of messages to return, between 1 and 1000.\n"
			},
			{
				"name": "unreads",
				"example": "1",
				"required": "Optional, default=0",
				"description": "Include unread_count_display in the output?\n"
			}
		],
		"im.list": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: im:read)\n"
			}
		],
		"im.mark": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: im:write)\n"
			},
			{
				"name": "channel",
				"example": "D1234567890",
				"required": "Required",
				"description": "Direct message channel to set reading cursor in.\n"
			},
			{
				"name": "ts",
				"example": "1234567890.123456",
				"required": "Required",
				"description": "Timestamp of the most recently seen message.\n"
			}
		],
		"im.open": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: im:write)\n"
			},
			{
				"name": "user",
				"example": "U1234567890",
				"required": "Required",
				"description": "User to open a direct message channel with.\n"
			},
			{
				"name": "return_im",
				"example": " ",
				"required": "Optional",
				"description": "Boolean, indicates you want the full IM channel definition in the response.\n"
			}
		],
		"mpim.close": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: mpim:write)\n"
			},
			{
				"name": "channel",
				"example": "G1234567890",
				"required": "Required",
				"description": "MPIM to close.\n"
			}
		],
		"mpim.history": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: mpim:history)\n"
			},
			{
				"name": "channel",
				"example": "G1234567890",
				"required": "Required",
				"description": "Multiparty direct message to fetch history for.\n"
			},
			{
				"name": "latest",
				"example": "1234567890.123456",
				"required": "Optional, default=now",
				"description": "End of time range of messages to include in results.\n"
			},
			{
				"name": "oldest",
				"example": "1234567890.123456",
				"required": "Optional, default=0",
				"description": "Start of time range of messages to include in results.\n"
			},
			{
				"name": "inclusive",
				"example": "1",
				"required": "Optional, default=0",
				"description": "Include messages with latest or oldest timestamp in results.\n"
			},
			{
				"name": "count",
				"example": "100",
				"required": "Optional, default=100",
				"description": "Number of messages to return, between 1 and 1000.\n"
			},
			{
				"name": "unreads",
				"example": "1",
				"required": "Optional, default=0",
				"description": "Include unread_count_display in the output?\n"
			}
		],
		"mpim.list": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: mpim:read)\n"
			}
		],
		"mpim.mark": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: mpim:write)\n"
			},
			{
				"name": "channel",
				"example": "G1234567890",
				"required": "Required",
				"description": "multiparty direct message channel to set reading cursor in.\n"
			},
			{
				"name": "ts",
				"example": "1234567890.123456",
				"required": "Required",
				"description": "Timestamp of the most recently seen message.\n"
			}
		],
		"mpim.open": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: mpim:write)\n"
			},
			{
				"name": "users",
				"example": "U1234567890,U2345678901,U3456789012",
				"required": "Required",
				"description": "Comma separated lists of users.  The ordering of the users is preserved whenever a MPIM group is returned.\n"
			}
		],
		"oauth.access": [
			{
				"name": "client_id",
				"example": "4b39e9-752c4",
				"required": "Required",
				"description": "Issued when you created your application.\n"
			},
			{
				"name": "client_secret",
				"example": "33fea0113f5b1",
				"required": "Required",
				"description": "Issued when you created your application.\n"
			},
			{
				"name": "code",
				"example": "ccdaa72ad",
				"required": "Required",
				"description": "The code param returned via the OAuth callback.\n"
			},
			{
				"name": "redirect_uri",
				"example": "http://example.com",
				"required": "Optional",
				"description": "This must match the originally submitted URI (if one was sent).\n"
			}
		],
		"pins.add": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: pins:write)\n"
			},
			{
				"name": "channel",
				"example": "C1234567890",
				"required": "Required",
				"description": "Channel to pin the item in.\n"
			},
			{
				"name": "file",
				"example": "F1234567890",
				"required": "Optional",
				"description": "File to pin.\n"
			},
			{
				"name": "file_comment",
				"example": "Fc1234567890",
				"required": "Optional",
				"description": "File comment to pin.\n"
			},
			{
				"name": "timestamp",
				"example": "1234567890.123456",
				"required": "Optional",
				"description": "Timestamp of the message to pin.\n"
			}
		],
		"pins.list": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: pins:read)\n"
			},
			{
				"name": "channel",
				"example": "C1234567890",
				"required": "Required",
				"description": "Channel to get pinned items for.\n"
			}
		],
		"pins.remove": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: pins:write)\n"
			},
			{
				"name": "channel",
				"example": "C1234567890",
				"required": "Required",
				"description": "Channel where the item is pinned to.\n"
			},
			{
				"name": "file",
				"example": "F1234567890",
				"required": "Optional",
				"description": "File to un-pin.\n"
			},
			{
				"name": "file_comment",
				"example": "Fc1234567890",
				"required": "Optional",
				"description": "File comment to un-pin.\n"
			},
			{
				"name": "timestamp",
				"example": "1234567890.123456",
				"required": "Optional",
				"description": "Timestamp of the message to un-pin.\n"
			}
		],
		"reactions.add": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: reactions:write)\n"
			},
			{
				"name": "name",
				"example": "thumbsup",
				"required": "Required",
				"description": "Reaction (emoji) name.\n"
			},
			{
				"name": "file",
				"example": "F1234567890",
				"required": "Optional",
				"description": "File to add reaction to.\n"
			},
			{
				"name": "file_comment",
				"example": "Fc1234567890",
				"required": "Optional",
				"description": "File comment to add reaction to.\n"
			},
			{
				"name": "channel",
				"example": "C1234567890",
				"required": "Optional",
				"description": "Channel where the message to add reaction to was posted.\n"
			},
			{
				"name": "timestamp",
				"example": "1234567890.123456",
				"required": "Optional",
				"description": "Timestamp of the message to add reaction to.\n"
			}
		],
		"reactions.get": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: reactions:read)\n"
			},
			{
				"name": "file",
				"example": "F1234567890",
				"required": "Optional",
				"description": "File to get reactions for.\n"
			},
			{
				"name": "file_comment",
				"example": "Fc1234567890",
				"required": "Optional",
				"description": "File comment to get reactions for.\n"
			},
			{
				"name": "channel",
				"example": "C1234567890",
				"required": "Optional",
				"description": "Channel where the message to get reactions for was posted.\n"
			},
			{
				"name": "timestamp",
				"example": "1234567890.123456",
				"required": "Optional",
				"description": "Timestamp of the message to get reactions for.\n"
			},
			{
				"name": "full",
				"example": " ",
				"required": "Optional",
				"description": "If true always return the complete reaction list.\n"
			}
		],
		"reactions.list": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: reactions:read)\n"
			},
			{
				"name": "user",
				"example": "U1234567890",
				"required": "Optional",
				"description": "Show reactions made by this user. Defaults to the authed user.\n"
			},
			{
				"name": "full",
				"example": " ",
				"required": "Optional",
				"description": "If true always return the complete reaction list.\n"
			},
			{
				"name": "count",
				"example": "20",
				"required": "Optional, default=100",
				"description": "Number of items to return per page.\n"
			},
			{
				"name": "page",
				"example": "2",
				"required": "Optional, default=1",
				"description": "Page number of results to return.\n"
			}
		],
		"reactions.remove": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: reactions:write)\n"
			},
			{
				"name": "name",
				"example": "thumbsup",
				"required": "Required",
				"description": "Reaction (emoji) name.\n"
			},
			{
				"name": "file",
				"example": "F1234567890",
				"required": "Optional",
				"description": "File to remove reaction from.\n"
			},
			{
				"name": "file_comment",
				"example": "Fc1234567890",
				"required": "Optional",
				"description": "File comment to remove reaction from.\n"
			},
			{
				"name": "channel",
				"example": "C1234567890",
				"required": "Optional",
				"description": "Channel where the message to remove reaction from was posted.\n"
			},
			{
				"name": "timestamp",
				"example": "1234567890.123456",
				"required": "Optional",
				"description": "Timestamp of the message to remove reaction from.\n"
			}
		],
		"reminders.add": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: reminders:write)\n"
			},
			{
				"name": "text",
				"example": "eat a banana",
				"required": "Required",
				"description": "The content of the reminder\n"
			},
			{
				"name": "time",
				"example": "1602288000",
				"required": "Required",
				"description": "When this reminder should happen: the Unix timestamp (up to five years from now), the number of seconds until the reminder (if within 24 hours), or a natural language description (Ex. \"in 15 minutes,\" or \"every Thursday\")\n"
			},
			{
				"name": "user",
				"example": "U18888888",
				"required": "Optional",
				"description": "The user who will receive the reminder. If no user is specified, the reminder will go to user who created it.\n"
			}
		],
		"reminders.complete": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: reminders:write)\n"
			},
			{
				"name": "reminder",
				"example": "Rm12345678",
				"required": "Required",
				"description": "The ID of the reminder to be marked as complete\n"
			}
		],
		"reminders.delete": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: reminders:write)\n"
			},
			{
				"name": "reminder",
				"example": "Rm12345678",
				"required": "Required",
				"description": "The ID of the reminder\n"
			}
		],
		"reminders.info": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: reminders:read)\n"
			},
			{
				"name": "reminder",
				"example": "Rm23456789",
				"required": "Required",
				"description": "The ID of the reminder\n"
			}
		],
		"reminders.list": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: reminders:read)\n"
			}
		],
		"rtm.start": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: client)\n"
			},
			{
				"name": "simple_latest",
				"example": " ",
				"required": "Optional",
				"description": "Return timestamp only for latest message object of each channel (improves performance).\n"
			},
			{
				"name": "no_unreads",
				"example": " ",
				"required": "Optional",
				"description": "Skip unread counts for each channel (improves performance).\n"
			},
			{
				"name": "mpim_aware",
				"example": " ",
				"required": "Optional",
				"description": "Returns MPIMs to the client in the API response.\n"
			}
		],
		"search.all": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: search:read)\n"
			},
			{
				"name": "query",
				"example": "pickleface",
				"required": "Required",
				"description": "Search query. May contains booleans, etc.\n"
			},
			{
				"name": "sort",
				"example": "timestamp",
				"required": "Optional, default=score",
				"description": "Return matches sorted by either score or timestamp.\n"
			},
			{
				"name": "sort_dir",
				"example": "asc",
				"required": "Optional, default=desc",
				"description": "Change sort direction to ascending (asc) or descending (desc).\n"
			},
			{
				"name": "highlight",
				"example": "1",
				"required": "Optional",
				"description": "Pass a value of 1 to enable query highlight markers (see below).\n"
			},
			{
				"name": "count",
				"example": "20",
				"required": "Optional, default=20",
				"description": "Number of items to return per page.\n"
			},
			{
				"name": "page",
				"example": "2",
				"required": "Optional, default=1",
				"description": "Page number of results to return.\n"
			}
		],
		"search.files": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: search:read)\n"
			},
			{
				"name": "query",
				"example": "pickleface",
				"required": "Required",
				"description": "Search query. May contain booleans, etc.\n"
			},
			{
				"name": "sort",
				"example": "timestamp",
				"required": "Optional, default=score",
				"description": "Return matches sorted by either score or timestamp.\n"
			},
			{
				"name": "sort_dir",
				"example": "asc",
				"required": "Optional, default=desc",
				"description": "Change sort direction to ascending (asc) or descending (desc).\n"
			},
			{
				"name": "highlight",
				"example": "1",
				"required": "Optional",
				"description": "Pass a value of 1 to enable query highlight markers (see below).\n"
			},
			{
				"name": "count",
				"example": "20",
				"required": "Optional, default=20",
				"description": "Number of items to return per page.\n"
			},
			{
				"name": "page",
				"example": "2",
				"required": "Optional, default=1",
				"description": "Page number of results to return.\n"
			}
		],
		"search.messages": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: search:read)\n"
			},
			{
				"name": "query",
				"example": "pickleface",
				"required": "Required",
				"description": "Search query. May contains booleans, etc.\n"
			},
			{
				"name": "sort",
				"example": "timestamp",
				"required": "Optional, default=score",
				"description": "Return matches sorted by either score or timestamp.\n"
			},
			{
				"name": "sort_dir",
				"example": "asc",
				"required": "Optional, default=desc",
				"description": "Change sort direction to ascending (asc) or descending (desc).\n"
			},
			{
				"name": "highlight",
				"example": "1",
				"required": "Optional",
				"description": "Pass a value of 1 to enable query highlight markers (see below).\n"
			},
			{
				"name": "count",
				"example": "20",
				"required": "Optional, default=20",
				"description": "Number of items to return per page.\n"
			},
			{
				"name": "page",
				"example": "2",
				"required": "Optional, default=1",
				"description": "Page number of results to return.\n"
			}
		],
		"stars.add": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: stars:write)\n"
			},
			{
				"name": "file",
				"example": "F1234567890",
				"required": "Optional",
				"description": "File to add star to.\n"
			},
			{
				"name": "file_comment",
				"example": "Fc1234567890",
				"required": "Optional",
				"description": "File comment to add star to.\n"
			},
			{
				"name": "channel",
				"example": "C1234567890",
				"required": "Optional",
				"description": "Channel to add star to, or channel where the message to add star to was posted (used with timestamp).\n"
			},
			{
				"name": "timestamp",
				"example": "1234567890.123456",
				"required": "Optional",
				"description": "Timestamp of the message to add star to.\n"
			}
		],
		"stars.list": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: stars:read)\n"
			},
			{
				"name": "count",
				"example": "20",
				"required": "Optional, default=100",
				"description": "Number of items to return per page.\n"
			},
			{
				"name": "page",
				"example": "2",
				"required": "Optional, default=1",
				"description": "Page number of results to return.\n"
			}
		],
		"stars.remove": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: stars:write)\n"
			},
			{
				"name": "file",
				"example": "F1234567890",
				"required": "Optional",
				"description": "File to remove star from.\n"
			},
			{
				"name": "file_comment",
				"example": "Fc1234567890",
				"required": "Optional",
				"description": "File comment to remove star from.\n"
			},
			{
				"name": "channel",
				"example": "C1234567890",
				"required": "Optional",
				"description": "Channel to remove star from, or channel where the message to remove star from was posted (used with timestamp).\n"
			},
			{
				"name": "timestamp",
				"example": "1234567890.123456",
				"required": "Optional",
				"description": "Timestamp of the message to remove star from.\n"
			}
		],
		"team.accessLogs": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: admin)\n"
			},
			{
				"name": "count",
				"example": "20",
				"required": "Optional, default=100",
				"description": "Number of items to return per page.\n"
			},
			{
				"name": "page",
				"example": "2",
				"required": "Optional, default=1",
				"description": "Page number of results to return.\n"
			}
		],
		"team.billableInfo": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: admin)\n"
			},
			{
				"name": "user",
				"example": "U1234567890",
				"required": "Optional",
				"description": "A user to retrieve the billable information for. Defaults to all users.\n"
			}
		],
		"team.info": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: team:read)\n"
			}
		],
		"team.integrationLogs": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: admin)\n"
			},
			{
				"name": "service_id",
				"example": " ",
				"required": "Optional",
				"description": "Filter logs to this service. Defaults to all logs.\n"
			},
			{
				"name": "app_id",
				"example": " ",
				"required": "Optional",
				"description": "Filter logs to this Slack app. Defaults to all logs.\n"
			},
			{
				"name": "user",
				"example": "U1234567890",
				"required": "Optional",
				"description": "Filter logs generated by this user’s actions. Defaults to all logs.\n"
			},
			{
				"name": "change_type",
				"example": "added",
				"required": "Optional",
				"description": "Filter logs with this change type. Defaults to all logs.\n"
			},
			{
				"name": "count",
				"example": "20",
				"required": "Optional, default=100",
				"description": "Number of items to return per page.\n"
			},
			{
				"name": "page",
				"example": "2",
				"required": "Optional, default=1",
				"description": "Page number of results to return.\n"
			}
		],
		"team.profile.get": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: users.profile:read)\n"
			},
			{
				"name": "visibility",
				"example": "all",
				"required": "Optional",
				"description": "Filter by visibility.\n"
			}
		],
		"usergroups.create": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: usergroups:write)\n"
			},
			{
				"name": "name",
				"example": "My Test Team",
				"required": "Required",
				"description": "A name for the User Group. Must be unique among User Groups.\n"
			},
			{
				"name": "handle",
				"example": " ",
				"required": "Optional",
				"description": "A mention handle. Must be unique among channels, users and User Groups.\n"
			},
			{
				"name": "description",
				"example": " ",
				"required": "Optional",
				"description": "A short description of the User Group.\n"
			},
			{
				"name": "channels",
				"example": " ",
				"required": "Optional",
				"description": "A comma separated string of encoded channel IDs for which the User Group uses as a default.\n"
			},
			{
				"name": "include_count",
				"example": "1",
				"required": "Optional",
				"description": "Include the number of users in each User Group.\n"
			}
		],
		"usergroups.disable": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: usergroups:write)\n"
			},
			{
				"name": "usergroup",
				"example": "S0604QSJC",
				"required": "Required",
				"description": "The encoded ID of the User Group to disable.\n"
			},
			{
				"name": "include_count",
				"example": "1",
				"required": "Optional",
				"description": "Include the number of users in the User Group.\n"
			}
		],
		"usergroups.enable": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: usergroups:write)\n"
			},
			{
				"name": "usergroup",
				"example": "S0604QSJC",
				"required": "Required",
				"description": "The encoded ID of the User Group to enable.\n"
			},
			{
				"name": "include_count",
				"example": "1",
				"required": "Optional",
				"description": "Include the number of users in the User Group.\n"
			}
		],
		"usergroups.list": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: usergroups:read)\n"
			},
			{
				"name": "include_disabled",
				"example": "1",
				"required": "Optional",
				"description": "Include disabled User Groups.\n"
			},
			{
				"name": "include_count",
				"example": "1",
				"required": "Optional",
				"description": "Include the number of users in each User Group.\n"
			},
			{
				"name": "include_users",
				"example": "1",
				"required": "Optional",
				"description": "Include the list of users for each User Group.\n"
			}
		],
		"usergroups.update": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: usergroups:write)\n"
			},
			{
				"name": "usergroup",
				"example": "S0604QSJC",
				"required": "Required",
				"description": "The encoded ID of the User Group to update.\n"
			},
			{
				"name": "name",
				"example": "My Test Team",
				"required": "Optional",
				"description": "A name for the User Group. Must be unique among User Groups.\n"
			},
			{
				"name": "handle",
				"example": " ",
				"required": "Optional",
				"description": "A mention handle. Must be unique among channels, users and User Groups.\n"
			},
			{
				"name": "description",
				"example": " ",
				"required": "Optional",
				"description": "A short description of the User Group.\n"
			},
			{
				"name": "channels",
				"example": " ",
				"required": "Optional",
				"description": "A comma separated string of encoded channel IDs for which the User Group uses as a default.\n"
			},
			{
				"name": "include_count",
				"example": "1",
				"required": "Optional",
				"description": "Include the number of users in the User Group.\n"
			}
		],
		"usergroups.users.list": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: usergroups:read)\n"
			},
			{
				"name": "usergroup",
				"example": "S0604QSJC",
				"required": "Required",
				"description": "The encoded ID of the User Group to update.\n"
			},
			{
				"name": "include_disabled",
				"example": "1",
				"required": "Optional",
				"description": "Allow results that involve disabled User Groups.\n"
			}
		],
		"usergroups.users.update": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: usergroups:write)\n"
			},
			{
				"name": "usergroup",
				"example": "S0604QSJC",
				"required": "Required",
				"description": "The encoded ID of the User Group to update.\n"
			},
			{
				"name": "users",
				"example": "U060R4BJ4,U060RNRCZ",
				"required": "Required",
				"description": "A comma separated string of encoded user IDs that represent the entire list of users for the User Group.\n"
			},
			{
				"name": "include_count",
				"example": "1",
				"required": "Optional",
				"description": "Include the number of users in the User Group.\n"
			}
		],
		"users.getPresence": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: users:read)\n"
			},
			{
				"name": "user",
				"example": "U1234567890",
				"required": "Required",
				"description": "User to get presence info on. Defaults to the authed user.\n"
			}
		],
		"users.identity": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: identity.basic)\n"
			}
		],
		"users.info": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: users:read)\n"
			},
			{
				"name": "user",
				"example": "U1234567890",
				"required": "Required",
				"description": "User to get info on\n"
			}
		],
		"users.list": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: users:read)\n"
			},
			{
				"name": "presence",
				"example": "1",
				"required": "Optional",
				"description": "Whether to include presence data in the output\n"
			}
		],
		"users.setActive": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: users:write)\n"
			}
		],
		"users.setPresence": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: users:write)\n"
			},
			{
				"name": "presence",
				"example": "away",
				"required": "Required",
				"description": "Either auto or away\n"
			}
		],
		"users.profile.get": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: users.profile:read)\n"
			},
			{
				"name": "user",
				"example": "U1234567890",
				"required": "Optional",
				"description": "User to retrieve profile info for\n"
			},
			{
				"name": "include_labels",
				"example": "1",
				"required": "Optional, default=0",
				"description": "Include labels for each ID in custom profile fields\n"
			}
		],
		"users.profile.set": [
			{
				"name": "token",
				"example": "xxxx-xxxxxxxxx-xxxx",
				"required": "Required",
				"description": "Authentication token (Requires scope: users.profile:write)\n"
			},
			{
				"name": "user",
				"example": "U1234567890",
				"required": "Optional",
				"description": "ID of user to change. This argument may only be specified by team admins.\n"
			},
			{
				"name": "profile",
				"example": "{ first_name: \"John\", ... }",
				"required": "Optional",
				"description": "Collection of key:value pairs presented as a URL-encoded JSON hash.\n"
			},
			{
				"name": "name",
				"example": "first_name",
				"required": "Optional",
				"description": "Name of a single key to set. Usable only if profile is not passed.\n"
			},
			{
				"name": "value",
				"example": "John",
				"required": "Optional",
				"description": "Value to set a single key to. Usable only if profile is not passed.\n"
			}
		]
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = client;

	// generated by ./scripts/generate-stateful-client
	function client(token) {
	  var applied = {};
	  applied.auth = {};
	  applied.bots = {};
	  applied.channels = {};
	  applied.chat = {};
	  applied.dnd = {};
	  applied.emoji = {};
	  applied.files.comments = {};
	  applied.files = {};
	  applied.groups = {};
	  applied.im = {};
	  applied.mpim = {};
	  applied.pins = {};
	  applied.reactions = {};
	  applied.reminders = {};
	  applied.rtm = {};
	  applied.search = {};
	  applied.stars = {};
	  applied.team = {};
	  applied.team.profile = {};
	  applied.usergroups = {};
	  applied.usergroups.users = {};
	  applied.users = {};
	  applied.users.profile = {};
	  applied.auth.test = function (params, callback) {
	    params.token = token;
	    __webpack_require__(23).call({}, params, callback);
	  };
	  applied.bots.info = function (params, callback) {
	    params.token = token;
	    __webpack_require__(24).call({}, params, callback);
	  };
	  applied.channels.archive = function (params, callback) {
	    params.token = token;
	    __webpack_require__(25).call({}, params, callback);
	  };
	  applied.channels.create = function (params, callback) {
	    params.token = token;
	    __webpack_require__(26).call({}, params, callback);
	  };
	  applied.channels.history = function (params, callback) {
	    params.token = token;
	    __webpack_require__(27).call({}, params, callback);
	  };
	  applied.channels.info = function (params, callback) {
	    params.token = token;
	    __webpack_require__(28).call({}, params, callback);
	  };
	  applied.channels.invite = function (params, callback) {
	    params.token = token;
	    __webpack_require__(29).call({}, params, callback);
	  };
	  applied.channels.join = function (params, callback) {
	    params.token = token;
	    __webpack_require__(30).call({}, params, callback);
	  };
	  applied.channels.kick = function (params, callback) {
	    params.token = token;
	    __webpack_require__(31).call({}, params, callback);
	  };
	  applied.channels.leave = function (params, callback) {
	    params.token = token;
	    __webpack_require__(32).call({}, params, callback);
	  };
	  applied.channels.list = function (params, callback) {
	    params.token = token;
	    __webpack_require__(33).call({}, params, callback);
	  };
	  applied.channels.mark = function (params, callback) {
	    params.token = token;
	    __webpack_require__(34).call({}, params, callback);
	  };
	  applied.channels.rename = function (params, callback) {
	    params.token = token;
	    __webpack_require__(35).call({}, params, callback);
	  };
	  applied.channels.setPurpose = function (params, callback) {
	    params.token = token;
	    __webpack_require__(36).call({}, params, callback);
	  };
	  applied.channels.setTopic = function (params, callback) {
	    params.token = token;
	    __webpack_require__(37).call({}, params, callback);
	  };
	  applied.channels.unarchive = function (params, callback) {
	    params.token = token;
	    __webpack_require__(38).call({}, params, callback);
	  };
	  applied.chat.delete = function (params, callback) {
	    params.token = token;
	    __webpack_require__(39).call({}, params, callback);
	  };
	  applied.chat.meMessage = function (params, callback) {
	    params.token = token;
	    __webpack_require__(40).call({}, params, callback);
	  };
	  applied.chat.postMessage = function (params, callback) {
	    params.token = token;
	    __webpack_require__(41).call({}, params, callback);
	  };
	  applied.chat.update = function (params, callback) {
	    params.token = token;
	    __webpack_require__(42).call({}, params, callback);
	  };
	  applied.dnd.endDnd = function (params, callback) {
	    params.token = token;
	    __webpack_require__(43).call({}, params, callback);
	  };
	  applied.dnd.endSnooze = function (params, callback) {
	    params.token = token;
	    __webpack_require__(44).call({}, params, callback);
	  };
	  applied.dnd.info = function (params, callback) {
	    params.token = token;
	    __webpack_require__(45).call({}, params, callback);
	  };
	  applied.dnd.setSnooze = function (params, callback) {
	    params.token = token;
	    __webpack_require__(46).call({}, params, callback);
	  };
	  applied.dnd.teamInfo = function (params, callback) {
	    params.token = token;
	    __webpack_require__(47).call({}, params, callback);
	  };
	  applied.emoji.list = function (params, callback) {
	    params.token = token;
	    __webpack_require__(48).call({}, params, callback);
	  };
	  applied.files.comments.add = function (params, callback) {
	    params.token = token;
	    __webpack_require__(49).call({}, params, callback);
	  };
	  applied.files.comments.delete = function (params, callback) {
	    params.token = token;
	    __webpack_require__(50).call({}, params, callback);
	  };
	  applied.files.comments.edit = function (params, callback) {
	    params.token = token;
	    __webpack_require__(51).call({}, params, callback);
	  };
	  applied.files.delete = function (params, callback) {
	    params.token = token;
	    __webpack_require__(52).call({}, params, callback);
	  };
	  applied.files.info = function (params, callback) {
	    params.token = token;
	    __webpack_require__(53).call({}, params, callback);
	  };
	  applied.files.list = function (params, callback) {
	    params.token = token;
	    __webpack_require__(54).call({}, params, callback);
	  };
	  applied.files.revokePublicURL = function (params, callback) {
	    params.token = token;
	    __webpack_require__(55).call({}, params, callback);
	  };
	  applied.files.sharedPublicURL = function (params, callback) {
	    params.token = token;
	    __webpack_require__(56).call({}, params, callback);
	  };
	  applied.files.upload = function (params, callback) {
	    params.token = token;
	    __webpack_require__(57).call({}, params, callback);
	  };
	  applied.groups.archive = function (params, callback) {
	    params.token = token;
	    __webpack_require__(58).call({}, params, callback);
	  };
	  applied.groups.close = function (params, callback) {
	    params.token = token;
	    __webpack_require__(59).call({}, params, callback);
	  };
	  applied.groups.create = function (params, callback) {
	    params.token = token;
	    __webpack_require__(60).call({}, params, callback);
	  };
	  applied.groups.createChild = function (params, callback) {
	    params.token = token;
	    __webpack_require__(61).call({}, params, callback);
	  };
	  applied.groups.history = function (params, callback) {
	    params.token = token;
	    __webpack_require__(62).call({}, params, callback);
	  };
	  applied.groups.info = function (params, callback) {
	    params.token = token;
	    __webpack_require__(63).call({}, params, callback);
	  };
	  applied.groups.invite = function (params, callback) {
	    params.token = token;
	    __webpack_require__(64).call({}, params, callback);
	  };
	  applied.groups.kick = function (params, callback) {
	    params.token = token;
	    __webpack_require__(65).call({}, params, callback);
	  };
	  applied.groups.leave = function (params, callback) {
	    params.token = token;
	    __webpack_require__(66).call({}, params, callback);
	  };
	  applied.groups.list = function (params, callback) {
	    params.token = token;
	    __webpack_require__(67).call({}, params, callback);
	  };
	  applied.groups.mark = function (params, callback) {
	    params.token = token;
	    __webpack_require__(68).call({}, params, callback);
	  };
	  applied.groups.open = function (params, callback) {
	    params.token = token;
	    __webpack_require__(69).call({}, params, callback);
	  };
	  applied.groups.rename = function (params, callback) {
	    params.token = token;
	    __webpack_require__(70).call({}, params, callback);
	  };
	  applied.groups.setPurpose = function (params, callback) {
	    params.token = token;
	    __webpack_require__(71).call({}, params, callback);
	  };
	  applied.groups.setTopic = function (params, callback) {
	    params.token = token;
	    __webpack_require__(72).call({}, params, callback);
	  };
	  applied.groups.unarchive = function (params, callback) {
	    params.token = token;
	    __webpack_require__(73).call({}, params, callback);
	  };
	  applied.im.close = function (params, callback) {
	    params.token = token;
	    __webpack_require__(74).call({}, params, callback);
	  };
	  applied.im.history = function (params, callback) {
	    params.token = token;
	    __webpack_require__(75).call({}, params, callback);
	  };
	  applied.im.list = function (params, callback) {
	    params.token = token;
	    __webpack_require__(76).call({}, params, callback);
	  };
	  applied.im.mark = function (params, callback) {
	    params.token = token;
	    __webpack_require__(77).call({}, params, callback);
	  };
	  applied.im.open = function (params, callback) {
	    params.token = token;
	    __webpack_require__(78).call({}, params, callback);
	  };
	  applied.mpim.close = function (params, callback) {
	    params.token = token;
	    __webpack_require__(79).call({}, params, callback);
	  };
	  applied.mpim.history = function (params, callback) {
	    params.token = token;
	    __webpack_require__(80).call({}, params, callback);
	  };
	  applied.mpim.list = function (params, callback) {
	    params.token = token;
	    __webpack_require__(81).call({}, params, callback);
	  };
	  applied.mpim.mark = function (params, callback) {
	    params.token = token;
	    __webpack_require__(82).call({}, params, callback);
	  };
	  applied.mpim.open = function (params, callback) {
	    params.token = token;
	    __webpack_require__(83).call({}, params, callback);
	  };
	  applied.pins.add = function (params, callback) {
	    params.token = token;
	    __webpack_require__(84).call({}, params, callback);
	  };
	  applied.pins.list = function (params, callback) {
	    params.token = token;
	    __webpack_require__(85).call({}, params, callback);
	  };
	  applied.pins.remove = function (params, callback) {
	    params.token = token;
	    __webpack_require__(86).call({}, params, callback);
	  };
	  applied.reactions.add = function (params, callback) {
	    params.token = token;
	    __webpack_require__(87).call({}, params, callback);
	  };
	  applied.reactions.get = function (params, callback) {
	    params.token = token;
	    __webpack_require__(88).call({}, params, callback);
	  };
	  applied.reactions.list = function (params, callback) {
	    params.token = token;
	    __webpack_require__(89).call({}, params, callback);
	  };
	  applied.reactions.remove = function (params, callback) {
	    params.token = token;
	    __webpack_require__(90).call({}, params, callback);
	  };
	  applied.reminders.add = function (params, callback) {
	    params.token = token;
	    __webpack_require__(91).call({}, params, callback);
	  };
	  applied.reminders.complete = function (params, callback) {
	    params.token = token;
	    __webpack_require__(92).call({}, params, callback);
	  };
	  applied.reminders.delete = function (params, callback) {
	    params.token = token;
	    __webpack_require__(93).call({}, params, callback);
	  };
	  applied.reminders.info = function (params, callback) {
	    params.token = token;
	    __webpack_require__(94).call({}, params, callback);
	  };
	  applied.reminders.list = function (params, callback) {
	    params.token = token;
	    __webpack_require__(95).call({}, params, callback);
	  };
	  applied.rtm.start = function (params, callback) {
	    params.token = token;
	    __webpack_require__(96).call({}, params, callback);
	  };
	  applied.search.all = function (params, callback) {
	    params.token = token;
	    __webpack_require__(97).call({}, params, callback);
	  };
	  applied.search.files = function (params, callback) {
	    params.token = token;
	    __webpack_require__(98).call({}, params, callback);
	  };
	  applied.search.messages = function (params, callback) {
	    params.token = token;
	    __webpack_require__(99).call({}, params, callback);
	  };
	  applied.stars.add = function (params, callback) {
	    params.token = token;
	    __webpack_require__(100).call({}, params, callback);
	  };
	  applied.stars.list = function (params, callback) {
	    params.token = token;
	    __webpack_require__(101).call({}, params, callback);
	  };
	  applied.stars.remove = function (params, callback) {
	    params.token = token;
	    __webpack_require__(102).call({}, params, callback);
	  };
	  applied.team.accessLogs = function (params, callback) {
	    params.token = token;
	    __webpack_require__(103).call({}, params, callback);
	  };
	  applied.team.billableInfo = function (params, callback) {
	    params.token = token;
	    __webpack_require__(104).call({}, params, callback);
	  };
	  applied.team.info = function (params, callback) {
	    params.token = token;
	    __webpack_require__(105).call({}, params, callback);
	  };
	  applied.team.integrationLogs = function (params, callback) {
	    params.token = token;
	    __webpack_require__(106).call({}, params, callback);
	  };
	  applied.team.profile.get = function (params, callback) {
	    params.token = token;
	    __webpack_require__(107).call({}, params, callback);
	  };
	  applied.usergroups.create = function (params, callback) {
	    params.token = token;
	    __webpack_require__(108).call({}, params, callback);
	  };
	  applied.usergroups.disable = function (params, callback) {
	    params.token = token;
	    __webpack_require__(109).call({}, params, callback);
	  };
	  applied.usergroups.enable = function (params, callback) {
	    params.token = token;
	    __webpack_require__(110).call({}, params, callback);
	  };
	  applied.usergroups.list = function (params, callback) {
	    params.token = token;
	    __webpack_require__(111).call({}, params, callback);
	  };
	  applied.usergroups.update = function (params, callback) {
	    params.token = token;
	    __webpack_require__(112).call({}, params, callback);
	  };
	  applied.usergroups.users.list = function (params, callback) {
	    params.token = token;
	    __webpack_require__(113).call({}, params, callback);
	  };
	  applied.usergroups.users.update = function (params, callback) {
	    params.token = token;
	    __webpack_require__(114).call({}, params, callback);
	  };
	  applied.users.getPresence = function (params, callback) {
	    params.token = token;
	    __webpack_require__(115).call({}, params, callback);
	  };
	  applied.users.identity = function (params, callback) {
	    params.token = token;
	    __webpack_require__(116).call({}, params, callback);
	  };
	  applied.users.info = function (params, callback) {
	    params.token = token;
	    __webpack_require__(117).call({}, params, callback);
	  };
	  applied.users.list = function (params, callback) {
	    params.token = token;
	    __webpack_require__(118).call({}, params, callback);
	  };
	  applied.users.profile.get = function (params, callback) {
	    params.token = token;
	    __webpack_require__(119).call({}, params, callback);
	  };
	  applied.users.profile.set = function (params, callback) {
	    params.token = token;
	    __webpack_require__(120).call({}, params, callback);
	  };
	  applied.users.setActive = function (params, callback) {
	    params.token = token;
	    __webpack_require__(121).call({}, params, callback);
	  };
	  applied.users.setPresence = function (params, callback) {
	    params.token = token;
	    __webpack_require__(122).call({}, params, callback);
	  };

	  return applied;
	}
	module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = authtest;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function authtest(params, callback) {
	  var ns = 'auth.test';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = botsinfo;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function botsinfo(params, callback) {
	  var ns = 'bots.info';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = channelsarchive;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function channelsarchive(params, callback) {
	  var ns = 'channels.archive';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = channelscreate;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function channelscreate(params, callback) {
	  var ns = 'channels.create';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = channelshistory;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function channelshistory(params, callback) {
	  var ns = 'channels.history';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = channelsinfo;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function channelsinfo(params, callback) {
	  var ns = 'channels.info';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = channelsinvite;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function channelsinvite(params, callback) {
	  var ns = 'channels.invite';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = channelsjoin;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function channelsjoin(params, callback) {
	  var ns = 'channels.join';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = channelskick;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function channelskick(params, callback) {
	  var ns = 'channels.kick';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = channelsleave;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function channelsleave(params, callback) {
	  var ns = 'channels.leave';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = channelslist;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function channelslist(params, callback) {
	  var ns = 'channels.list';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = channelsmark;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function channelsmark(params, callback) {
	  var ns = 'channels.mark';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = channelsrename;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function channelsrename(params, callback) {
	  var ns = 'channels.rename';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = channelssetPurpose;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function channelssetPurpose(params, callback) {
	  var ns = 'channels.setPurpose';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = channelssetTopic;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function channelssetTopic(params, callback) {
	  var ns = 'channels.setTopic';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = channelsunarchive;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function channelsunarchive(params, callback) {
	  var ns = 'channels.unarchive';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = chatdelete;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function chatdelete(params, callback) {
	  var ns = 'chat.delete';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = chatmeMessage;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function chatmeMessage(params, callback) {
	  var ns = 'chat.meMessage';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = chatpostMessage;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function chatpostMessage(params, callback) {
	  var ns = 'chat.postMessage';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = chatupdate;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function chatupdate(params, callback) {
	  var ns = 'chat.update';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = dndendDnd;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function dndendDnd(params, callback) {
	  var ns = 'dnd.endDnd';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = dndendSnooze;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function dndendSnooze(params, callback) {
	  var ns = 'dnd.endSnooze';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = dndinfo;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function dndinfo(params, callback) {
	  var ns = 'dnd.info';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = dndsetSnooze;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function dndsetSnooze(params, callback) {
	  var ns = 'dnd.setSnooze';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = dndteamInfo;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function dndteamInfo(params, callback) {
	  var ns = 'dnd.teamInfo';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = emojilist;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function emojilist(params, callback) {
	  var ns = 'emoji.list';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = filescommentsadd;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function filescommentsadd(params, callback) {
	  var ns = 'files.comments.add';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = filescommentsdelete;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function filescommentsdelete(params, callback) {
	  var ns = 'files.comments.delete';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = filescommentsedit;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function filescommentsedit(params, callback) {
	  var ns = 'files.comments.edit';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = filesdelete;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function filesdelete(params, callback) {
	  var ns = 'files.delete';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = filesinfo;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function filesinfo(params, callback) {
	  var ns = 'files.info';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = fileslist;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function fileslist(params, callback) {
	  var ns = 'files.list';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = filesrevokePublicURL;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function filesrevokePublicURL(params, callback) {
	  var ns = 'files.revokePublicURL';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = filessharedPublicURL;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function filessharedPublicURL(params, callback) {
	  var ns = 'files.sharedPublicURL';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = filesupload;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function filesupload(params, callback) {
	  var ns = 'files.upload';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = groupsarchive;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function groupsarchive(params, callback) {
	  var ns = 'groups.archive';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = groupsclose;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function groupsclose(params, callback) {
	  var ns = 'groups.close';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = groupscreate;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function groupscreate(params, callback) {
	  var ns = 'groups.create';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = groupscreateChild;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function groupscreateChild(params, callback) {
	  var ns = 'groups.createChild';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = groupshistory;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function groupshistory(params, callback) {
	  var ns = 'groups.history';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = groupsinfo;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function groupsinfo(params, callback) {
	  var ns = 'groups.info';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = groupsinvite;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function groupsinvite(params, callback) {
	  var ns = 'groups.invite';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = groupskick;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function groupskick(params, callback) {
	  var ns = 'groups.kick';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = groupsleave;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function groupsleave(params, callback) {
	  var ns = 'groups.leave';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = groupslist;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function groupslist(params, callback) {
	  var ns = 'groups.list';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = groupsmark;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function groupsmark(params, callback) {
	  var ns = 'groups.mark';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = groupsopen;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function groupsopen(params, callback) {
	  var ns = 'groups.open';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = groupsrename;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function groupsrename(params, callback) {
	  var ns = 'groups.rename';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = groupssetPurpose;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function groupssetPurpose(params, callback) {
	  var ns = 'groups.setPurpose';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = groupssetTopic;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function groupssetTopic(params, callback) {
	  var ns = 'groups.setTopic';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = groupsunarchive;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function groupsunarchive(params, callback) {
	  var ns = 'groups.unarchive';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = imclose;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function imclose(params, callback) {
	  var ns = 'im.close';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = imhistory;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function imhistory(params, callback) {
	  var ns = 'im.history';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = imlist;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function imlist(params, callback) {
	  var ns = 'im.list';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = immark;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function immark(params, callback) {
	  var ns = 'im.mark';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = imopen;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function imopen(params, callback) {
	  var ns = 'im.open';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = mpimclose;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function mpimclose(params, callback) {
	  var ns = 'mpim.close';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = mpimhistory;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function mpimhistory(params, callback) {
	  var ns = 'mpim.history';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = mpimlist;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function mpimlist(params, callback) {
	  var ns = 'mpim.list';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = mpimmark;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function mpimmark(params, callback) {
	  var ns = 'mpim.mark';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = mpimopen;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function mpimopen(params, callback) {
	  var ns = 'mpim.open';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = pinsadd;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function pinsadd(params, callback) {
	  var ns = 'pins.add';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = pinslist;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function pinslist(params, callback) {
	  var ns = 'pins.list';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = pinsremove;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function pinsremove(params, callback) {
	  var ns = 'pins.remove';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = reactionsadd;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function reactionsadd(params, callback) {
	  var ns = 'reactions.add';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = reactionsget;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function reactionsget(params, callback) {
	  var ns = 'reactions.get';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = reactionslist;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function reactionslist(params, callback) {
	  var ns = 'reactions.list';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = reactionsremove;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function reactionsremove(params, callback) {
	  var ns = 'reactions.remove';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = remindersadd;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function remindersadd(params, callback) {
	  var ns = 'reminders.add';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = reminderscomplete;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function reminderscomplete(params, callback) {
	  var ns = 'reminders.complete';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = remindersdelete;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function remindersdelete(params, callback) {
	  var ns = 'reminders.delete';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = remindersinfo;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function remindersinfo(params, callback) {
	  var ns = 'reminders.info';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = reminderslist;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function reminderslist(params, callback) {
	  var ns = 'reminders.list';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = rtmstart;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function rtmstart(params, callback) {
	  var ns = 'rtm.start';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = searchall;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function searchall(params, callback) {
	  var ns = 'search.all';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = searchfiles;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function searchfiles(params, callback) {
	  var ns = 'search.files';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = searchmessages;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function searchmessages(params, callback) {
	  var ns = 'search.messages';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = starsadd;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function starsadd(params, callback) {
	  var ns = 'stars.add';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = starslist;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function starslist(params, callback) {
	  var ns = 'stars.list';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = starsremove;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function starsremove(params, callback) {
	  var ns = 'stars.remove';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = teamaccessLogs;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function teamaccessLogs(params, callback) {
	  var ns = 'team.accessLogs';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = teambillableInfo;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function teambillableInfo(params, callback) {
	  var ns = 'team.billableInfo';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = teaminfo;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function teaminfo(params, callback) {
	  var ns = 'team.info';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = teamintegrationLogs;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function teamintegrationLogs(params, callback) {
	  var ns = 'team.integrationLogs';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = teamprofileget;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function teamprofileget(params, callback) {
	  var ns = 'team.profile.get';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = usergroupscreate;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function usergroupscreate(params, callback) {
	  var ns = 'usergroups.create';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = usergroupsdisable;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function usergroupsdisable(params, callback) {
	  var ns = 'usergroups.disable';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = usergroupsenable;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function usergroupsenable(params, callback) {
	  var ns = 'usergroups.enable';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = usergroupslist;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function usergroupslist(params, callback) {
	  var ns = 'usergroups.list';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = usergroupsupdate;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function usergroupsupdate(params, callback) {
	  var ns = 'usergroups.update';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = usergroupsuserslist;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function usergroupsuserslist(params, callback) {
	  var ns = 'usergroups.users.list';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = usergroupsusersupdate;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function usergroupsusersupdate(params, callback) {
	  var ns = 'usergroups.users.update';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = usersgetPresence;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function usersgetPresence(params, callback) {
	  var ns = 'users.getPresence';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = usersidentity;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function usersidentity(params, callback) {
	  var ns = 'users.identity';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = usersinfo;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function usersinfo(params, callback) {
	  var ns = 'users.info';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = userslist;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function userslist(params, callback) {
	  var ns = 'users.list';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = usersprofileget;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function usersprofileget(params, callback) {
	  var ns = 'users.profile.get';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = usersprofileset;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function usersprofileset(params, callback) {
	  var ns = 'users.profile.set';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = userssetActive;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function userssetActive(params, callback) {
	  var ns = 'users.setActive';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = userssetPresence;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function userssetPresence(params, callback) {
	  var ns = 'users.setPresence';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _bots = __webpack_require__(24);

	var _bots2 = _interopRequireDefault(_bots);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  info: _bots2.default
	};
	module.exports = exports['default'];

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _channels = __webpack_require__(25);

	var _channels2 = _interopRequireDefault(_channels);

	var _channels3 = __webpack_require__(26);

	var _channels4 = _interopRequireDefault(_channels3);

	var _channels5 = __webpack_require__(27);

	var _channels6 = _interopRequireDefault(_channels5);

	var _channels7 = __webpack_require__(28);

	var _channels8 = _interopRequireDefault(_channels7);

	var _channels9 = __webpack_require__(29);

	var _channels10 = _interopRequireDefault(_channels9);

	var _channels11 = __webpack_require__(30);

	var _channels12 = _interopRequireDefault(_channels11);

	var _channels13 = __webpack_require__(31);

	var _channels14 = _interopRequireDefault(_channels13);

	var _channels15 = __webpack_require__(32);

	var _channels16 = _interopRequireDefault(_channels15);

	var _channels17 = __webpack_require__(33);

	var _channels18 = _interopRequireDefault(_channels17);

	var _channels19 = __webpack_require__(34);

	var _channels20 = _interopRequireDefault(_channels19);

	var _channels21 = __webpack_require__(35);

	var _channels22 = _interopRequireDefault(_channels21);

	var _channels23 = __webpack_require__(36);

	var _channels24 = _interopRequireDefault(_channels23);

	var _channels25 = __webpack_require__(37);

	var _channels26 = _interopRequireDefault(_channels25);

	var _channels27 = __webpack_require__(38);

	var _channels28 = _interopRequireDefault(_channels27);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  archive: _channels2.default,
	  create: _channels4.default,
	  history: _channels6.default,
	  info: _channels8.default,
	  invite: _channels10.default,
	  join: _channels12.default,
	  kick: _channels14.default,
	  leave: _channels16.default,
	  list: _channels18.default,
	  mark: _channels20.default,
	  rename: _channels22.default,
	  setPurpose: _channels24.default,
	  setTopic: _channels26.default,
	  unarchive: _channels28.default
	};
	module.exports = exports['default'];

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _chat = __webpack_require__(39);

	var _chat2 = _interopRequireDefault(_chat);

	var _chat3 = __webpack_require__(41);

	var _chat4 = _interopRequireDefault(_chat3);

	var _chat5 = __webpack_require__(42);

	var _chat6 = _interopRequireDefault(_chat5);

	var _chat7 = __webpack_require__(40);

	var _chat8 = _interopRequireDefault(_chat7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  postMessage: _chat4.default, delete: _chat2.default, update: _chat6.default, meMessage: _chat8.default
	};
	module.exports = exports['default'];

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _dnd = __webpack_require__(45);

	var _dnd2 = _interopRequireDefault(_dnd);

	var _dnd3 = __webpack_require__(43);

	var _dnd4 = _interopRequireDefault(_dnd3);

	var _dnd5 = __webpack_require__(44);

	var _dnd6 = _interopRequireDefault(_dnd5);

	var _dnd7 = __webpack_require__(46);

	var _dnd8 = _interopRequireDefault(_dnd7);

	var _dnd9 = __webpack_require__(47);

	var _dnd10 = _interopRequireDefault(_dnd9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  info: _dnd2.default, endDnd: _dnd4.default, endSnooze: _dnd6.default, setSnooze: _dnd8.default, teamInfo: _dnd10.default
	};
	module.exports = exports['default'];

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _files = __webpack_require__(52);

	var _files2 = _interopRequireDefault(_files);

	var _files3 = __webpack_require__(53);

	var _files4 = _interopRequireDefault(_files3);

	var _files5 = __webpack_require__(54);

	var _files6 = _interopRequireDefault(_files5);

	var _files7 = __webpack_require__(57);

	var _files8 = _interopRequireDefault(_files7);

	var _filesComments = __webpack_require__(49);

	var _filesComments2 = _interopRequireDefault(_filesComments);

	var _filesComments3 = __webpack_require__(50);

	var _filesComments4 = _interopRequireDefault(_filesComments3);

	var _filesComments5 = __webpack_require__(51);

	var _filesComments6 = _interopRequireDefault(_filesComments5);

	var _files9 = __webpack_require__(55);

	var _files10 = _interopRequireDefault(_files9);

	var _files11 = __webpack_require__(56);

	var _files12 = _interopRequireDefault(_files11);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  delete: _files2.default,
	  info: _files4.default,
	  list: _files6.default,
	  upload: _files8.default,
	  comments: {
	    add: _filesComments2.default,
	    delete: _filesComments4.default,
	    edit: _filesComments6.default
	  },
	  revokePublicURL: _files10.default,
	  sharedPublicURL: _files12.default
	};
	module.exports = exports['default'];

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _groups = __webpack_require__(58);

	var _groups2 = _interopRequireDefault(_groups);

	var _groups3 = __webpack_require__(59);

	var _groups4 = _interopRequireDefault(_groups3);

	var _groups5 = __webpack_require__(60);

	var _groups6 = _interopRequireDefault(_groups5);

	var _groups7 = __webpack_require__(61);

	var _groups8 = _interopRequireDefault(_groups7);

	var _groups9 = __webpack_require__(62);

	var _groups10 = _interopRequireDefault(_groups9);

	var _groups11 = __webpack_require__(63);

	var _groups12 = _interopRequireDefault(_groups11);

	var _groups13 = __webpack_require__(64);

	var _groups14 = _interopRequireDefault(_groups13);

	var _groups15 = __webpack_require__(65);

	var _groups16 = _interopRequireDefault(_groups15);

	var _groups17 = __webpack_require__(66);

	var _groups18 = _interopRequireDefault(_groups17);

	var _groups19 = __webpack_require__(67);

	var _groups20 = _interopRequireDefault(_groups19);

	var _groups21 = __webpack_require__(68);

	var _groups22 = _interopRequireDefault(_groups21);

	var _groups23 = __webpack_require__(69);

	var _groups24 = _interopRequireDefault(_groups23);

	var _groups25 = __webpack_require__(70);

	var _groups26 = _interopRequireDefault(_groups25);

	var _groups27 = __webpack_require__(71);

	var _groups28 = _interopRequireDefault(_groups27);

	var _groups29 = __webpack_require__(72);

	var _groups30 = _interopRequireDefault(_groups29);

	var _groups31 = __webpack_require__(73);

	var _groups32 = _interopRequireDefault(_groups31);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  archive: _groups2.default,
	  close: _groups4.default,
	  create: _groups6.default,
	  createChild: _groups8.default,
	  history: _groups10.default,
	  info: _groups12.default,
	  invite: _groups14.default,
	  kick: _groups16.default,
	  leave: _groups18.default,
	  list: _groups20.default,
	  mark: _groups22.default,
	  open: _groups24.default,
	  rename: _groups26.default,
	  setPurpose: _groups28.default,
	  setTopic: _groups30.default,
	  unarchive: _groups32.default
	};
	module.exports = exports['default'];

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _im = __webpack_require__(74);

	var _im2 = _interopRequireDefault(_im);

	var _im3 = __webpack_require__(75);

	var _im4 = _interopRequireDefault(_im3);

	var _im5 = __webpack_require__(76);

	var _im6 = _interopRequireDefault(_im5);

	var _im7 = __webpack_require__(77);

	var _im8 = _interopRequireDefault(_im7);

	var _im9 = __webpack_require__(78);

	var _im10 = _interopRequireDefault(_im9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  close: _im2.default, history: _im4.default, list: _im6.default, mark: _im8.default, open: _im10.default
	};
	module.exports = exports['default'];

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mpim = __webpack_require__(79);

	var _mpim2 = _interopRequireDefault(_mpim);

	var _mpim3 = __webpack_require__(80);

	var _mpim4 = _interopRequireDefault(_mpim3);

	var _mpim5 = __webpack_require__(81);

	var _mpim6 = _interopRequireDefault(_mpim5);

	var _mpim7 = __webpack_require__(82);

	var _mpim8 = _interopRequireDefault(_mpim7);

	var _mpim9 = __webpack_require__(83);

	var _mpim10 = _interopRequireDefault(_mpim9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  close: _mpim2.default,
	  history: _mpim4.default,
	  list: _mpim6.default,
	  mark: _mpim8.default,
	  open: _mpim10.default
	};
	module.exports = exports['default'];

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = oauthaccess;

	var _exec = __webpack_require__(6);

	var _exec2 = _interopRequireDefault(_exec);

	var _validate = __webpack_require__(20);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this file was generated by ./scripts/generate-web-api
	function oauthaccess(params, callback) {
	  var ns = 'oauth.access';
	  var err = (0, _validate2.default)(ns, params);
	  if (err) {
	    callback(err);
	  } else {
	    (0, _exec2.default)(ns, params, callback);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _reactions = __webpack_require__(87);

	var _reactions2 = _interopRequireDefault(_reactions);

	var _reactions3 = __webpack_require__(88);

	var _reactions4 = _interopRequireDefault(_reactions3);

	var _reactions5 = __webpack_require__(89);

	var _reactions6 = _interopRequireDefault(_reactions5);

	var _reactions7 = __webpack_require__(90);

	var _reactions8 = _interopRequireDefault(_reactions7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  add: _reactions2.default, get: _reactions4.default, list: _reactions6.default, remove: _reactions8.default
	};
	module.exports = exports['default'];

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _reminders = __webpack_require__(91);

	var _reminders2 = _interopRequireDefault(_reminders);

	var _reminders3 = __webpack_require__(92);

	var _reminders4 = _interopRequireDefault(_reminders3);

	var _reminders5 = __webpack_require__(93);

	var _reminders6 = _interopRequireDefault(_reminders5);

	var _reminders7 = __webpack_require__(94);

	var _reminders8 = _interopRequireDefault(_reminders7);

	var _reminders9 = __webpack_require__(95);

	var _reminders10 = _interopRequireDefault(_reminders9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  add: _reminders2.default, complete: _reminders4.default, delete: _reminders6.default, info: _reminders8.default, list: _reminders10.default
	};
	module.exports = exports['default'];

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _pins = __webpack_require__(84);

	var _pins2 = _interopRequireDefault(_pins);

	var _pins3 = __webpack_require__(85);

	var _pins4 = _interopRequireDefault(_pins3);

	var _pins5 = __webpack_require__(86);

	var _pins6 = _interopRequireDefault(_pins5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  add: _pins2.default, list: _pins4.default, remove: _pins6.default
	};
	module.exports = exports['default'];

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = client;

	var _rtm = __webpack_require__(96);

	var _rtm2 = _interopRequireDefault(_rtm);

	var _rtm3 = __webpack_require__(136);

	var _rtm4 = _interopRequireDefault(_rtm3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// socket factory
	function client() {

	  // build a new bot every time
	  var bot = {
	    handlers: {
	      started: []
	    }
	  };

	  // add undocumented ping event
	  _rtm4.default.push('pong');

	  // generate event handler registration methods
	  _rtm4.default.forEach(function (e) {
	    bot.handlers[e] = [];
	    bot[e] = function (handler) {
	      bot.handlers[e].push(handler);
	    };
	  });

	  bot.started = function (handler) {
	    bot.handlers['started'].push(handler);
	  };

	  // kicks up a web socket connection
	  bot.listen = function botListen(params, callback) {
	    (0, _rtm2.default)(params, function (err, data) {
	      if (err) {
	        if (callback) callback(err);else throw err;
	      } else {
	        // grab a handle on the socket
	        bot.ws = new WebSocket(data.url);
	        // delegate everything
	        bot.ws.onmessage = function message(e) {
	          var json = JSON.parse(e.data);
	          bot.handlers[json.type].forEach(function (m) {
	            return m.call({}, json);
	          });
	        };
	        // call started callbacks
	        bot.handlers['started'].forEach(function (m) {
	          return m.call({}, data);
	        });
	        if (callback) callback(null, data);
	      }
	    });
	  };

	  // closes the socket
	  bot.close = function botClose() {
	    bot.ws.close();
	  };

	  //////////
	  return bot;
	}
	module.exports = exports['default'];

/***/ },
/* 136 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	// generated using ./scripts/generate-all
	var events = ['accounts_changed', 'bot_added', 'bot_changed', 'channel_archive', 'channel_created', 'channel_deleted', 'channel_history_changed', 'channel_joined', 'channel_left', 'channel_marked', 'channel_rename', 'channel_unarchive', 'commands_changed', 'dnd_updated', 'dnd_updated_user', 'email_domain_changed', 'emoji_changed', 'file_change', 'file_comment_added', 'file_comment_deleted', 'file_comment_edited', 'file_created', 'file_deleted', 'file_public', 'file_shared', 'file_unshared', 'group_archive', 'group_close', 'group_history_changed', 'group_joined', 'group_left', 'group_marked', 'group_open', 'group_rename', 'group_unarchive', 'hello', 'im_close', 'im_created', 'im_history_changed', 'im_marked', 'im_open', 'manual_presence_change', 'message', 'message.channels', 'message.groups', 'message.im', 'message.mpim', 'pin_added', 'pin_removed', 'pong', 'pref_change', 'presence_change', 'reaction_added', 'reaction_removed', 'reconnect_url', 'star_added', 'star_removed', 'subteam_created', 'subteam_self_added', 'subteam_self_removed', 'subteam_updated', 'team_domain_change', 'team_join', 'team_migration_started', 'team_plan_change', 'team_pref_change', 'team_profile_change', 'team_profile_delete', 'team_profile_reorder', 'team_rename', 'url_verification', 'user_change', 'user_typing'];

	exports.default = events;
	module.exports = exports['default'];

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _search = __webpack_require__(97);

	var _search2 = _interopRequireDefault(_search);

	var _search3 = __webpack_require__(98);

	var _search4 = _interopRequireDefault(_search3);

	var _search5 = __webpack_require__(99);

	var _search6 = _interopRequireDefault(_search5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  all: _search2.default, files: _search4.default, messages: _search6.default
	};
	module.exports = exports['default'];

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _stars = __webpack_require__(100);

	var _stars2 = _interopRequireDefault(_stars);

	var _stars3 = __webpack_require__(101);

	var _stars4 = _interopRequireDefault(_stars3);

	var _stars5 = __webpack_require__(102);

	var _stars6 = _interopRequireDefault(_stars5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  add: _stars2.default, list: _stars4.default, remove: _stars6.default
	};
	module.exports = exports['default'];

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _team = __webpack_require__(103);

	var _team2 = _interopRequireDefault(_team);

	var _team3 = __webpack_require__(104);

	var _team4 = _interopRequireDefault(_team3);

	var _team5 = __webpack_require__(105);

	var _team6 = _interopRequireDefault(_team5);

	var _team7 = __webpack_require__(106);

	var _team8 = _interopRequireDefault(_team7);

	var _teamProfile = __webpack_require__(107);

	var _teamProfile2 = _interopRequireDefault(_teamProfile);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  accessLogs: _team2.default,
	  billableInfo: _team4.default,
	  info: _team6.default,
	  integrationLogs: _team8.default,
	  profile: {
	    get: _teamProfile2.default
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _usergroups = __webpack_require__(108);

	var _usergroups2 = _interopRequireDefault(_usergroups);

	var _usergroups3 = __webpack_require__(109);

	var _usergroups4 = _interopRequireDefault(_usergroups3);

	var _usergroups5 = __webpack_require__(110);

	var _usergroups6 = _interopRequireDefault(_usergroups5);

	var _usergroups7 = __webpack_require__(111);

	var _usergroups8 = _interopRequireDefault(_usergroups7);

	var _usergroups9 = __webpack_require__(112);

	var _usergroups10 = _interopRequireDefault(_usergroups9);

	var _usergroupsUsers = __webpack_require__(113);

	var _usergroupsUsers2 = _interopRequireDefault(_usergroupsUsers);

	var _usergroupsUsers3 = __webpack_require__(114);

	var _usergroupsUsers4 = _interopRequireDefault(_usergroupsUsers3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  create: _usergroups2.default,
	  disable: _usergroups4.default,
	  enable: _usergroups6.default,
	  list: _usergroups8.default,
	  update: _usergroups10.default,
	  users: {
	    list: _usergroupsUsers2.default,
	    update: _usergroupsUsers4.default
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _users = __webpack_require__(115);

	var _users2 = _interopRequireDefault(_users);

	var _users3 = __webpack_require__(116);

	var _users4 = _interopRequireDefault(_users3);

	var _users5 = __webpack_require__(117);

	var _users6 = _interopRequireDefault(_users5);

	var _users7 = __webpack_require__(118);

	var _users8 = _interopRequireDefault(_users7);

	var _users9 = __webpack_require__(121);

	var _users10 = _interopRequireDefault(_users9);

	var _users11 = __webpack_require__(122);

	var _users12 = _interopRequireDefault(_users11);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  getPresence: _users2.default,
	  identity: _users4.default,
	  info: _users6.default,
	  list: _users8.default,
	  setActive: _users10.default,
	  setPresence: _users12.default
	};
	module.exports = exports['default'];

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory();
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory();
	    global.types = mod.exports;
	  }
	})(this, function () {});
	(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports);
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports);
	    global.index = mod.exports;
	  }
	})(this, function (exports) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.find = find;
	  exports.load = load;
	  exports.all = all;
	  exports.exist = exist;
	  exports.getUrl = getUrl;
	  exports.parse = parse;

	  function _toConsumableArray(arr) {
	    if (Array.isArray(arr)) {
	      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	        arr2[i] = arr[i];
	      }

	      return arr2;
	    } else {
	      return Array.from(arr);
	    }
	  }

	  var enpoint = 'https://api.github.com/emojis';
	  var delimiterRegex = /(\:[\w\-\+]+\:)/g;
	  var emojis = null;

	  var fetch = window.fetch || function (endpoint) {
	    return new Promise(function (resolve, reject) {
	      var xhr = new XMLHttpRequest();

	      xhr.onreadystatechange = function () {
	        if (xhr.readyState === XMLHttpRequest.DONE) {
	          if (xhr.status !== 200) {
	            return reject(xhr.responseText);
	          }

	          return resolve({ json: function json() {
	              return JSON.parse(xhr.responseText);
	            } });
	        }
	      };

	      xhr.open('GET', endpoint, true);
	      xhr.send();
	    });
	  };

	  /**
	   * Return array with matched emojis in text.
	   *
	   * @example
	   * import { load as loadEmojis, find as findEmojis } from 'gh-emoji';
	   *
	   * const text = 'Do you believe in :alien:...? :scream:';
	   *
	   * loadEmojis().then((emojis) => {
	   *   console.log(findEmojis(text)); // [':alien:', ':scream:']
	   * });
	   *
	   * @param {String} text Text to search for emojis.
	   *
	   * @returns {Array<String>} Array with matched emojis.
	   */
	  function find(text) {
	    return text.match(delimiterRegex) || [];
	  }

	  /**
	   * Fetch the emoji data from Github's api.
	   *
	   * @example
	   * import { load as loadEmojis } from 'gh-emoji';
	   *
	   * loadEmojis().then((emojis) => {
	   *   console.log(emojis['+1']); // 👍
	   * });
	   *
	   * @returns {Promise<Object>} Promise which passes Object with emoji names
	   * as keys and generated image tags as values to callback.
	   */
	  function load() {
	    return new Promise(function (resolve) {
	      if (emojis) return resolve(emojis);

	      return fetch(enpoint).then(function (r) {
	        return r.json();
	      }).then(function (response) {
	        emojis = response;
	        resolve(emojis);
	      });
	    });
	  }

	  /**
	   * Return all fetched emojis.
	   *
	   * @example
	   * import { load as loadEmojis, all as allEmojis } from 'gh-emoji';
	   *
	   * loadEmojis().then(() => {
	   *   console.log(allEmojis()); // {emojiName: emojiImageTag}
	   * });
	   *
	   * @returns {Object} Object with emoji names as keys and generated image tags
	   * as values.
	   */
	  function all() {
	    return emojis;
	  }

	  /**
	   * Check if requested emoji exists.
	   *
	   * @example
	   * import { load as loadEmojis, exist as emojiExists } from 'gh-emoji';
	   *
	   * loadEmojis().then(() => {
	   *   console.log(emojiExists('foo')); // false
	   *   console.log(emojiExists('smile')); // true
	   * });
	   *
	   * @param {String} emojiId Name of emoji.
	   *
	   * @returns {Boolean}
	   */
	  function exist(emojiId) {
	    var emojiMap = all();

	    if (emojiMap == null) {
	      return false;
	    }

	    return !!emojiMap[emojiId];
	  }

	  /**
	   * Return github's image url of emoji.
	   *
	   * @example
	   * import { load as loadEmojis, getUrl } from 'gh-emoji';
	   *
	   * loadEmojis().then(() => {
	   *   console.log(getUrl('apple')); // 'https://assets-cdn.github.com/images/icons/emoji/unicode/1f34e.png?v6'
	   * });
	   *
	   * @param {String} emojiId Name of emoji.
	   *
	   * @returns {String} Image url of given emoji.
	   */
	  function getUrl(emojiId) {
	    var emojiMap = all();

	    if (emojiMap == null) {
	      return null;
	    }

	    return emojiMap[emojiId];
	  }

	  /**
	   * Parse text and replace emoji tags with actual emoji symbols.
	   *
	   * @example
	   * import { load as loadEmojis, parse } from 'gh-emoji';
	   *
	   * const text = 'Do you believe in :alien:...? :scream:';
	   *
	   * loadEmojis().then(() => {
	   *   console.log(parse(text)) // 'Do you believe in 👽...? 😱';
	   * });
	   *
	   * @param {String} text Text to parse.
	   * @param {Object} options Options with additional data for parser.
	   * @param {String} options.classNames String with custom class names
	   * added to each emoji, separated with whitespace.
	   *
	   * @returns {String} Parsed text with emoji image tags in it.
	   */
	  function parse(text) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var output = '';
	    var customClassNames = options.classNames ? options.classNames.trim().split(/\s+/) : '';

	    output += text.replace(delimiterRegex, function (match) {
	      var name = match.replace(/:/g, '');
	      var classNames = ['gh-emoji', 'gh-emoji-' + name];

	      if (!exist(name)) {
	        return match;
	      }

	      if (customClassNames) {
	        classNames.push.apply(classNames, _toConsumableArray(customClassNames));
	      }

	      var imageSrc = getUrl(name);
	      var imageClass = classNames.join(' ');
	      var imageAlt = name;

	      return '<img src="' + imageSrc + '" class="' + imageClass + '" alt="' + imageAlt + '" />';
	    });

	    return output;
	  }
	});


/***/ },
/* 143 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var User = function User(args) {
	  _classCallCheck(this, User);

	  this.name = args.name;
	  this.color = args.color;
	  this.id = args.id;
	  this.real_name = args.real_name || args.name;
	  // sizes available: image_24, image_32, image_48, image_72, image_192, image_512
	  this.image = args.profile.image_48;
	};

	exports.default = User;

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(145);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(147)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./ReactSlackChat.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./ReactSlackChat.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(146)();
	// imports
	exports.push([module.id, "@import url(http://fonts.googleapis.com/css?family=Raleway:400,200);", ""]);

	// module
	exports.push([module.id, "/* Slack Chat box */\r\n\r\n/* Element Visibility */\r\n.transition { transition: .8s cubic-bezier(.3, 0, 0, 1.3) }\r\n.card {\r\n    background-color: #fff;\r\n    box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.3);\r\n  -webkit-box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.3);\r\n  -moz-box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.3);\r\n    height: 60px;\r\n    overflow: hidden;\r\n    position: fixed;\r\n    right: 40px;\r\n    bottom: 0;\r\n    width: 300px;\r\n    cursor: pointer;\r\n}\r\n.card.active {\r\n    cursor: default;\r\n    height: 500px;\r\n    width: 300px;\r\n    z-index: 99999;\r\n}\r\n.card.active .card_circle {\r\n    background-size: cover;\r\n    border-radius: 0;\r\n}\r\n.card.active h2 {\r\n    background: #3487f7;\r\n    color: #fff;\r\n    padding: 5px;\r\n}\r\n.card .channels {\r\n  visibility: hidden;\r\n  opacity: 0;\r\n  transition: visibility 0s, opacity 0.5s linear;\r\n}\r\n.card.active .channel-active.channels {\r\n  overflow-y: auto;\r\n  visibility: visible;\r\n  transition: visibility 0s, opacity 0.5s linear;\r\n  opacity: 1;\r\n  overflow-x: hidden\r\n}\r\n.card.active.channel-active .help-header {\r\n  visibility: visible;\r\n  opacity: 1;\r\n  transition: visibility 0s, opacity 0.5s linear;\r\n}\r\n.card.active.chat-active .help-header {\r\n  visibility: hidden;\r\n  opacity: 0;\r\n  transition: visibility 0s, opacity 0.5s linear;\r\n}\r\n.card.active.chat-active .channels {\r\n  visibility: hidden;\r\n  opacity: 0;\r\n  transition: visibility 0s, opacity 0.5s linear;\r\n}\r\n.card .chat {\r\n  visibility: hidden;\r\n  opacity: 0;\r\n  transition: visibility 0s, opacity 0.5s linear;\r\n}\r\n.card.active.chat-active .chat {\r\n  visibility: visible;\r\n  opacity: 1;\r\n  transition: visibility 0s, opacity 0.5s linear;\r\n}\r\n/* Chat styles */\r\n.contact {\r\n  position: relative;\r\n  width: 95%;\r\n  height: 5rem;\r\n  padding-left: 1rem;\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-align: center;\r\n  -webkit-align-items: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n  cursor: pointer;\r\n  overflow: hidden;\r\n}\r\n.contact__photo {\r\n  border-radius: 50%;\r\n  margin-right: 1.5rem;\r\n  height: 48px;\r\n  float: right;\r\n}\r\n.user__contact__photo {\r\n  float: left;\r\n  margin-top: 2px;\r\n  padding-bottom: 1px;\r\n  height: 42px;\r\n  border-radius: 50%;\r\n  margin-right: 10px\r\n}\r\n.user__contact__generated__image {\r\n  float: left;\r\n  margin-top: 2px;\r\n  font-size: 2.2em;\r\n  color: #fff;\r\n  padding-right: 12px;\r\n  padding-left: 12px;\r\n  padding-bottom: 1px;\r\n  background: #3487f7;\r\n  height: 42px;\r\n  border-radius: 50%;\r\n  margin-right: 10px\r\n}\r\n.chat__name {\r\n  left: 1rem;\r\n  top: 1.2rem;\r\n  position: relative\r\n}\r\n.chat__contact__photo {\r\n  border-radius: 50%;\r\n  height: 42px;\r\n  float: right;\r\n}\r\n.channel__header__photo {\r\n  border-radius: 50%;\r\n  height: 48px;\r\n  float: right;\r\n  position: relative;\r\n  left: 5rem;\r\n  bottom: 0.5rem;\r\n}\r\n.contact__name {\r\n  font-family: \"Raleway\", Helvetica, Arial, sans-serif;\r\n}\r\n.contact__status {\r\n  position: absolute;\r\n  top: 2.1rem;\r\n  right: 1.5rem;\r\n  width: 8px;\r\n  height: 8px;\r\n  border: 2px solid #00B570;\r\n  border-radius: 50%;\r\n  opacity: 0;\r\n  -webkit-transition: opacity 0.3s;\r\n  transition: opacity 0.3s;\r\n}\r\n.contact__status.online {\r\n  opacity: 1;\r\n}\r\n.chat__back:hover:before {\r\n  -webkit-transform: translateX(-0.3rem) rotate(-45deg);\r\n          transform: translateX(-0.3rem) rotate(-45deg);\r\n}\r\n.chat__back:before {\r\n  content: \"\";\r\n  position: absolute;\r\n  display: block;\r\n  cursor: pointer;\r\n  top: 2.4rem;\r\n  left: 1.6rem;\r\n  width: 1.5rem;\r\n  height: 1.5rem;\r\n  border: 2px solid #ccc;\r\n  border-right: none;\r\n  border-bottom: none;\r\n  -webkit-transform: rotate(-45deg);\r\n          transform: rotate(-45deg);\r\n  -webkit-transition: -webkit-transform 0.3s;\r\n  transition: -webkit-transform 0.3s;\r\n  transition: transform 0.3s;\r\n  transition: transform 0.3s, -webkit-transform 0.3s;\r\n}\r\n.chat__status {\r\n  position: relative;\r\n  left: 4.6rem;\r\n  font-family: \"Raleway\", Helvetica, Arial, sans-serif;\r\n  text-transform: uppercase;\r\n  color: #fff;\r\n}\r\n.chat__person {\r\n  display: inline-block;\r\n  position: relative;\r\n  top: 2rem;\r\n  right: 1.5rem;\r\n  font-family: \"Raleway\", Helvetica, Arial, sans-serif;\r\n  color: #fff;\r\n}\r\n.chat__online {\r\n  position: absolute;\r\n  left: 45px;\r\n  top: 5px;\r\n  width: 8px;\r\n  height: 8px;\r\n  border: 2px solid #43dea3;\r\n  border-radius: 50%;\r\n  opacity: 0;\r\n  -webkit-transition: opacity 0.3s;\r\n  transition: opacity 0.3s;\r\n}\r\n.chat__online.active {\r\n  opacity: 1;\r\n}\r\n.chat__messages {\r\n  position: relative;\r\n  bottom: 16rem;\r\n  width: 95%;\r\n  padding-right: 0.5rem;\r\n  padding-left: 0.5rem;\r\n  max-height: 21.5rem;\r\n  overflow-y: auto;\r\n}\r\n.chat__msgRow {\r\n  margin-bottom: 0.5rem;\r\n}\r\n.chat__msgRow:after {\r\n  content: \"\";\r\n  display: table;\r\n  clear: both;\r\n}\r\n.chat__msgRow.mine {\r\n  text-align: left;\r\n}\r\n.chat__msgRow.notMine {\r\n  text-align: right;\r\n}\r\n.chat__message {\r\n  display: inline-block;\r\n  max-width: 60%;\r\n  word-wrap: break-word;\r\n  margin-right: 10px;\r\n  padding: 0.8rem;\r\n  font-family: \"Raleway\", Helvetica, Arial, sans-serif;\r\n}\r\n.chat__msgRow.notMine .chat__message.mentioned {\r\n  background: #43b2f3 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAEZ0FNQQAAsY58+1GTAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAASmSURBVHjajJTJbxxFFIe/V9Xtnn3G42TsgIkSsAlgA4EEEAiEBAkSXBCKuMCBPwAkOMCFCxwAcUXcuXHjwiaxCEWIJQlhESCWAMY2sZ3Ejsez2dNbVXHoGcdBCPGkp+6q6v7q1e91/+T9VyeY3Hs1nxz/kmrFQ2lFFMWIsB3Wwr6pPU/HcdxdnFt/Q6lLa85BPtDgHJ0ty3233cH82d/w+EeICEopnLPbc57WN9/76Msvhd3m1tJrz33scGeHa0oJSgTr3GUctXNgnSWfL5DLFUhTcE6IIpi57c7ngvp0qTp5eNeB2ZlnkgjEgUmhkAsoFHL/Dc6ObcnlAoLAx1oIgpFDBw4/clTFKyi7oWbvevSY77MvtRCM+ORzAdbaf2L+BWwsY6OjFItFuj3H7K2Hn6o1Gg3CNoQb7Jqcvuq62Zknu10oFPOM1WsY8z/AAEkSU6/XmWhUb7pm9s6jKtmAuANRB21DdeDm+x9u1IPJ3fU6cZL+GwL9+JES5UqNn39ZQimnBTOhlczWqrV7rpu58dkr9u2/RZm+kMaQGjAJuWJptKi29pmo6zZa64Ver2/6IVtbIUzvvZJWp4m880rjganp649ubsbj5dHq7nyhPBYU8mNekKtXK+WaRwxOAd6lVDkS69Fut5tpGDajzXaz3+tc7LbWVou+Xfv1jx/f8yq5/BPXTk09pvM+2BhEspa7BOJVMID4A6jO0vXwdY5d5aBOKagzWoYkBq7FrJ/n7MKZvPfr4sqb1ZOfHTp48JYDBA7SzUx65wALzoJNwTpwgBNwOjuFU2AFjAW/gt00fP3TV9/NXWy+rY8csqvLq+vzKuzduGd0fLcoB+EqxC2I2lnGHYi6EHUG2YJ+C/rtbF4FmJ7l5A+nTp8+u/SCxZ3UD91BZB0rS+udeRVu3LCnPDIuLoKon1VpXSbHZVcHqYUkAWMwvcid+O2XU9+cX31BFJ8pRVc/eDsoITKOleWN3oJKwuvHK4WGEoTUZpCdmQ42MJk0SYw58eeFE9+cb74ois+1sAmgH7wdBNBClFgWz7X6a+N5ffdoKShnkGEOYHYIt2CF38+1Fj5dbj6PcNxXhNv+4gY9GUTf07IgjpDEQmKAYdMGVuYGclhALB7SH1GyFONiswPkpTv+xsRAI6/Hq57ek4Ht5WC4pLsFlFDWeqLo6V2bUZp97tuOuMN3jUDJ01eXUTniNNtJAKUHlQ6qTtNMFqUpILW8kgnIHt0G55TsdG2/pNVVvrUQGvACcB5hp89cp7uoEW9/sXxlkC+BxBCHFK3VJaX2e8DITnDF09sDX2ylKOxFNHgVTGg5s3bx/M+d1gfn4ui4Qvwr/P6RGyq1B6Zq9br2C6i0RVVkqqyklNPS2wa3jcmkAwJHY/dIfgZT4M+19sb3zbWPlqPw3Rh3WgnLFifzcfjFysULH57ptB8+WB47sreYL9WVN20kHOs6ekOZvWjg/IPeJHO9rR/nen/N/9HvvxVjTylh0Rc2h4Ip4Uzq3Mpc0v92pbny4VQ3OBY7u2AEk+K2dZbXn7rMRosWJo1DaTgnQlsGrjF8YXhvMy8ftY5xJaQKloCtIejvAQAnfFNfd0aAVwAAAABJRU5ErkJggg==) no-repeat -2px -2px !important;\r\n  color: #fff !important;\r\n}\r\n.mine .chat__message {\r\n  color: #2B2342;\r\n  border: 1px solid #DFDFDF;\r\n  position: relative;\r\n}\r\n.notMine .chat__message {\r\n  color: #23244E;\r\n  background: #E9EAF3;\r\n}\r\n.chat__input {\r\n  position: absolute;\r\n  bottom: 0;\r\n  left: 0;\r\n  width: 73%;\r\n  height: 1.5rem;\r\n  padding: 1rem 1rem 1rem 4rem;\r\n  background-image: url(\"https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/elastic-search.png\");\r\n  background-repeat: no-repeat;\r\n  background-position: 1rem 1rem;\r\n  background-color: #E9EAF3;\r\n  color: #2B2342;\r\n  font-family: \"Raleway\", Helvetica, Arial, sans-serif;\r\n}\r\n.card .sub-text {\r\n  visibility: hidden;\r\n  transition: visibility 0s, opacity 0.5s linear;\r\n  opacity: 0;\r\n}\r\n.card.active .sub-text {\r\n  visibility: visible;\r\n  transition: visibility 0s, opacity 0.5s linear;\r\n  opacity: 1;\r\n}\r\n.card.active h2 small { color: #fff }\r\n.card.active p { margin-top: 300px }\r\n.help-header {\r\n  background: #3487f7;\r\n  position: relative;\r\n  padding-top: 20px;\r\n  padding-bottom: 20px;\r\n}\r\n.chat-header {\r\n  position: absolute;\r\n  top: 0px;\r\n  z-index: 9999;\r\n  left: 0rem;\r\n  width: 100%;\r\n  height: 6rem;\r\n  background: #3487f7;\r\n}\r\n.card h2 {\r\n  color: #ffffff;\r\n  font-family: 'Raleway', sans-serif;\r\n  font-size: 24px;\r\n  font-weight: 200;\r\n  margin-top: 0px;\r\n  text-align: center;\r\n  width: 100%;\r\n  z-index: 9999;\r\n}\r\np {\r\n  color: rgba(0,0,0,.6);\r\n  font-family: 'Raleway', sans-serif;\r\n  font-size: 100%;\r\n  font-weight: normal;\r\n  margin-top: 200px;\r\n  position: absolute;\r\n  text-align: center;\r\n  z-index: 9999;\r\n}\r\n.gh-emoji {\r\n  height: 24px;\r\n}\r\n/* End Slack chat box */\r\n", ""]);

	// exports


/***/ },
/* 146 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ])
});
;