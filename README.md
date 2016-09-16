# cordlr

[**Add the official Cordlr to your server**](https://discordapp.com/oauth2/authorize?client_id=223165778357256194&scope=bot&permissions=0x00000008)

## Requirements

Devcord requires ES2015. So the latest, suggested versions are all versions up from `6.x`

## Installation

* Install Cordlr globally via `npm install -g cordlr`
* create a new folder for your bot via `mkdir botname` and `cd botname` into it
* Run `cordlr setup` and add you Bots API Key in the prompt
* From the bot folder, now run `cordlr start` to run the bot

## Plugins

Since the bot is not doing anything by default, you have to install plugins. You can install plugins via `cordlr install xxx`
You can find all kind of plugins on [npmjs.com](https://www.npmjs.com/search?q=cordlr-).

If you want to install `cordlr-role` for example, run `cordlr install cordlr-role`
After installing the package, you can start Cordlr again and try out the plugin

## Forever
If you want to restart the server automatically, you can use [`forever`](https://www.npmjs.com/package/forever)

## Contribution

Please make sure you're in our organization. Write me a mail with your github account and I'll send you an invite.
You should always make a seperate branch per feature and send pull requests to minimum of 2 people.

more informations coming soon
