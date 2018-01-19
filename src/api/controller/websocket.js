const Base = require('./base.js');
module.exports = class extends Base {
	constructor(...arg) {
		super(...arg);
	}
	async openAction() {
		let data=await this.model('notice').limit().select();
		this.emit('noticeList', data);//给当前 socket 发送事件
		this.broadcast('joined', '新的连接成功加入!');//给所有的 socket 广播事件
	}
	closeAction() {
		console.log('socket 关闭');
	}
	async getNoticeAction(){
		/*console.log('获取客户端 addUser 事件发送的数据', this.wsData);
		console.log('获取当前 WebSocket 对象', this.websocket);
		console.log('判断当前请求是否是 WebSocket 请求', this.isWebsocket);*/

		let thisVal=this.wsData;
		if(thisVal=='更改通知数据'){
			let data=await this.model('notice').limit().select();
			this.broadcast('noticeList', data);
		}

	}
};
