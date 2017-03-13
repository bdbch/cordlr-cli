## Configuring the server

Your server **always** needs the **cordlr.json** file in the bots directory. This file needs to contain the **bot login token**, the **bot prefix** and the **loader**.

The minimal configuration file looks like this:

```js
{
  "token":"YourTokenHere",
  "prefix":"!",
  "loader":"cordlr-loader"
}
```

If you run Cordlr with this configuration you will get a warning that no plugins are installed. If you [installed a plugin](./plugins.md) you have to add the plugins name to the configuration so Cordlr knows about it and loads the plugin.

```js
{
  "token":"YourTokenHere",
  "prefix":"!",
  "loader":"cordlr-loader",
  "plugins":[
    "cordlr-plugin-name"
  ]
}
```

## Adding plugin configurations

Plugins allow to customize values for your needs. **Plugins should always** have a list of configuration keys in their README so server owner can easily add them to their configuration file.

To add a plugin configuration add the bot-name as key and configure values inside it:

```js
{
  "token":"YourTokenHere",
  "prefix":"!",
  "loader":"cordlr-loader",
  "plugins":[
    "cordlr-plugin"
  ],
  "cordlr-plugin": {
    "strings": {
      "hello": "Hallo",
      "added": "Hinzugefügt",
      "bye": "Tschüss"
    }
  }
}
```