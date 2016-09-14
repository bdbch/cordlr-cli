const userConfig = require('../../config')

module.exports = role;

function role (bot, options) {
  // When discord emits 'ready'.
  // Used to handle things outside
  // of the running function.

  return function run (message, args) {
    const action = args[0]
    const value = args[1]
    const author = message.member

    if(action && value) {
      const roles = message.guild.roles
      const requestedRole = value
      const selectedRole = roles.find('name', requestedRole)

      if(selectedRole) {
        switch (action) {
          case 'add':
            addToRole(author, requestedRole, selectedRole)
            break
          case 'remove':
            removeFromRole(author, requestedRole, selectedRole)
            break
          default:
            author.sendMessage('Invalid argument **' + action + '**')
        }
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

function addToRole (author, requestedRole, selectedRole) {
  const assignable = isRoleAssignable(selectedRole)
  if(!assignable) {
    author.sendMessage('Sorry, but you are not allowed to assign yourself **' + requestedRole + '**')
    return false
  }

  author.sendMessage('Added **' + author.user.username + '** to **' + requestedRole + '**')
  author.addRole(selectedRole.id)
}

function removeFromRole (author, requestedRole, selectedRole) {
  const assignable = isRoleAssignable(selectedRole)
  if(!assignable) {
    author.sendMessage('Sorry, but you are not allowed to remove yourself from **' + requestedRole + '**')
    return false
  }

  author.sendMessage('Removed **' + author.user.username + '** from **' + requestedRole + '**')
  author.removeRole(selectedRole.id)
}
