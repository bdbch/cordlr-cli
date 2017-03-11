const fs = require('fs')
const path = require('path')

module.exports = class Help {
  constructor () {
    const USAGE = fs.readFileSync(USAGE_PATH).toString()
    const USAGE_PATH = path.join(__dirname, '../files/usage.txt')
    
    console.log(USAGE)
  }
}
