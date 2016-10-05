module.exports = setup
const path = require('path')
const fs = require('fs')
const prompt = require('prompt')
const log = require('log-cb')
const configDefaults = require('../files/configDefaults.json')

const CWD = process.cwd()
const packagePath = path.join(CWD, 'package.json')

function setup () {
  prompt.get(['token', 'prefix'], function (err, result) {
    if (err) return log()(err)

    // Create and write config
    const config = Object.assign({}, configDefaults, { token: result.token, prefix: result.prefix })
    writeConfig(config)
  }).start()
}

function writeConfig (config) {
  return new Promise((resolve, reject) => {
    fs.readFile(packagePath, (er, data) => {
      if (er) { // means the file doens't exist
        const newPackage = { cordlr: config }
        fs.writeFile(packagePath, JSON.stringify(newPackage, null), (err) => {
          if (err) {
            reject(err)
          } else {
            resolve(newPackage)
          }
        })
      } else {
        const existingPackage = JSON.parse(data)
        const newPackage = Object.assign({}, existingPackage, { cordlr: config })
        fs.writeFile(packagePath, JSON.stringify(newPackage), (err) => {
          if (err) {
            reject(err)
          } else {
            resolve(newPackage)
          }
        })
      }
    })
  })
}
