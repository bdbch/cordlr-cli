const cordlr = require('../../')
const config = require('../config')
const log = require('log-cb')

module.exports = function () {
  // Create bot.
  const bot = cordlr(config)
  console.log(config)
  // Log done message.
  bot.on('done', hasScripts => {
    log('Loaded and authenticated the bot.')()
    if (!hasScripts) log('(Warning: no scripts)')()
  })
}
