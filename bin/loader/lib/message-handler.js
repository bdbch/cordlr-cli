const minimist = require('minimist')
const spawnargs = require('spawn-args')

module.exports = class MessageHandler {
  constructor (config) {
    this.prefix = config.prefix || '!'
  }

  checkIfMessageStartsWithPrefix (message) {
    return (!message.content.indexOf(this.prefix) && message.channel.type !== 'dm')
  }

  handle (message, PluginLoader, Scheduler) {
    if (this.checkIfMessageStartsWithPrefix(message)) {
      const input = spawnargs(message.content.slice(this.prefix.length))
      const flags = minimist(input)
      const args = flags._
      const command = args.shift()

      if (!command) {
        return false
      }

      const request = PluginLoader.getPluginCommand(command)
      if (request) {
        if (message.member.hasPermission(request.permissions)) {
          Scheduler.addScheduledCommand({
            'object': request.plugin,
            'command': request.plugin.commands[request.command].function,
            'args': {
              message: message,
              args: args,
              flags: flags
            }
          })
        } else {
          message.author.send(`Sorry, but you are not allowed to run the command ** ${command} **`)
        }
      }
    }
  }
}
