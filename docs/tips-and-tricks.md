## Tips and tricks

### Turning yourself into a bot
You can put your own token into cordlr, and have your own user handle commands.  This is useful for personal utilities, i.e. using [cordlr-color](https://github.com/jamen/cordlr-color) inside any server you're in.

### Using flags and strings in commands
You can execute in-chat commands with flags and strings, since they are parsed with [`spawn-args`](https://npmjs.com/spawn-args) and [`minimist`](https://npmjs.com/minimist).  For example:
```
$foo 'Hello world' --bar='qux'
```

### Lazy-loading plugin configurations

You can group together plugins into module arrays, i.e.:

```js
// suite.js:
module.exports = [
  require('cordlr-role'),
  require('cordlr-help'),
  require('./custom.js')
]
```
And then load them together:
```js
{
  "plugins": "./suite",
  // ...
}
```

### Prefixing with the bot's username

First, find the id of your bot, then you can format the `"prefix"` like this:

```js
"prefix": "@<...id here...> "
```

For example:

```js
"prefix": "@<223165778357256194> "
```
