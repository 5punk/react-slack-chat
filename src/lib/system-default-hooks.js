import html2canvas from 'html2canvas';

import { postFile } from './chat-functions';

// conditionally imported for full blown version of lib

// Define System hooks for everyone
export const systemHooks = [
  {
    id: 'getCurrentPath',
    action: () => Promise.resolve(window.location.href),
  },
  {
    id: 'getPlatform',
    action: () => Promise.resolve(window.navigator.platform),
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
          const file = new Blob([new Uint8Array(array)], { type: 'image/png' });
          // Give it a name
          file.name = `$=>@getScreenshot:Screenshot-by-${username}`;

          return postFile({
            file,
            title: `Posted by ${username}`,
            apiToken,
            channel,
          }).then(() => 'Screenshot sent.');
        })
        .catch((err) => {
          debugLog(`Error capturing screenshot. Check browser support. ${err}`);
        });
    },
  },
];
