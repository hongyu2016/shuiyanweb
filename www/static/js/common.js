/**
 * Created by Administrator on 2017/11/22.
 */
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
$(function () {
    var meneuId=GetQueryString('menu_id');
    var $sidebarMenu=$('.sidebar-menu');
    $sidebarMenu.find('li').each(function (index,ele) {
        var dataId=$(this).attr('data-id');
        if(dataId==meneuId){
            $(this).addClass('active');
            $(this).closest('.treeview').addClass('menu-open');
            $(this).closest('.treeview-menu').slideDown();
        }
    })
});