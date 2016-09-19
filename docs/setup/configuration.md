## Configuring

This configured many ways with what the [`rc`](https://npmjs.com/rc) module allows.  From global config, local config, environment variable, command-line options, and more.

## Local `.cordlrrc` file

One of the most simple ways, is to just create a `.cordlrrc` file where you are going to run the bot, and put in some JSON properties.

```js
{
  // Token
  "token": "...",

  // paths to plugins
  "plugins": [
    "cordlr-analytics",
    "cordlr-role",
    "./custom-plugin"
  ],

  // Chat command prefix
  "prefix": ".",

  // ...
}
```

## Options

 - `token` (required): The bot's token, used for logging in.

 - `plugins`: Paths to plugins to load.  Paths are as if they were `require`'d.

 - `prefix`: The chat command prefix. (Default `$`)

Note that plugins can have their own options too.  Check documentation for them.

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
