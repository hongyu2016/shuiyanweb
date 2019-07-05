var _common_function = require('../common_function/common_function.js');

var _common_function2 = _interopRequireDefault(_common_function);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//自定义类 里面有自定义函数
module.exports = class extends think.Controller {
	__before() {
		var _this = this;

		return _asyncToGenerator(function* () {
			let userinfo = yield _this.session('userinfo');
			if (think.isEmpty(userinfo)) {
				if (_this.ctx.controller != 'login') {
					return _this.redirect('/admin/login');
				}
			} else {
				let menuList = yield _this.model('menu').order('menu_id ASC, menu_name DESC').select(); //从数据库取出菜单
				let commonFunion = new _common_function2.default(); //需要new一下才能用
				let newMenu = commonFunion.formatMenu(menuList);
				const shuiyanImgThumb = 'imageView2/1/w/320/h/320/interlace/1/q/75|watermark/2/text/5rC056CU5p2R/font/5qW35L2T/fontsize/500/fill/I0Y4RDdCOA==/dissolve/77/gravity/SouthEast/dx/10/dy/10'; //七牛的缩略图处理
				const shuiyanImgThumb2 = 'imageView2/1/w/320/h/160/interlace/1/q/75|watermark/2/text/5rC056CU5p2R/font/5qW35L2T/fontsize/500/fill/I0Y4RDdCOA==/dissolve/77/gravity/SouthEast/dx/10/dy/10|imageslim';
				_this.assign({
					'qiniuImgHost': 'http://qiniu.iyuge.cn/',
					'shuiyanImgThumb': shuiyanImgThumb, //缩略图1
					'shuiyanImgThumb2': shuiyanImgThumb2, //缩略图2
					'newMenu': newMenu, //赋值菜单
					'userinfo': userinfo //赋值用户登陆session
				});
			}

			//判断权限
			let myurl = _this.ctx.module + '/' + _this.ctx.controller + '/' + _this.ctx.action; // 当前访问的实际模块控制器方法 admin/index/index
			let role_id = yield _this.model('admin').where({ 'admin_id': userinfo.admin_id }).getField('role_id');
			let auth_rule = yield _this.model('role').where({ 'role_id': role_id[0] }).getField('auth_rule');
			let myAuth = yield _this.model('authority').where({ 'auth_id': ['IN', auth_rule[0]] }).select();
			let yunxuUrl = '';
			for (let i in myAuth) {
				yunxuUrl += myAuth[i].module + '/' + myAuth[i].controller + '/' + myAuth[i].action + ','; //用，拼接成字符串
			}
			if (yunxuUrl.indexOf(myurl) == -1) {
				//没有权限
				if (_this.ctx.isAjax()) {
					//判断是否为ajax请求
					return _this.json({
						success: false,
						errmsg: '抱歉，您没有权限,请与系统管理员联系!',
						errno: 1000,
						data: yunxuUrl
					});
				} else {
					return _this.display("admin/error_nopermission");
				}
			}
		})();
	}
};