var express = require('express');
var router = express.Router();
var superagent = require('superagent');

/* GET users listing. */
router.get('/', function (req, res, next) {
    var code = req.query.code;
    var getOpenIdUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxb89a127f8af01dec&secret=ab8a63ce4d48c5bbfc80e5e7a8509a26&code=' + code + '&grant_type=authorization_code';
    superagent.get(getOpenIdUrl)
        .end(function (err, data) {
            console.log(data.text);
            var data = JSON.parse(data.text);
            var openid = data.openid;
            var access_token = data.access_token;
            res.json({
                openid: openid
            });
        })
});

router.post('/', function (req, res, next) {
    superagent.get('http://v.juhe.cn/exp/index?key=209123b0e025a430b587651a6dbe57c2&com='+req.body.express+'&no='+req.body.expressNumber)
        .end(function(err, data) {
            if(err) throw err;
            console.log(data);
            res.render('search', { data: data.text });
        })
    

})


module.exports = router;