module.exports = setup
const path = require('path')
const fs = require('fs')
const prompt = require('prompt')
const log = require('log-cb')
const configDefaults = require('../files/configDefaults.json')

const CWD = process.cwd()
const packagePath = path.join(CWD, 'package.json')

function setup () {
  prompt.get(['token', 'prefix'], function (err, result) {
    if (err) return log()(err)

    // Create and write config
    const config = Object.assign({}, configDefaults, { token: result.token, prefix: result.prefix })
    writeConfig(config)
  }).start()
}

function writeConfig (promptConfig) {
  let existingConfig = { cordlr: {} }
  try {
    existingConfig = JSON.parse(fs.readFileSync(packagePath))
  } catch (e) {
    console.error('No existing config found, creating new one')
  }
  existingConfig.cordlr = Object.assign({}, configDefaults, existingConfig.cordlr, promptConfig)
  const writeString = JSON.stringify(existingConfig, null, 2)
  fs.writeFileSync(packagePath, writeString)
}
