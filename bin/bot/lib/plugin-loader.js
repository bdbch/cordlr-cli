const chalk = require('chalk')
const resolve = require('resolve')

const corePlugins = [
  require('../plugins/help.js'),
  require('../plugins/system.js'),
  require('../plugins/stats.js'),
  require('../plugins/prune.js')
]

module.exports = class PluginLoader {
  constructor (config) {
    this.config = config
    this.loadedPlugins = []
    this.pluginCommands = []
    this.pluginData = []
  }

  getPluginPaths () {
    let pluginPaths = this.config.plugins || []
    if (!Array.isArray(pluginPaths)) pluginPaths = [pluginPaths]

    return pluginPaths
  }

  registerPluginClasses (Plugin, cordlrObject) {
    const pluginClass = new Plugin(cordlrObject, this.config)

    if (pluginClass) {
      this.checkForDuplicatedCommand(pluginClass)
      this.pluginCommands.push(pluginClass.commands || [])
      this.pushIntoLoadedPlugins(pluginClass)
    }
  }

  loadPlugins (cordlrObject) {
    for (let i = 0; i < corePlugins.length; i++) {
      this.registerPluginClasses(corePlugins[i], cordlrObject)
    }

    const pluginPaths = this.getPluginPaths()

    const resolveOpts = {
      baseDir: process.cwd(),
      paths: [process.cwd() + '/plugins', process.cwd() + '/node_modules']
    }

    pluginPaths.map((pluginPath) => {
      const plugin = require(resolve.sync(pluginPath, resolveOpts))
      this.registerPluginClasses(plugin, cordlrObject)
    })

    console.log(chalk.yellow(`Number of Plugins: ${this.loadedPlugins.length}`))

    // Initiate hooks
    this.setHookData()
  }

  setHookData () {
    // Check if plugin has a hook method (pluginData | pluginCommands)
    // Used by plugins/help.js (core-plugin)
    for (const plugin of this.loadedPlugins) {
      if (plugin.hooks) {
        // HOOK: Plugin Data
        if (plugin.hooks.pluginData && typeof plugin[plugin.hooks.pluginData] === 'function') {
          plugin[plugin.hooks.pluginData](this.pluginData)
        }

        // HOOK: Plugin Commands
        if (plugin.hooks.pluginCommands && typeof plugin[plugin.hooks.pluginCommands] === 'function') {
          plugin[plugin.hooks.pluginCommands](this.pluginCommands)
        }
      }
    }
  }

  checkForDuplicatedCommand (pluginClass) {
    for (let command in pluginClass.commands) { // If a plugin has multiple commands loop through them.
      if (this.pluginData.length > 0) { // Only check if there is data to compare with.
        for (let tempPluginClass of this.pluginData) {
          if (command in tempPluginClass.commands) {
            throw new Error(`command duplication: ${command} used in "${pluginClass.name}" and "${tempPluginClass.name}"!`)
          }
        }
      }
    }
  }

  pushIntoLoadedPlugins (pluginClass) {
    this.pluginData.push({
      'name': pluginClass.name || '',
      'description': pluginClass.description || '',
      'commands': pluginClass.commands || {}
    })

    console.log(chalk.bgGreen(chalk.black(`\n--- ${pluginClass.name} loaded ---`)))
    console.log(chalk.white(`${pluginClass.description}\n`))

    this.loadedPlugins.push(pluginClass)
  }

  getPluginCommand (requestedCommand) {
    for (const plugin of this.loadedPlugins) {
      if (requestedCommand in plugin.commands) {
        const permissions = plugin.commands[requestedCommand].permissions || []
        const description = plugin.commands[requestedCommand].description || ''

        return {
          plugin: plugin,
          command: requestedCommand,
          permissions: permissions,
          description: description
        }
      }
    }
    return false
  }
}
