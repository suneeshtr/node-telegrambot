# Telegram Bot #
A sample telegram bot using the API telegram-bot that does everything. 
derived from https://github.com/asdofindia/node-telegrambot 

## Installation ##

```
git clone https://github.com/suneeshtr/node-telegrambot
cd node-telegrambot
npm install
```

## Running ##

* Get your bot token from [@botfather](https://telegram.me/botfather). This will be TG_TOKEN
* set the id of group or account whatever that you want to receive the messages from irc set it in tg.js
* export TG_TOKEN="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11:" && node server.js

## IRC integration ##

One of the features of the bot is its irc integration. Set the corresponding values in irc.js to log all messages from a telegram channel into an IRC channel and vice versa. Be careful not to use popular channels and get banned. 

## use !nickname for irc personal chat && #group_name for send message to joined specific group ##

## Problems ##

If you've problems, ask me in [this group](https://telegram.me/joinchat/0057c03c01c17626398ee30a57fa166a)
