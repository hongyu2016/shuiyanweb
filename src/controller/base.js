module.exports = class extends think.Controller {
  async __before() {
    let userinfo=await this.session('userinfo');
    if(think.isEmpty(userinfo)){
        if(this.ctx.controller != 'admin'){
            return this.redirect('/admin/index');
        }
    }else {
        this.assign('userinfo',userinfo);
    }
  }
};
