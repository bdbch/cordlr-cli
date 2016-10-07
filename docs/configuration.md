## Configuration

The configuration for cordlr is stored in the package.json file of your project, under a key called `cordlr`

## Using a `package.json` file

One simple method is to just create a `package.json` file where you are running the command.  And put JSON into it.

For example:

```js
{
  // ...
  cordlr: {
    "token": "bot_token",
    // ...
  }
}
```

## Using the command-line

When you start the bot, you can also supply command-line flags as configuration options:

```sh
cordlr --token="bot_token" --prefix="."
```

## Native options

There are a few native options.  Although most come from plugins, so read their individual documentation.

 - `token` (`String`): The token of your bot
 - `prefix` (`String`): The prefix that triggers commands (i.e. `!`, `$`, `@botname `, etc.)
 - `plugins` (`Array`): List of paths that are resolved with `require`.

Example:

```js
{
  // ...
  cordlr: {
    "token": "MsA1VTAyMjl5MTU3MTQ4Njcl.Kr0tah.Rf07DZNdqZZ6z2tH3HqW1OFGjQ9",
    "prefix": "!",
    "plugins": [
      "cordlr-role",
      "./custom-plugin",
      // ... etc
    ]
  }
}
```

## Plugins

Plugins are resolved as if they were `require()`'ed.  So, if you see this:

```js
"plugins": [
  "cordlr-role",
  "cordlr-help",
  "./custom"
]
```
You can imagine them being resolved like
```js
require('cordlr-role')
require('cordlr-help')
require('./custom')
```

These modules can export either a plugin directly, or an array of multiple plugins.
