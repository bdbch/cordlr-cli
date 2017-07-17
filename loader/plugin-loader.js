const chalk = require('chalk')
const resolve = require('resolve')

const corePlugins = [
  require('./plugins/help.js'),
  require('./plugins/system.js'),
  require('./plugins/stats.js'),
  require('./plugins/prune.js')
]

module.exports = class PluginLoader {
  constructor (config) {
    this.config = config
    this.loadedPlugins = [] // List of loaded plugins

    this.pluginCommands = [] // List of all plugin commands
    this.pluginData = [] // List of all plugin data
  }

  // Get plugin path from cordlr.json file
  getPluginPaths () {
    let pluginPaths = this.config.plugins || []

    if (!Array.isArray(pluginPaths)) pluginPaths = [pluginPaths]

    return pluginPaths
  }

  registerPluginClasses (Plugin, cordlrObject) {
    const pluginClass = new Plugin(cordlrObject, this.config)

    if (pluginClass) {
      // Check for duplicated commands
      for (let command in pluginClass.commands) { // If a plugin has multiple commands loop through them.
        if (this.pluginData.length > 0) { // Only check if there is data to compare with.
          for (let tempPluginClass of this.pluginData) {
            if (command in tempPluginClass.commands) {
              throw new Error(`command duplication: ${command} used in "${pluginClass.name}" and "${tempPluginClass.name}"!`)
            }
          }
        }
      }

      // Get Plugin commands
      this.pluginCommands.push(pluginClass.commands || [])

      // Get Plugin Name, Description and commands
      this.pluginData.push({
        'name': pluginClass.name || '',
        'description': pluginClass.description || '',
        'commands': pluginClass.commands || {}
      })

      console.log(chalk.bgGreen(chalk.black(`\n--- ${pluginClass.name} loaded ---`)))
      console.log(chalk.white(`${pluginClass.description}\n`))

      this.loadedPlugins.push(pluginClass)
    }
  }

  loadPlugins (cordlrObject) {
    // Load Core Plugins First
    for (let i = 0; i < corePlugins.length; i++) {
      this.registerPluginClasses(corePlugins[i], cordlrObject)
    }

    // Get plugin paths
    const pluginPaths = this.getPluginPaths()

    // Resolve Sync Options
    const resolveOpts = {
      baseDir: process.cwd(),
      paths: [process.cwd() + '/plugins', process.cwd() + '/node_modules']
    }

    // Load and Initiate plugins
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
