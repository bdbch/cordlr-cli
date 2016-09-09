# `cordlr`

> Execute bot actions from terminal.

Allows you to execute bot actions from your terminal using the [Service API](/SERVICE.md).

```
$ cordlr <action> [...args]
```

For example:

```
$ cordlr clear 10
```

By default, this would run inside the main channel.

## Flags

Flags let you set options for the bot.

 - `--version`: This package's version.
 - `--help`: Display help page.

## Installation

Install this module globally off github using npm to get the CLI:

```
$ npm install -g devcord/cordlr
```

## Manually Starting

Instead of using `cordlr start` to create a background process, you can use `cordlr-create` to manually create the bot.

The background process code executes `cordlr-create` internally, so they behave the same in that regard.
