import { debugLog } from '../utils';

export default ({ apiToken, channelId, bot, singleUserMode, ts }) => {
  if (singleUserMode && !ts) {
    debugLog('[SINGLE_USER_MODE]', 'No TS known yet.');
    // single user mode but no thread info provided, return empty
    // this must be the initial state of app
    return Promise.resolve({
      messages: [],
    });
  }
  return singleUserMode
    ? bot.conversations
        .replies({
          token: apiToken,
          channel: channelId,
          ts,
        })
        // replies are reversed for some reason, we gotta reverse them first
        .then(({ messages }) =>
          Promise.resolve({
            messages: messages.reverse(),
          })
        )
    : bot.conversations.history({
        token: apiToken,
        channel: channelId,
      });
};
