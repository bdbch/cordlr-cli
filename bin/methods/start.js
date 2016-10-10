module.exports = start
const { writeFile } = require('fs')
const path = require('path')
const cordlr = require('../../')
const log = require('log-cb')

function start (flags, folder = '') {
  // Load configuration file
  let config = {}
  const configPath = path.resolve(process.cwd(), folder, 'package.json')
  try { config = require(configPath) } catch (e) {}

  // Add command-line options to config
  Object.assign(config, flags)
  delete config._

  // Attach method to write config to file
  config.writeToFile = (cb) => writeFile(configPath, JSON.stringify(config, null, 2), cb)

  // Set defaults
  if (!config.loader) config.loader = path.join(__dirname, '..', 'loader')

  // Create bot.
  const bot = cordlr(config)
  bot.on('loaded', log('Loaded bot', 'Loaded bot (with no plugins)'))
}
