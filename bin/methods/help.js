const fs = require('fs')
const path = require('path')

const USAGE_PATH = path.join(__dirname, '../usage.txt')
const USAGE = fs.readFileSync(USAGE_PATH).toString();

module.exports = function () {
  console.log(USAGE)
  process.exit(0)
}
