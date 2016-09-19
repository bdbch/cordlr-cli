module.exports = version

const VERSION = require('../../package.json').version

function version () {
  console.log(`v${VERSION}`)
}
