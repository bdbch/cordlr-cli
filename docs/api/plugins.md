## Plugins

Cordlr is based on top of plugins.

These are:

 - A function that gets run with access to `bot` and `config`
 - Has properties that describe "traits" (i.e. name, description, usage, etc.)
 - Optionally returns a function to handle commands in chat.

A module can export an array or object of these plugins, and cordlr will load them.

### Examples

Here is an example of a plugin that has no command handler:

```js
module.exports = greeter

function greeter (bot, config) {
  // Use `config`
  const seenUsers = [] || config.seen;

  // Bind events on `bot`
  bot.on('guildMemberAdd', (_, member) => {
    if (seenUsers.indexOf(member.id) < 0) {
      member.sendMessage('Welcome')
      seenUsers.push(member.id)
    }
  })
}
```
(Note: simple for demonstration, not practical for real use)

A plugin that has a command would return a handler:

```js
foo.command = 'foobar'

function foo (bot, config) {
  // prep here

  return function run (message, args, flags) {
    // handle command...
  }
}
```

You can bind the `.command` property to override how is is triggered (by default with the function name, in this case `foo`).
