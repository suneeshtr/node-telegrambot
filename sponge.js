var FB = require('facebook-node');
FB.setAccessToken(<fbtocken>);
var Bot = require('node-telegram-bot');
var bot = new Bot({
  token: <telegram tocken>
});
var request = require('request');
var http = require('https');
var fs = require('fs');

var feedUpdate = function(){
  
  FB.api('SpongySwag?fields=feed{full_picture,created_time,permalink_url}', 'get', function (res) {
    if(!res || res.error) {
      console.log(!res ? 'error occurred' : res.error);
      return;
    }else{
      console.log(res.feed.data)
      sendFeed(res,0)
    }
  });
}

var sendFeed = function (res,i){
  
  var d = new Date();
  var d2 = new Date();
  d.setMinutes(d.getMinutes()-600)
  
  var textData;
  if (res.feed.data[i].id !== undefined && d<new Date(res.feed.data[i].created_time) && new Date(res.feed.data[i].created_time)<d2){
      textData = "\n\nChannel: @SpongySwag"
      var fileToDownload=res.feed.data[i].full_picture;
      fbLink = res.feed.data[i].permalink_url;
      var stream = request(fileToDownload).pipe(fs.createWriteStream('doodle'+i+'.png'))
      stream.on('finish', function () { 
        bot.sendPhoto({
          chat_id: <chatId>,
          caption: textData,
          files: {
            photo: 'doodle'+i+'.png'
          },
          reply_markup: {
            inline_keyboard: [[
            {text:"Open FB Post",url:fbLink}]],
            hide_keyboard:true
          }
        }, function (err, msg) {
          console.log(err);
          console.log(msg);
        });
        i = i+1;
        sendFeed(res,i)
      });
  }
}


feedUpdate();
