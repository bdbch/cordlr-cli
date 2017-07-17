## Loaders

A "loader" is a module responsible for adding all of your plugins into the system.  Cordlr comes with a default loader, however you can replace it for an extremely customized bot.

It's important to note that plugins are not compatible between loaders unless they are designed to be.  A loader can interpret a module however it wants.  That is why it is recommended to stick with the standard loader for new users, since the majority of plugins are designed for it.

### Setting a loader

In your config, you will want to add:

```js
"loader": "<path to module>"
```

Some examples:

```js
"loader": "cordlr-custom-loader"
"loader": "../local-loader"
```

### Designing a loader

Loaders are simple.  It's a module that exports a function.  This function is called with `bot` and `config`, where you can set your own listeners and whatnot.  They should also always return `bot`.

For example:

```js
class MyLoader {
  constructor (bot, config) {
    this.pluginPaths = config.plugins || []

    // more code

    bot.on('message', () => {
      // more code
    }

    return bot
  }
}

module.exports = MyLoader
```

### Generic usage / modular functionality

Because loaders are simple functions that are passed objects from [discord.js](https://github.com/hydrabolt/discord.js/), you can reuse them elsewhere:

```js
// Obtain a `Client` object somehow...
const bot = new Client({ ...options })
const Loader = require('my-loader')

// Apply the loader
new Loader(bot, {
  plugins: [ ...paths ],
  // ....
})
```

This creates a simple network of functionality that you can apply anywhere.  Same with plugins.
