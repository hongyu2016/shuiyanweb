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
		if(this.isGet){
			let editId=this.get('editId'),
				admin_name=this.get('admin_name'),
				admin_email=this.get('admin_email');
			let role_id=this.get('role_id');
			let parms={
				editId:editId,
				admin_name:admin_name,
				admin_email:admin_email,
				role_id:role_id
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

};
