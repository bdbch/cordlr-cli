const resolve = require('resolve')
const minimist = require('minimist')
const spawnargs = require('spawn-args')

/**
 * The default loader for cordlr
 */

class CordlrLoader {
  constructor (bot, config = {}) {
    this.bot = bot
    this.config = config
    this.scheduledCommands = []
    this.scheduleTimer = false
    this.pluginsLoaded = {}

    this.pluginPaths = this.getPluginPaths(config)
    this.resolveOpts = {
      baseDir: process.cwd(),
      paths: [ process.cwd() + '/plugins', process.cwd() + '/node_modules' ]
    }

    this.prefix = config.prefix || '!'
    this.plugins = this.loadPlugins()
    this.pluginsLoaded = this.getPluginClasses()
    this.pluginData = this.getPluginData()

    if (!this.plugins.length) {
      this.bot.emit('error', new Error('No plugins'))
    }

    this.bot.login(this.config.token)
      .then(() => this.bot.emit('loaded'), e => {})

    this.bot.on('message', (message) => {
      this.handleMessage(message)
    })

    return this.bot
  }

  loadPlugins () {
    return this.pluginPaths.reduce((plugins, pluginPath) => {
      const plugin = require(resolve.sync(pluginPath, this.resolveOpts))

      if (!Array.isArray(plugin)) {
        plugins.push(plugin)
      } else {
        for (const subplugin of plugin) {
          plugins.push(subplugin)
        }
      }

      return plugins
    }, [])
  }

  getPluginClasses () {
    return this.plugins.map((Plugin) => {
      const pluginClass = new Plugin(this.bot, this.config)

      if (pluginClass) {
        console.log('\n--- Cordlr Plugin loaded ---')
        console.log(pluginClass.name)
        console.log(pluginClass.description + '\n')
        return pluginClass
      }
    }, {})
  }

  getPluginData () {
    const pluginData = this.pluginsLoaded.map((plugin) => {
      return {
        'name': plugin.name || '',
        'description': plugin.description || '',
        'commands': plugin.commands || {}
      }
    })

    const pluginCommands = pluginData.map((plugin) => {
      return plugin.commands || []
    })

    for (const plugin of this.pluginsLoaded) {
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

    return pluginData
  }

  getPluginPaths (config) {
    let pluginPaths = config.plugins || []
    if (!Array.isArray(pluginPaths)) {
      pluginPaths = [pluginPaths]
    }

    return pluginPaths
  }

  isCorrectPrefix (message) {
    return (!message.content.indexOf(this.prefix) && message.channel.type !== 'dm')
  }

  handleMessage (message) {
    if (this.isCorrectPrefix(message)) {
      const input = spawnargs(message.content.slice(this.prefix.length))
      const flags = minimist(input)
      const args = flags._
      const command = args.shift()

      if (!command) {
        return false
      }

      const request = this.getPluginCommand(command)
      if (request) {
        if (message.member.hasPermission(request.permissions)) {
          this.scheduledCommands.push({
            'object': request.plugin,
            'command': request.plugin.commands[request.command].function,
            'args': {
              message: message,
              args: args,
              flags: flags
            }
          })

          if (!this.scheduleTimer) {
            this.scheduleTimer = setInterval(() => {
              this.runCommand()
            }, 1000)
          }
        } else {
          message.author.send(`Sorry, but you are not allowed to run the command ** ${command} **`)
        }
      }
    }
  }

  runCommand () {
    if (this.scheduledCommands.length >= 1) {
      const nextCommand = this.scheduledCommands[0]
      nextCommand.object[nextCommand.command](
        nextCommand.args.message,
        nextCommand.args.args,
        nextCommand.args.flags
      )
      this.scheduledCommands.splice(0, 1)
    } else {
      clearInterval(this.scheduleTimer)
      this.scheduleTimer = false
    }
  }

  getPluginCommand (requestedCommand) {
    for (const plugin of this.pluginsLoaded) {
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

module.exports = CordlrLoader
