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
/*
* 判断是否是手机访问
* */
function isPhone(){
	var ua = navigator.userAgent;
	var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),

		isIphone =!ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),

		isAndroid = ua.match(/(Android)\s+([\d.]+)/),

		isMobile = isIphone || isAndroid;
	//判断
	if(isMobile){
		return true;
	}else{
		return false;
	}
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
    setInterval('showTime()',50);
    //修改密码
    $('.changepw').off('click').on('click',function (e) {
	    var width,height;
	    if(isPhone()){
		    width='100%';
		    height='60%'
	    }else{
		    width='600px';
		    height='50%'
	    }
        layer.open({
            type: 1,
	        title:'修改密码',
            skin: 'layui-layer-rim', //加上边框
            area: [width, height], //宽高
            btn:['确定','取消'],
            shadeClose:true,
            btnAlign: 'c',
            content: $('#change-dom'),
            success:function (index, layero) {
                
            },
            yes:function (index, layero) {
                var user=$('.welcome').attr('data-user');
                var oldPsw=$('#old-password',layero).val();
                var newPsw=$('#new-password',layero).val();
                var confirmPsw=$('#confirm-password',layero).val();
                if(!oldPsw){
                    layer.msg('请输入原密码');
                    return false;
                }
                if(!newPsw){
                    layer.msg('请输入新密码');
                    return false;
                }
                if(newPsw!=confirmPsw){
                    layer.msg('两次输入的密码不相等');
                    return false;
                }
                loading=layer.load(2);
                $.post('/login/changepw',{
                    user:user,
                    old_psw:$.md5(oldPsw),
                    new_psw:$.md5(newPsw),
                    confirm_psw:$.md5(confirmPsw),
                },function (data) {
                    if(data.errno==0){
                        layer.close(loading);
                        layer.msg(data.errmsg);
                        setTimeout(function () {
                            window.location.href='/admin/login';
                        },2000);

                    }else {
                        layer.close(loading);
                        layer.msg(data.errmsg);
                    }
                },'json');
                //layer.closeAll();
            }
        });

    });
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