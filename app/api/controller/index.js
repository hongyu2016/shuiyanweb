function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');

module.exports = class extends Base {
    indexAction() {
        return this.display();
    }
    slideAction() {
        var _this = this;

        return _asyncToGenerator(function* () {
            let slideList = yield _this.model('slideshow').order('slide_id ASC').limit(10).select();
            _this.json({
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