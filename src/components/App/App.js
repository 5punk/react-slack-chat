import React, { Component } from "react";
import publicIp from "public-ip";

import styles from "./App.scss";

process.env.DEPLOY_MODE;

// local development mode
// eat your own dog food!

class App extends Component {
  constructor(props) {
    super(props);
    this.getIP = this.getIP.bind(this);

    this.state = {
      ip: undefined
    };
  }
  syntaxHighlight(json) {
    if (typeof json !== "string") {
      json = JSON.stringify(json, undefined, 4);
    }
    json = json
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    // eslint-disable-next-line
    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      function(match) {
        var cls = "number";
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "key";
          } else {
            cls = "string";
          }
        } else if (/true|false/.test(match)) {
          cls = "boolean";
        } else if (/null/.test(match)) {
          cls = "null";
        }
        return '<span class="' + cls + '">' + match + "</span>";
      }
    );
  }

  createMarkup(dom) {
    return { __html: dom };
  }

  getIP() {
    return (
      this.state.ip ||
      publicIp
        .v4()
        .then(ip => this.setState({ ip }))
        .catch(console.log)
    );
  }

  render() {
    const getClientID = this.state.ip || this.getIP();
    const getClientAvatar = `https://robohash.org/${getClientID}`;

    const slackChatProps = {
      botName: getClientID,
      channels: [
        {
          name: "mac",
          icon: "https://image.flaticon.com/icons/svg/141/141021.svg"
        },
        {
          name: "pc",
          icon: "https://image.flaticon.com/icons/svg/224/224597.svg"
        },
        {
          name: "linux",
          icon: "https://image.flaticon.com/icons/svg/226/226772.svg"
        },
        {
          name: "test",
          id: "",
          icon: ""
        }
      ],
      apiToken: "eG94Yi0xMTExMjA5MTYwNjUtQVROd20zVTF0WGxURDdLUHdQMmkyQjNI",
      helpText: "Need Help?",
      themeColor: "#856090",
      debugMode: true,
      userImage: getClientAvatar,
      hooks: [
        {
          /* My Custom Hook */
          id: "getSystemInfo",
          action: () => "MY SYSTEM INFO!"
        }
      ]
    };

    const Chat = ({ ReactSlackChat }) =>
      !this.state.ip ? (
        <div className={styles["loading"]}>
          <h2>Now Loading...</h2>
        </div>
      ) : (
        <ReactSlackChat {...slackChatProps} />
      );
    const codeHighlight = this.createMarkup(
      this.syntaxHighlight(slackChatProps)
    );

    const promisedReactSlackChat = !process.env.DEPLOY_MODE
      ? // local development for library
        import(
          /* webpackChunkName: "local-dev-ReactSlackChat" */ "../ReactSlackChat"
        )
      : // deploy mode will consume the generated node module
        // gotta eat your own dog food
        import(
          /* webpackChunkName: "node-module-ReactSlackChat" */ "../../../dist/react-slack-chat-with-default-hooks"
        );

    !this.state.resolvedReactSlackChat &&
      promisedReactSlackChat.then(ReactSlackChat => {
        console.log("Got a promisifed React Slack Chat chunk", ReactSlackChat);
        return this.setState({
          resolvedReactSlackChat: ReactSlackChat
        });
      });

    const { ReactSlackChat } = this.state.resolvedReactSlackChat || {};
    console.log(this.state.resolvedReactSlackChat);

    return (
      <>
        {!ReactSlackChat ? (
          <div className={styles["loading"]}>
            <h2>Now Loading...</h2>
          </div>
        ) : (
          <div className={styles["App"]}>
            <div className={styles["App-header"]}>
              <img
                src={`https://robohash.org/${new Date()}`}
                className={styles["App-logo"]}
                alt="logo"
              />
              <h2>
                Welcome to{" "}
                <a
                  className={styles["gitLink"]}
                  href="https://github.com/5punk/react-slack-chat"
                >
                  React Slack Chat
                </a>
              </h2>
              <a href="https://github.com/5punk/react-slack-chat">
                <img
                  className={styles["ribbon"]}
                  src="https://camo.githubusercontent.com/52760788cde945287fbb584134c4cbc2bc36f904/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f77686974655f6666666666662e706e67"
                  alt="Fork me on GitHub"
                  data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_white_ffffff.png"
                />
              </a>
            </div>
            <p className={styles["App-intro"]}>
              Here's an example configuration to load the widget.
            </p>
            <pre className={styles["codeBlock"]}>
              <p>&lt;ReactSlackChat</p>
              <pre dangerouslySetInnerHTML={codeHighlight} />
              <p>/&gt;</p>
            </pre>
            <div className={styles["welp"]}>
              <hr />
              <h1>Welp! How does all this magic work?</h1>
              <p>
                Easy! Read the TLDR{" "}
                <a href="https://github.com/5punk/react-slack-chat#react-slack-chat">
                  setup instructions
                </a>
                .
              </p>
            </div>
            <Chat ReactSlackChat={ReactSlackChat} />
          </div>
        )}
      </>
    );
  }
}

export default App;
