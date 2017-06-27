const CordlrPlugin = require('cordlr-plugin')

class HelpPlugin extends CordlrPlugin {
  constructor (bot, config) {
    super(bot, config)

    this.name = 'Help'
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

  showHelp (message, args, flags) {
    const fields = []
    this.pluginCommands.forEach((plugin) => {
      for (const command in plugin) {
        let usage = plugin[command].usage
        let description = plugin[command].description

        if (!usage) {
          usage = ''
        }

        if (!description) {
          description = 'No description added'
        }

        fields.push({
          name: this.config.prefix + command + ' ' + usage,
          value: description
        })
      }
    })

    this.sendFields(message, fields, 'Cordlr Help:')
  }

  showPlugins (message, args, flags) {
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

module.exports = HelpPlugin
