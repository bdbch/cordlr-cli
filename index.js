const Discord = require('discord.js')
const bot = new Discord.Client();
const config = {
  bot: require('./bot/config/bot.json')
}
const BotApplication = require('./bot/lib/bot.js')

bot.on('ready', () => {
  new BotApplication(bot)
})

bot.login(config.bot.token)
