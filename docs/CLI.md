# `cordlr`

> Execute bot actions from terminal.

Allows you to execute bot actions from your terminal using the [Service API](/SERVICE.md).

```
$ cordlr <action> [...args]
```

By default, this would run inside the main channel.

## Installation

Install this module globally off github using npm to get the CLI:

```
$ npm install -g devcord/cordlr
```

## Configuring

Create a `.cordlrrc` file where you are going to run it, and supply some options:

 - `token`: The Token ID of the bot, so it can be logged in.
 - `prefix`: The command prefix inside chat (Defaults to `$`).
 - `actions`: Where your action files are located (Defaults to `cordlr/lib/actions`).

Example:
```json
{
  "token": "...",
  "prefix": "-",
  "actions": "./my-custom-actions"
}
```

Alternatively you can use `cordlr-client` and supply command-line options:

```sh
$ cordlr-client --token=... --prefix="%"
```

## Manually Starting

Alternative to using `cordlr --start` to create a new persistent process, you can use `cordlr-client` instead to manually create the bot.  The persistent processes are just a wrapper over this.

The persistent process code executes `cordlr-client` internally, so they behave the same in that regard.
