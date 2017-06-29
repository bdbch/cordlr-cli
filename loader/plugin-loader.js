const resolve = require('resolve')
const helpPlugin = require('./plugins/help.js')

module.exports = class PluginLoader {
  constructor (config) {
    this.config = config
    this.loadedPlugins = {}
  }

  // Get plugin path from cordlr.json file
  getPluginPaths () {
    let pluginPaths = this.config.plugins || []

    if (!Array.isArray(pluginPaths)) {
      pluginPaths = [pluginPaths]
    }

    return pluginPaths
  }

  loadPlugins () {
    const pluginPaths = this.getPluginPaths()

    const resolveOpts = {
      baseDir: process.cwd(),
      paths: [process.cwd() + '/plugins', process.cwd() + '/node_modules']
    }

    // require('pluginName')
    this.loadedPlugins = pluginPaths.reduce((plugins, pluginPath) => {
      const currentlyLoadedPlugin = require(resolve.sync(pluginPath, resolveOpts))

      if (!Array.isArray(currentlyLoadedPlugin)) {
        plugins.push(currentlyLoadedPlugin)
      } else {
        for (const subPlugin of currentlyLoadedPlugin) {
          plugins.push(subPlugin)
        }
      }

      return plugins
    }, [])

    // Add Core plugins at the beginning of list
    this.loadedPlugins.unshift(helpPlugin)
  }

  // Initiate all plugins with the "bot" object,
  // config and the "loader" object as parameters
  registerPluginClasses (cordlrObject) {
    this.registeredPlugins = this.loadedPlugins.map((Plugin) => {
      const pluginClass = new Plugin(this.bot, this.config, cordlrObject)

      if (pluginClass) {
        console.log('\n--- CORDLR HAS LOADED A PLUGIN ---')
        console.log(`Plugin Name:  ${pluginClass.name}`)
        console.log(`Plugin Description:\n${pluginClass.description}\n`)
        return pluginClass
      }
    })
  }

  getPluginData () {
    // Get Plugin name, description and commands
    const pluginCommands = [] // List of all plugin commands
    const pluginData = this.registeredPlugins.map((plugin) => {
      pluginCommands.push(plugin.commands || [])
      return {
        'name': plugin.name || '',
        'description': plugin.description || '',
        'commands': plugin.commands || {}
      }
    })

    // Check if plugin has a hook method (pluginData | pluginCommands)
    // Used by plugins/help.js (core-plugin)
    for (const plugin of this.registeredPlugins) {
      if (plugin.hooks) {
        // HOOK: Plugin Data
        if (plugin.hooks.pluginData && typeof plugin[plugin.hooks.pluginData] === 'function') {
          plugin[plugin.hooks.pluginData](pluginData)
        }

        // HOOK: Plugin Commands
        if (plugin.hooks.pluginCommands && typeof plugin[plugin.hooks.pluginCommands] === 'function') {
          plugin[plugin.hooks.pluginCommands](pluginCommands)
        }
      }
    }
  }

  getPluginCommand (requestedCommand) {
    for (const plugin of this.registeredPlugins) {
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
