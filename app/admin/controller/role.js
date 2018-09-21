var _common_function = require('../common_function/common_function.js');

var _common_function2 = _interopRequireDefault(_common_function);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Created by Administrator on 2017/11/17.
 */
const Base = require('./base');
//自定义类 里面有自定义函数
module.exports = class extends Base {
	/*
  * 构造函数 便于使用model文件
  * */
	constructor(...args) {
		super(...args); //调用父级的 constructor 方法
		this.modelInstance = this.model('role'); //增加一个方法
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

	addAction() {
		var _this2 = this;

		return _asyncToGenerator(function* () {
			let id = _this2.get('role-id');
			if (id) {
				let data = yield _this2.modelInstance.where({ 'role_id': id }).find();
				_this2.assign('data', data);
			}
			return _this2.display();
		})();
	}

	doaddAction() {
		var _this3 = this;

		return _asyncToGenerator(function* () {
			if (_this3.isGet) {
				let editId = _this3.get('editId'),
				    role_name = _this3.get('role_name'),
				    role_remark = _this3.get('role_remark');
				let parms = {
					editId: editId,
					role_name: role_name,
					role_remark: role_remark
				};
				if (editId != 0 || editId != '0') {
					//编辑
					let data = yield _this3.modelInstance.where({ 'role_id': editId }).edit(parms);
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
					let data = yield _this3.modelInstance.addRole(parms);
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
  * 禁用，启用
  * */
	doenableAction() {
		var _this4 = this;

		return _asyncToGenerator(function* () {
			if (_this4.isGet) {
				let id = _this4.get('id');
				let status = _this4.get('status');
				let data = yield _this4.modelInstance.where({ 'role_id': id }).update({ 'status': status });
				if (data) {
					_this4.json({
						success: true,
						errmsg: '修改状态成功',
						data: data
					});
				} else {
					_this4.json({
						success: false,
						errmsg: '修改状态失败',
						data: []
					});
				}
			}
		})();
	}

	/*
  * 删除角色
  * */
	deleteAction() {
		var _this5 = this;

		return _asyncToGenerator(function* () {
			if (_this5.isGet) {
				let id = _this5.get('id');
				let data = yield _this5.modelInstance.where({ 'role_id': id }).delete();
				if (data) {
					_this5.json({
						success: true,
						errmsg: '删除角色成功',
						data: data
					});
				} else {
					_this5.json({
						success: false,
						errmsg: '删除角色失败',
						data: []
					});
				}
			}
		})();
	}

	/*
  * 查看角色成员
  * */
	viewMemberAction() {
		var _this6 = this;

		return _asyncToGenerator(function* () {
			if (_this6.isGet) {
				let id = Number(_this6.get('id'));
				if (!id || id == '') {
					_this6.json({
						success: false,
						errmsg: 'id不能为空',
						data: []
					});
					return false;
				}
				let data = yield _this6.model('admin').where({ 'role_id': id }).select({ 'field': 'admin_name' });
				if (data) {
					_this6.json({
						success: true,
						errmsg: '获取成功',
						data: data
					});
				} else {
					_this6.json({
						success: false,
						errmsg: '获取失败',
						data: []
					});
				}
			}
		})();
	}

	/*
  * 分配角色
  * */
	distributeAuthAction() {
		var _this7 = this;

		return _asyncToGenerator(function* () {
			let commonFunion = new _common_function2.default(); //需要new一下才能用
			if (_this7.isGet) {
				let role_id = Number(_this7.get('role_id'));
				if (!role_id || !think.isNumber(role_id) || think.isNull(role_id)) {
					_this7.json({
						success: false,
						errmsg: 'id参数错误',
						data: []
					});
					return false;
				}
				let data = yield _this7.model('authority').select();
				let authData = commonFunion.formatAuthMenu(data); //返回权限列表
				let authIds = yield _this7.modelInstance.where({ 'role_id': role_id }).getField('auth_rule');
				if (data) {
					_this7.json({
						success: true,
						errmsg: '获取权限列表成功',
						data: {
							'authTree': authData,
							'authIds': authIds[0]
						}
					});
				} else {
					_this7.json({
						success: false,
						errmsg: '获取权限列表失败',
						data: []
					});
				}
			}
		})();
	}

	/*
  * 设置，修改权限
  * */
	doAuthAction() {
		var _this8 = this;

		return _asyncToGenerator(function* () {
			if (_this8.isGet) {
				let auth_id = _this8.get('auth_id');
				let role_id = _this8.get('role_id');
				if (!auth_id || !role_id) {
					_this8.json({
						success: false,
						errmsg: 'role_id或者auth_id不能为空',
						data: []
					});
					return false;
				}
				let data = yield _this8.modelInstance.where({ 'role_id': role_id }).update({ 'auth_rule': auth_id });
				if (data) {
					_this8.json({
						success: true,
						errmsg: '修改权限成功',
						data: auth_id
					});
				} else {
					_this8.json({
						success: false,
						errmsg: '修改权限成功',
						data: []
					});
				}
			}
		})();
	}

	/*
  * 通过角色id role_id返回 该角色所拥有的权限id  格式为  1,2,3,4
  * */
	/*async roleAuthAction() {
 	if(this.isGet) {
 		let role_id = Number(this.get('role_id'));
 		if(!role_id || !think.isNumber(role_id) || think.isNull(role_id)) {
 			this.json({
 				success: false,
 				errmsg: 'id参数错误',
 				data: []
 			});
 			return false;
 		}
 		let data = await this.modelInstance.where({'role_id':role_id}).getField('auth_rule');
 		if(data) {
 			this.json({
 				success: true,
 				errmsg: '获取权限列表成功',
 				data: data
 			});
 
 		}
 		else {
 			this.json({
 				success: false,
 				errmsg: '获取权限列表失败',
 				data: []
 			});
 		}
 	}
 }*/

};