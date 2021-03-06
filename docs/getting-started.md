# Getting Started

This guide will help you to get started with Cordlr and get your first bot up and running in a few minutes. You will need a Node.js installation on your server and we recommend using [pm2](https://www.npmjs.com/package/pm2) or [forever](https://www.npmjs.com/package/forever) for better uptime.

## Setup

Cordlr is installed via NPM. That way updates can be done via the Command Line and your server can be started with the same binary.

You can install Cordlr via 
```sh
npm i cordlr-cli -g
``` 

for the stable version or 
```sh
npm i Devcord/cordlr-cli -g
```
to install the latest version from Github.

## Creating a bot server

Every Cordlr server should live in its own folder. For this example we're creating a folder at `~/discord-servers/` called `mybot`. Change into the directory via 
```sh
cd ~/discord-servers/mybot
```

and initialise a npm registry via 

```sh
npm init
```

and answer the npm init instruction questions.

**Installing the required packages**

After initialising the server as a NPM package, you can now install npm packages. We will use the packages **cordlr-help2**, **cordlr-roles** and **cordlr-giphy** for this example.

Run 
```sh
npm i cordlr-help2 cordlr-roles cordlr-giphy --save
```

for fixed versions or 

```sh
npm i cordlr-help2@latest cordlr-roles@latest cordlr-giphy@latest --save
``` 

to **always** install the latest versions.

**Configuration File**

Now create a new file called `cordlr.json` which will be used by Cordlr to start the Bot and configure plugins.

Copy the following content into the file:

```js
{
  "token":"YourTokenHere",
  "prefix":"!",
  "loader":"cordlr-loader",
  "plugins":[
    "cordlr-help2",
    "cordlr-roles",
    "cordlr-giphy"
  ]
}
```

Now replace the token `YourTokenHere` with your bots token you can receive from the [Discord Developers](https://discordapp.com/developers/applications/me) page.

## Starting the bot

Now you can start up your bot. Make sure your terminals current directory is your bots directory. Now run `cordlr` and you will see a list of all loaded plugins and a message saying that the bot finished loading.

Before your bot is ready, make sure to invite him with all required permissions.

* [Read more about inviting bots to your server here](https://discordapp.com/developers/docs/topics/oauth2)
* [Read more about adding permissions to your bot here](https://discordapp.com/developers/docs/topics/permissions)

Now go to your server and try `!help` and `!plugins` to get a list of commands and plugins you can use.

## Configuring the `cordlr-roles` plugin

`cordlr-roles` won't allow any role to be assigned via `!addrole` or `!removerole` so you have to whitelist them. Create a Role on your Discord server called **JoinMe** and open your `cordlr.json`. Add the following configuration to your file:

```js
{
  "token":"YourTokenHere",
  "prefix":"!",
  "loader":"cordlr-loader",
  "plugins":[
    "cordlr-help2",
    "cordlr-roles",
    "cordlr-giphy"
  ],
  "cordlr-roles": {
    "whitelist": [
      "JoinMe"
    ]
  }
}
```

As you can see we added a configuration key called **cordlr-roles** which is going to be loaded via the plugin. In there we added the role **JoinMe** in the `whitelist` wo users on your server can assign this role via commands.

Save the file and run

```sh
cordlr-cli
``` 

Try out the command on your server via `!roles`, `!addrole JoinMe` and `!removerole JoinMe`.

## Using the Server Boilerplate

We also have a boilerplate for new bot servers you can use which already contains the base set of plugins and already existing congfiguration files.

[Install the boilerplate here](https://github.com/Devcord/cordlr-server-boilerplate)

## More Informations

There is even more to learn. Check the [rest of the documentation](./) to learn more.