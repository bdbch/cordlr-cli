const commands = require('../../config/commands.json')
const userConfig = require('../../config')

module.exports = help;

function help (bot, options) {
  // When discord emits 'ready'.
  // Used to handle things outside
  // of the running function.

  return function run (message, args) {
    // When this command gets triggered.
    let helpMessage = 'Here are our commands: \n\n'
    for(i = 0; i < commands.length; i++) {
      helpMessage += "**" + commands[i].name + '**\n'
      for(o = 0; o < commands[i].commands.length; o++) {
        helpMessage += '`' + options.prefix + commands[i].commands[o].name + '` - ' + commands[i].commands[o].description + '\n'
      }
      helpMessage += '\n'
    }
    message.reply(helpMessage)
  }
}
