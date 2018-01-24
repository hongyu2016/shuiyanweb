import commonFun from "../common_function/common_function.js";//自定义类 里面有自定义函数
module.exports = class extends think.Controller {
	async __before() {
		let userinfo = await this.session('userinfo');
		if(think.isEmpty(userinfo)) {
			if(this.ctx.controller != 'login') {
				return this.redirect('/admin/login');
			}
		}
		else {
			let menuList = await this.model('menu').order('menu_id ASC, menu_name DESC').select(); //从数据库取出菜单
			let commonFunion = new commonFun(); //需要new一下才能用
			let newMenu = commonFunion.formatMenu(menuList);
			const shuiyanImgThumb = 'imageView2/1/w/320/h/320/interlace/1/q/75|watermark/2/text/5rC056CU5p2R/font/5qW35L2T/fontsize/500/fill/I0Y4RDdCOA==/dissolve/77/gravity/SouthEast/dx/10/dy/10';//七牛的缩略图处理
			const shuiyanImgThumb2 = 'imageView2/1/w/320/h/160/interlace/1/q/75|watermark/2/text/5rC056CU5p2R/font/5qW35L2T/fontsize/500/fill/I0Y4RDdCOA==/dissolve/77/gravity/SouthEast/dx/10/dy/10|imageslim';
			this.assign({
				'qiniuImgHost':'http://p2zln7xdx.bkt.clouddn.com/',
				'shuiyanImgThumb': shuiyanImgThumb,
				'shuiyanImgThumb2':shuiyanImgThumb2,
				'newMenu': newMenu, //赋值菜单
				'userinfo': userinfo//赋值用户登陆session
			});
		}
	}
};
