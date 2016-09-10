const fs = require('fs');
const replaceExt = require('replace-ext');
const path = require('path');

module.exports = mapDir;

/**
 * This allows us to scan for exports like this:
 *
 * export.name = 'foo';
 * export.desc = 'Hello world';
 * ...
 *
 * Inside of a folder of modules.
 *
 * And have them load as actions inside `cordlr` properly.
 */

function mapDir (directory, callback) {
  // This is where we map actions to their command name.
  const actions = new Map();

  // Read the directory of actions.
  fs.readdir(directory, function (err, files) {
    if (err) return callback(err);

    // For each file...
    for (const file of files) {
      try {
        // Require it.
        const action = require(path.join(directory, file));

        // Get action command.
        const command = action.command || replaceExt(path.basename(file), '');

        // Map action to it's command.
        actions.set(command, action);
      } catch (err) {
        callback(err);
      }
    }

    // Finished mapping.
    callback(null, actions);
  });
}
