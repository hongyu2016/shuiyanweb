import commonFun from "../common_function/common_function.js";//自定义类 里面有自定义函数
module.exports = class extends think.Controller {
	async __before() {
		let userinfo = await this.session('userinfo');
		if(think.isEmpty(userinfo)) {
			if(this.ctx.controller != 'login') {
				return this.redirect('/admin/login');
			}
		}else {
			let menuList = await this.model('menu').order('menu_id ASC, menu_name DESC').select(); //从数据库取出菜单
			let commonFunion = new commonFun(); //需要new一下才能用
			let newMenu = commonFunion.formatMenu(menuList);
			const shuiyanImgThumb = 'imageView2/1/w/320/h/320/interlace/1/q/75|watermark/2/text/5rC056CU5p2R/font/5qW35L2T/fontsize/500/fill/I0Y4RDdCOA==/dissolve/77/gravity/SouthEast/dx/10/dy/10';//七牛的缩略图处理
			const shuiyanImgThumb2 = 'imageView2/1/w/320/h/160/interlace/1/q/75|watermark/2/text/5rC056CU5p2R/font/5qW35L2T/fontsize/500/fill/I0Y4RDdCOA==/dissolve/77/gravity/SouthEast/dx/10/dy/10|imageslim';
			this.assign({
				'qiniuImgHost':'http://p2zln7xdx.bkt.clouddn.com/',
				'shuiyanImgThumb': shuiyanImgThumb, //缩略图1
				'shuiyanImgThumb2':shuiyanImgThumb2, //缩略图2
				'newMenu': newMenu, //赋值菜单
				'userinfo': userinfo//赋值用户登陆session
			});
		}

		//判断权限
		let myurl=this.ctx.module+'/'+this.ctx.controller+'/'+this.ctx.action;  // 当前访问的实际模块控制器方法 admin/index/index
		let role_id=await this.model('admin').where({'admin_id':userinfo.admin_id}).getField('role_id');
		let auth_rule=await this.model('role').where({'role_id':role_id[0]}).getField('auth_rule');
		let myAuth=await this.model('authority').where({'auth_id':['IN',auth_rule[0]]}).select();
		let yunxuUrl='';
		for (let i in myAuth){
			yunxuUrl+=myAuth[i].module+'/'+myAuth[i].controller+'/'+myAuth[i].action+','; //用，拼接成字符串
		}
		if(yunxuUrl.indexOf(myurl)==-1){  //没有权限
			if(this.ctx.isAjax()){  //判断是否为ajax请求
				return this.json({
					success: false,
					errmsg: '抱歉，您没有权限,请与系统管理员联系!',
					errno:1000
				});
			}else{
				return this.display("admin/error_nopermission");
			}
		}

	}
};
