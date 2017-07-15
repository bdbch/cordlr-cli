const CordlrPlugin = require('cordlr-plugin')

module.exports = class StatsPlugin extends CordlrPlugin {
  constructor (bot, config) {
    super(bot, config)

    this.name = 'Cordlr Core - Stats'
    this.description = 'Cordlr Core plugin for showing stats of the server'

    this.commands = {
      'stats': {
        'usage': '',
        'function': 'showStats',
        'description': 'Shows the servers stats',
        'permissions': []
      },
      'users': {
        'usage': '',
        'function': 'showUsercount',
        'description': 'Shows the current user count',
        'permissions': []
      }
    }
  }

  showStats (message, args, flags) {
    let statMessage = ``
    statMessage += `-----\n\n**Server ${ this.getServerName(message) } Informations**\n`
    statMessage += `Registered members: ${ this.getUserCount(message) } Users\n`
    statMessage += `Server was created at: ${ this.getServerCreationDate(message) }\n`
    statMessage += `Num. of channels: ${ message.guild.channels.array().length }\n`
    statMessage += `Region: ${ message.guild.region }\n`
    statMessage += `AFK Timeout: ${ message.guild.afkTimeout } seconds\n`
    statMessage += '\n\n**Bot Informations**\n'
    statMessage += `Bot Uptime: ${ this.getUptime() } Minutes\n`

    this.sendInfo(message, statMessage, 'Stats about this Discord Server', null, 'warning')
  }

  showUsercount (message, args, flags) {
    const userMessage = `Currently there are ${ this.getUserCount(message) } registered Users on ${ this.getServerName(message) }`
    this.sendInfo(message, userMessage, 'Registered Users', null, 'warning')
  }

  getServerName (message) {
    return message.guild.name
  }

  getUserCount (message) {
    return message.guild.memberCount
  }

  getServerCreationDate (message) {
    const date = message.guild.createdAt
    return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
  }

  getUptime () {
    return ((this.bot.bot.uptime / 1000) / 60).toFixed(1)
  }
}
