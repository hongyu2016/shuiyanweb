/*
* 图片上传 上传至七牛，不在上传至本地文件夹
* 百度编辑器上传的图片目前还是只能存在本地目录，
* 轮播图和新闻的缩略图是存在七牛
* */

const pagination = require('think-pagination');
const fs = require('fs');
const path = require('path');
const helper = require('think-helper');
const Base = require('./base.js');
const Jimp = require("jimp");
const qiniu=require('qiniu');

module.exports = class extends Base {
    /*
     * 构造函数 便于使用model文件
     * */
    constructor(...args) {
        super(...args);//调用父级的 constructor 方法
        this.modelInstance = this.model('slideshow'); //增加一个方法
    }
  /*图片列表*/
  async indexAction() {
      //分页查询列表
      let pageIndex=this.get('page');
      const data = await this.modelInstance.slideList(pageIndex);   ////  两个表的字段重复了
      const page_data = pagination(data, this.ctx, {
          desc: false, //show description
          pageNum: 2,
          url: '', //page url, when not set, it will auto generated
          class: '', //pagenation extra class
          text: {
              next: '下一页',
              prev: '上一页',
              total: 'count: __COUNT__ , pages: __PAGE__'
          }
      });
      this.assign({'pagination':page_data,'slide_list':data.data});
      return this.display();
  }
  /*
  * 增加图片
  * */
    async addAction(){
        let slideId=this.get('slide-id');
        if(slideId){//有文章id 则是编辑页面 根据id查询数据
            let slideData=await this.modelInstance.where({'slide_id':slideId}).find();
            this.assign('slideData',slideData);
        }

        return this.display();
    }
    /*
    * 单图异步上传到本地文件夹（弃用）
    * */
    async uploadImgAction(){
        let file=this.ctx.file('file');//获取文件

        if(file && file.type === 'image/png' || file.type === 'image/jpeg') {
            const filepath = file.path;
            const nameArr = file.name.split('.');
            const basename = path.basename(filepath) + '.' + nameArr[nameArr.length - 1];
            const YYYYMMDD = helper.datetime(Date.now(), 'YYYYMMDD');
            const staticPath = path.resolve(think.ROOT_PATH, 'www/static');
            const uploadSlidePath=path.resolve(staticPath, 'upload');
            const uploadPath = path.resolve(uploadSlidePath, 'slideshow');
            const relativePath = path.resolve(uploadPath, YYYYMMDD);

            // 文件夹不存在则创建
            if (!fs.existsSync(uploadSlidePath)) {
                fs.mkdirSync(uploadSlidePath);
            }
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath);
            }

            if (!fs.existsSync(relativePath)) {
                fs.mkdirSync(relativePath);
            }

            fs.renameSync(filepath, path.resolve(relativePath, `${basename}`));

            let datuPath=`${think.ROOT_PATH}/www/static/upload/slideshow/${YYYYMMDD}/${basename}`;

            if(datuPath){
	            //处理缩略图
	            Jimp.read(datuPath).then(function (lenna) {
		            lenna.cover(320,320)     // resize
		            .quality(60)         // set JPEG quality
		            .autocrop()
		            .write(`${think.ROOT_PATH}/www/static/upload/slideshow/${YYYYMMDD}/${path.basename(filepath)}_thumb.${nameArr[nameArr.length - 1]}`); // save
	            }).catch(function (err) {
		            console.error(err);
	            });
            }

            this.json({
                success:true,
                errmsg:'上传成功',
                data:{
                    img_path:`/static/upload/slideshow/${YYYYMMDD}/${basename}`,
                    img_path_thumb:`/static/upload/slideshow/${YYYYMMDD}/${path.basename(filepath)}_thumb.${nameArr[nameArr.length - 1]}`,
                    title: basename,
                    original: file.name
                }
            });

        }else{
            this.json({
                success:true,
                errmsg:'上传失败',
                data:[]
            });
        }

    }
    /*
    * 上传图片到七牛服务器
    * */
    async uploadQiniuAction(){
	    let file=this.ctx.file('file');//获取文件
	    if(file && file.type === 'image/png' || file.type === 'image/jpeg'){
		    let localFile = file.path;//上传文件
		    const nameArr = file.name.split('.');
		    const YYYYMMDD = helper.datetime(Date.now(), 'YYYYMMDD');
		    const basename = 'slide_'+YYYYMMDD+'_'+path.basename(localFile) + '.' + nameArr[nameArr.length - 1]; //新名称
		    // 文件上传
		    let slideshow=think.service('slideshow', 'admin');
		    let result=await slideshow.putfileQiniu(localFile, basename);
		    if(result.msg=='success'){
		    	//上传成功

			    this.json({
				    success:true,
				    errmsg:'上传成功',
				    data:result.data
			    });
		    }else if(result.msg=='error_1'){
			    this.json({
				    success:false,
				    errmsg:'上传失败',
				    data:[]
			    });
		    }else{
			    this.json({
				    success:false,
				    errmsg:'上传失败',
				    data:result.data
			    });
		    }

	    }else {
		    this.json({
		     success:false,
		     errmsg:'上传失败',
		     data:[]
		     });
	    }

    }

    /*
    * 文字和图片路径提交 存储
    * */
    async addslideAction(){
        const isGet = this.ctx.isGet;
        const param = this.ctx.param();

        if(isGet){
            let editId=param.editId;
            let title=param.title;
            let descrition=param.descrition;
            let jumpUrl=param.jumpUrl;
            let img_path=param.img_path;
            let img_path_thumb=param.img_path_thumb;
            let is_slide=param.isslide;
	        var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
            if(!title || title==''){
                this.fail(403,'轮播图标题不能为空');
                return false;
            }
            if(!jumpUrl || jumpUrl==''){
                this.fail(403,'轮播图跳转链接不能为空');
                return false;
            }
            if(!reg.test(jumpUrl) &&jumpUrl!='#'){
	            this.fail(403,'请输入正确的轮播图跳转链接');
	            return false;
            }
            if(!img_path||img_path==''){
                this.fail(403,'请先上传图片');
                return false;
            }
            let data={
                slide_title:title,
                slide_img:img_path,
                slide_text:descrition,
                slide_jumpurl:jumpUrl,
                slide_thumb:img_path_thumb,
	            is_slide:is_slide
            };


            if(editId!=0 || editId!='0'){//编辑
                //首先先把本地已经上传的图片删掉 然后再更新数据库数据
                let slide_img=await this.modelInstance.where({'slide_id':editId}).field('slide_img').find();
                if(img_path!=slide_img.slide_img){ //如果提交过来的图片路径和数据库的不一致，则是修改了图片
                    // 检测文件是否存在
                    /*let filePath=think.ROOT_PATH+'/www'+slide_img.slide_img;  //图片的路径
                    if(fs.existsSync(filePath)) { //如果存在则删除图片
                        fs.unlinkSync(filePath);
                    }*/
                    //从先删除已经存在的图片
	                let slideshow=think.service('slideshow', 'admin');
	                let result=await slideshow.deleteQiniuImg(slide_img.slide_img);

                }

                //更新数据
                let slideId=await this.modelInstance.where({'slide_id':editId}).editSlide(data);
                let isSlide=await this.modelInstance.where({'is_slide':'1'}).field('is_slide').count(); //设置为轮播图的数量 最多只能设置5
	            if(isSlide>=5){
		            this.fail(403,'轮播图最多只能设置5个，请先取消其他已设置的轮播图');
		            return false
	            }

                if(!slideId){
                    this.fail(403,'编辑文章失败');
                }
                else{
                    this.success({data:slideId},'编辑文章成功');
                }
            }else{//新增
                let slideId=await this.modelInstance.addSlide(data);
	            let isSlide=await this.modelInstance.where({'is_slide':'1'}).field('is_slide').count(); //设置为轮播图的数量 最多只能设置5
	            if(isSlide>=5){
		            this.fail(403,'轮播图最多只能设置5个，请先取消其他已设置的轮播图');
		            return false
	            }
                if(!slideId){
                    this.fail(403,'添加轮播图失败');
                }
                else{
                    this.success({data:slideId},'添加轮播图成功');
                }
            }


        }else{
            this.fail(403,'请使用get方法');
        }
    }
    /*
    * 删除图片记录 @同时需要删除对应的已经上传的图片
    * */
    async deleteAction(){
        if(this.isGet){
            let slideId=this.ctx.param('slide-id');
            //let slide_img=await this.modelInstance.where({'slide_id':slideId}).field('slide_img,slide_thumb').find();

            //循环遍历对象
	        /*if(slide_img){
		        for (let i in slide_img) {
			        if (slide_img.hasOwnProperty(i) === true) {
				        // 检测文件是否存在 删除大图和缩略图
				        let filePath=think.ROOT_PATH+'/www'+slide_img[i];  //图片的路径
				        if(fs.existsSync(filePath)) { //如果存在则删除图片
					        fs.unlinkSync(filePath);
				        }
			        }
		        }
	        }*/
	        let slide_img=await this.modelInstance.where({'slide_id':slideId}).field('slide_img').find();
	        //去七牛删除文件
	        let slideshow=think.service('slideshow', 'admin');
	        //当删除七牛图片成功时才删除数据库记录
	        let result=await slideshow.deleteQiniuImg(slide_img.slide_img);  //只取 除域名外的部分

	        if(result.msg!='success'){
		        this.fail(403,'删除轮播图失败');
	        	return false;
	        }

            let dataId=await this.modelInstance.where({'slide_id':slideId}).delete();
            if(!dataId){
                this.fail(403,'删除轮播图失败');
            }
            else{
                this.success({data:dataId},'删除轮播图成功');
            }
        }
    }
    /*
    * 设置为轮播图
    * */
    async setslideAction(){
    	let id=this.get('slide-id');
    	let is_slide=this.get('is_slide');
    	if(is_slide=='1'){
		    let isSlide=await this.modelInstance.where({'is_slide':'1'}).field('is_slide').count(); //设置为轮播图的数量 最多只能设置5
		    if(isSlide>=5){
			    this.fail(403,'轮播图最多只能设置5个，请先取消其他已设置的轮播图');
			    return false;
		    }
	    }
    	let thisRecord=await this.modelInstance.where({'slide_id':id}).update({'is_slide':is_slide});
	    if(!thisRecord){
		    this.fail(403,'更改轮播图状态失败');
	    }
	    else{
		    this.success({data:thisRecord},'更改轮播图状态成功');
	    }
    }
    /*
    * 关闭浏览器时若没有点击提交按钮，则清除已经上传的图片
    * */
    async cleanImgAction(){
    	let imgUrl=this.get('imgUrl');
    	if(!imgUrl){
    		return false;
	    }
	    let slide_img=await this.modelInstance.where({'slide_img':imgUrl}).select();

	    if(slide_img.length<=0){ //如果数据库里找不到，则是用户还没保存此文章，那么此时用户离开了浏览器，则需要删除七牛的已经上传的文件
		    let slideshow=think.service('slideshow', 'admin');
		    let result=await slideshow.deleteQiniuImg(imgUrl);
	    }

    }

};

