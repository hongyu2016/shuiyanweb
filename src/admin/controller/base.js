import {formatMenu} from "../common_function/common_function.js";
module.exports = class extends think.Controller {
    async __before() {
      let userinfo=await this.session('userinfo');
      if(think.isEmpty(userinfo)){
          if(this.ctx.controller != 'login'){
              return this.redirect('/admin/login');
          }
      }else {
          let menuList=await this.model('menu').order('menu_id ASC, menu_name DESC').select(); //从数据库取出菜单
          let newMenu=formatMenu(menuList);
          this.assign({
              'newMenu':newMenu, //赋值菜单
              'userinfo':userinfo//赋值用户登陆session
          });
      }
  }
};
