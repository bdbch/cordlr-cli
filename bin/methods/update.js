const exec = require('child_process').exec

module.exports = {
  'updateBotDependencies': function (config, dependencies) {
    if (!dependencies)
      dependencies = []

    for (const p of config.plugins) {
      if (p in dependencies) {
        console.log('updating', p)
        exec(`npm update ${p}`, {cwd: process.cwd()}, (err) => { if (err) console.error(err) })
      }
    }
  }
}