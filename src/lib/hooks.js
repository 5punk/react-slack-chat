import { decodeHtml, isAdmin, wasIMentioned } from './chat-functions';
import { postMessage } from './slack-utils';
import { debugLog } from './utils';

// Needs Chat Text
export const isHookMessage = (text) => {
  // Full match 0-20 `$=>@avanish:hookText`
  // Group 1. 3-12 `@avanish`
  // Group 2. 12-20 `hookText`
  const hookMessageRegex = /\$=>(@.*.):(.*)/;
  return hookMessageRegex.exec(text);
};

// Needs Message Object
export const execHooksIfFound = ({
  bot,
  message,
  customHooks,
  apiToken,
  channel,
  username,
}) => {
  const messageText = decodeHtml(message.text);
  // Check to see if Action Hook is triggered
  const hookFound = isHookMessage(messageText);
  // Check to see if this is a hook message
  // And the user bot is mentioned
  // And is from a legitimate admin
  if (hookFound && wasIMentioned(message, username) && isAdmin(message)) {
    if (hookFound[2]) {
      // Format of isHookMessage is
      // $=>hookTrigger
      // [0] = $=>@5punk:hookTrigger
      // [1] = @5punk
      // [2] = hookTriggerID
      // check what mode is the project running in?
      // If system hooks are included by default, run them!
      // if found execute action
      // Execute System hooks set by user in this.props.hooks
      // Conditionally import it for the build (lite vs -with-hooks)
      if (process.env.SYSTEM_HOOKS) {
        const { systemHooks } = require('./system-default-hooks');
        systemHooks.map((hook) => {
          if (hook.id === hookFound[2]) {
            executeHook({
              bot,
              hook,
              apiToken,
              channel,
              username,
            });
          }
        });
      }

      // Execute custom hooks set by user in this.props.hooks
      customHooks.map((hook) => {
        if (hook.id === hookFound[2]) {
          executeHook({
            bot,
            hook,
            apiToken,
            channel,
            username,
          });
        }
      });
    }
  }
};

const executeHook = ({ bot, hook, apiToken, channel, username }) => {
  debugLog('Hook trigger found', hook.id);
  return hook
    .action({
      apiToken,
      channel,
      username,
    })
    .then((hookActionResponse) => {
      debugLog('Action executed. Posting response.');
      return postMessage({
        bot,
        text: `$=>@[${hook.id}]:${hookActionResponse}`,
        apiToken,
        channel,
        username,
      });
    });
};
