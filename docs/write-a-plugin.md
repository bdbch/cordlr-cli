# Write a plugin

This is the most important point for the Cordlr community. We need packages to make Cordlr even awesomer so we need **YOU**! If you want to add a plugin for Cordlr and make it public for other people, create a folder for your plugin, initialise it as a npm package via 

```sh
npm init
```

and add your npm informations.

If you want to use [CordlrPlugin](./cordlr-plugin.md) you can install it too.

## Creating a Plugin

Create a **index.js** in your plugins folder and create class which is going to be exported by the module.

```js
class MyPlugin {

}

module.exports = MyPlugin
```

Now this plugin doesn't have any functionality nor any meta informations and can't be access via commands. For that we first need **Meta Data**. It's important so server owners can see which plugins are loaded.

Add this constructor to your code and pass down the **bot** and **config** value:

```js
class MyPlugin {
  constructor (bot, config) {

  }
}

module.exports = MyPlugin
```

The **bot** value contains the Discord.js Client object so you can use any Discord.js functionality. The **config** value contains all informations from the **cordlr.json** used by the server.

## Adding meta data to your plugin

So lets add some data so server owner can see whats installed. Lets add this to the contructor:

```js
class MyPlugin {
  constructor (bot, config) {
    this.bot = bot
    this.config = config

    this.name = 'My Plugin'
    this.description = 'This is a simple demo plugin'
  }
}

module.exports = MyPlugin
```

Great! Now the plugin will print this informations to the console and also makes the data open to Filter Hooks.

## Adding commands to your bot

Now lets write a **ping-pong** script. As soon as someone enters **!ping** the bot will respond with pong. To do this we have to define what commands exist.

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
        "permissions": []
      }
    }
  }

  sendPong (message, args, flags) {
    message.reply('Pong')
  }
}
```

Okay cool! Now the bot knows that a command called `!ping` exists and will send a reply with the content **Pong**. Wasn't that easy? Lets explain what the values actually mean.

* `usage` - This will be used for help plugins to show how this command should be used without the command name and prefix (example: `<arg1> <arg2>`)
* `function` - The function name which will be called from this plugin
* `description` - For help plugins etc. Will explain what this command does.
* `permissions` - An array containing [Discord Permissions](https://discordapp.com/developers/docs/topics/permissions) to restrict commands to different userlevels

Lets make the pong function only usable by server administrators!

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
  }

  sendPong (message, args, flags) {
    message.reply('Pong')
  }
}

module.exports = MyPlugin
```

Well done! There are even more functionalities like the [CordlrPlugin](./cordlr-plugin.md) or [Filter Hooks](./hooks.md)