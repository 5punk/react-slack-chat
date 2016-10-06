import React, { Component } from 'react';
import $ from 'jquery';
import './ReactSlackChat.css';

class ReactSlackChat extends Component {
  bindAnimations() {
    // Handle ChatBox Interactions
    $(document).ready(function() {
      var $demo = $('.demo'),
        $path = $('.s-path path'),
        $sCont = $('.sidebar-content'),
        $chat = $('.chat'),
        $helpText = $('.help-text'),
        demoTop = $demo.offset().top,
        demoLeft = $demo.offset().left,
        diffX = 0,
        curX = 0,
        finalX = 0,
        frame = 1000 / 60,
        animTime = 600,
        sContTrans = 200,
        animating = false;

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

      var startD = createD(50, 0, 1),
        midD = createD(125, 75, 0),
        finalD = createD(300, 0, 1),
        clickMidD = createD(300, 80, 0),
        clickMidDRev = createD(200, 100, 1),
        clickD = createD(300, 0, 1),
        currentPath = startD;

      function newD(num1, num2) {
        var d = $path.attr('d'),
          num2 = num2 || 250,
          nd = d.replace(/\ba(\d+),(\d+)\b/gi, 'a' + num1 + ',' + num2);
        return nd;
      }

      function animatePathD(path, d, time, handlers, callback, easingTop, easingX) {
        var steps = Math.floor(time / frame),
          curStep = 0,
          oldArr = currentPath.split(' '),
          newArr = d.split(' '),
          oldTop = +oldArr[1].split(',')[0],
          topDiff = +newArr[1].split(',')[0] - oldTop,
          nextTop,
          nextX,
          easingTop = easings[easingTop] || easings.smallElastic,
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
        var $img = $(that).find('.contact__photo'),
          top = $img.offset().top - demoTop,
          left = $img.offset().left - demoLeft,
          $clone = $img.clone().addClass('cloned');

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
        var elTop = elem.offset().top,
          elLeft = elem.offset().left,
          x = e.pageX - elLeft,
          y = e.pageY - elTop;
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
        var that = this,
          name = $(this).find('.contact__name').text(),
          online = $(this).find('.contact__status').hasClass('online');
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



  getUserList() {

  }

  componentDidMount() {
    // Handle Animations
    this.bindAnimations();
  }

  render() {
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
          <div className='contact'>
            <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/elastic-man.png' alt='' className='contact__photo' />
            <span className='contact__name'>Ethan Hawke</span>
            <span className='contact__status online'></span>
          </div>
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

export default ReactSlackChat;
