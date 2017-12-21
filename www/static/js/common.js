/**
 * Created by Administrator on 2017/11/22.
 */
var loading;  //加载中

function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
/*
* 时间正计时
* */
function showTime() {
    var nowTime=new Date(); //new当前时间
    var year=nowTime.getFullYear();//完整年份
    var month=nowTime.getMonth()+1; //月份
    var day=nowTime.getDate();  //日
    var hour=nowTime.getHours();//时
    var min=nowTime.getMinutes()+1;//分钟
    var second=nowTime.getSeconds()+1;//秒
    hour=hour<9?'0'+hour:hour;
    min=min<9?'0'+min:min;
    second=second<9?'0'+second:second;
    var fullTime=year+'年'+month+'月'+day+'日 '+hour+':'+min+':'+second
    $('#show-time').html(fullTime);
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
    });
    //时间正计时
    setInterval('showTime()',50)
    // 设置jQuery Ajax全局的参数
    $.ajaxSetup({
        error: function(jqXHR, textStatus, errorThrown){
            switch (jqXHR.status){
                case(500):
                    layer.msg("服务器错误");
                    layer.close(loading);
                    break;
                case(408):
                    layer.msg("请求超时");
                    layer.close(loading);
                    break;
                default:
                    layer.msg("未知错误");
                    layer.close(loading);
            }
        },
        success: function(data){
            //layer.msg("操作成功");
            layer.close(loading);
        }
    });
});