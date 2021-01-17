export const getCachedChannelMap = ({ channels }) => {
  const data = localStorage.getItem('TS_MAP');
  if (data) {
    return JSON.parse(data);
  } else {
    const data = channels.reduce((itr, channel) => {
      itr[channel.name || channel.id] = null;
      return itr;
    }, {});
    saveChannelMap({ TS_MAP: data });
    return data;
  }
};

export const saveChannelMap = ({ TS_MAP }) => {
  localStorage.setItem('TS_MAP', JSON.stringify(TS_MAP));
};
