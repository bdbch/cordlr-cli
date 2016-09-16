const path = require('path')
const fs = require('fs')
const prompt = require('prompt')
const sampleConfiguration = fs.readFileSync(path.join(__dirname, '../../.cordlrrc.sample'), 'utf-8')

module.exports = function (cwd) {
  prompt.start()
  prompt.get(['bot_token'], function(err, result) {
    if(err) {
      return console.log(err)
    }

    const newConfiguration = sampleConfiguration.replace('BOT_TOKEN', result.bot_token)
    writeConfig(newConfiguration, cwd)
  })
}

function writeConfig (content, cwd) {
  fs.writeFile(cwd + '/.cordlrrc', content, function(err) {
    if(err) {
      return console.log(err)
    }

    console.log('Cordlr Configuration File was setup')
  })
}
