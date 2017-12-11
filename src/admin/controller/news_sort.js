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
        this.modelInstance = this.model('news_sort'); //增加一个方法
    }
    /*
    * 栏目列表
    * */
    async indexAction() {
        //显示添加页面
        let sortList=await this.model('news_sort').select();
        this.assign('sortList',sortList);
        return this.display();
    }
    /*
    * 更新/添加栏目
    * */
    async addAction(){
        //如果sort-id存在 则是编辑栏目
        let sortId=this.ctx.param('sort-id');
        if(sortId){
            let editSort=await this.model('news_sort').where({sort_id:sortId}).find();
            this.assign('editSort',editSort);
        }
        return this.display();
    }
    /*
    * 添加栏目 更新栏目
    * */
    async addsortAction(){
        if(this.isGet){
            //get请求
            let sortName=this.get('sort-name');
            let userInfo=await this.session('userinfo');
            let userName=userInfo.admin_name;
            let insertId=await this.modelInstance.addSort(sortName,userName);
            if(insertId){
                this.success({data:insertId},'添加成功');
            }else {
                this.success('添加失败');
            }
        }
    }
    /*
    * 删除栏目
    * */
    async deleteAction(){
        if(this.isGet){
            let sortId=this.get('sort-id');
            let model=this.model('news_sort');
            let offectedRows = await model.where({sort_id:sortId}).delete();
            if(offectedRows){
                this.success({data:offectedRows},'删除成功')
            }else{
                this.success('删除失败')
            }

        }
    }
};
