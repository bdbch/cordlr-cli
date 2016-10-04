## Plugins

Plugins are what power cordlr.  They build functionality in a modular way, whether they are installed or are local.  They create a fully-featured bot crafted to your liking.

## What is a plugin?

There are a few basic traits to a plugin:

 - It is a function that is called only once.
 - It has propreties that describe meta info (i.e. name, usage, description, etc.)
 - It is called with `bot`, where it can bind events to create functionality.
 - It has a second argument `config`, see ["Configuration"](configuratoin.md) for more info.

That's it.  It is a function that is called with a `bot` argument, where it binds events.

## How do you specify meta info?

Defining meta information like `command`, `usage`, `description`, etc. is important if you want your plugin to be listed in things like help menus.  It's a way for other plugins and the user to identify what it does.

All you have to do, is set properties on the function, right at the beginning:

```js
function myPlugin (bot, config) {
  myPlugin.command = 'foo'
  myPlugin.description = 'Hello world'
  myPlugin.usage = 'foo <bar>'
  // ...
}
```

These properties can be defined inside or outside of the function, preferrably inside at the beginning, since it is only ran once anyways, and it looks nice alongside other variables.

## How can I handle commands?

Cordlr provides a special syntax for command handling more easily.  

Just return a function at the end of your plugin, and make sure a `.command` is set:

```js
function myPlugin () {
  myPlugin.command = 'foo'
  myPlugin.usage = 'foo <blah> [--bar]'

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
