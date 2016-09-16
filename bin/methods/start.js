const cordlr = require('../../')
let baseConfig = require('../config')
const log = require('log-cb')

module.exports = function () {
  // generate final config for starting the bot
  baseConfig.actions.push('./plugins/**/index.js')
  const config = baseConfig

  // Create bot.
  const bot = cordlr(config)
  // Log done message.
  bot.on('done', hasScripts => {
    log('Loaded and authenticated the bot.')()
    if (!hasScripts) log('(Warning: no scripts)')()
  })
}
