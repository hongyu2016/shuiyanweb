class commonFun {
	/*
 * 菜单处理
 * */
	formatMenu(list) {
		let arr = [];
		list.map(function (item, index) {
			if (item.parent_menu == -1) {
				let o = arr.find(x => {
					return x.menu_id == item.menu_id;
				});
				if (!o) {
					o = {
						child_menu: []
					};
					arr.push(o);
				}
				Object.assign(o, item);
			} else {
				let o = arr.find(x => {
					return x.menu_id == item.parent_menu;
				});
				if (!o) {
					o = {
						child_menu: [item],
						menu_id: item.parent_menu
					};
					arr.push(o);
				} else {
					o.child_menu.push(item);
				}
			}
		});
		return arr;
	}
	/*
 * 提取富文本提交内容中的src
 * */
	getSrc(content) {
		let imgReg = /<img.*?(?:>|\/>)/gi; //取出内容中的img正则
		//匹配src属性
		let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i; //取出img 的src的正则
		let arr = content.match(imgReg); //得到图片数组
		if (arr) {
			let imgSrcArr = []; //最后组装 图片的src的地址数组
			for (let i = 0; i < arr.length; i++) {
				let src = arr[i].match(srcReg);
				//获取图片地址
				if (src[1]) {
					imgSrcArr.push(src[1]);
				}
				//当然你也可以替换src属性
				/*if (src[0]) {
     let t = src[0].replace(/src/i, "href");
     }*/
			}
			return imgSrcArr;
		} else {
			return '';
		}
	}
}
module.exports = commonFun;