const { Client } = require('discord.js')
const path = require('path')
const fs = require('fs')

const updateBotDependencies = require('./update.js').updateBotDependencies

module.exports = class Cordlr {
  constructor (flags) {
    this.flags = flags || ''

    // Get path to "cordlr config" file
    this.configPath = path.resolve(process.cwd(), 'cordlr.json')

    this.getConfiguration()
    this.start()
  }

  getConfiguration () {
    try {
      const configContent = JSON.parse(fs.readFileSync(this.configPath, 'utf8'))
      this.config = configContent
    } catch (e) {
      if (e.code === 'MODULE_NOT_FOUND') this.config = {}
      else return console.log(e)
    }

    // If Token doesn't exist, return error
    if (!this.config.token) {
      if (process.env.CORDLR_TOKEN) this.config.token = process.env.CORDLR_TOKEN
      else return console.log('No token specified')
    }

    // Set default values if empty
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
  }

  start () {
    // Initiate the Bot
    this.bot = new Client()
    this.bot.on('error', (e) => console.log(e)) // console.log on error
    this.bot.on('ready', () => console.log('Loaded successfully'))

    // Add this as binary to bot object
    this.bot.bin = this

    // Initiate the Loader
    const Loader = require(path.join(__dirname, '../../loader/index'))
    return new Loader(this.bot, this.config)
  }

  restart () {
    this.bot.destroy()
    this.getConfiguration()
    this.start()
  }

  stop () {
    this.bot.destroy()
    process.exit(1)
  }

  update () {
    const dependencies = require(process.cwd() + '/package.json').dependencies
    const config = this.config

    this.bot.destroy()
    this.getConfiguration()

    updateBotDependencies(config, dependencies)

    this.start()
  }
}
