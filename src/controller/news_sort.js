/**
 * Created by Administrator on 2017/11/17.
 */
const Base=require('./base');
module.exports = class extends Base {
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
        console.log('sort',sortId)
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
            let model=this.model('news_sort');
            let insertId=await model.add({sort_name:sortName,create_user:userName,create_time:think.datetime(new Date())});
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
