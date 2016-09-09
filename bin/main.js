#!/usr/bin/env node
const cordlr = require('../lib');
const minimist = require('minimist');

/**
 * Create bot using command line.
 */

const options = rc('cordlr', {
  // Defaults
  prefix: '~'
});

const bot = cordlr(options);
