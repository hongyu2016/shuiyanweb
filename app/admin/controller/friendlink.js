function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Created by Administrator on 2017/11/17.
 */
const Base = require('./base');
module.exports = class extends Base {
	/*
 * 构造函数 便于使用model文件
 * */
	constructor(...args) {
		super(...args); //调用父级的 constructor 方法
		this.modelInstance = this.model('friendlink'); //增加一个方法
	}
	/*
 * 栏目列表
 * */
	indexAction() {
		var _this = this;

		return _asyncToGenerator(function* () {
			//显示页面
			let data = yield _this.modelInstance.select();
			_this.assign('data', data);
			return _this.display();
		})();
	}
	addAction() {
		var _this2 = this;

		return _asyncToGenerator(function* () {
			let id = _this2.get('friendlink-id');
			if (id) {
				let data = yield _this2.modelInstance.where({ 'friendlink_id': id }).find();
				_this2.assign('data', data);
			}

			return _this2.display();
		})();
	}
	addfriendlinkAction() {
		var _this3 = this;

		return _asyncToGenerator(function* () {
			if (_this3.isGet) {
				let reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
				let friendlink_name = _this3.get('friendlink_name');
				let friendlink_url = _this3.get('friendlink_url');
				let editId = _this3.get('editId');
				if (!friendlink_name || !friendlink_url) {
					_this3.json({
						success: true,
						errmsg: '请输入链接名称和地址',
						data: []
					});
					return false;
				}
				if (!reg.test(friendlink_url)) {
					_this3.json({
						success: true,
						errmsg: '请输入合法的链接地址',
						data: []
					});
					return false;
				}
				if (editId != '0' || editId != 0) {
					//编辑
					let friendid = yield _this3.model('friendlink').where({ 'friendlink_id': editId }).update({
						'friendlink_name': friendlink_name,
						'friendlink_url': friendlink_url
					});
					if (friendid) {
						_this3.json({
							success: true,
							errmsg: '编辑成功',
							data: friendid
						});
					} else {
						_this3.json({
							success: true,
							errmsg: '编辑失败',
							data: []
						});
					}
				} else {
					let friendid = yield _this3.model('friendlink').add({
						'friendlink_name': friendlink_name,
						'friendlink_url': friendlink_url,
						'create_time': think.datetime()
					});
					if (friendid) {
						_this3.json({
							success: true,
							errmsg: '添加成功',
							data: friendid
						});
					} else {
						_this3.json({
							success: true,
							errmsg: '添加失败',
							data: []
						});
					}
				}
			}
		})();
	}

};