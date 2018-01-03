function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');
const request_p = require('request-promise'); //请求
const cheerio = require('cheerio'); //nodejs版本的jq
module.exports = class extends Base {
    indexAction() {
        var _this = this;

        return _asyncToGenerator(function* () {
            let articleNum = yield _this.model('news').count(); //查询文章总数
            //this.ctx.body=articleNum;
            _this.assign('articleNum', articleNum);
            return _this.display();
        })();
    }
    /*
    * 定时任务
    * */

    timingAction() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            // 如果不是定时任务调用，则拒绝 #定时爬取heroku当前地址  防止30分钟后休眠
            if (!_this2.isCli) return _this2.fail(1000, 'deny');
            let $ = yield request_p({
                url: 'https://shuiyanweb.herokuapp.com/',
                transform: function (body) {
                    return cheerio.load(body, {
                        ignoreWhitespace: true
                    });
                }
            });
            let content = $('.login').html();
            console.log(content);
        })();
    }

};