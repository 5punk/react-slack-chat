import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactSlackChat from '../ReactSlackChat/ReactSlackChat';

function App() {
  const [open, setOpen] = React.useState(false);

  const pruebaFn = () => {
    setOpen((myVar) => !myVar);
    console.log(open);
  };
  return (
    <>
      <button onClick={pruebaFn}>CLICK</button>
      <ReactSlackChat
        botName="Rzilio"
        helpText="Rzilient Support"
        apiToken={process.env.REACT_APP_SLACK_BOT}
        singleUserMode
        closeChatButton
        messageSupportChat=""
        openSupportChat={open}
        channels={[
          {
            name: 'rzilient',
          },
          {
            name: 'online-support',
          },
        ]}
        themeColor="#172b58"
        userImage="http://www.iconshock.com/img_vista/FLAT/mail/jpg/robot_icon.jpg"
        hooks={[
          {
            /* My Custom Hook */
            id: 'getSystemInfo',
            action: () => Promise.resolve('MY SYSTEM INFO!'),
          },
        ]}
      />
    </>
  );
}

export default App;
