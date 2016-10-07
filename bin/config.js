const { writeFile } = require('fs')
const configDefaults = require('./files/configDefaults.json')
const minimist = require('minimist')

const configPath = `${process.cwd()}/package.json`
let config
try {
  config = require(configPath)
} catch (e) {
  // file doesn't exist
  config = { cordlr: configDefaults }
}

// insert command line options
const args = minimist(process.argv.slice(2))
for (const key of Object.keys(args)) {
  if (key === '_') continue
  config[key] = args[key]
}
// attach method to write config to file
config.writeToFile = () => {
  const writeString = JSON.stringify(config, null, 2)
  return new Promise((resolve, reject) => {
    writeFile(configPath, writeString, (err) => {
      if (err) return reject(err)
      resolve()
    })
  })
}

module.exports = config
