var _common_function = require('../common_function/common_function.js');

function _asyncToGenerator(fn) {
    return function () {
        var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {
            function step(key, arg) {
                try {
                    var info = gen[key](arg);var value = info.value;
                } catch (error) {
                    reject(error);return;
                }if (info.done) {
                    resolve(value);
                } else {
                    return Promise.resolve(value).then(function (value) {
                        step("next", value);
                    }, function (err) {
                        step("throw", err);
                    });
                }
            }return step("next");
        });
    };
}

module.exports = class extends think.Controller {
    __before() {
        var _this = this;

        return _asyncToGenerator(function* () {
            let userinfo = yield _this.session('userinfo');
            if (think.isEmpty(userinfo)) {
                if (_this.ctx.controller != 'login') {
                    return _this.redirect('/admin/login/index');
                }
            } else {
                let menuList = yield _this.model('menu').order('menu_id ASC, menu_name DESC').select(); //从数据库取出菜单
                let newMenu = (0, _common_function.formatMenu)(menuList);
                _this.assign({
                    'newMenu': newMenu, //赋值菜单
                    'userinfo': userinfo //赋值用户登陆session
                });
            }
        })();
    }
};