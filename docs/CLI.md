## cordlr

> Create the bot from command-line.

```js
$ cordlr [...options]
```

Creates a bot process with the configuration options in the foreground.  Use [`pm2`](https://npmjs.com/pm2) for background processes.

### Usage

You can create a local `.cordlrrc` file, with JSON options:
```js
{
  "token": "...",
  // ...
}
```

Or command-line options:
```js
$ cordlr --token='...'
```

Please see the [Configuring](CONFIG.md) section for more information.
