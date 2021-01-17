export default ({
  bot,
  text,
  singleUserMode,
  ts,
  apiToken,
  channel,
  username,
}) => {
  if (text) {
    const postMessageArgs = {
      token: apiToken,
      channel,
      text,
      username,
    };
    if (singleUserMode && ts) {
      return bot.chat.postMessage({
        ...postMessageArgs,
        thread_ts: ts,
      });
    } else {
      return bot.chat.postMessage(postMessageArgs);
    }
  } else {
    return Promise.reject('Empty text is not permitted.');
  }
};
