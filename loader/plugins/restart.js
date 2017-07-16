const CordlrPlugin = require('cordlr-plugin')

module.exports = class RestartPlugin extends CordlrPlugin {
  constructor (bot, config) {
    super(bot, config)

    this.name = 'Cordlr Core - Restart'
    this.description = 'Cordlr Core plugin for restarting and updating the bot'

    this.commands = {
      'restart': {
        'usage': '',
        'function': 'restartBot',
        'description': 'Restarts the current bot instance',
        'permissions': [
          'ADMINISTRATOR'
        ]
      }
    }
  }

  restartBot (message) {
    message.delete()
      .then(() => {
        this.bot.bot.bin.restart()
      })
  }
}
