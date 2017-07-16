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
      },
      'stop': {
        'usage': '',
        'function': 'stopBot',
        'description': 'Stops the current bot instance',
        'permissions': [
          'ADMINISTRATOR'
        ]
      }
    }
  }

  restartBot (message) {
    this.sendInfo(message, 'Restarting...', 'Cordlr', null, 'error')
    message.delete()
      .then(() => {
        this.bot.bot.bin.restart()
      })
  }

  stopBot (message) {
    this.sendInfo(message, 'Stopping...', 'Cordlr', null, 'error')
    message.delete()
      .then(() => {
        this.bot.bot.bin.stop()
      })
  }
}
