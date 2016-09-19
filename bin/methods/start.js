module.exports = start
const cordlr = require('../../')
const config = require('../config')
const log = require('log-cb')

function start () {
  // Create bot.
  const bot = cordlr(config)

  // Log done message.
  bot.on('done', log('Loaded bot', 'Loaded bot (with no plugins)'))
}
