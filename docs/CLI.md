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

 - `--start`: Start a persistent process for the bot.
 - `--stop`: Stop the persistent process.
 - `--restart`: Restart the persistent process.
 - `--version`: This package's version.
 - `--help`: Display help page.


## Installation

Install this module globally off github using npm to get the CLI:

```
$ npm install -g devcord/cordlr
```

## Manually Starting

Alternative to using `cordlr --start` to create a new persistent process, you can use `cordlr-client` instead to manually create the bot.  The persistent processes are just a wrapper over this.

The persistent process code executes `cordlr-client` internally, so they behave the same in that regard.
