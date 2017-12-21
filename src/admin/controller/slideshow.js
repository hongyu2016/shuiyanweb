const pagination = require('think-pagination');
const fs = require('fs');
const path = require('path');
const helper = require('think-helper');
const Base = require('./base.js');
const Jimp = require("jimp");
module.exports = class extends Base {
    /*
     * 构造函数 便于使用model文件
     * */
    constructor(...args) {
        super(...args);//调用父级的 constructor 方法
        this.modelInstance = this.model('slideshow'); //增加一个方法
    }
  /*轮播图列表*/
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
  * 增加轮播图
  * */
    async addAction(){
        let slideId=this.get('slide-id');
        if(slideId){//有文章id 则是编辑页面 从news表根据id查询数据
            let slideData=await this.modelInstance.where({'slide_id':slideId}).find();
            this.assign('slideData',slideData);
        }

        return this.display();
    }
    /*
    * 单图异步上传
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
            //处理缩略图
            Jimp.read(datuPath).then(function (lenna) {
                lenna.cover(256,256)     // resize
                    .quality(60)                 // set JPEG quality
                    //.crop(0,0,256,256)
                    .autocrop()
                    .write(`${think.ROOT_PATH}/www/static/upload/slideshow/${YYYYMMDD}/${basename}_thumb.jpg`); // save
            }).catch(function (err) {
                console.error(err);
            });

            this.json({
                success:true,
                errmsg:'上传成功',
                data:{
                    img_path:`/static/upload/slideshow/${YYYYMMDD}/${basename}`,
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
            if(!title || title==''){
                this.fail(403,'轮播图标题不能为空');
                return false;
            }
            if(!jumpUrl || jumpUrl==''){
                this.fail(403,'轮播图跳转链接不能为空');
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
                slide_jumpurl:jumpUrl
            };


            if(editId!=0){//编辑
                //首先先把本地已经上传的图片删掉 然后再更新数据库数据
                let slide_img=await this.modelInstance.where({'slide_id':editId}).field('slide_img').find();
                if(img_path!=slide_img.slide_img){ //如果提交过来的图片路径和数据库的不一致，则是修改了图片
                    // 检测文件是否存在
                    let filePath=think.ROOT_PATH+'/www'+slide_img.slide_img;  //图片的路径
                    if(fs.existsSync(filePath)) { //如果存在则删除图片
                        fs.unlinkSync(filePath);
                    }
                }

                //更新数据
                let slideId=await this.modelInstance.where({'slide_id':editId}).editSlide(data);
                if(!slideId){
                    this.fail(403,'编辑文章失败');
                }
                else{
                    this.success({data:slideId},'编辑文章成功');
                }
            }else{//新增
                let slideId=await this.modelInstance.addSlide(data);
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
    * 删除轮播图 @同时需要删除对应的已经上传的图片
    * */
    async deleteAction(){
        if(this.isGet){
            let slideId=this.ctx.param('slide-id');
            let slide_img=await this.modelInstance.where({'slide_id':slideId}).field('slide_img').find();

            // 检测文件是否存在
            let filePath=think.ROOT_PATH+'/www'+slide_img.slide_img;  //图片的路径
            if(fs.existsSync(filePath)) { //如果存在则删除图片
                fs.unlinkSync(filePath);
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

};
