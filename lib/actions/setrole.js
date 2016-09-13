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
      const selectedRole = roles.find('name', args)
      let assignable = true

      if(selectedRole) {
        for(i = 0; i < userConfig.adminPerms.length; i++) {
          if(selectedRole.hasPermission(userConfig.adminPerms[i])) {
            assignable = false
          }
        }

        if(!assignable) {
          author.sendMessage('Sorry, but you are not allowed to assign yourself **' + args + '**')
          author.addRole(args)
          return false
        }

        author.sendMessage('Added **' + author.user.username + '** to **' + args + '**')
      } else {
        author.sendMessage('Sorry, but the role **' + args + '** does not exist.')
      }
    } else {
      author.sendMessage('Sorry, but you have to provide a valid role!')
    }
  }
}
