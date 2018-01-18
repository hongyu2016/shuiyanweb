/**
 * Created by Administrator on 2018/1/15.
 */
const pagination = require('think-pagination');
const Base = require('./base.js');
module.exports = class extends Base {
	async indexAction(){
		let pageIndex=this.get('page');
		const data = await this.model('notice').list(pageIndex);
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
		this.assign({'pagination':page_data,'notice_list':data.data});
		return this.display();
	}
	async addAction(){
		let id=this.get('notice-id');
		if(id){//有文章id 则是编辑页面 从news表根据id查询数据
			let data=await this.model('notice').where({'notice_id':id}).find();
			this.assign('data',data);
		}
		return this.display();
	}
	/*
	* 添加
	* */
	async doaddAction(){
		if(this.isPost){
			let postData=this.post();

			if(postData.edit=='0' ||　postData.edit==0){
				let list_id=await this.model('notice').addRecord(postData);
				if(list_id){
					this.json({
						success:true,
						errmsg:'添加公告成功',
						data:{
							id:list_id
						}
					});
				}else{
					this.json({
						success:true,
						errmsg:'添加公告失败',
						data:[]
					});
				}
			}else{
				let list_id=await this.model('notice').editRecord(postData);
				if(list_id){
					this.json({
						success:true,
						errmsg:'修改公告成功',
						data:{
							id:list_id
						}
					});
				}else{
					this.json({
						success:true,
						errmsg:'修改公告失败',
						data:[]
					});
				}
			}

		}
	}
	/*
	* 删除
	* */
	async deleteAction(){
		if(this.isGet){
			let id=this.get('news-id');
			let listRecord=await this.model('notice').deleteRecord(id);
			if(listRecord){
				this.json({
					success:true,
					errmsg:'删除公告成功',
					data:{
						id:listRecord
					}
				});
			}else{
				this.json({
					success:true,
					errmsg:'删除公告失败',
					data:[]
				});
			}
		}
	}
};
