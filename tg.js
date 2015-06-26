var Telegram = require('telegram-bot');
var tg = new Telegram(process.env.TG_TOKEN);
var mainModule = new Object();

var irc_tg = function (msg,tg) {
  tg.sendMessage({
    text: msg.from+" : "+msg.text+" ("+msg.to+")",
    chat_id: 1234567
  });
}
mainModule.tg = tg;
mainModule.irc_tg = irc_tg;
module.exports = mainModule;