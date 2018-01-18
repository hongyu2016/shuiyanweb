function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Created by Administrator on 2018/1/15.
 */
const pagination = require('think-pagination');
const Base = require('./base.js');
module.exports = class extends Base {
	indexAction() {
		var _this = this;

		return _asyncToGenerator(function* () {
			let pageIndex = _this.get('page');
			const data = yield _this.model('notice').list(pageIndex);
			const page_data = pagination(data, _this.ctx, {
				desc: false, //show description
				pageNum: 2,
				url: '', //page url, when not set, it will auto generated
				class: '', //pagenation extra class
				text: {
					next: '下一页',
					prev: '上一页',
					total: 'count: __COUNT__ , pages: __PAGE__'
				}
			});
			_this.assign({ 'pagination': page_data, 'notice_list': data.data });
			return _this.display();
		})();
	}
	addAction() {
		var _this2 = this;

		return _asyncToGenerator(function* () {
			let id = _this2.get('notice-id');
			if (id) {
				//有文章id 则是编辑页面 从news表根据id查询数据
				let data = yield _this2.model('notice').where({ 'notice_id': id }).find();
				_this2.assign('data', data);
			}
			return _this2.display();
		})();
	}
	/*
 * 添加
 * */
	doaddAction() {
		var _this3 = this;

		return _asyncToGenerator(function* () {
			if (_this3.isPost) {
				let postData = _this3.post();

				if (postData.edit == '0' || postData.edit == 0) {
					let list_id = yield _this3.model('notice').addRecord(postData);
					if (list_id) {
						_this3.json({
							success: true,
							errmsg: '添加公告成功',
							data: {
								id: list_id
							}
						});
					} else {
						_this3.json({
							success: true,
							errmsg: '添加公告失败',
							data: []
						});
					}
				} else {
					let list_id = yield _this3.model('notice').editRecord(postData);
					if (list_id) {
						_this3.json({
							success: true,
							errmsg: '修改公告成功',
							data: {
								id: list_id
							}
						});
					} else {
						_this3.json({
							success: true,
							errmsg: '修改公告失败',
							data: []
						});
					}
				}
			}
		})();
	}
	/*
 * 删除
 * */
	deleteAction() {
		var _this4 = this;

		return _asyncToGenerator(function* () {
			if (_this4.isGet) {
				let id = _this4.get('news-id');
				let listRecord = yield _this4.model('notice').deleteRecord(id);
				if (listRecord) {
					_this4.json({
						success: true,
						errmsg: '删除公告成功',
						data: {
							id: listRecord
						}
					});
				} else {
					_this4.json({
						success: true,
						errmsg: '删除公告失败',
						data: []
					});
				}
			}
		})();
	}
};
//# sourceMappingURL=notice.js.map