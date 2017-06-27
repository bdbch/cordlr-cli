const resolve = require('resolve')

module.exports = class PluginLoader {
  constructor (config) {
    this.config = config
    this.loadedPlugins = {}
    this.pluginPaths = this.getPluginPaths()

    this.resolveOpts = {
      baseDir: process.cwd(),
      paths: [ process.cwd() + '/plugins', process.cwd() + '/node_modules' ]
    }
  }

  getPluginPaths () {
    let pluginPaths = this.config.plugins || []

    if (!Array.isArray(pluginPaths)) {
      pluginPaths = [pluginPaths]
    }

    return pluginPaths
  }

  loadPlugins () {
    this.loadedPlugins = this.pluginPaths.reduce((plugins, pluginPath) => {
      const currentlyLoadedPlugin = require(resolve.sync(pluginPath, this.resolveOpts))

      if (!Array.isArray(currentlyLoadedPlugin)) {
        plugins.push(currentlyLoadedPlugin)
      } else {
        for (const subPlugin of currentlyLoadedPlugin) {
          plugins.push(subPlugin)
        }
      }

      return plugins
    }, [])
  }

  registerPluginClasses (cordlrObject) {
    this.registeredPlugins = this.loadedPlugins.map((Plugin) => {
      const pluginClass = new Plugin(this.bot, this.config, cordlrObject)

      if (pluginClass) {
        console.log('\n--- CORDLR HAS LOADED A PLUGIN ---')
        console.log(`Plugin Name:  ${pluginClass.name}`)
        console.log(`Plugin Description:\n${pluginClass.description}\n`)
        return pluginClass
      }
    }, {})
  }

  getPluginData () {
    const pluginData = this.registeredPlugins.map((plugin) => {
      return {
        'name': plugin.name || '',
        'description': plugin.description || '',
        'commands': plugin.commands || {}
      }
    })

    const pluginCommands = pluginData.map((plugin) => {
      return plugin.commands || []
    })

    for (const plugin of this.registeredPlugins) {
      // HOOK: Plugin Data
      if (plugin.hooks && plugin.hooks.pluginData && typeof plugin[plugin.hooks.pluginData] === 'function') {
        plugin[plugin.hooks.pluginData](pluginData)
      }

      // HOOK: Plugin Commands
      if (plugin.hooks && plugin.hooks.pluginCommands && typeof plugin[plugin.hooks.pluginCommands] === 'function') {
        plugin[plugin.hooks.pluginCommands](pluginCommands)
      }

      plugin.pluginData = pluginData
    }

    this.pluginData = pluginData
  }

  validatePlugins () {
    if (!this.registeredPlugins.length) {
      this.bot.emit('error', new Error('No plugins loaded - please add plugins to Cordlr!'))
    }
  }

  getPluginCommand (requestedCommand) {
    for (const plugin of this.registeredPlugins) {
      for (const command in plugin.commands) {
        let permissions = []
        let description = ''
        if (plugin.commands[command].permissions) {
          permissions = plugin.commands[command].permissions
        }
        if (plugin.commands[command].description) {
          description = plugin.commands[command].description
        }

        if (requestedCommand === command) {
          return {
            plugin: plugin,
            command: command,
            permissions: permissions,
            description: description
          }
        }
      }
    }
    return false
  }
}
