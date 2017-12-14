const Base = require('./base.js');
const pagination = require('think-pagination');

module.exports = class extends Base {
    /*
     * 构造函数 便于使用model文件
     * */
    constructor(...args) {
        super(...args);//调用父级的 constructor 方法
        this.modelInstance = this.model('slideshow'); //增加一个方法
    }
  /*文章列表*/
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
  * 发布新闻显示页面
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


};
