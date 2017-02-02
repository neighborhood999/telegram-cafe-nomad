# Telegram Cafe Nomad

[![Build Status](https://img.shields.io/travis/neighborhood999/telegram-cafe-nomad.svg?style=flat-square)](https://travis-ci.org/neighborhood999/telegram-cafe-nomad)
[![codecov](https://img.shields.io/codecov/c/github/neighborhood999/telegram-cafe-nomad.svg?style=flat-square)](https://codecov.io/gh/neighborhood999/telegram-cafe-nomad)
[![Dependency Status](https://david-dm.org/neighborhood999/telegram-cafe-nomad.svg?style=flat-square)](https://david-dm.org/neighborhood999/telegram-cafe-nomad)

This is telegram bot for helping you find cafe store, thanks [howtomakeaturn](https://github.com/howtomakeaturn) provide API.

## Usage

**First, You need have telegram account!**  

Send `/newbot` command for [@BotFather](https://telegram.me/BotFather) to create new Bot after you will get bot token.  

Setting your **token** into `config.js` and run `yarn install` for installation dependencies.   

After install, you can run `yarn start` for boot up Telegram Bot.

```sh
$ yarn install
$ yarn start
```

## Command

- `/start` - Start telegram bot.
- `/help` - List all command what you can use.
- `/list` - List all city.
- `/where cityName` - You will get random five cafe stores information in that city.
- `/location` - Getting your position and check your city whether in API list, based on your location use Google Maps API calculate close to you cafe store.

## Screenshot

![Cafe Nomad](./screenshot/cafe-nomad.png)

## Test

```sh
$ yarn test
```

## Cafe Nomad API

[Cafe Nomad Developer](https://cafenomad.tw/developers/docs/v1.0)

## Related

- [Telegram Bot 開發起手式](Telegram Bot 開發起手式)
- [Telegram Weather Bot (Nodejs)](https://github.com/neighborhood999/telegram-weather-bot)
- [Telegram Weather Bot (Go)](https://github.com/neighborhood999/go-telegram-weather-bot)
- [使用 Promise.all() 解決多次的 API Callback](https://medium.com/@bivinity/%E4%BD%BF%E7%94%A8-promise-all-%E8%A7%A3%E6%B1%BA%E5%A4%9A%E6%AC%A1%E7%9A%84-api-callback-b4feb817ad76#.yx61mh65l)

## LICENSE

MIT © [Peng Jie](https://github.com/neighborhood999)
