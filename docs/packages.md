## Packages

Packages are typically hosted npm (and sometimes just GitHub), and they have some similarities so they can be easily found.

### Naming

There are some prefixes you can use to help your package be discovered.

 - `cordlr-*`: Cordlr plugins
 - `cordlr-loader-*`: Cordlr loaders
 - `cordlr-config-*`: Clusters of plugins

For example:
 - `cordlr-svg`: An plugin to display SVGs like other bitmap images
 - `cordlr-loader-simple`: A simplistic loader that reads `node_modules`
 - `cordlr-config-twee`: A cluster of plugins for a bot named "Twee"

### Keywords

In order to properly distinguish these packages from each other, there is 3 keywords:

 - `cordlr-plugin`
 - `cordlr-loader`
 - `cordlr-config`

Also an additional generic keyword is used:

 - `cordlr`

An example of using keywords:

```js
{
  "name": "cordlr-loader-simple",
  "keywords": [
    "cordlr",
    "cordlr-loader",
    "discord",
    // ...
  ]
}
```

### Hosting from GitHub

If you don't feel like hosting on npm, you can publish to GitHub instead, and install your plugins like so:

```
npm install jamen/cordlr-color
npm install devcord/cordlr-role
npm install seanc/cordlr-cleverbot
```
