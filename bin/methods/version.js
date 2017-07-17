const VERSION = require('../../package.json').version

module.exports = class Version {
  constructor () {
    console.log(`v${VERSION}`)
  }
}
