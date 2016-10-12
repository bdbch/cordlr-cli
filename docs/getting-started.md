## Getting Started

When you have [installed cordlr](../README.md#Installation), run the following:

```sh
cordlr
```

This starts the bot.  But, you will most likely see this:

```sh
Error: No plugins
```

Cordlr is a bot based around [plugins](plugins.md), so we need to install and load some for it to do anything.

## Finding plugins

You can search for plugins by

 - [Using the "cordlr-plugin" keyword on npm](https://www.npmjs.com/browse/keyword/cordlr)
 - [Searching "cordlr" on GitHub](https://github.com/search?utf8=%E2%9C%93&q=cordlr)
 - [Seeing the `awesome-cordlr` repo](https://github.com/jamen/awesome-cordlr) (a maintained list of plugins)
 - [Joining the Devcord server](https://discordapp.com/invite/uDXyNAR) and asking about cordlr.

Plugins will have their own instructions on how to install.  Most likely using `npm install`.

Remember to save plugins you install as dependencies inside a `package.json` file, so your bot can be easily saved and deployed somewhere else.

## Loading plugins

Loading plugins depends on [your loader](loader.md), but since this is a getting started guide I'll assume you are using the default loader.

You can use two methods to load plugins by default.  

 1. Adding a `plugins` array to your `package.json`:

    ```js
    {
      "name": "my-bot",
      "description": "Blah foo bar ..."
      "plugins": [
        "cordlr-help",
        "cordlr-cleverbot"
        "chordlr"
        "./local-plugin"
      ],
      "dependencies": {
        "cordlr-help": "v1",
        "cordlr-cleverbot": "v0.2",
        // ...
      }
    }
    ```
 2. Using the command line input:
    ```sh
    cordlr 'cordlr-help' 'cordlr-cleverbot' 'chordlr' './local-plugin'
    ```

These array items are loaded as if they were `require(e)`'ed, which means you can do local plugins alongside your dependencies.

## Logging your bot in

The final step is to get your bot logged in to discord.  With the default loader you can use `"token"` or `"email"` and `"password"`:

```js
{
  "token": "<access token here>",
  // Or use credentials:
  "email": "foo@example.com",
  "password": "12_foo_bar"
}
```

Make sure your bot is invited to the guilds you want it to work.

## It's Alive!

Your bot should now have functionality from the plugins you've added.  Execute commands in chat using `$` as a prefix, for example:

```
$help
```

 - See ["Configuration"](configuration.md) for more info on customizing.
 - See ["Plugins"](plugins.md) for info on creating plugins.
