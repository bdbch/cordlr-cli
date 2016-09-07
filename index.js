const Discord = require('discord.js')
const bot = new Discord.Client();
const config = {
  bot: require('./bot/config/bot.json')
}

bot.on('ready', () => {
  console.log('Ready');
})

bot.on('message', (message) => {
  if(message.content === 'ping') {
    message.reply('pong');
  }
})

bot.login(config.bot.token)
