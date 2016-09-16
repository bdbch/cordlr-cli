const cwd = process.cwd()
const log = require('log-cb')
const npm = require('npm')

module.exports = function (pkg) {
  if (pkg) {
    log('Installing ' + pkg)()
    npm.load(function (err) {
      if (err) {
        return console.log(err)
      }
      npm.prefix = cwd + '/plugins'
      npm.commands.install([pkg], function(er, data) {
        if (er) {
          return console.log(er)
        }
      })
    })
  } else {
    console.log('Please provide a correct package name')
  }
}
