#!/usr/bin/env node
const cordlr = require('../lib');
const minimist = require('minimist');
const rc = require('rc');
const log = require('log-cb');
const path = require('path');

/**
 * Create bot using command line.
 */

// Get options and set defaults
const options = rc('cordlr', {
  actions: path.join(__dirname, '../lib/actions'),
  prefix: '$'
});

// Create bot.
const bot = cordlr(options);

// Log done message.
bot.on('done', log('Loaded and authenticated the bot.'));
