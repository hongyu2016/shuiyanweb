function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');
module.exports = class extends Base {
	indexAction() {
		var _this = this;

		return _asyncToGenerator(function* () {
			let indexData = [];
			let intro = yield _this.model('introduce').find(); //水研简介
			let news = yield _this.model('news').limit(3).order('create_time DESC').select(); //水研新闻

			news.forEach(function (c, i, a) {
				//c为当前值 i为索引 a为原数组
				a[i].create_time = think.datetime(a[i].create_time, 'YYYY-MM-DD'); //返回年月日
			});

			indexData = { intro: intro, news: news };
			if (intro && news) {
				_this.json({
					success: true,
					errmsg: '获取成功',
					data: {
						indexData: indexData
					}
				});
			} else {
				_this.json({
					success: true,
					errmsg: '获取失败',
					data: []
				});
			}
		})();
	}
	/*
 * 轮播图
 * */
	slideAction() {
		var _this2 = this;

		return _asyncToGenerator(function* () {
			let slideList = yield _this2.model('slideshow').where({ 'is_slide': '1' }).order('slide_id ASC').limit(10).select();
			if (slideList) {
				_this2.json({
					success: true,
					errmsg: '获取成功',
					data: {
						datalist: slideList
					}
				});
			} else {
				_this2.json({
					success: true,
					errmsg: '获取失败',
					data: []
				});
			}
		})();
	}
	/*
 * 公告
 * */
	noticeAction() {
		var _this3 = this;

		return _asyncToGenerator(function* () {
			let notice = yield _this3.model('notice').limit(20).order('create_time DESC').select();
			_this3.json({
				success: true,
				errmsg: '获取成功',
				data: notice
			});
		})();
	}
	/*
 * 图库
 * */
	piclistAction() {
		var _this4 = this;

		return _asyncToGenerator(function* () {
			let slideList = yield _this4.model('slideshow').where({ 'is_slide': '0' }).order('slide_id ASC').limit(12).select();
			if (slideList) {
				_this4.json({
					success: true,
					errmsg: '获取成功',
					data: {
						datalist: slideList
					}
				});
			} else {
				_this4.json({
					success: true,
					errmsg: '获取失败',
					data: []
				});
			}
		})();
	}
	/*
 * 友情链接
 * */
	friendlinkAction() {
		var _this5 = this;

		return _asyncToGenerator(function* () {
			let data = yield _this5.model('friendlink').select();
			if (data) {
				_this5.json({
					success: true,
					errmsg: '获取成功',
					data: data
				});
			} else {
				_this5.json({
					success: true,
					errmsg: '获取失败',
					data: []
				});
			}
		})();
	}
};