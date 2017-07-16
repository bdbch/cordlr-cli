const CordlrPlugin = require('cordlr-plugin')

module.exports = class SystemPlugin extends CordlrPlugin {
  constructor (bot, config) {
    super(bot, config)

    this.name = 'Cordlr Core - System'
    this.description = 'Cordlr Core plugin for handling the bot (restart, stop, updating)'

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
      },
      'update': {
        'usage': '',
        'function': 'updateBot',
        'description': 'Updates the current bot instance',
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

  updateBot (message) {
    this.sendInfo(message, 'Updating...', 'Cordlr', null, 'error')
    message.delete()
      .then(() => {
        this.bot.bot.bin.update()
      })
  }
}
