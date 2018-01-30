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
		this.modelInstance = this.model('admin'); //增加一个方法
	}
	/*
 * 栏目列表
 * */
	indexAction() {
		var _this = this;

		return _asyncToGenerator(function* () {
			//显示页面
			let data = yield _this.modelInstance.indexList();
			_this.assign('data', data);
			return _this.display();
		})();
	}
	/*
 * 增加，编辑显示页面
 * */
	addAction() {
		var _this2 = this;

		return _asyncToGenerator(function* () {
			let id = _this2.get('id');
			let role = yield _this2.model('role').select();
			_this2.assign('role', role);
			if (id) {

				let data = yield _this2.modelInstance.where({ 'admin_id': id }).join('sy_role ON sy_admin.role_id=sy_role.role_id').find();
				_this2.assign('data', data);
			}

			return _this2.display();
		})();
	}
	/*
 * 增加，编辑提交方法
 * */
	doaddAction() {
		var _this3 = this;

		return _asyncToGenerator(function* () {
			if (_this3.isPost) {
				let editId = _this3.post('editId'),
				    admin_name = _this3.post('admin_name'),
				    admin_email = _this3.post('admin_email');
				let role_id = _this3.post('role_id');
				let admin_pass = _this3.post('admin_pass');
				let parms = {
					editId: editId,
					admin_name: admin_name,
					admin_email: admin_email,
					role_id: role_id,
					admin_pass: admin_pass
				};
				if (editId != 0 || editId != '0') {
					//编辑
					let data = yield _this3.modelInstance.where({ 'admin_id': editId }).edit(parms);
					if (data) {
						_this3.json({
							success: true,
							errmsg: '编辑成功',
							data: data
						});
					} else {
						_this3.json({
							success: false,
							errmsg: '编辑失败',
							data: []
						});
					}
				} else {
					let data = yield _this3.modelInstance.addAdmin(parms);
					if (data) {
						_this3.json({
							success: true,
							errmsg: '新增成功',
							data: data
						});
					} else {
						_this3.json({
							success: false,
							errmsg: '新增失败',
							data: []
						});
					}
				}
			}
		})();
	}
	/*
 * 删除用户
 * */
	deleteAction() {
		var _this4 = this;

		return _asyncToGenerator(function* () {
			if (_this4.isGet) {
				let id = _this4.get('id');
				let data = yield _this4.modelInstance.where({ 'admin_id': id }).delete();
				if (data) {
					_this4.json({
						success: true,
						errmsg: '删除角色成功',
						data: data
					});
				} else {
					_this4.json({
						success: false,
						errmsg: '删除角色失败',
						data: []
					});
				}
			}
		})();
	}

};