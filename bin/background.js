const background = module.exports = {};
const noop = function noop () {};
const child = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const dargs = require('dargs');

// Constants
const CHILD_OPTS = { cwd: __dirname, detached: true };
const PID_FILE = path.join(os.tmpdir(), 'cordlr');

/**
 * background.js
 *
 * Run `main.js` under controlled background process.
 */

background.start = start;
background.stop = stop;
background.restart = restart;

// Start bot in background with `options`.
function start (cb) {
  cb = cb || noop;

  // See if server already running.
  fs.access(PID_FILE, function (err) {
    // If file exists, it means bot is running.
    if (!err) return cb(new Error(`PID file exists (Bot is already running)`));
    if (err.code !== 'ENOENT') return cb(err);

    // Spawn background process.
    const bg = child.spawn('node', ['main.js'], CHILD_OPTS);
    bg.unref();

    // Save PID of it.
    fs.writeFile(PID_FILE, bg.pid + '', function() {
      cb(null, bg.pid);
    });
  });
}

// Kill bot in background.
function stop (cb) {
  cb = cb || noop;

  // Get PID and exit if it is invalid.
  fs.readFile(PID_FILE, function(err, pid) {
    if (err) return cb(new Error(`PID file doesn't exist.  (Bot wasn't running)`));

    // Kill the process using it.
    child.spawn('kill', [pid]).stdout.on('end', function(err) {
      if (err) return cb(err);

      // Delete PID file.
      fs.unlink(PID_FILE, cb);
    });
  });
}

// Simple restart function.
function restart (cb) {
  return stop(() => start(cb));
}
