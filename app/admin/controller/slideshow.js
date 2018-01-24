function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
const qiniu = require('qiniu');

module.exports = class extends Base {
    /*
     * 构造函数 便于使用model文件
     * */
    constructor(...args) {
        super(...args); //调用父级的 constructor 方法
        this.modelInstance = this.model('slideshow'); //增加一个方法
    }
    /*图片列表*/
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
    * 增加图片
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
    * 单图异步上传到本地文件夹（弃用）
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

                if (datuPath) {
                    //处理缩略图
                    Jimp.read(datuPath).then(function (lenna) {
                        lenna.cover(320, 320) // resize
                        .quality(60) // set JPEG quality
                        .autocrop().write(`${think.ROOT_PATH}/www/static/upload/slideshow/${YYYYMMDD}/${path.basename(filepath)}_thumb.${nameArr[nameArr.length - 1]}`); // save
                    }).catch(function (err) {
                        console.error(err);
                    });
                }

                _this3.json({
                    success: true,
                    errmsg: '上传成功',
                    data: {
                        img_path: `/static/upload/slideshow/${YYYYMMDD}/${basename}`,
                        img_path_thumb: `/static/upload/slideshow/${YYYYMMDD}/${path.basename(filepath)}_thumb.${nameArr[nameArr.length - 1]}`,
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
    * 上传图片到七牛服务器
    * */
    uploadQiniuAction() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            let file = _this4.ctx.file('file'); //获取文件
            if (file && file.type === 'image/png' || file.type === 'image/jpeg') {
                let localFile = file.path; //上传文件
                const nameArr = file.name.split('.');
                const YYYYMMDD = helper.datetime(Date.now(), 'YYYYMMDD');
                const basename = 'slide_' + YYYYMMDD + '_' + path.basename(localFile) + '.' + nameArr[nameArr.length - 1]; //新名称
                // 文件上传
                let slideshow = think.service('slideshow', 'admin');
                let result = yield slideshow.putfileQiniu(localFile, basename);
                if (result.msg == 'success') {
                    //上传成功

                    _this4.json({
                        success: true,
                        errmsg: '上传成功',
                        data: result.data
                    });
                } else if (result.msg == 'error_1') {
                    _this4.json({
                        success: true,
                        errmsg: '上传失败',
                        data: []
                    });
                } else {
                    _this4.json({
                        success: true,
                        errmsg: '上传失败',
                        data: result.data
                    });
                }
            } else {
                _this4.json({
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
        var _this5 = this;

        return _asyncToGenerator(function* () {
            const isGet = _this5.ctx.isGet;
            const param = _this5.ctx.param();

            if (isGet) {
                let editId = param.editId;
                let title = param.title;
                let descrition = param.descrition;
                let jumpUrl = param.jumpUrl;
                let img_path = param.img_path;
                let img_path_thumb = param.img_path_thumb;
                let is_slide = param.isslide;
                var reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
                if (!title || title == '') {
                    _this5.fail(403, '轮播图标题不能为空');
                    return false;
                }
                if (!jumpUrl || jumpUrl == '') {
                    _this5.fail(403, '轮播图跳转链接不能为空');
                    return false;
                }
                if (!reg.test(jumpUrl) && jumpUrl != '#') {
                    _this5.fail(403, '请输入正确的轮播图跳转链接');
                    return false;
                }
                if (!img_path || img_path == '') {
                    _this5.fail(403, '请先上传图片');
                    return false;
                }
                let data = {
                    slide_title: title,
                    slide_img: img_path,
                    slide_text: descrition,
                    slide_jumpurl: jumpUrl,
                    slide_thumb: img_path_thumb,
                    is_slide: is_slide
                };

                if (editId != 0 || editId != '0') {
                    //编辑
                    //首先先把本地已经上传的图片删掉 然后再更新数据库数据
                    let slide_img = yield _this5.modelInstance.where({ 'slide_id': editId }).field('slide_img').find();
                    if (img_path != slide_img.slide_img) {
                        //如果提交过来的图片路径和数据库的不一致，则是修改了图片
                        // 检测文件是否存在
                        /*let filePath=think.ROOT_PATH+'/www'+slide_img.slide_img;  //图片的路径
                        if(fs.existsSync(filePath)) { //如果存在则删除图片
                            fs.unlinkSync(filePath);
                        }*/
                        //从先删除已经存在的图片
                        let slideshow = think.service('slideshow', 'admin');
                        let result = yield slideshow.deleteQiniuImg(slide_img.slide_img);
                    }

                    //更新数据
                    let slideId = yield _this5.modelInstance.where({ 'slide_id': editId }).editSlide(data);
                    let isSlide = yield _this5.modelInstance.where({ 'is_slide': '1' }).field('is_slide').count(); //设置为轮播图的数量 最多只能设置5
                    if (isSlide >= 5) {
                        _this5.fail(403, '轮播图最多只能设置5个，请先取消其他已设置的轮播图');
                        return false;
                    }

                    if (!slideId) {
                        _this5.fail(403, '编辑文章失败');
                    } else {
                        _this5.success({ data: slideId }, '编辑文章成功');
                    }
                } else {
                    //新增
                    let slideId = yield _this5.modelInstance.addSlide(data);
                    let isSlide = yield _this5.modelInstance.where({ 'is_slide': '1' }).field('is_slide').count(); //设置为轮播图的数量 最多只能设置5
                    if (isSlide >= 5) {
                        _this5.fail(403, '轮播图最多只能设置5个，请先取消其他已设置的轮播图');
                        return false;
                    }
                    if (!slideId) {
                        _this5.fail(403, '添加轮播图失败');
                    } else {
                        _this5.success({ data: slideId }, '添加轮播图成功');
                    }
                }
            } else {
                _this5.fail(403, '请使用get方法');
            }
        })();
    }
    /*
    * 删除图片记录 @同时需要删除对应的已经上传的图片
    * */
    deleteAction() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            if (_this6.isGet) {
                let slideId = _this6.ctx.param('slide-id');
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
                let slide_img = yield _this6.modelInstance.where({ 'slide_id': slideId }).field('slide_img').find();
                //去七牛删除文件

                let slideshow = think.service('slideshow', 'admin');

                let result = yield slideshow.deleteQiniuImg(slide_img.slide_img); //只取 除域名外的部分
                //当删除七牛图片成功时才删除数据库记录

                if (result.msg != 'success') {
                    _this6.fail(403, '删除轮播图失败');
                    return false;
                }

                let dataId = yield _this6.modelInstance.where({ 'slide_id': slideId }).delete();
                if (!dataId) {
                    _this6.fail(403, '删除轮播图失败');
                } else {
                    _this6.success({ data: dataId }, '删除轮播图成功');
                }
            }
        })();
    }
    /*
    * 设置为轮播图
    * */
    setslideAction() {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            let id = _this7.get('slide-id');
            let is_slide = _this7.get('is_slide');
            if (is_slide == '1') {
                let isSlide = yield _this7.modelInstance.where({ 'is_slide': '1' }).field('is_slide').count(); //设置为轮播图的数量 最多只能设置5
                if (isSlide >= 5) {
                    _this7.fail(403, '轮播图最多只能设置5个，请先取消其他已设置的轮播图');
                    return false;
                }
            }
            let thisRecord = yield _this7.modelInstance.where({ 'slide_id': id }).update({ 'is_slide': is_slide });
            if (!thisRecord) {
                _this7.fail(403, '更改轮播图状态失败');
            } else {
                _this7.success({ data: thisRecord }, '更改轮播图状态成功');
            }
        })();
    }
    /*
    * 关闭浏览器时若没有点击提交按钮，则清除已经上传的图片
    * */
    cleanImgAction() {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            let imgUrl = _this8.get('imgUrl');
            if (!imgUrl) {
                return false;
            }
            let slide_img = yield _this8.modelInstance.where({ 'slide_img': imgUrl }).select();

            if (slide_img.length <= 0) {
                //如果数据库里找不到，则是用户还没保存此文章，那么此时用户离开了浏览器，则需要删除七牛的已经上传的文件
                let slideshow = think.service('slideshow', 'admin');
                let result = yield slideshow.deleteQiniuImg(imgUrl);
            }
        })();
    }

};