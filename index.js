module.exports = create
const DiscordClient = require('discord.js').Client
const minimist = require('minimist')
const spawnargs = require('spawn-args')
const requireGlob = require('require-glob')
const path = require('path')
const log = require('log-cb')

/**
 * Create the cordlr bot.
 */

function create (config = {}) {
  // Create bot.
  const bot = new DiscordClient(config.client)
  const actionsGlob = config.actions
  const prefix = config.prefix
  const base = path.dirname(config.config)

  bot.once('ready', () => {
    // Require the actions provided
    requireGlob(actionsGlob, { base: base }).then(actions => {
      const actionNames = Object.keys(actions)

      // Handle messages to run actions
      bot.on('message', message => {
        if (!message.content.indexOf(prefix) && message.channel.type !== 'dm') {
          // Parse the name and arguments.
          const raw = message.content.slice(prefix.length)
          const args = spawnargs(raw, { removequotes: 'always' })
          const flags = minimist(args)
          const name = args.shift()

          // Run it, if it exists.
          if (actionNames.indexOf(name) > -1) {
            const action = actions[name](bot, config)
            if (action) action(message, args, flags)
          }
        }
      })

      // Emit "done" for setup complete
      bot.emit('done')
    }, log.err())
  })

  // Attempt to log the bot in after handler set
  bot.login(config.token)

  // Pass bot on for custom handlers
  return bot
}
