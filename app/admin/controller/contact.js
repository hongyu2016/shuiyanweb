function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const pagination = require('think-pagination');
const Base = require('./base.js');

module.exports = class extends Base {
	indexAction() {
		var _this = this;

		return _asyncToGenerator(function* () {
			let pageIndex = _this.get('page');
			const data = yield _this.model('contact').list(pageIndex); ////  两个表的字段重复了
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
			_this.assign({ 'pagination': page_data, 'data': data.data });
			return _this.display();
		})();
	}
};