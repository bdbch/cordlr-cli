## Plugins

Plugins depend entirely on [what loader you use](loader.md).  Here, I assume you use the default loader or something compatible.

## What is a plugin?

These default plugins are functions that get called with `bot` and `config`, shared between all of them.  Info like `name`, `description`, etc. is taken from the plugin's `package.json` if it exists, and otherwise it looks for properties on the function like `plugin.name`, `plugin.description`, etc.  For example:

```js
plugin.name = 'foo'
plugin.description = 'Bar blah qux'

function plugin (bot, config) {
  // ...
}
```

From here, the bot can bind it's own events on `bot`, and use data provided from `config`, or handle commands.

## How can I handle commands?

Cordlr provides a special syntax for command handling.  Just return a function at the end of your plugin, and optionally set a `command` (will default to the function's name):

```js
myPlugin.command = 'foo'
// ...

function myPlugin (bot, config) {
  return function run (message, args, flags) {
    // ...
  }
}
```

 - `message`: A [`Message` object](http://hydrabolt.github.io/discord.js/#!/docs/tag/master/class/Message) from discord.js that provides all info.
 - `args`: The arguments of `message.content` parsed with [`minimist`](https://npmjs.com/minimist).
 - `flags`: The flags of `message.content` parsed with `minimist`
 - Keep in mind you also still have access to `bot` and `config`, and anything you define in the outer scope.

Here is what the plugin would look like being executed (with it's usage):
```
$foo "qux qux" --bar
```
(Provided `"prefix": "$"`, the default)

## That's it

From here you can program your plugin however you'd like.  

 - See ["Packages"](packages.md) for common practices in naming and curating cordlr packages.
 - See ["Configuration"](configuration.md) for more info on how users can configure plugins with the default loader.
