function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const ThinkUeditor = require('think-ueditor');
const pagination = require('think-pagination');
const Base = require('./base.js');

module.exports = class extends Base {
    /*
     * 构造函数 便于使用model文件
     * */
    constructor(...args) {
        super(...args); //调用父级的 constructor 方法
        this.modelInstance = this.model('news'); //增加一个方法
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
            _this.assign({ 'pagination': html, 'news_list': data });

            return _this.display();
        })();
    }
    /*
    * 发布新闻显示页面
    * */
    addAction() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            let sortList = yield _this2.model('news_sort').select();
            _this2.assign('sortList', sortList);
            let newsId = _this2.get('news-id');
            if (newsId) {
                //有文章id 则是编辑页面 从news表根据id查询数据
                let newsData = yield _this2.modelInstance.where({ 'article_id': newsId }).find();
                _this2.assign('newsData', newsData);
            }
            return _this2.display();
        })();
    }
    uploadAction() {
        //百度编辑器
        const ueditor = new ThinkUeditor(this.ctx);
        this.json(ueditor.init());
    }

    /*
    * 提交新增/编辑文章
    * */
    doaddAction() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            if (_this3.isPost) {
                let editId = _this3.post('editId');
                let sort = _this3.post('sort');
                let title = _this3.post('title');
                let subTitle = _this3.post('subTitle');
                let intro = _this3.post('intro');
                let author = _this3.post('author');
                let content = _this3.post('content');
                let copyfrom = _this3.post('copyfrom');
                if (!sort || sort == '') {
                    _this3.fail(403, '文章分类不能为空');
                    return false;
                }
                if (!title || title == '') {
                    _this3.fail(403, '文章标题不能为空');
                    return false;
                }
                if (!content || content == '') {
                    _this3.fail(403, '文章内容不能为空');
                    return false;
                }
                let data = {
                    sort: sort,
                    title: title,
                    subTitle: subTitle,
                    intro: intro,
                    author: author,
                    content: content,
                    copyfrom: copyfrom
                };

                if (editId) {
                    //编辑文章
                    let artitleId = yield _this3.modelInstance.where({ 'article_id': editId }).editNews(data);
                    if (!artitleId) {
                        _this3.fail(403, '编辑文章失败');
                    } else {
                        _this3.success({ data: artitleId }, '编辑文章成功');
                    }
                } else {
                    //新增文章
                    let artitleId = yield _this3.modelInstance.addArticle(data);
                    if (!artitleId) {
                        _this3.fail(403, '添加文章失败');
                    } else {
                        _this3.success({ data: artitleId }, '添加文章成功');
                    }
                }
            }
        })();
    }
    /*
    * 删除文章
    * */
    deleteAction() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4.isGet) {
                let newsId = _this4.get('news-id');
                let dataId = yield _this4.modelInstance.where({ 'article_id': newsId }).delete();
                if (!dataId) {
                    _this4.fail(403, '删除文章失败');
                } else {
                    _this4.success({ data: dataId }, '删除文章成功');
                }
            }
        })();
    }
};