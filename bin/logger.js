const chalk = require('chalk');

module.exports = logger;

// Log an (err, data) tuple.
function logger (message) {
  return function (err) {
    if (err) console.log(chalk.red(err.name + ':'), err.message);
    else console.log(chalk.green(message));
  }
}
