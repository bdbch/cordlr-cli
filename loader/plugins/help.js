const CordlrPlugin = require('cordlr-plugin')

module.exports = class HelpPlugin extends CordlrPlugin {
  constructor (bot, config) {
    super(bot, config)

    this.name = 'Cordlr Core - Help'
    this.description = 'Lists all commands with usage info and descriptions'

    this.commands = {
      'help': {
        'usage': '',
        'function': 'showHelp',
        'description': 'Lists all available commands',
        'permissions': []
      },
      'plugins': {
        'usage': '',
        'function': 'showPlugins',
        'description': 'Lists all installed Cordlr plugins',
        'permissions': []
      }
    }

    this.hooks = {
      'pluginCommands': 'getPluginCommands',
      'pluginData': 'getPluginData'
    }
  }

  showHelp (message, args) {
    const fields = []
    this.pluginCommands.forEach((plugin) => {
      for (const command in plugin) {
        const usage = plugin[command].usage || ''
        const description = plugin[command].description || 'No description added'

        fields.push({
          name: `${this.config.prefix}${command} ${usage}`,
          value: description
        })
      }
    })

    this.sendFields(message, fields, 'Cordlr Help:')
  }

  showPlugins (message, args) {
    const fields = []
    for (const plugin of this.pluginData) {
      fields.push({
        name: plugin.name,
        value: plugin.description
      })
    }

    this.sendFields(message, fields, 'Cordlr Plugins:')
  }

  getPluginCommands (pluginCommands) {
    this.pluginCommands = pluginCommands
    return pluginCommands
  }

  getPluginData (pluginData) {
    this.pluginData = pluginData
    return pluginData
  }
}
