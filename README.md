# Cordlr

Cordlr is bot made for [Discord](https://discordapp.com/) that uses a simplistic and powerful plugin system.  It is build on top of [Node.js](https://nodejs.org/) and uses [npm](https://www.npmjs.com/) for hosting and installing [user-submitted plugins](https://www.npmjs.com/browse/keyword/cordlr).  Everything shares a central config to keep things clean, on top of a fast factory-based system.

[**Add the official Cordlr to your server**](https://discordapp.com/oauth2/authorize?client_id=223165778357256194&scope=bot&permissions=0x00000008)

## Requirements

 - `node`: >=6
 - `npm`: any

## Installation
```
npm install -g cordlr
```

Use GitHub to get the latest stable commit:
```
npm install -g devcord/cordlr
```

Next, search for [plugins to install](https://www.npmjs.com/browse/keyword/cordlr).  (See the next section)

## Plugins

The bot includes no plugins by defaut, you have to install plugins. You can install plugins via:
```
cordlr install <...plugins>
```

You can find plugins using [the `cordlr` keyword on npm](https://www.npmjs.com/browse/keyword/cordlr)

If you want to install `cordlr-role` for example, run: 
```
cordlr install role
```

After installing the package, you can start Cordlr again and try out the plugin

## Also see
 - [`forever`](https://www.npmjs.com/package/forever): Running bot background processes and keeping them up.
 - [`discord.js`](https://www.npmjs.com/package/discord.js): The package which this is based on.

## License

Devcord &copy; [GPLv3](LICENSE)
