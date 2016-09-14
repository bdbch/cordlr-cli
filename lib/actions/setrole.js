const userConfig = require('../../config')

module.exports = setrole;

function setrole (bot, options) {
  // When discord emits 'ready'.
  // Used to handle things outside
  // of the running function.

  return function run (message, args) {
    const author = message.member

    if(args) {
      const roles = message.guild.roles
      const requestedRole = args
      const selectedRole = roles.find('name', requestedRole)

      if(selectedRole) {
        const assignable = isRoleAssignable(selectedRole)
        addToRole(author, requestedRole, selectedRole, assignable)
      } else {
        author.sendMessage('Sorry, but the role **' + requestedRole + '** does not exist.')
      }
    } else {
      author.sendMessage('Sorry, but you have to provide a valid role!')
    }
  }
}

function isRoleAssignable (selectedRole) {
  let assignable = true
  for(i = 0; i < userConfig.adminPerms.length; i++) {
    if(selectedRole.hasPermission(userConfig.adminPerms[i])) {
      assignable = false
    }
  }

  return assignable
}

function addToRole (author, requestedRole, selectedRole, assignable) {
  if(!assignable) {
    author.sendMessage('Sorry, but you are not allowed to assign yourself **' + requestedRole + '**')
    return false
  }

  author.sendMessage('Added **' + author.user.username + '** to **' + requestedRole + '**')
  author.addRole(selectedRole.id)
}
