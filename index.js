module.exports = cordlr
const DiscordClient = require('discord.js').Client
const resolve = require('resolve')

function cordlr (config = {}) {
  const bot = new DiscordClient(config.client)

  // Load bot
  const loader = require(resolve.sync(config.loader, { basedir: process.cwd() }))
  bot.on('ready', loader(bot, config))
  return bot
}
