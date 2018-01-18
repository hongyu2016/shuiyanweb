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
        this.modelInstance = this.model('friendlink'); //增加一个方法
    }
    /*
    * 栏目列表
    * */
    async indexAction() {
        //显示页面
        let data=await this.modelInstance.select();
        this.assign('data',data);
        return this.display();
    }
    async addAction(){
    	let id=this.get('friendlink-id');
    	if(id){
		    let data=await this.modelInstance.where({'friendlink_id':id}).find();
		    this.assign('data',data);
	    }

	    return this.display();
    }
    async addfriendlinkAction(){
    	if(this.isGet){
		    let reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
		    let friendlink_name=this.get('friendlink_name');
		    let friendlink_url=this.get('friendlink_url');
		    let editId=this.get('editId');
		    if(!friendlink_name||!friendlink_url){
			    this.json({
				    success:true,
				    errmsg:'请输入链接名称和地址',
				    data:[]
			    });
			    return false;
		    }
		    if(!reg.test(friendlink_url)){
			    this.json({
				    success:true,
				    errmsg:'请输入合法的链接地址',
				    data:[]
			    });
			    return false;
		    }
		    if(editId!='0' || editId!=0){
		    	//编辑
			    let friendid=await this.model('friendlink')
			    .where({'friendlink_id':editId})
			    .update({
			    	'friendlink_name':friendlink_name,
				    'friendlink_url':friendlink_url
			    });
			    if(friendid){
				    this.json({
					    success:true,
					    errmsg:'编辑成功',
					    data:friendid
				    });
			    }else{
				    this.json({
					    success:true,
					    errmsg:'编辑失败',
					    data:[]
				    });
			    }
		    }else{
			    let friendid=await this.model('friendlink')
			    .add({
				    'friendlink_name':friendlink_name,
				    'friendlink_url':friendlink_url,
				    'create_time':think.datetime()
			    });
			    if(friendid){
				    this.json({
					    success:true,
					    errmsg:'添加成功',
					    data:friendid
				    });
			    }else{
				    this.json({
					    success:true,
					    errmsg:'添加失败',
					    data:[]
				    });
			    }
		    }

	    }

    }

};
