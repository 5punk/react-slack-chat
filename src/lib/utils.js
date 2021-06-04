export const debugLog = (...args) => {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }
};

export const arraysIdentical = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};
