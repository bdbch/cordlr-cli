const fsproxy = require('fs-proxy')

const configPath = `${process.cwd()}/package.json`
let config
try {
  config = fsproxy(configPath)
} catch (e) {
  config = { cordlr: {} }
}

module.exports = config
