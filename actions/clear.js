module.exports = clear;

function clear (bot, options) {
  // When discord emits 'ready'.
  // Used to handle things outside
  // of the running function.

  return function run (message, args) {
    // When this command gets triggered.

    message.reply('Hello world!');
  }
}
