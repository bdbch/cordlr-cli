const PluginLoader = require('./lib/plugin-loader')
const Scheduler = require('./lib/scheduler')
const MessageHandler = require('./lib/message-handler')

class CordlrBot {
  constructor (bot, config = {}) {
    // Assign Default Values
    this.bot = bot
    this.config = config

    this.initLoaderLibraries()
    this.loginLoader()

    return this.bot
  }

  initLoaderLibraries () {
    this.PluginLoader = new PluginLoader(this.config)
    this.Scheduler = new Scheduler(this.config)
    this.MessageHandler = new MessageHandler(this.config)
    this.PluginLoader.loadPlugins(this)
  }

  loginLoader () {
    this.bot.login(this.config.token)
    this.bot.on('message', (message) => {
      this.MessageHandler.handle(message, this.PluginLoader, this.Scheduler)
    })
  }
}

module.exports = CordlrBot
