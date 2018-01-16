function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');

module.exports = class extends Base {
	indexAction() {
		return _asyncToGenerator(function* () {})();
	}
	addAction() {
		var _this = this;

		return _asyncToGenerator(function* () {
			if (_this.isPost) {
				let email = _this.post('email');
				let name = _this.post('name');
				let content = _this.post('content');
				let emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
				if (!email || !name || !content) {
					_this.json({
						success: true,
						errmsg: '邮箱地址或姓名或内容都不能为空',
						data: []
					});
					return false;
				}
				if (!emailReg.test(email)) {
					_this.json({
						success: true,
						errmsg: '请输入合法的邮箱地址',
						data: []
					});
					return false;
				}
				if (name.length > 10 || content.length > 230) {
					_this.json({
						success: true,
						errmsg: '姓名或者内容超过了长度',
						data: []
					});
					return false;
				}
				let contact_id = yield _this.model('contact').add({
					'contact_email': email,
					'contact_name': name,
					'contact_content': content,
					'create_time': think.datetime()
				});
				if (contact_id) {
					_this.json({
						success: true,
						errmsg: '提交成功',
						data: contact_id
					});
				} else {
					_this.json({
						success: true,
						errmsg: '提交失败',
						data: []
					});
				}
			} else {
				_this.json({
					success: true,
					errmsg: '请使用post方式提交',
					data: []
				});
			}
		})();
	}
};