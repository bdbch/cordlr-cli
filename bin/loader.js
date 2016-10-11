module.exports = loader
const resolve = require('resolve')
const minimist = require('minimist')
const spawnargs = require('spawn-args')

/**
 * Default cordlr loader.
 * Set "loader" in config to change
 */

function loader (bot, config) {
  // Get plugin path(s)
  let pluginPaths = config.plugins || []
  if (!Array.isArray(pluginPaths)) pluginPaths = [pluginPaths]

  // Where you run "cordlr"
  const resolveOpts = { basedir: process.cwd() }

  // Prefix
  const prefix = config.prefix || '$'

  // Log in using token or email/pass
  bot.login(config.token || config.email, config.password)

  return function ready () {
    // Get plugins from paths
    const plugins = pluginPaths.reduce(function (plugins, pluginPath) {
      const plugin = require(resolve.sync(pluginPath, resolveOpts))

      if (!Array.isArray(plugin)) plugins.push(plugin)
      else for (const subplugin of plugin) plugins.push(subplugin)

      return plugins
    }, [])

    // Initialize all plugins and stash command plugins
    const commands = new Map()
    plugins.forEach(plugin => {
      const handler = plugin(bot, config)
      if (plugin.command && handler) {
        commands.set(plugin.command, handler)
      }
    })

    // Handle messages that run command plugins
    bot.on('message', message => {
      if (!message.content.indexOf(prefix) && message.channel.type !== 'dm') {
        // Parse the name and input
        const input = spawnargs(message.content.slice(prefix.length))
        const flags = minimist(input)
        const args = flags._
        const command = args.shift()

        // Run it, if it is valid
        if (commands.has(command)) {
          commands.get(command)(message, args, flags)
        }
      }
    })

    // Emit "loaded" for setup complete
    if (plugins.length) bot.emit('loaded')
    else bot.emit('error', new Error('No plugins'))
  }
}
