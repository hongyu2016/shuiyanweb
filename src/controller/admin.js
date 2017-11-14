const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }
  /*
  * 登陆
  * */
  async loginAction(){
     if(this.isPost){
         let username=this.post('username'); //获取用户名
         let password=this.post('password'); //获取密码
         let data=await this.model('admin').where({admin_name:username,admin_pass:password}).find(); //查询数据库
         if(think.isEmpty(data)){
             return this.fail(403,'账号密码错误！请重新填写');//登陆失败
         }else{
             this.session('userinfo',data);
             //return this.redirect('/index/index');//登陆成功 存入session 跳转首页
             //this.success({errmsg: "登陆成功", data: {username:username}});
             this.success({username:username},'登陆成功');

         }
     }
     //return this.display();
  }
};
