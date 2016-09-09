#!/usr/bin/env node
const cordlr = require('../lib');
const minimist = require('minimist');
const logger = require('./logger');
const rc = require('rc');

/**
 * Create bot using command line.
 */

const options = rc('cordlr', {
  // Defaults
  prefix: '~',
  actions: []
});

const bot = cordlr(options);

bot.on('done', logger('Successfully authenticated bot.'));
