function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//const ThinkUeditor=require('think-ueditor');
const ThinkUeditor = require('../common_function/ueditor/index'); //引入本地的文件 方便修改配置 **百度编辑器
const pagination = require('think-pagination');
const fs = require('fs');
const path = require('path');
const helper = require('think-helper');
const Jimp = require("jimp");
//import commonFun from "../common_function/common_function.js";//自定义类 里面有自定义函数
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
            const data = yield _this.modelInstance.indexList(pageIndex);
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
    * 缩略图上传
    * */
    uploadImgAction() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            let file = _this3.ctx.file('file'); //获取文件

            if (file && file.type === 'image/png' || file.type === 'image/jpeg') {
                const filepath = file.path;
                const nameArr = file.name.split('.');
                const basename = path.basename(filepath) + '.' + nameArr[nameArr.length - 1];
                const YYYYMMDD = helper.datetime(Date.now(), 'YYYYMMDD');
                const staticPath = path.resolve(think.ROOT_PATH, 'www/static');
                const uploadSlidePath = path.resolve(staticPath, 'upload');
                const uploadPath = path.resolve(uploadSlidePath, 'news');
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

                let datuPath = `${think.ROOT_PATH}/www/static/upload/news/${YYYYMMDD}/${basename}`;

                if (datuPath) {
                    //处理缩略图
                    Jimp.read(datuPath).then(function (lenna) {
                        lenna.cover(320, 320) // resize
                        .quality(60) // set JPEG quality
                        .autocrop().write(`${think.ROOT_PATH}/www/static/upload/news/${YYYYMMDD}/${path.basename(filepath)}.${nameArr[1]}`); // 另存为图片文件，在这里 文件名和上传文件名一致，覆盖原图 只存缩略图，不需要原图
                    }).catch(function (err) {
                        console.error(err);
                    });
                }

                _this3.json({
                    success: true,
                    errmsg: '上传成功',
                    data: {
                        img_path: `/static/upload/news/${YYYYMMDD}/${basename}`,
                        img_path_thumb: `/static/upload/news/${YYYYMMDD}/${path.basename(filepath)}.${nameArr[1]}`,
                        title: basename,
                        original: file.name
                    }
                });
            } else {
                _this3.json({
                    success: true,
                    errmsg: '上传失败',
                    data: []
                });
            }
        })();
    }

    /*
    * 提交新增/编辑文章
    * */
    doaddAction() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4.isPost) {
                let editId = _this4.post('editId');
                let sort = _this4.post('sort');
                let title = _this4.post('title');
                let subTitle = _this4.post('subTitle');
                let intro = _this4.post('intro');
                let author = _this4.post('author');
                let content = _this4.post('content');
                let copyfrom = _this4.post('copyfrom');
                let thumb = _this4.post('img_path_thumb');
                if (!sort || sort == '') {
                    _this4.fail(403, '文章分类不能为空');
                    return false;
                }
                if (!title || title == '') {
                    _this4.fail(403, '文章标题不能为空');
                    return false;
                }
                if (!content || content == '') {
                    _this4.fail(403, '文章内容不能为空');
                    return false;
                }
                //取出内容中的img 标签 地址

                //let commonFunion=new commonFun(); //需要new一下才能用
                //let imgSrc=commonFunion.getSrc(content);  不需要从内容中提取图片

                let data = {
                    sort: sort,
                    title: title,
                    subTitle: subTitle,
                    intro: intro,
                    author: author,
                    content: content,
                    copyfrom: copyfrom,
                    thumb: thumb //取内容的第一张图片为缩略图
                };

                if (editId > 0) {
                    //编辑文章
                    let artitleId = yield _this4.modelInstance.where({ 'article_id': editId }).editNews(data);
                    if (!artitleId) {
                        _this4.fail(403, '编辑文章失败');
                    } else {
                        _this4.success({ data: artitleId }, '编辑文章成功');
                    }
                } else {
                    //新增文章
                    let artitleId = yield _this4.modelInstance.addArticle(data);
                    if (!artitleId) {
                        _this4.fail(403, '添加文章失败');
                    } else {
                        _this4.success({ data: artitleId }, '添加文章成功');
                    }
                }
            }
        })();
    }
    /*
    * 删除文章
    * */
    deleteAction() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            //删除文章时 需同时删除上传的图片
            if (_this5.isGet) {
                let newsId = _this5.get('news-id');
                let news_img = yield _this5.modelInstance.where({ 'article_id': newsId }).field('thumb').find();

                //循环遍历对象
                if (news_img) {
                    for (let i in news_img) {
                        if (news_img.hasOwnProperty(i) === true) {
                            // 检测文件是否存在 删除大图和缩略图
                            let filePath = think.ROOT_PATH + '/www' + news_img[i]; //图片的路径
                            if (fs.existsSync(filePath)) {
                                //如果存在则删除图片
                                fs.unlinkSync(filePath);
                            }
                        }
                    }
                }

                let dataId = yield _this5.modelInstance.where({ 'article_id': newsId }).delete();
                if (!dataId) {
                    _this5.fail(403, '删除文章失败');
                } else {
                    _this5.success({ data: dataId }, '删除文章成功');
                }
            }
        })();
    }
};