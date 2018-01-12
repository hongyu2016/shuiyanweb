function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');

module.exports = class extends Base {
    indexAction() {
        var _this = this;

        return _asyncToGenerator(function* () {
            let indexData = [];
            let intro = yield _this.model('introduce').find(); //水研简介
            let news = yield _this.model('news').limit(3).order('create_time DESC').select(); //水研新闻
            indexData = { intro: intro, news: news };
            _this.json({
                success: true,
                errmsg: '获取成功',
                data: {
                    indexData: indexData
                }
            });
        })();
    }
    slideAction() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            let slideList = yield _this2.model('slideshow').order('slide_id ASC').limit(10).select();
            _this2.json({
                success: true,
                errmsg: '获取成功',
                data: {
                    datalist: slideList
                }
            });
        })();
    }
};
//# sourceMappingURL=index.js.map