# Filter Hooks

Hooks can be used by plugins to run command while the **cordlr-cli** and **cordlr-loader** are sending specific events.

## Adding filters to your command

Lets use the last command we wrote from [Write a plugin](./write-a-plugin.md). We will get a list of all installed plugins with the hook `pluginData`. Lets do it!

```js
class MyPlugin {
  constructor (bot, config) {
    this.bot = bot
    this.config = config

    this.name = 'My Plugin'
    this.description = 'This is a simple demo plugin'

    this.commands = {
      "ping": {
        "usage": "",
        "function": "sendPong",
        "description": "The bot will say pong!",
        "permissions": [
          "ADMINISTRATOR"
        ]
      }
    }

    this.hooks = {
      "pluginData": "getAllPluginData"
    }
  }

  sendPong (message, args, flags) {
    message.reply('Pong')
    console.log(this.pluginData)
  }

  getAllPluginData(pluginData) {
    this.pluginData = pluginData
    return pluginData
  }
}

module.exports = MyPlugin
```

As you can see we have the value `this.hooks` which contains a list of hook-names and function-names.

The function `getAllPluginData` allows one argument (the Plugin Data passed down by the loader) to be used. We use the pluginData to save it into the plugins **this**-scope for later use.

Now everytime someone runs the **!pong** command, the bot will **console.log** the loaded plugins in an aray with names and descriptions.

## All hooks

Currently we support the following hooks:

* `pluginData | (loadedPluginMetadata)` - Contains the loaded plugin meta data in an array
* `pluginCommands | (loadedPluginCommands` - Contains all commands loaded by all plugins in an array

**Coming Hooks**

* `messageReceived | (message)` - Contains the message which was received
* `userRegistered | (user)` - Contains the GuildMember who joined the server
* `userLeft | (user)` - Contains the GuildMember who left the server

[More hooks here](https://github.com/Devcord/cordlr-loader/issues/13#issuecomment-286068310)