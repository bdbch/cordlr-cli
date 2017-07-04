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
    if (args[0] && typeof args[0] === 'number') {
      const channel = message.channel
      const messages = channel.messages
      console.log(messages.array())
    } else {
      this.sendInfo(message, 'Please add a number for pruning messages', 'Error while pruning', null, 'error')
    }
    console.log(args)
  }
}
