## Configuring

This configured many ways with what the [`rc`](https://npmjs.com/rc) module allows.  From global config, local config, environment variable, command-line options, and more.

## Local `.cordlrrc` file

One of the most simple ways, is to just create a `.cordlrrc` file where you are going to run the bot, and put in some JSON properties.

```js
{
  // Token
  "token": "...",

  // different globs to load scripts from
  "actions": [
    "cordlr/actions/*.js", // Defaults
    "./custom-scripts/*.js",
    "cordlr-analytics"
  ],

  // Chat command prefix
  "prefix": "!",

  // ...
}
```

## Options

 - `token` (required): The bot's token, used for logging in.

 - `actions`: Various file locations and globs to load files from, npm modules also resolved. (Default `cordlr/actions/*.js`)

 - `prefix`: The chat command prefix. (Default `$`)

## Other configuration methods

The module we use (called [`rc`](https://npmjs.com/rc)) provides many ways to configure:

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
