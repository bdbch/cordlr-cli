module.exports = start
const { writeFile } = require('fs')
const path = require('path')
const log = require('log-cb')
const { Client } = require('discord.js')

function start (flags, plugins = []) {
  // Load configuration file
  let config = {}
  const configPath = path.resolve(process.cwd(), 'package.json')
  try {
    config = require(configPath)
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') return log()(e)
  }

  // Add command-line options to config
  const uneditedConfig = Object.assign({}, config)
  Object.assign(config, flags)
  delete config._

  // Attach method to write config to file
  config.writeToFile = (property) => new Promise((resolve, reject) => {
    if (!config[property]) return reject(new Error(`Cannot write property "${property}"`))
    uneditedConfig[property] = config[property]
    writeFile(configPath, JSON.stringify(uneditedConfig, null, 2), (err) => {
      if (err) reject(err)
      else resolve()
    })
  })

  // Set defaults
  if (!config.loader) config.loader = path.join(__dirname, '../../node_modules/cordlr-loader')
  if (plugins.length) {
    if (!config.plugins) config.plugins = []
    config.plugins.push(...plugins)
  }

  // Create bot
  const bot = new Client()
  bot.on('error', log.err())
  bot.on('ready', () => log('Loaded successfully')())

  // Load loader
  const loader = require(config.loader)
  loader(bot, config)
}
