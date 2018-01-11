const Base = require('./base.js');
module.exports = class extends Base {
    /*
     * 构造函数 便于使用model文件
     * */
    constructor(...args) {
        super(...args);//调用父级的 constructor 方法
        this.modelInstance = this.model('introduce'); //增加一个方法
    }

  /*
  * 显示
  * */
	async addAction() {
	    let data=await this.modelInstance.listintroduce();
	    this.assign('data',data);
		return this.display();
	}
	async doaddAction(){
        let introduce_simple=this.post('intro'),
	        introduce_all=this.post('content')
		let data=await this.modelInstance.listintroduce();
        if(this.isPost){
	        let pData=this.post();
            if(data){
                //原来数据库已经有数据，将进行更新操作
	            let intro_id=await this.modelInstance.editintroduce(pData);
	            if(intro_id){
		            this.json({
			            success:true,
			            errmsg:'修改成功',
			            data:[]
		            });
	            }
            }else{
                //新增操作
	            let intro_id=await this.modelInstance.addintroduce(pData);
	            if(intro_id){
		            this.json({
			            success:true,
			            errmsg:'添加成功',
			            data:[]
		            });
	            }
            }

        }
    }
};
