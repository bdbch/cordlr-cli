# Installing Plugins

## What is a Plugin?

A Cordlr plugin is a plugin feature you can add to your bot. Plugins can register new commands, log information from your server, automate tasks and more.

They can be customized via configuration files and are extendable. Cordlr plugins are always prefixed by the prefix **cordlr-**.

## How to install plugins via npm

You can install a plugin via npm if your server directory was initialised as a npm package via `npm init`. This allows easy version control via strict versions or installing the latest versions of all plugins.

You can install a plugin via

```sh
npm install cordlr-plugin-name --save
```

for the latest version as a strict version number or

```sh
npm install cordlr-plugin-name@latest --save
```

to install **always the latest version** of a plugin.

## How to install plugins manually

You can also install plugins manually. For that create a **plugins** folder in your bots directory and put a plugin folder in the plugins folder so it looks like this

```
path/to/server/folder/plugins/cordlr-plugin-name
```

The plugin will be loaded from here before the node_modules folder, so this is great for testing a plugin before installing it via npm.