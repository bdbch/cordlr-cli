module.exports = start
const { writeFile } = require('fs')
const path = require('path')
const log = require('log-cb')
const { Client } = require('discord.js')

function start (flags) {
  // Load configuration file
  let config = {}
  const configPath = path.resolve(process.cwd(), 'package.json')
  try {
    config = require(configPath)
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') return log()(e)
  }

  // Set defaults
  if (!config.loader) config.loader = 'cordlr-loader'
  if (!config.plugins) config.plugins = []

  // Add command-line options to config
  const uneditedConfig = Object.assign({}, config)
  Object.assign(config, flags)
  delete config._
  // add command-line plugins to config (if they weren't there yet)
  for (const plugin of flags._) {
    if (!config.plugins.includes(plugin)) {
      config.plugins.push(plugin)
    }
  }

  // Attach method to write config to file
  config.writeToFile = (property) => new Promise((resolve, reject) => {
    if (!config[property]) return reject(new Error(`Cannot write property "${property}"`))
    uneditedConfig[property] = config[property]
    writeFile(configPath, JSON.stringify(uneditedConfig, null, 2), (err) => {
      if (err) reject(err)
      else resolve()
    })
  })

  // Create bot
  const bot = new Client()
  bot.on('error', log.err())
  bot.on('ready', log('Loaded successfully'))

  // Load loader
  const loader = require(config.loader)
  loader(bot, config)
}
