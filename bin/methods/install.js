module.exports = install
const log = require('log-cb')
const npmInstall = require('npm-i')

const CWD = process.cwd()
const NPM_OPTS = { base: CWD }

function install (pkgs) {
  if (!pkgs || !pkgs.length) return console.log('Please provide correct package names')

  // Install packages
  log('Installing ' + pkgs.join(', '))()
  npmInstall(pkgs, NPM_OPTS, log('Successfully installed'))
}
