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
];
