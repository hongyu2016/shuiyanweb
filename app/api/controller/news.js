function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');

module.exports = class extends Base {
	indexAction() {
		return _asyncToGenerator(function* () {})();
	}
	newslistAction() {
		var _this = this;

		return _asyncToGenerator(function* () {
			if (_this.isGet) {
				let pageIndex = _this.get('page');
				const data = yield _this.model('news').list(pageIndex); ////  两个表的字段重复了
				if (data) {
					_this.json({
						success: true,
						errmsg: '获取文章列表成功',
						data: data
					});
				} else {
					_this.json({
						success: true,
						errmsg: '获取文章列表失败',
						data: []
					});
				}
			} else {
				_this.json({
					success: true,
					errmsg: '请使用get方法',
					data: []
				});
			}
		})();
	}
	detailAction() {
		var _this2 = this;

		return _asyncToGenerator(function* () {
			let id = _this2.get('news_id');
			if (!id) {
				_this2.json({
					success: true,
					errmsg: '文章id不能为空',
					data: []
				});
				return false;
			}
			let detail = yield _this2.model('news').where({ article_id: id }).find();
			if (detail) {
				_this2.json({
					success: true,
					errmsg: '获取文章成功',
					data: detail
				});
			} else {
				_this2.json({
					success: true,
					errmsg: '获取文章失败',
					data: []
				});
			}
		})();
	}
};
//# sourceMappingURL=news.js.map