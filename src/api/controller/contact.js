const Base = require('./base.js');

module.exports = class extends Base {
	async indexAction() {

    }
    async addAction(){
		if(this.isPost){
			let email=this.post('email');
			let name=this.post('name');
			let content=this.post('content');
			let emailReg=/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
			if(!email || !name || !content){
				this.json({
					success:true,
					errmsg:'邮箱地址或姓名或内容都不能为空',
					data:[]
				});
				return false;
			}
			if(!emailReg.test(email)){
				this.json({
					success:true,
					errmsg:'请输入合法的邮箱地址',
					data:[]
				});
				return false;
			}
			if(name.length>10||content.length>230){
				this.json({
					success:true,
					errmsg:'姓名或者内容超过了长度',
					data:[]
				});
				return false;
			}
			let contact_id=await this.model('contact')
			.add({
				'contact_email':email,
				'contact_name':name,
				'contact_content':content,
				'create_time':think.datetime()
			});
			if(contact_id){
				this.json({
					success:true,
					errmsg:'提交成功',
					data:contact_id
				});
			}else{
				this.json({
					success:true,
					errmsg:'提交失败',
					data:[]
				});
			}
		}else{
			this.json({
				success:true,
				errmsg:'请使用post方式提交',
				data:[]
			});
		}

    }
};
