function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');
const pagination = require('think-pagination');

module.exports = class extends Base {
    /*
     * 构造函数 便于使用model文件
     * */
    constructor(...args) {
        super(...args); //调用父级的 constructor 方法
        this.modelInstance = this.model('slideshow'); //增加一个方法
    }
    /*文章列表*/
    indexAction() {
        var _this = this;

        return _asyncToGenerator(function* () {
            //分页查询列表
            let pageIndex = _this.get('page');
            const data = yield _this.modelInstance.indexList(pageIndex); ////  两个表的字段重复了
            const html = pagination(data, _this.ctx, {
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
            _this.assign({ 'pagination': html, 'slide_list': data });

            //this.ctx.body=data
            return _this.display();
        })();
    }
    /*
    * 发布新闻显示页面
    * */
    addAction() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            /*let sortList=await this.model('news_sort').select();
            this.assign('sortList',sortList);
            let newsId=this.get('news-id');
            if(newsId){//有文章id 则是编辑页面 从news表根据id查询数据
                let newsData=await this.modelInstance.where({'article_id':newsId}).find();
                this.assign('newsData',newsData);
            }*/
            return _this2.display();
        })();
    }

};