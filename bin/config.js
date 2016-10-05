const fsproxy = require('fs-proxy')

let config
const configPath = `${process.cwd()}/package.json`
try {
  config = fsproxy(configPath)
} catch (e) {
  console.error('Error with reading the config file')
  throw e
}
module.exports = config.cordlr
