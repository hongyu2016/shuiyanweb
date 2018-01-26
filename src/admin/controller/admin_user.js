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
    async addAction(){

	    return this.display();
    }


};
