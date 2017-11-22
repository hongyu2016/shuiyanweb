const ThinkUeditor=require('think-ueditor');
const pagination = require('think-pagination');
const Base = require('./base.js');

module.exports = class extends Base {
    /*
     * 构造函数 便于使用model文件
     * */
    constructor(...args) {
        super(...args);//调用父级的 constructor 方法
        this.modelInstance = this.model('news'); //增加一个方法
    }
  /*文章列表*/
  async indexAction() {
      //分页查询列表
      const data = await this.model('news').join('sy_news_sort ON sy_news.sort_id=sy_news_sort.sort_id').page(this.get('page'),2).countSelect();
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
      this.assign({'pagination':html,'news_list':data});
      return this.display();
  }
  /*
  * 发布新闻显示页面
  * */
    async addAction(){
        let sortList=await this.model('news_sort').select();
        this.assign('sortList',sortList);
        return this.display();
    }
    uploadAction(){
        const ueditor = new ThinkUeditor(this.ctx);
        this.json(ueditor.init());

    }
    async doaddAction(){
        if(this.isPost){
            let sort=this.post('sort');
            let title=this.post('title');
            let subTitle=this.post('subTitle');
            let intro=this.post('intro');
            let author=this.post('author');
            let content=this.post('content');
            let copyfrom=this.post('copyfrom');
            if(!sort || sort==''){
                this.fail(403,'文章分类不能为空');
                return false;
            }
            if(!title || title==''){
                this.fail(403,'文章标题不能为空');
                return false;
            }
            if(!content||content==''){
                this.fail(403,'文章内容不能为空');
                return false;
            }
            let data={
                sort:sort,
                title:title,
                subTitle:subTitle,
                intro:intro,
                author:author,
                content:content,
                copyfrom:copyfrom
            };
            let artitleId=await this.modelInstance.addArticle(data);
            if(!artitleId){
                this.fail(403,'添加文章失败');
            }
            else{
                this.success({data:artitleId},'添加文章成功');
            }
        }
    }
};
