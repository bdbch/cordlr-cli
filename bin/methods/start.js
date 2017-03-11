const { Client } = require('discord.js')
const path = require('path')

module.exports = class Cordlr {
  constructor (flags) {
    this.flags = flags || ''

    // Get path to "cordlr config" file
    this.configPath = path.resolve(process.cwd(), 'cordlr.json')

    try {
      this.config = require(this.configPath)
    } catch (e) {
      if (e.code === 'MODULE_NOT_FOUND') this.config = {}
      else return console.log(e)
    }

    // If Token doesn't exist, return error
    if (!this.config.token) return console.log('No token specified')

    // Set default values if empty
    if (!this.config.loader) this.config.loader = this.flags.loader || 'cordlr-loader'
    if (!this.config.plugins) this.config.plugins = this.flags.plugins || []
    if (!this.config.prefix) this.config.prefix = this.flags.prefix || '!'

    // Add plugin(s) from command-line flags to "cordlr config" file
    if (this.flags.plugins) {
      for (const plugin of this.flags.plugins) {
        if (!this.config.plugins.includes(plugin)) {
          this.config.plugins.push(plugin)
        }
      }
    }

    this.start()
  }

  start () {
    // Initialize and load the bot and loader
    const bot = new Client()
    bot.on('error', (e) => console.log(e))
    bot.on('ready', () => console.log('Loaded successfully'))

    // Load loader
    const Loader = require(this.config.loader)
    return new Loader(bot, this.config)
  }
}
