var getRawBody = require('raw-body');
var IRC = require('./irc');
var TG = require('./tg');
var events = require('events');
var tg = TG.tg


var TelegramBot = function() {

    //  Scope.
    var self = this;

    self.initializeIRC = function() {
        self.ircbot = new IRC();
        self.ircbot.initialize();
    };
    self.initializeCBs = function(){
        tg.on('message', function(msg) {
          if (!msg.text) return;
          self.ircbot.receiver(msg);
        });
      self.ircemitter = self.ircbot.eventEmitter;
      self.ircemitter.on('ircmsg', function(message){
          TG.irc_tg(message,tg)
      });
    };

    self.initialize = function() {
        self.initializeIRC();
        self.initializeCBs();
    };

}
tg.start();
var telegrambot = new TelegramBot();
telegrambot.initialize();

