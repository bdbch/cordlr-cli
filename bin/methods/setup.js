module.exports = setup
const path = require('path')
const fs = require('fs')
const prompt = require('prompt')
const log = require('log-cb')
const pixie = require('pixie')

const CWD = process.cwd()
const TEMPLATE_PATH = path.join(__dirname, '../files/cordlrrc.tmpl')
const TEMPLATE = JSON.parse(fs.readFileSync(TEMPLATE_PATH))

function setup () {
  prompt.get(['token', 'prefix'], function (err, result) {
    if (err) return log()(err)

    // Create and write config
    const config = pixie.compile(TEMPLATE, result)
    writeConfig(config)
  }).start()
}

function writeConfig (content) {
  fs.writeFile(path.join(CWD, '.cordlrrc'), content, log('Configuration created'))
}
