function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');
const pagination = require('think-pagination');
const fs = require('fs');
const path = require('path');
const helper = require('think-helper');

module.exports = class extends Base {
    /*
     * 构造函数 便于使用model文件
     * */
    constructor(...args) {
        super(...args); //调用父级的 constructor 方法
        this.modelInstance = this.model('slideshow'); //增加一个方法
    }
    /*轮播图列表*/
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
            _this.assign({ 'pagination': html, 'slide_list': data.data });

            //this.ctx.body=data.data
            return _this.display();
        })();
    }
    /*
    * 增加轮播图
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
    /*
    * 单图异步上传
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
                _this3.json({
                    success: true,
                    errmsg: '上传成功',
                    data: {
                        img_path: `/static/upload/slideshow/${YYYYMMDD}/${basename}`,
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
    * 文字和图片路径提交 存储
    * */
    addslideAction() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            const isGet = _this4.ctx.isGet;
            const param = _this4.ctx.param();

            if (isGet) {

                let editId = param.editId;
                let title = param.title;
                let descrition = param.descrition;
                let jumpUrl = param.jumpUrl;
                let img_path = param.img_path;
                if (!title || title == '') {
                    _this4.fail(403, '轮播图标题不能为空');
                    return false;
                }
                if (!jumpUrl || jumpUrl == '') {
                    _this4.fail(403, '轮播图跳转链接不能为空');
                    return false;
                }
                if (!img_path || img_path == '') {
                    _this4.fail(403, '请先上传图片');
                    return false;
                }
                let data = {
                    slide_title: title,
                    slide_img: img_path,
                    slide_text: descrition,
                    slide_jumpurl: jumpUrl
                };

                if (editId != 0) {//编辑
                    /*let artitleId=await this.modelInstance.where({'article_id':editId}).editNews(data);
                    if(!artitleId){
                        this.fail(403,'编辑文章失败');
                    }
                    else{
                        this.success({data:artitleId},'编辑文章成功');
                    }*/
                } else {
                    //新增
                    let slideId = yield _this4.modelInstance.addSlide(data);
                    if (!slideId) {
                        _this4.fail(403, '添加轮播图失败');
                    } else {
                        _this4.success({ data: slideId }, '添加轮播图成功');
                    }
                }
            } else {
                _this4.fail(403, '请使用get方法');
            }
        })();
    }

};
//# sourceMappingURL=slideshow.js.map