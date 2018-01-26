var _thinkSvgCaptcha = require('think-svg-captcha');

var _thinkSvgCaptcha2 = _interopRequireDefault(_thinkSvgCaptcha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = class extends think.Controller {
    indexAction() {
        return this.display();
    }

    /*
     * 验证码
     * */
    captchaAction() {
        const options = {
            size: 4, // size of random string
            ignoreChars: '', // filter out some characters
            noise: 1, // number of noise lines
            color: false, // default grey, true if background option is set
            background: '#ffffff', // background color of the svg image
            width: 80, // width of captcha
            height: 35, // height of captcha
            //fontPath: './fonts/Comismsh.ttf', // your font path
            fontSize: 50, // captcha text size
            charPreset: '0123456789' // random character preset
        };
        let captcha = new _thinkSvgCaptcha2.default(options);
        let c = captcha.create(); // returns an object that has the following property: {data: 'svg path data', text: 'captcha text'}
        this.success({ captcha: c }, '获取验证码成功');
    }

    /*
     * 登陆
     * */
    dologinAction() {
        var _this = this;

        return _asyncToGenerator(function* () {
            if (_this.isPost) {
                let username = _this.post('username'); //获取用户名
                let password = _this.post('password'); //获取密码
                let data = yield _this.model('admin').where({ admin_name: username, admin_pass: password }).find(); //查询数据库
                if (think.isEmpty(data)) {
                    return _this.fail(403, '账号密码错误！请重新填写'); //登陆失败
                } else {
                    _this.session('userinfo', data);
                    _this.success({ username: username }, '登陆成功');
                }
            }
        })();
    }

    /**
     * 注销
     */
    logoutAction() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            yield _this2.session(null);
            _this2.redirect('/index'); //注销成功清空session，返回到user首页。
        })();
    }
    /*
    * 修改密码
    * */
    changepwAction() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            if (_this3.isPost) {
                let user = _this3.post('user');
                let oldpsw = _this3.post('old_psw');
                let newpsw = _this3.post('new_psw');
                let confirmpsw = _this3.post('confirm_psw');
                if (!oldpsw) {
                    _this3.fail(403, '请填写原密码');
                    return false;
                }
                if (!newpsw) {
                    _this3.fail(403, '请填写新密码');
                    return false;
                }
                if (newpsw != confirmpsw) {
                    _this3.fail(403, '两次密码不相等');
                    return false;
                }
                let adminModel = _this3.model('admin');
                let userInfo = yield adminModel.where({ admin_name: user }).find();
                if (oldpsw != userInfo.admin_pass) {
                    _this3.fail(403, '原密码不正确');
                    return false;
                }

                let userChange = yield adminModel.where({ admin_name: user }).update({ admin_pass: confirmpsw });
                yield _this3.session(null);

                //this.redirect('/index');
                _this3.success({ data: userChange }, '修改密码成功');
            } else {
                _this3.fail(403, '请使用post提交');
            }
        })();
    }
};
//# sourceMappingURL=login.js.map