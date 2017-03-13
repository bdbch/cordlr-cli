# CordlrPlugin

**CordlrPlugin** is a extendable class for your own plugins which gives you a lot of functions and interfaces to make working with Cordlr easier. If you want to extend your bot from CordlrPlugin you can do that via **extends**. Installing CordlrPlugin is easy since it's just a npm package.

```sh
npm install cordlr-plugin --save
```

Now you can extend from this package like this:

```js
const CordlrPlugin = require('cordlr-plugin')

class MyPlugin extends CordlrPlugin {
  constructor (bot, config) {
    super(bot, config)

    // your code
  }
}
```

## [Read the CordlrPlugin Docs](https://github.com/Devcord/cordlr-plugin/tree/master/docs)