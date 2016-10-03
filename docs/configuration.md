## Configuration

Cordlr and all it's plugins share one object, to keep everything simple and clean.  We use the `rc` module to allow flexibility with how the user wants to configure their bot.

## Using a `.cordlrrc` file

One simple method is to just create a `.cordlrrc` file where you are running the command.  And put JSON into it.

For example:

```js
{
  "token": "bot_token",
  // ...
}
```

## Using the command-line

When you start the bot, you can also supply command-line flags as configuration options:

```sh
cordlr --token="bot_token" --prefix="."
```

## Native options

There are a few native options.  Although most come from plugins, so read their individual documentatoin.

 - `token` (`String`): The token of your bot
 - `prefix` (`String`): The prefix that triggers commands (i.e. `!`, `$`, `@botname `, etc.)
 - `plugins` (`Array`): List of paths that are resolved with `require`.

Example:

```js
{
  "token": "MsA1VTAyMjl5MTU3MTQ4Njcl.Kr0tah.Rf07DZNdqZZ6z2tH3HqW1OFGjQ9",
  "prefix": "!",
  "plugins": [
    "cordlr-role",
    "./custom-plugin",
    // ... etc
  ]
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

## Other configuration methods

The module we use, [`rc`](https://npmjs.com/rc), provides many ways to configure.  Here is an excerpt from the README:

> Given your application name (`appname`), rc will look in all the obvious places for configuration.
>
>  * command line arguments (parsed by minimist)
>  * environment variables prefixed with `${appname}_`
>    * or use "\_\_" to indicate nested properties <br/> _(e.g. `appname_foo__bar__baz` => `foo.bar.baz`)_
>  * if you passed an option `--config file` then from that file
>  * a local `.${appname}rc` or the first found looking in `./ ../ ../../ ../../../` etc.
>  * `$HOME/.${appname}rc`
>  * `$HOME/.${appname}/config`
>  * `$HOME/.config/${appname}`
>  * `$HOME/.config/${appname}/config`
>  * `/etc/${appname}rc`
>  * `/etc/${appname}/config`
>  * the defaults object you passed in.
