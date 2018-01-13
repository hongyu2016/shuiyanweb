function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');

module.exports = class extends Base {
	indexAction() {
		return _asyncToGenerator(function* () {})();
	}
	detailAction() {
		var _this = this;

		return _asyncToGenerator(function* () {
			let id = _this.get('news_id');
			if (!id) {
				_this.json({
					success: true,
					errmsg: '文章id不能为空',
					data: []
				});
				return false;
			}
			let detail = yield _this.model('news').where({ article_id: id }).find();
			if (detail) {
				_this.json({
					success: true,
					errmsg: '获取文章成功',
					data: detail
				});
			} else {
				_this.json({
					success: true,
					errmsg: '获取文章失败',
					data: []
				});
			}
		})();
	}
};