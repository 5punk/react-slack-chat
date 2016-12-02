'use strict';

const path = require('path');

// List of allowed environments
const allowedEnvs = ['dev', 'production', 'test'];

// Set the correct environment
if (allowedEnvs.indexOf(process.env.NODE_ENV) === -1) {
  return console.log('Environment is not allowed. Cannot find a build webpack for', process.env.NODE_ENV);
}

const env = process.env.NODE_ENV;
process.env.REACT_WEBPACK_ENV = env;

/**
 * Build the webpack configuration
 * @param  {String} wantedEnv The wanted environment
 * @return {Object} Webpack config
 */
function buildConfig(wantedEnv) {
  let isValid = wantedEnv && wantedEnv.length > 0 && allowedEnvs.indexOf(wantedEnv) !== -1;
  let validEnv = isValid ? wantedEnv : 'dev';

  let config = require(path.join(__dirname, 'webpack/' + validEnv));
  return config;
}

module.exports = buildConfig(env);
