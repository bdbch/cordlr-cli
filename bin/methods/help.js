const fs = require('fs')
const path = require('path')

const USAGE_PATH = path.join(__dirname, '../files/usage.txt')
const USAGE = fs.readFileSync(USAGE_PATH).toString()

module.exports = class Help {
  constructor () {
    console.log(USAGE)
  }
}
