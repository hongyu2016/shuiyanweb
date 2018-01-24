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
					'qiniuImgHost': 'http://p2zln7xdx.bkt.clouddn.com/',
					'shuiyanImgThumb': shuiyanImgThumb,
					'shuiyanImgThumb2': shuiyanImgThumb2,
					'newMenu': newMenu, //赋值菜单
					'userinfo': userinfo //赋值用户登陆session
				});
			}
		})();
	}
};