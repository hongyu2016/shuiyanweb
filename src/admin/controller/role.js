/**
 * Created by Administrator on 2017/11/17.
 */
const Base=require('./base');
module.exports = class extends Base {
    /*
    * 构造函数 便于使用model文件
    * */
    constructor(...args) {
        super(...args);//调用父级的 constructor 方法
        this.modelInstance = this.model('role'); //增加一个方法
    }
    /*
    * 栏目列表
    * */
    async indexAction() {
        //显示页面
	    let data=await this.modelInstance.indexList();
	    this.assign('data',data);
        return this.display();
    }
    async addAction(){
    	let id=this.get('role-id');
    	if(id){
		    let data=await this.modelInstance.where({'role_id':id}).find();
		    this.assign('data',data);
	    }
	    return this.display();
    }
    async doaddAction(){
		if(this.isGet){
			let editId=this.get('editId'),
				role_name=this.get('role_name'),
				role_remark=this.get('role_remark');
			let parms={
				editId:editId,
				role_name:role_name,
				role_remark:role_remark
			};
			if(editId!=0 || editId!='0'){
				//编辑
				let data=await this.modelInstance.where({'role_id':editId}).edit(parms);
				if(data){
					this.json({
						success:true,
						errmsg:'编辑成功',
						data:data
					});
				}else{
					this.json({
						success:false,
						errmsg:'编辑失败',
						data:[]
					});
				}
			}else{
				let data=await this.modelInstance.addRole(parms);
				if(data){
					this.json({
						success:true,
						errmsg:'新增成功',
						data:data
					});
				}else{
					this.json({
						success:false,
						errmsg:'新增失败',
						data:[]
					});
				}
			}
		}
    }
    /*
    * 禁用，启用
    * */
    async doenableAction(){
		if(this.isGet){
			let id=this.get('id');
			let status=this.get('status')
			let data=await this.modelInstance.where({'role_id':id}).update({'status':status});
			if(data){
				this.json({
					success:true,
					errmsg:'修改状态成功',
					data:data
				});
			}else{
				this.json({
					success:false,
					errmsg:'修改状态失败',
					data:[]
				});
			}
		}
    }
    /*
    * 查看角色成员
    * */
    async viewMemberAction(){
		if(this.isGet){
			let id=Number(this.get('id'));
			if(!id||id==''){
				this.json({
					success:false,
					errmsg:'id不能为空',
					data:[]
				});
				return false;
			}
			let data=await this.model('admin').where({'role_id':id}).select({'field':'admin_name'});
			if(data){
				this.json({
					success:true,
					errmsg:'获取成功',
					data:data
				});
			}else{
				this.json({
					success:false,
					errmsg:'获取失败',
					data:[]
				});
			}
		}
    }


};
