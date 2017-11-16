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

        //重新组成新数组
        function format(list) {
            let arr = [];
            list.map(function(item, index) {
                if (item.parent_menu == -1) {
                    let o = arr.find(x => {
                        return x.menu_id == item.menu_id
                    })
                    if (!o) {
                        o = {
                            child_menu: []
                        }
                        arr.push(o)
                    }
                    Object.assign(o, item)

                }else{
                    let o=arr.find(x=>{
                        return x.menu_id==item.parent_menu;
                    })
                    if(!o){
                        o={
                            child_menu:[item],
                            menu_id:item.parent_menu
                        }
                        arr.push(o)
                    }else{
                        o.child_menu.push(item)
                    }
                }

            })
            return arr;
        }

       let newMenu= format(menuList);
        this.assign('newMenu',newMenu);

    }
  }

};
