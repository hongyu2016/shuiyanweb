class commonFun{
	/*
	* 菜单处理
	* */
	formatMenu(list){
		let arr = [];
		list.map(function(item, index) {
			if (item.parent_menu == -1) {
				let o = arr.find(x => {
					return x.menu_id == item.menu_id
				});
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
				});
				if(!o){
					o={
						child_menu:[item],
						menu_id:item.parent_menu
					};
					arr.push(o)
				}else{
					o.child_menu.push(item)
				}
			}

		});
		return arr;
	}
	/*
	* 权限管理 查询权限表，重新组成权限树
	* */
	formatAuthMenu(list){
		/*let arr = [];
		list.map(function(item, index) {
			if (item.parent_id == -1) {

				let o = arr.find(x => {
					return x.menu_id == item.menu_id
				});
				if (!o) {
					o = {
						children: []
					};
					arr.push(o)
				}
				Object.assign(o, item)


			}else{

				let o=arr.find(x=>{
					return x.menu_id==item.parent_id;
				});

				if(o){
					o.children.push(item)

				}


				/!*if(item.parent_id==item.menu_id){
					console.log(item)
				}*!/
			}

		});
		return arr;*/

		/*var aaa= [
			{auth_name:'wwb',menu_id:111},
			{auth_name:'aaa',menu_id:0,parent_id:"mei"},
			{auth_name:'a',menu_id:1,parent_id:"mei"},
			{auth_name:'b',menu_id:2,parent_id:1},
			{auth_name:'c',menu_id:3,parent_id:1},
			{auth_name:'d',menu_id:4,parent_id:2},
			{auth_name:'e',menu_id:5,parent_id:2}
		];*/

		function tree(ary,datalist){

			let data=datalist?datalist:(function(ary){
					let tempAry=[];
					let idList=[];
					ary.forEach(function(item){idList.push(item.menu_id)});
					function deb(menu_id,idList){
						let flag=true;
						for(let ida in idList){
							if(menu_id==idList[ida]){
								flag=false;
							}
						}
						return flag;
					}

					for(let i=0,len=ary.length;i<len;i++){
						if(ary[i].parent_id==undefined||(ary[i].parent_id!=undefined&&deb(ary[i].parent_id,idList))){
							let obj={
								auth_name:ary[i].auth_name,
								menu_id:ary[i].menu_id,
								auth_id:ary[i].auth_id,
								parent_id:ary[i].parent_id,
								open:true
							};
							tempAry.push(obj);
						}
					}
					return tempAry;
				}(ary));

			let temp=0;
			if(data.constructor==Array){
				for(let i=0,len=data.length;i<len;i++){
					for(let j=0,lenA=ary.length;j<lenA;j++){
						if(ary[j].parent_id==data[i].menu_id){
							let obj={
								auth_name:ary[j].auth_name,
								menu_id:ary[j].menu_id,
								auth_id:ary[j].auth_id,
								parent_id:ary[j].parent_id
							};
							data[i].children=data[i].children||[];
							data[i].children.push(obj);
							temp++;
						}
					}
				}
			}

			if(temp>0){
				if(data.constructor==Array){
					for(let n=0,lenB=data.length;n<lenB;n++){
						data[n].children=tree(ary,data[n].children?data[n].children:[]);
						if(data[n].children.length==0){
							//delete data[n].children;
						}
						//delete data[n].menu_id;
					}
				}
			}else{
				for(let n=0,lenB=data.length;n<lenB;n++){
					//delete data[n].menu_id;
				}

			}
			return data;

		}
		let treeData=tree(list);
		return treeData;


	}
	/*
	* 提取富文本提交内容中的src
	* */
	getSrc(content){
		let imgReg = /<img.*?(?:>|\/>)/gi; //取出内容中的img正则
		//匹配src属性
		let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;  //取出img 的src的正则
		let arr = content.match(imgReg);  //得到图片数组
		if(arr){
			let imgSrcArr=[];  //最后组装 图片的src的地址数组
			for (let i = 0; i < arr.length; i++) {
				let src = arr[i].match(srcReg);
				//获取图片地址
				if(src[1]){
					imgSrcArr.push(src[1])
				}
				//当然你也可以替换src属性
				/*if (src[0]) {
				 let t = src[0].replace(/src/i, "href");
				 }*/
			}
			return imgSrcArr;
		}else{
			return '';
		}

	}
}
module.exports =commonFun;
