function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');
module.exports = class extends Base {
	constructor(...arg) {
		super(...arg);
	}
	openAction() {
		var _this = this;

		return _asyncToGenerator(function* () {
			let data = yield _this.model('notice').limit().select();
			_this.emit('noticeList', data); //给当前 socket 发送事件
			_this.broadcast('joined', '新的连接成功加入!'); //给所有的 socket 广播事件
		})();
	}
	closeAction() {
		console.log('socket 关闭');
	}
	getNoticeAction() {
		var _this2 = this;

		return _asyncToGenerator(function* () {
			/*console.log('获取客户端 addUser 事件发送的数据', this.wsData);
   console.log('获取当前 WebSocket 对象', this.websocket);
   console.log('判断当前请求是否是 WebSocket 请求', this.isWebsocket);*/

			let thisVal = _this2.wsData;
			if (thisVal == '更改通知数据') {
				let data = yield _this2.model('notice').limit().select();
				_this2.broadcast('noticeList', data);
			}
		})();
	}
};