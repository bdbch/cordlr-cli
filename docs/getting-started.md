## Getting Started

Assuming you have [installed cordlr](../README.md#Installation), to start it, simply run:

```sh
cordlr
```

But, this is a bot that is based around [plugins](plugins.md).  When you first get cordlr, it probably won't do anything because you haven't installed or loaded any plugins yet.  You will see this message:

> Loaded bot (with no plugins)

## Finding plugins

Plugins can be created by really anyone, so there are several ways they can be found.  Mostly through npm and GitHub.

Here are some methods for searching them:

 - Using the ["cordlr" keyword on npm](https://www.npmjs.com/browse/keyword/cordlr)
 - [Searching "cordlr" on GitHub](https://github.com/search?utf8=%E2%9C%93&q=cordlr)
 - Browsing the [`awesome-cordlr` repository](https://github.com/jamen/awesome-cordlr) (a curated list of plugins)
 - [Joining the Devcord server](https://discordapp.com/invite/uDXyNAR) and asking about cordlr plugins.

## Installing plugins

Plugins can be installed using `cordlr install` or `npm install`.  Cordlr's method just automatically prefixes with `cordlr-`.  For example:

```
cordlr install role
```

This is equivalent to:

```
npm install cordlr-role
```

You can also use any other magic npm provides.  Like installing from GitHub, gists, private packages, etc. (See `man npm-install` for complete page of info)

## Loading plugins

If you use `cordlr install`, this should be done automatically.  You just need to restart the bot.

If you have installed some plugins through other means, you'll want to load them using [the configuration](configuration.md). Simply create a `.cordlrrc` file wherever you are running the command (plugins should be in this location too), and add the folowing:

```js
{
  "plugins": [
    "cordlr-role",
    // ... other plugins
  ]
}
```

These array items are loaded as if they were `require(e)`'ed, which means you can do local plugins as well.

## Adding your token

The final step to setting up a new bot, is adding your token.  This only needs to be done once: add a `"token"` field to your configuration.

```js
{
  "token": "bot_token",
  "plugins": [ /* ... */ ],
  // ...
}
```

## You've done it

You have successfully added functionality to your bot, after plugins have been installed and loaded.  You just need to start/restart it, and the plugins will be live.

Now that you have done this, check out ["Plugins"](plugins.md) for more information on using and creating.  Also check out ["Configuration"](configuration.md) for lots more on that.
