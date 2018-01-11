function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');
module.exports = class extends Base {
	/*
  * 构造函数 便于使用model文件
  * */
	constructor(...args) {
		super(...args); //调用父级的 constructor 方法
		this.modelInstance = this.model('introduce'); //增加一个方法
	}

	/*
 * 显示
 * */
	addAction() {
		var _this = this;

		return _asyncToGenerator(function* () {
			let data = yield _this.modelInstance.listintroduce();
			_this.assign('data', data);
			return _this.display();
		})();
	}
	doaddAction() {
		var _this2 = this;

		return _asyncToGenerator(function* () {
			let introduce_simple = _this2.post('intro'),
			    introduce_all = _this2.post('content');
			let data = yield _this2.modelInstance.listintroduce();
			if (_this2.isPost) {
				let pData = _this2.post();
				if (data) {
					//原来数据库已经有数据，将进行更新操作
					let intro_id = yield _this2.modelInstance.editintroduce(pData);
					if (intro_id) {
						_this2.json({
							success: true,
							errmsg: '修改成功',
							data: []
						});
					}
				} else {
					//新增操作
					let intro_id = yield _this2.modelInstance.addintroduce(pData);
					if (intro_id) {
						_this2.json({
							success: true,
							errmsg: '添加成功',
							data: []
						});
					}
				}
			}
		})();
	}
};