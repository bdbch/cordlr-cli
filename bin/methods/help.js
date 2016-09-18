const fs = require('fs')
const path = require('path')

module.exports = function () {
  console.log(fs.readFileSync(path.join(__dirname, '../usage.txt')).toString('utf-8'))
  process.exit(0)
}
