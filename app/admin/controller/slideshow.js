function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
        super(...args); //调用父级的 constructor 方法
        this.modelInstance = this.model('slideshow'); //增加一个方法
    }
    /*轮播图列表*/
    indexAction() {
        var _this = this;

        return _asyncToGenerator(function* () {
            //分页查询列表
            let pageIndex = _this.get('page');
            const data = yield _this.modelInstance.slideList(pageIndex); ////  两个表的字段重复了
            const page_data = pagination(data, _this.ctx, {
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
            _this.assign({ 'pagination': page_data, 'slide_list': data.data });
            return _this.display();
        })();
    }
    /*
    * 增加轮播图
    * */
    addAction() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            let slideId = _this2.get('slide-id');
            if (slideId) {
                //有文章id 则是编辑页面 从news表根据id查询数据
                let slideData = yield _this2.modelInstance.where({ 'slide_id': slideId }).find();
                _this2.assign('slideData', slideData);
            }

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

                let datuPath = `${think.ROOT_PATH}/www/static/upload/slideshow/${YYYYMMDD}/${basename}`;

                //处理缩略图
                Jimp.read(datuPath).then(function (lenna) {
                    lenna.cover(320, 160) // resize
                    .quality(60) // set JPEG quality
                    .autocrop().write(`${think.ROOT_PATH}/www/static/upload/slideshow/${YYYYMMDD}/${path.basename(filepath)}_thumb.${nameArr[1]}`); // save
                }).catch(function (err) {
                    console.error(err);
                });

                _this3.json({
                    success: true,
                    errmsg: '上传成功',
                    data: {
                        img_path: `/static/upload/slideshow/${YYYYMMDD}/${basename}`,
                        img_path_thumb: `/static/upload/slideshow/${YYYYMMDD}/${path.basename(filepath)}_thumb.${nameArr[1]}`,
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
                let img_path_thumb = param.img_path_thumb;
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
                    slide_jumpurl: jumpUrl,
                    slide_thumb: img_path_thumb
                };

                if (editId != 0) {
                    //编辑
                    //首先先把本地已经上传的图片删掉 然后再更新数据库数据
                    let slide_img = yield _this4.modelInstance.where({ 'slide_id': editId }).field('slide_img').find();
                    if (img_path != slide_img.slide_img) {
                        //如果提交过来的图片路径和数据库的不一致，则是修改了图片
                        // 检测文件是否存在
                        let filePath = think.ROOT_PATH + '/www' + slide_img.slide_img; //图片的路径
                        if (fs.existsSync(filePath)) {
                            //如果存在则删除图片
                            fs.unlinkSync(filePath);
                        }
                    }

                    //更新数据
                    let slideId = yield _this4.modelInstance.where({ 'slide_id': editId }).editSlide(data);
                    if (!slideId) {
                        _this4.fail(403, '编辑文章失败');
                    } else {
                        _this4.success({ data: slideId }, '编辑文章成功');
                    }
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
    /*
    * 删除轮播图 @同时需要删除对应的已经上传的图片
    * */
    deleteAction() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            if (_this5.isGet) {
                let slideId = _this5.ctx.param('slide-id');
                let slide_img = yield _this5.modelInstance.where({ 'slide_id': slideId }).field('slide_img,slide_thumb').find();

                //循环遍历对象
                for (let i in slide_img) {
                    if (slide_img.hasOwnProperty(i) === true) {
                        // 检测文件是否存在 删除大图和缩略图
                        let filePath = think.ROOT_PATH + '/www' + slide_img[i]; //图片的路径
                        if (fs.existsSync(filePath)) {
                            //如果存在则删除图片
                            fs.unlinkSync(filePath);
                        }
                    }
                }

                let dataId = yield _this5.modelInstance.where({ 'slide_id': slideId }).delete();
                if (!dataId) {
                    _this5.fail(403, '删除轮播图失败');
                } else {
                    _this5.success({ data: dataId }, '删除轮播图成功');
                }
            }
        })();
    }

};