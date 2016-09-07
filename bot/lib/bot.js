class Bot {
  constructor (bot) {
    this.bot = bot
    this.commandPrefix = '$';
    this.bindCommands()
  }

  bindCommands () {
    this.bot.on('message', (message) => { this.handleMessageCommands(message) })
  }

  handleMessageCommands (message) {
    switch (message.content) {
      case this.commandPrefix + 'helloworld':
        message.reply('I am alive, thank you!')
        console.log(this.bot)
        break
    }
  }
}

module.exports = Bot
