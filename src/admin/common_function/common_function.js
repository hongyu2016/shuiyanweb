let formatMenu=function (list) {
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
};
export {formatMenu}