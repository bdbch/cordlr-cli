module.exports = create;
const DiscordClient = require('discord.js').Client;
const minimist = require('minimist');
const mapDir = require('./map-dir');
const log = require('log-cb');

/**
 * Create the cordlr bot.
 */

function create (options) {
  options = options || {};
  const actionPath = options.actions;
  const prefix = options.prefix;

  // Create bot.
  const bot = new DiscordClient(options.client);

  // Setup the command handling.
  bot.once('ready', function () {
    // Load ALL the actions for the bot.
    mapDir(actionPath, function (err, actions) {
      if (err) throw err;

      // Handle messages
      bot.on('message', function (message) {
        if (!message.content.indexOf(prefix)) {
          // Parse the name and arguments.
          const args = message.args = message.content.split(' ');
          const name = args[0].slice(prefix.length);
          args.shift();

          // Run it.
          const action = actions.get(name)(bot, options);
          if (action) action(message, ...args);
        }
      });

      // Emit "done"
      bot.emit('done');
    });
  });

  bot.login(options.token);

  return bot;
}
