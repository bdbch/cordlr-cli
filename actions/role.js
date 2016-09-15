module.exports = role

role.command = 'role'
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

function role (bot, config) {
  // Admin permissions, can't assign roles with these
  const adminPerms = config.adminPerms

  // Command handler
  return function run (message, args) {
    // Dissect input arguments
    const method = args[0]
    const name = args[1]
    const author = message.member

    // Handle command method
    switch (method) {
      case 'add': return addRole(name, author, message)
      case 'remove': return removeRole(name, author, message)
      case 'list': return listRoles(message)
      default: return message.reply(`invalid method "${method}".`)
    }
  }

  // Adds author to a role
  function addRole (name, author, message) {
    const role = getRole(name, message)
    if (!role) return

    // Add it to the author
    author.addRole(role).then(() => {
      message.reply(`added to **${name}**`)
    })
  }

  // Removes author from a role
  function removeRole (name, author, message) {
    const role = getRole(name, message)
    if (!role) return

    // Remove it from the author
    author.removeRole(role).then(() => {
      message.reply(`removed from **${name}**`)
    })
  }

  // Lists public roles
  function listRoles (message) {
    var availableRoles = message.guild.roles
    .filter(role => validateRole(role))
    .map(role => role.name).join(', ') || '(none)'

    message.reply(`available roles: ${availableRoles}`)
  }

  // Get role from a name
  function getRole (name, message) {
    if (!name) {
      message.reply('please enter a role name')
      return null
    }

    // Get roles of guild where the message was sent, exit if invalid
    const role = message.guild.roles.find('name', name)

    // Verify permissions
    if (!validateRole(role)) return null

    // Return otherwise
    return role
  }

  // Validate role
  function validateRole (role) {
    for (const perm of adminPerms) {
      if (
        !role ||
        role.hasPermission(perm) ||
        role.name === '@everyone'
      ) return false
    }
    return true
  }
}
