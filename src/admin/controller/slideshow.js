const Base = require('./base.js');
const pagination = require('think-pagination');
const fs = require('fs');
const path = require('path');
const rename = think.promisify(fs.rename, fs); // 通过 promisify 方法把 rename 方法包装成 Promise 接口

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
      const data = await this.modelInstance.indexList(pageIndex);   ////  两个表的字段重复了
      const html = pagination(data, this.ctx, {
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
      this.assign({'pagination':html,'slide_list':data});

      //this.ctx.body=data
      return this.display();
  }
  /*
  * 增加轮播图
  * */
    async addAction(){
        /*let sortList=await this.model('news_sort').select();
        this.assign('sortList',sortList);
        let newsId=this.get('news-id');
        if(newsId){//有文章id 则是编辑页面 从news表根据id查询数据
            let newsData=await this.modelInstance.where({'article_id':newsId}).find();
            this.assign('newsData',newsData);
        }*/

        return this.display();
    }
    /*
    * 单图异步上传
    * */
    async uploadImgAction(){
        let file=this.ctx.file('slide-upload');//获取文件
        let date=new Date();
        let newdate=date.getTime();

        console.log(file.type)

        if(file && file.type === 'image/png' || file.type === 'image/jpeg') {

            let filepath = path.join(think.ROOT_PATH, 'www/static/upload/'+newdate+'.jpg');
            think.mkdir(path.dirname(filepath));

            await rename(file.path, filepath);

            this.json({
                success:1,
                errmsg:'上传成功',
                data:{
                    img_path:filepath
                }
            });

        }else{
            this.json({success:0,errmsg:'上传失败'});
        }

        //this.json({success:1,errmsg:'上传成功'});
    }
    /*
    * 文字和图片路径提交 存储
    * */
    async addslideAction(){
        if(this.isGet){
            let editId=this.get('editId');
            let title=this.get('title');
            let descrition=this.get('descrition');
            let jumpUrl=this.get('jumpUrl');
            let img_path=this.get('img_path');
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

            if(editId){//编辑
                /*let artitleId=await this.modelInstance.where({'article_id':editId}).editNews(data);
                if(!artitleId){
                    this.fail(403,'编辑文章失败');
                }
                else{
                    this.success({data:artitleId},'编辑文章成功');
                }*/
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

};
