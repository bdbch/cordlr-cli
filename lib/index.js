module.exports = create;
const DiscordClient = require('discord.js').Client;
const minimist = require('minimist');

/**
 * Create the cordlr bot.
 */

function create (options) {
  options = options || {};
  const actions = options.actions;
  const prefix = options.prefix;

  // Create bot.
  const bot = new DiscordClient(options.client);

  // Setup the command handling.
  bot.once('ready', function () {
    var run = {};
    for (var i = 0, max = actions.length; i < max; i++) {
      var action = actions[i];
      run[action] = require('./actions/' + action);
    }

    // Handle messages
    bot.on('message', function (message) {
      if (!message.content.indexOf(prefix)) {
        const args = message.args = message.content.split(' ');
        const name = args[0].slice(prefix.length);
        args.shift();

        // Run the action.
        run[name](message, args);
      }
    });

    // Emit "done"
    bot.emit('done');
  });

  return bot;
}
