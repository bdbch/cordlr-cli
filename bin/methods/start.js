module.exports = start
const { writeFile } = require('fs')
const path = require('path')
const cordlr = require('../../')
const log = require('log-cb')

function start (flags, plugins = []) {
  // Load configuration file
  let config = {}
  const configPath = path.resolve(process.cwd(), 'package.json')
  try { config = require(configPath) } catch (e) {}
  const uneditedConfig = Object.assign({}, config)
  // Add command-line options to config
  Object.assign(config, flags)
  delete config._

  // Attach method to write config to file
  config.writeToFile = (property) => new Promise((resolve, reject) => {
    if (!config[property]) return reject(new Error(`error writing property ${property} to config file, no such property`))
    uneditedConfig[property] = config[property]
    writeFile(configPath, JSON.stringify(uneditedConfig, null, 2), (err) => {
      if (err) reject(err)
      else resolve()
    })
  })

  // Set defaults
  if (!config.loader) config.loader = path.join(__dirname, '..', 'loader')
  if (!config.plugins && plugins.length) config.plugins = []
  config.plugins.push(...plugins)

  // Create bot.
  const bot = cordlr(config)
  bot.on('loaded', log('Loaded bot', 'Loaded bot (with no plugins)'))
}
