import { debugLog } from '../utils';
import { isValidOnlineUser } from '../chat-functions';

import { User } from '../User';

export default ({ apiToken, bot }) => {
  return bot.users.list({ token: apiToken }).then((payload) => {
    debugLog(payload);
    // Create new User object for each online user found
    // Add to our list only if the user is valid
    const onlineUsers = [];
    // extract and resolve return the users
    payload.members.map((user) =>
      isValidOnlineUser(user) ? onlineUsers.push(new User(user)) : null
    );

    return { onlineUsers };
  });
};
