module.exports = role
const log = require('log-cb');

role.command = 'role';
role.usage = 'role <method> [name]'

/**
 * Actions for managing user roles.
 *
 * Adding role to a user:
 * $role add <name>
 *
 * Removing role from user:
 * $role remove <name>
 *
 * Listing roles:
 * $role list
 */

function role (bot, options) {
  // Publically avaiable roles
  const publicRoles = options.publicRoles;
  const publicRolesList = publicRoles.join(', ') || '(none)';

  // Command handler
  return function run (message, args) {
    // Dissect input arguments
    const method = args[0]
    const name = args[1]
    const author = message.member

    // Get roles of guild where the message was sent, exit if invalid.
    let role
    if (name) role = message.guild.roles.find('name', name)
    if (method !== 'list' && (!role || publicRoles.indexOf(role.name) < 0)) {
      return message.reply('use a valid and assignable role. (See `$role list`)')
    }

    // Handle command method
    switch (method) {
      case 'add': return addRole(role, author, message)
      case 'remove': return removeRole(role, author, message)
      case 'list': return listRoles(message)
      default: return message.reply(`invalid method "${method}".`)
    }
  }

  // Adds author to a role.
  function addRole (role, author, message) {
    author.addRole(role).then(() => {
      message.reply(`added to **${role.name}**`)
    });
  }

  // Removes author from a role.
  function removeRole (role, author, message) {
    author.removeRole(role).then(() => {
      message.reply(`removed from **${role.name}**`)
    });
  }

  // Lists public roles.
  function listRoles (message) {
    message.reply(`public roles: ${publicRolesList}`);
  }
}
