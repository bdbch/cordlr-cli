## Configuration

You can configure the [default loader](https://github.com/cordlr/cordlr-loader) in two easy ways:

 1. Creating a `package.json` file
 2. Using command line flags and input

Note that configuring depends heavily on [your loader](loader.md).  See their own documentation if you are using something non-standard.  Everything below is documented for the default.

## Creating a `package.json` file

You can create a `package.json` file where you run the `cordlr` command, and it will load the whole file as your configuration.  An `package.json` file could look like this:

```js
{
  "name": "My Bot",
  "description": "This bot does amazing things",
  "token": "MTA1MTAXMjQ8XTU3MTX2Njcy.XriYWg.X1nXn6UvUlwcNXoE5CMAc7k7BXg",
  "plugins": [
    "cordlr-help",
    "cordlr-svg",
    "cordlr-color",
    "cordlr-cleverbot"
  ],
  // Other options
  "dependencies": {
    "cordlr-help": "v1",
    // Other dependencies
  }
}
```

## Using command line flags and input

Alternatively, you can use the command line interface when you start the bot.  Regular input is loaded as plugin names, and flags are applied as config options.  For example:

```sh
cordlr --token='bot_token' --prefix='.' cordlr-help cordlr-svg
```

There is several aliases you can use too:
 - `-x` as `--prefix`
 - `-t` as `--token`
 - `-l` as `--loader`
 - `-p` or `--plugin` as `--plugins`

## Logging in

You can use `token`, or `email` and `password`, with the default loader:

```js
"token": "<access token here>",
// Or using credentials
"email": "foo@example.com",
"password": "Foo_Blah_12"
```

## Loading plugins

With the default loader, you supply a `plugins` option to the config, where the entries are `require`'ed.  You can load dependencies or local plugins this way:

```js
"plugins": [
  "cordlr-help",
  "./custom-plugin"
]
```

You can imagine them being resolved like this:

```js
plugins: [
  require('cordlr-help'),
  require('./custom')
]
```

These modules can export either a plugin directly, or an array of multiple plugins.
