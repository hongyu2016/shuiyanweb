module.exports = class extends think.Controller {
  async __before() {
    if(this.ctx.controller === 'admin' && this.ctx.action === 'index' || this.ctx.action ==='login'){
      //此时正在登陆页面 不验证 直接返回
        return;
    }
    let userinfo=await this.session('userinfo');

    if(!think.isEmpty(userinfo)){
      this.assign('userinfo',userinfo);
    }else {
      return this.redirect('/admin/index');
    }
  }
};
