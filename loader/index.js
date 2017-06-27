const PluginLoader = require('./plugin-loader')
const Scheduler = require('./scheduler')
const MessageHandler = require('./message-handler')

/**
 * The default loader for cordlr
 */

class CordlrLoader {
  constructor (bot, config = {}) {
    // Assign Default Values
    this.bot = bot
    this.config = config

    // Init PluginLoader
    this.PluginLoader = new PluginLoader(config)

    // Init Scheduler
    this.Scheduler = new Scheduler(config)

    // Init Message Handler
    this.MessageHandler = new MessageHandler(config)

    // Let the PluginLoader get all his stuff right
    this.PluginLoader.loadPlugins()
    this.PluginLoader.registerPluginClasses(this)
    this.PluginLoader.getPluginData()
    this.PluginLoader.validatePlugins()

    this.bot.login(this.config.token)
      .then(() => this.bot.emit('loaded'), e => {})

    // Send received messages to the Message Handler
    this.bot.on('message', (message) => {
      this.MessageHandler.handle(message, this.PluginLoader, this.Scheduler)
    })

    return this.bot
  }
}

module.exports = CordlrLoader
