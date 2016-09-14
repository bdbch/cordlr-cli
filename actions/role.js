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
    let requestedRole = false
    let selectedRole = false

    if(action) {
      const roles = message.guild.roles

      if(value) {
        requestedRole = value
        selectedRole = roles.find('name', requestedRole)
      }

      switch (action) {
        case 'add':
          if(selectedRole) {
            addToRole(message, author, requestedRole, selectedRole)
          } else {
            message.reply('Sorry, but the role **' + requestedRole + '** does not exist.')
          }
          break
        case 'remove':
          if(selectedRole) {
            removeFromRole(message, author, requestedRole, selectedRole)
          } else {
            message.reply('Sorry, but the role **' + requestedRole + '** does not exist.')
          }
          break
        case 'list':
          listRoles(message)
          break
        default:
          message.reply('Invalid argument **' + action + '**')
      }
    } else {
      message.reply('Sorry, but you have to provide a valid role!')
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

function addToRole (message, author, requestedRole, selectedRole) {
  const assignable = isRoleAssignable(selectedRole)
  if(!assignable) {
    message.reply('Sorry, but you are not allowed to assign yourself **' + requestedRole + '**')
    return false
  }

  message.reply('Added **' + author.user.username + '** to **' + requestedRole + '**')
  author.addRole(selectedRole.id)
}

function removeFromRole (message, author, requestedRole, selectedRole) {
  const assignable = isRoleAssignable(selectedRole)
  if(!assignable) {
    message.reply('Sorry, but you are not allowed to remove yourself from **' + requestedRole + '**')
    return false
  }

  message.reply('Removed **' + author.user.username + '** from **' + requestedRole + '**')
  author.removeRole(selectedRole.id)
}

function listRoles (message) {
  const roles = message.guild.roles
  let availableRoles = []

  availableRoles = roles.map(function(role) {
    for(i = 0; i < userConfig.adminPerms.length; i++) {
      if(!role.hasPermission(userConfig.adminPerms[i])) {
        return role.name
      } else {
        return false
      }
    }
  })

  let availableRolesString = ''
  for(i = 0; i < availableRoles.length; i++) {
    if(availableRoles[i] && availableRoles[i] !== '@everyone') availableRolesString += '`' + availableRoles[i] + '` '
  }

  message.reply('Following roles are available: ' + availableRolesString)
}
