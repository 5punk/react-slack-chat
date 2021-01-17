import { debugLog } from './utils';

export const postFile = ({ file, title, apiToken, channel }) => {
  return new Promise((resolve, reject) => {
    debugLog('UPLOADING', file);
    const options = {
      token: apiToken,
      title,
      filename: file.name,
      filetype: 'auto',
      channels: channel,
    };
    const form = new FormData();
    form.append('token', options.token);
    form.append('filename', options.filename);
    form.append('title', options.title);
    form.append('filetype', options.filetype);
    form.append('channels', options.channels);
    form.append('file', new Blob([file]));
    const request = new XMLHttpRequest();
    request.open('POST', 'https://slack.com/api/files.upload');
    request.send(form);
    request.onload = () => {
      if (request.status !== 200) {
        const error = new Error(
          'There was an error uploading the file. Response:',
          request.status,
          request.responseText
        );
        return reject(error);
      }
      return resolve();
    };
  });
};

export const getNewMessages = (old, total, botName) => {
  const oldText = JSON.stringify(old);
  // Message Order has to be consistent
  const differenceInMessages = total.filter((i) => {
    if (oldText.indexOf(JSON.stringify(i)) === -1 && i.username !== botName) {
      return i;
    }
  });
  return differenceInMessages;
};

export const isSystemMessage = (message) => {
  const systemMessageRegex = /<@.[^|]*[|].*>/;
  return (
    systemMessageRegex.test(message.text) &&
    message.text.indexOf(message.user) > -1
  );
};

export const isAdmin = (message) => {
  // Any post that has the `user` field is from the backend
  return typeof message.user !== 'undefined';
};

export const wasIMentioned = (message, botName) => {
  const myMessage = message.username === botName;
  return !myMessage && message.text.indexOf(`@${botName}`) > -1;
};

export const hasEmoji = (text) => {
  const chatHasEmoji = /(:[:a-zA-Z/_]*:)/;
  return chatHasEmoji.test(text);
};

export const hasAttachment = (text) => {
  // Get image url REGEX: uploaded a file: <(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*))
  // 1st match will give us full match
  // 2nd match will give us complete attachment URL
  const systemAttachmentAttached = /uploaded a file: <(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*))/;
  return text.match(systemAttachmentAttached);
};

export const decodeHtml = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

export const isValidOnlineUser = (user) => {
  // return true if
  // user should be active / online
  // user.presence === 'active' &&
  return !user.is_bot;
  // And is NOT a bot
  // slackbot hack, it thinks its not a bot :/
  // && user.name.indexOf('slackbot') === -1;
};
