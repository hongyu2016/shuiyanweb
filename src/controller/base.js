module.exports = class extends think.Controller {
  async __before() {
    let userinfo=await this.session('userinfo');
    if(think.isEmpty(userinfo)){
        if(this.ctx.controller != 'admin'){
            return this.redirect('/admin/index');
        }
    }else {
        this.assign('userinfo',userinfo);
        let menuList=await this.model('menu').order('menu_id ASC, menu_name DESC').select(); //菜单
        //this.assign('menuList',menuList);

        let oneMenu=[];
        let subMenu=[];
        for (let i in menuList){
            if(menuList[i].parent_menu==-1 ){
                oneMenu.push(menuList[i]);
            }
            else{
                subMenu.push(menuList[i]);
            }
        }
        this.assign({
            'oneMenu':oneMenu,
            'subMenu':subMenu
        });

    }
  }

};
