module.exports = create
const DiscordClient = require('discord.js').Client
const minimist = require('minimist')
const spawnargs = require('spawn-args')
const path = require('path')
const resolve = require('resolve')

function create (config = {}) {
  const bot = new DiscordClient(config.client)
  const prefix = config.prefix

  let pluginPaths = config.plugins || []
  if (!Array.isArray(pluginPaths)) pluginPaths = [pluginPaths]
   
  // Where `.cordlrrc` is, otherwise where you ran `cordlr`
  const base = config.config ? path.dirname(config.config) : process.cwd()
  const resolveOpts = { basedir: base }

  // Bot plugin handling (where the magic happens)
  bot.once('ready', () => {
    if (!pluginPaths.length) return bot.emit('done', new Error('No plugins'))

    // Get plugins
    const plugins = pluginPaths.reduce(function (out, pluginPath) {
      // Require plugin
      const mod = require(resolve.sync(pluginPath, resolveOpts))

      // Handle module
      if (Array.isArray(mod)) for (const plugin of mod) out.push(plugin)
      else out.push(mod)

      // Next plugin
      return out
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
        const raw = message.content.slice(prefix.length)
        const args = spawnargs(raw)
        const command = args.shift()

        // Run it, if it is valid
        if (commands.has(command)) {
          commands.get(command)(message, args, minimist(args))
        }
      }
    })

    // Emit "done" for setup complete
    bot.emit('done', false)
  })

  // Attempt to log the bot in after handler set
  bot.login(config.token)

  // Pass bot on for custom handlers
  return bot
}
