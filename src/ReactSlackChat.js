import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
import { rtm } from 'slack';
import './ReactSlackChat.css';

class User {
  constructor(args) {
    this.name = args.name;
    this.color = args.color;
    this.id = args.id;
    this.real_name = args.real_name || args.name;
    // sizes available: image_24, image_32, image_48, image_72, image_192, image_512
    this.image = args.profile.image_48;
  }
}

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
      onlineUsers: []
    };
    // Connect bot
    this.connectBot(this)
      .then((users) => {
        console.log('got users', users);
        this.setState({
          onlineUsers: users
        });
      })
      .catch((err) => {
        console.log('could not intialize slack bot', err);
        this.setState({
          failed: true
        });
      });
  }

  bindAnimations() {
    // Handle ChatBox Interactions
    $(document).ready(function() {
      var $demo = $('.demo');
      var $path = $('.s-path path');
      var $sCont = $('.sidebar-content');
      var $chat = $('.chat');
      var $helpText = $('.help-text');
      var demoTop = $demo.offset().top;
      var demoLeft = $demo.offset().left;
      var diffX = 0;
      var curX = 0;
      var finalX = 0;
      var frame = 1000 / 60;
      var animTime = 600;
      var sContTrans = 200;
      var animating = false;

      var easings = {
        smallElastic: function(t, b, c, d) {
          var ts = (t /= d) * t;
          var tc = ts * t;
          return b + c * (33 * tc * ts + -106 * ts * ts + 126 * tc + -67 * ts + 15 * t);
        },
        inCubic: function(t, b, c, d) {
          var tc = (t /= d) * t * t;
          return b + c * (tc);
        }
      };

      function createD(top, ax, dir) {
        return 'M0,0 ' + top + ',0 a' + ax + ',250 0 1,' + dir + ' 0,500 L0,500';
      }

      var startD = createD(50, 0, 1);
      var midD = createD(125, 75, 0);
      var finalD = createD(300, 0, 1);
      var clickMidD = createD(300, 80, 0);
      var clickMidDRev = createD(200, 100, 1);
      var clickD = createD(300, 0, 1);
      var currentPath = startD;

      function newD(num1, num2) {
        var d = $path.attr('d');
        num2 = num2 || 250;
        var nd = d.replace(/\ba(\d+),(\d+)\b/gi, 'a' + num1 + ',' + num2);
        return nd;
      }

      function animatePathD(path, d, time, handlers, callback, easingTop, easingX) {
        var steps = Math.floor(time / frame);
        var curStep = 0;
        var oldArr = currentPath.split(' ');
        var newArr = d.split(' ');
        var oldTop = +oldArr[1].split(',')[0];
        var topDiff = +newArr[1].split(',')[0] - oldTop;
        var nextTop;
        var nextX;
        easingTop = easings[easingTop] || easings.smallElastic;
        easingX = easings[easingX] || easingTop;

        $(document).off('mousedown mouseup');

        function animate() {
          curStep++;
          nextTop = easingTop(curStep, oldTop, topDiff, steps);
          nextX = easingX(curStep, curX, finalX - curX, steps);
          oldArr[1] = nextTop + ',0';
          oldArr[2] = 'a' + Math.abs(nextX) + ',250';
          oldArr[4] = (nextX >= 0) ? '1,1' : '1,0';
          $path.attr('d', oldArr.join(' '));
          if (curStep > steps) {
            curX = 0;
            diffX = 0;
            $path.attr('d', d);
            currentPath = d;
            if (handlers) handlers1();
            if (callback) callback();
            return;
          }
          requestAnimationFrame(animate);
        }
        animate();
      }

      function handlers1() {
        $(document).on('mousedown touchstart', '.chat-clickable', function(e) {
          diffX = 300;
          curX = Math.floor(300 / 2);
          $path.attr('d', newD(curX));
        });

        $(document).on('mouseup touchend', function() {
          $(document).off('mousemove touchmove');
          if (animating) return;
          if (!diffX) return;
          if (diffX < 40) {
            animatePathD($path, newD(0), animTime, true);
          } else {
            // Hide help text
            $helpText.hide();
            animatePathD($path, finalD, animTime, false, function() {
              $sCont.addClass('active');
              setTimeout(function() {
                $(document).on('click', closeSidebar);
              }, sContTrans);
            });
          }
        });
      }

      handlers1();

      function closeSidebar(e) {
        if ($(e.target).closest('.sidebar-content').length ||
          $(e.target).closest('.chat').length) return;
        if (animating) return;
        animating = true;
        $sCont.removeClass('active');
        $chat.removeClass('active');
        $('.cloned').addClass('removed');
        finalX = -75;
        setTimeout(function() {
          animatePathD($path, midD, animTime / 3, false, function() {
            $chat.hide();
            $('.cloned').remove();
            finalX = 0;
            curX = -75;
            animatePathD($path, startD, animTime / 3 * 2, true);
            animating = false;
            // Show help text
            $helpText.show();
          }, 'inCubic');
        }, sContTrans);
        $(document).off('click', closeSidebar);
      }

      function moveImage(that) {
        var $img = $(that).find('.contact__photo');
        var top = $img.offset().top - demoTop;
        var left = $img.offset().left - demoLeft;
        var $clone = $img.clone().addClass('cloned');

        $clone.css({
          top: top,
          left: left
        });
        $demo.append($clone);
        $clone.css('top');
        $clone.css({
          top: '1.8rem',
          left: '15rem'
        });
      }

      function ripple(elem, e) {
        var elTop = elem.offset().top;
        var elLeft = elem.offset().left;
        var x = e.pageX - elLeft;
        var y = e.pageY - elTop;
        var $ripple = $('<div class="ripple"></div>');
        $ripple.css({
          top: y,
          left: x
        });
        elem.append($ripple);
      }

      $(document).on('click', '.contact', function(e) {
        if (animating) return;
        animating = true;
        var that = this;
        var name = $(this).find('.contact__name').text();
        var online = $(this).find('.contact__status').hasClass('online');
        $('.chat__name').text(name);
        $('.chat__online').removeClass('active');
        if (online) $('.chat__online').addClass('active');
        ripple($(that), e);
        setTimeout(function() {
          $sCont.removeClass('active');
          moveImage(that);
          finalX = -80;
          setTimeout(function() {
            $('.ripple').remove();
            animatePathD($path, clickMidD, animTime / 3, false, function() {
              curX = -80;
              finalX = 0;
              animatePathD($path, clickD, animTime * 2 / 3, true, function() {
                $chat.show();
                $chat.css('top');
                $chat.addClass('active');
                animating = false;
              });
            }, 'inCubic');
          }, sContTrans);
        }, sContTrans);
      });

      $(document).on('click', '.chat__back', function() {
        if (animating) return;
        animating = true;
        $chat.removeClass('active');
        $('.cloned').addClass('removed');
        setTimeout(function() {
          $('.cloned').remove();
          $chat.hide();
          finalX = 100;
          animatePathD($path, clickMidDRev, animTime / 3, false, function() {
            curX = 100;
            finalX = 0;
            animatePathD($path, finalD, animTime * 2 / 3, true, function() {
              $sCont.addClass('active');
              $(document).on('click', closeSidebar);
              animating = false;
            });
          }, 'inCubic');
        }, sContTrans);
      });

      $(window).on('resize', function() {
        demoTop = $demo.offset().top;
        demoLeft = $demo.offset().left;
      });
    });
  }

  isValidOnlineUser(user) {
    // return true if
    // user should be active / online
    return user.presence === 'active' &&
      // And is NOT a bot
      !user.is_bot &&
      // slackbot hack, it thinks its not a bot :/
      user.name.indexOf('slackbot') === -1;
  }

  connectBot() {
    return new Promise((resolve, reject) => {
      try {
        // start the bot, get the initial payload
        this.bot.started((payload) => {
          console.log(payload);
          const onlineUsers = [];
          // Create new User object for each online user found
          // Add to our list only if the user is valid
          payload.users.map((user) => this.isValidOnlineUser(user)
            ? onlineUsers.push(new User(user))
            : null
          );
          // extract and resolve return the users
          return resolve(onlineUsers);
        });
        // tell the bot to listen
        this.bot.listen({ token: this.props.apiToken });
      } catch (err) {
        return reject(err);
      }
    });
  }

  componentDidMount() {
    // Handle Animations
    this.bindAnimations();
  }

  render() {
    // If Slack communications have failed or errored out
    // do not render anything
    if (this.state.failed) {
      return false;
    }
    // Looks like nothing failed, let's start to render our chatbox
    const chatbox = <div className='chatbox'>
      <div className='demo'>
        <svg className='sidebar s-path' viewBox='0 0 300 500'>
          <path className='chat-clickable' fill='#ccc' d='M0,0 50,0 a0,250 0 1,1 0,500 L0,500' />
          <text x="56%" y="8%" className='help-text chat-clickable' fill='#666' fontSize='25' transform='rotate(90 30,30)'>
            Click for help
          </text>
        </svg>
        <div className='static'>
        </div>
        <div className='sidebar-content'>
          {
            this.state.onlineUsers.map((user) =>
              <div className='contact' key={user.id}>
                <img src={user.image} alt='' className='contact__photo' />
                <span className='contact__name'>{user.real_name}</span>
                <span className='contact__status online'></span>
              </div>
            )
          }
        </div>
        <div className='chat'>
          <span className='chat__back'></span>
          <span className='chat__status'>status</span>
          <div className='chat__person'>
            <span className='chat__online active'></span>
            <span className='chat__name'>Huehue Huehue</span>
          </div>
          <div className='chat__messages'>
            <div className='chat__msgRow'>
              <div className='chat__message mine'>Such SVG, much Javascript, very CSS!</div>
            </div>
            <div className='chat__msgRow'>
              <div className='chat__message notMine'>Wow!</div>
            </div>
            <div className='chat__msgRow'>
              <div className='chat__message notMine'>Very elastic! Such easings!</div>
            </div>
            <div className='chat__msgRow'>
              <div className='chat__message mine'>Such SVG, much Javascript, very CSS!</div>
            </div>
            <div className='chat__msgRow'>
              <div className='chat__message notMine'>Very elastic! Such easings!</div>
            </div>
            <div className='chat__msgRow'>
              <div className='chat__message notMine'>Very elastic! Such easings!</div>
            </div>
            <div className='chat__msgRow'>
              <div className='chat__message mine'>
                Check out my other <a href='http://codepen.io/suez/public/' target='_blank'>pens</a>
              </div>
            </div>
          </div>
          <input type='text' className='chat__input' placeholder='Your message' />
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
  apiToken: PropTypes.string.isRequired
};

export default ReactSlackChat;
