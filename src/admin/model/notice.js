/**
 * Created by Administrator on 2018/1/11.
 */
module.exports = class extends think.Model {
	get pk() {
		return 'notice_id';
	}
	list(pageIndex){
		return this.page(pageIndex,10).countSelect();
	}
	addRecord(data){
		const date=think.datetime();
		return this.add({
			notice_title:data.title,
			notice_content:data.content,
			notice_author:data.author,
			create_time:date
		});
	}
	editRecord(data){
		const date=think.datetime();
		return this.where({'notice_id':data.edit}).update({
			notice_title:data.title,
			notice_content:data.content,
			notice_author:data.author,
			create_time:date
		});
	}
	deleteRecord(id){
		return this.where({'notice_id':id}).delete();
	}

};