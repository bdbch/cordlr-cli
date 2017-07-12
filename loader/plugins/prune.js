const CordlrPlugin = require('cordlr-plugin')

module.exports = class HelpPlugin extends CordlrPlugin {
  constructor (bot, config) {
    super(bot, config)

    this.name = 'Cordlr Core - Prune'
    this.description = 'Cordlr Core plugin for pruning an specific amount of messages'

    this.commands = {
      'prune': {
        'usage': '<x>',
        'function': 'pruneMessages',
        'description': 'Prunes the last x messages',
        'permissions': [
          'MANAGE_MESSAGES'
        ]
      }
    }
  }

  pruneMessages (message, args, flags) {
    message.delete()
    
    if (args[0] && typeof args[0] === 'number') {
      const channel = message.channel
      channel.fetchMessages({
        limit: args[0]
      }).then((messages) => {
        this.deleteMessages(messages)
      })
    } else {
      this.sendInfo(message, 'Please add a number for pruning messages', 'Error while pruning', null, 'error')
    }
  }

  deleteMessages (messages) {
    for (const message of messages) {
      message[1].delete()
    }
  }
}
