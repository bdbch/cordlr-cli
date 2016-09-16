module.exports = create
const DiscordClient = require('discord.js').Client
const minimist = require('minimist')
const spawnargs = require('spawn-args')
const requireGlob = require('require-glob')
const path = require('path')
const log = require('log-cb')
const values = require('object-values')

function create (config = {}) {
  const bot = new DiscordClient(config.client)
  const scriptGlobs = config.actions
  const prefix = config.prefix

  // Where `.cordlrrc` is, otherwise where you ran `cordlr`
  const base = path.dirname(config.config)

  // Bot script handling (where the magic happens)
  bot.once('ready', () => {
    if (!scriptGlobs.length) return bot.emit('done', false)

    // Require the scripts provided
    requireGlob(scriptGlobs, { cwd: base }).then(modules => {
      const scripts = values(modules)

      // Initialize all scripts and stash command scripts
      const commands = new Map()
      const plugins = getPlugins(scripts)

      plugins.forEach(plugin => {
        const handler = plugin(bot, config)
        if (plugin.command && handler) {
          commands.set(plugin.command, handler)
        }
      })

      // Handle messages that run command scripts
      bot.on('message', message => {
        if (!message.content.indexOf(prefix) && message.channel.type !== 'dm') {
          // Parse the name and input
          const raw = message.content.slice(prefix.length)
          const args = spawnargs(raw, { removequotes: 'always' })
          const command = args.shift()

          // Run it, if it is valid
          if (commands.has(command)) {
            commands.get(command)(message, args, minimist(args))
          }
        }
      })

      // Emit "done" for setup complete
      bot.emit('done', true)
    }).catch(log.err())
  })

  // Attempt to log the bot in after handler set
  bot.login(config.token)

  // Pass bot on for custom handlers
  return bot
}

function getPlugins (scripts) {
  return scripts.map(function (script) {
    return script['index']
  })
}
