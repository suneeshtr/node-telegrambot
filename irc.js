var irc = require('irc');
var events = require('events');
var eventEmitter = new events.EventEmitter;
var utils = require('./utils');

module.exports = function(){
    var self=this;
    this.eventEmitter = eventEmitter;
    this.broadcaster = function(message){
        eventEmitter.emit('ircmsg', message)
    };
    this.initialize = function(){
        self.freebot = new irc.Client('chat.freenode.net', 'nickname', {
            channels: ["#test_1","#test_2"],
            port: 8001,
            debug: true,
            secure: false,
            sasl: false
        });
        self.freebot.addListener('error', function(message) {
            console.log('error: ', message);
        });
        self.freebot.addListener('message', function(from, to, message){
            self.broadcaster({"from": from, "to": to, "text": message, "server": "freenode"});
        });
        self.freebot.addListener('action', function(from, to, text, message){
            self.broadcaster({"from": from, "to": to, "text": text, "server": "freenode", "action": true});
        });
    };
    this.receiver = function(message){
        var rec;
        if(message.text.indexOf("!") == 0){
            rec = message.text.substring(1,message.text.indexOf(" "))
            msg = message.text.substring(1,message.text.length)
        }else
        if(message.text.indexOf("#") == 0){
            rec = message.text.substring(0,message.text.indexOf(" "))
            msg = message.text.substring(message.text.indexOf(" ")+1,message.text.length)
        }else{
            rec = "#test_1"
        }
        console.log("id",rec);
        // console.log("irc receiver taking over message "+message.text)
        self.freebot.say(["freenode", rec], irc.colors.wrap("dark_red",utils.gettgname(message)) + ": " + msg);
    };
}