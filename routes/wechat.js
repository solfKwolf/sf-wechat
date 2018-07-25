var wechat = require('wechat');
var config = require('../config/config');
var superagent = require('superagent');

var robotApi = 'http://openapi.tuling123.com/openapi/api/v2';
var apiKey = "3fa236c595bb447d989329be9d52572a";

module.exports = wechat(config).text(function(message, req, res, next){
    // 微信机器人自动回复 
    var message = req.weixin;
    if(message.MsgType === 'text') {
        superagent.post(robotApi)
            .send({
                reqType:0,
                perception: {
                    inputText: {
                        text: message.Content
                    }
                },
                userInfo: {
                    apiKey: apiKey,
                    userId: message.FromUserName.substr(8)
                }
            })
            .set('Accept', 'application/json')
            .end(function(err,data) {
                var data = JSON.parse(data.text)
                res.reply(data.results[0].values.text);
            });
    }
}).middlewarify()

