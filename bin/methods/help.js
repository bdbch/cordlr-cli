const fs = require('fs')
const path = require('path')

module.exports = class Help {
  constructor () {
    const USAGE_PATH = path.join(__dirname, '../files/usage.txt')
    const USAGE = fs.readFileSync(USAGE_PATH).toString()

    console.log(USAGE)
  }
}
