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
        this.modelInstance = this.model('admin'); //增加一个方法
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
    /*
    * 增加，编辑显示页面
    * */
    async addAction(){
    	let id=this.get('id');
	    let role=await this.model('role').select();
	    this.assign('role',role);
    	if(id){

		    let data=await this.modelInstance.where({'admin_id':id}).join('sy_role ON sy_admin.role_id=sy_role.role_id').find();
		    this.assign('data',data);
	    }

	    return this.display();
    }
	/*
	* 增加，编辑提交方法
	* */
	async doaddAction(){
		if(this.isPost){
			let editId=this.post('editId'),
				admin_name=this.post('admin_name'),
				admin_email=this.post('admin_email');
			let role_id=this.post('role_id');
			let admin_pass=this.post('admin_pass');
			let parms={
				editId:editId,
				admin_name:admin_name,
				admin_email:admin_email,
				role_id:role_id,
				admin_pass:admin_pass
			};
			if(editId!=0 || editId!='0'){
				//编辑
				let data=await this.modelInstance.where({'admin_id':editId}).edit(parms);
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
				let data=await this.modelInstance.addAdmin(parms);
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
	* 分配角色列表
	* */
	async roleListAction(){
		if(this.isGet){
			let id=this.get('admin_id');
			if(!id){
				this.json({
					success:false,
					errmsg:'id不能为空',
					data:[]
				});
				return false;
			}
			let role=await this.model('role').select();
			let role_id=await this.modelInstance.where({'admin_id':id}).field('role_id').find();
			if(role && role_id){
				this.json({
					success:true,
					errmsg:'获取成功',
					data:{
						roleList:role,
						roleId:role_id.role_id
					}
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
	/*
	* 分配角色 提交
	* */
	async distributeRoleAction(){
		if(this.isGet){
			let userId=this.get('admin_id');
			let id=this.get('role_id');
			if(!userId|| !id){
				this.json({
					success:false,
					errmsg:'role_id或者admin_id不能为空',
					data:[]
				});
				return false;
			}
			let data=await this.modelInstance.where({'admin_id':userId}).update({'role_id':id});
			if(data){
				this.json({
					success:true,
					errmsg:'修改成功',
					data:data
				});
			}else{
				this.json({
					success:false,
					errmsg:'修改失败',
					data:[]
				});
			}
		}

	}
	/*
	* 删除用户
	* */
	async deleteAction(){
		if(this.isGet){
			let id=this.get('id');
			let data=await this.modelInstance.where({'admin_id':id}).delete();
			if(data){
				this.json({
					success:true,
					errmsg:'删除角色成功',
					data:data
				});
			}else{
				this.json({
					success:false,
					errmsg:'删除角色失败',
					data:[]
				});
			}
		}
	}

};
