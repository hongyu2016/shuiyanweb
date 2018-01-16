const pagination = require('think-pagination');
const Base = require('./base.js');

module.exports = class extends Base {
	async indexAction() {
		let pageIndex=this.get('page');
		const data = await this.model('contact').list(pageIndex);   ////  两个表的字段重复了
		const page_data = pagination(data, this.ctx, {
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
		this.assign({'pagination':page_data,'data':data.data});
		return this.display();
    }
};
