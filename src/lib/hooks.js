import html2canvas from 'html2canvas';

import { postMessage, postFile, decodeHtml, isAdmin, wasIMentioned } from './chat-functions';
import { debugLog } from './utils';

// Define System hooks for everyone
const systemHooks = [
  {
    id: 'getCurrentPath',
    action: () => window.location.href
  },
  {
    id: 'getPlatform',
    action: () => window.navigator.platform
  },
  {
    id: 'getScreenshot',
    action: ({ apiToken, channel, username }) => {
      return html2canvas(document.body)
        .then((canvas) => {
          const dataURL = canvas.toDataURL();
          const blobBin = atob(dataURL.split(',')[1]);
          const array = [];
          for (var i = 0; i < blobBin.length; i++) {
            array.push(blobBin.charCodeAt(i));
          }

          // Create File
          const file = new Blob([new Uint8Array(array)], {type: 'image/png'});
          // Give it a name
          file.name = `$=>@getScreenshot:Screenshot-by-${username}`;

          return postFile({
            file,
            title: `Posted by ${username}`,
            apiToken,
            channel
          })
            .then(() => 'Screenshot sent.');
        })
        .catch((err) => {
          debugLog(`Error capturing screenshot. Check browser support. ${err}`);
        });
    }
  }
];

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
  message,
  customHooks,
  apiToken,
  channel,
  username
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
      // if found execute action
      // Execute System hooks set by user in this.props.hooks
      systemHooks.map(hook => {
        if (hook.id === hookFound[2]) {
          executeHook({
            hook,
            apiToken,
            channel,
            username
          });
        }
      });

      // Execute custom hooks set by user in this.props.hooks
      customHooks.map(hook => {
        if (hook.id === hookFound[2]) {
          executeHook({
            hook,
            apiToken,
            channel,
            username
          });
        }
      });
    }
  }
};

const executeHook = async ({
  hook,
  apiToken,
  channel,
  username
}) => {
  debugLog('Hook trigger found', hook.id);
  const hookActionResponse = await hook.action({
    apiToken,
    channel,
    username
  });
  debugLog('Action executed. Posting response.');
  return postMessage({
    text: `$=>@[${hook.id}]:${hookActionResponse}`,
    apiToken,
    channel,
    username
  });
};
