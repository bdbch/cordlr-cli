module.exports = cordlr
const DiscordClient = require('discord.js').Client
const resolve = require('resolve')

function cordlr (config = {}) {
  const bot = new DiscordClient(config.client)

  // Load bot
  const loader = require(resolve.sync(config.loader, { basedir: process.cwd() }))
  const handler = loader(bot, config)
  if (handler) bot.on('ready', handler)
  return bot
}
