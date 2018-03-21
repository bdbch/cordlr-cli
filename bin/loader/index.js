const PluginLoader = require('./lib/plugin-loader')
const Scheduler = require('./lib/scheduler')
const MessageHandler = require('./lib/message-handler')

/**
 * The default loader for cordlr
 */

module.exports = class CordlrLoader {
  constructor (bot, config = {}) {
    // Assign Default Values
    this.bot = bot
    this.config = config

    this.PluginLoader = new PluginLoader(config) // Init PluginLoader
    this.Scheduler = new Scheduler(config) // Init Scheduler
    this.MessageHandler = new MessageHandler(config) // Init Message Handler

    // Let the PluginLoader get all his stuff right
    this.PluginLoader.loadPlugins(this) // Load all plugins from Cordlr.js

    this.bot.login(this.config.token)

    // Send received messages to the Message Handler
    this.bot.on('message', (message) => {
      this.MessageHandler.handle(message, this.PluginLoader, this.Scheduler)
    })

    return this.bot
  }
}
