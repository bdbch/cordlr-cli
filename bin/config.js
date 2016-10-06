const fsproxy = require('fs-proxy')

const configPath = `${process.cwd()}/package.json`
let config
try {
  config = fsproxy(configPath, (key) => key.slice(0, 2) !== ['cordlr', 'package'])
} catch (e) {
  config = { cordlr: {} }
}

module.exports = config
