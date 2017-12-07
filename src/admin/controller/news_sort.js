function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Created by Administrator on 2017/11/17.
 */
const Base = require('./base');
module.exports = class extends Base {
    /*
    * 构造函数 便于使用model文件
    * */
    constructor(...args) {
        super(...args); //调用父级的 constructor 方法
        this.modelInstance = this.model('news_sort'); //增加一个方法
    }
    /*
    * 栏目列表
    * */
    indexAction() {
        var _this = this;

        return _asyncToGenerator(function* () {
            //显示添加页面
            let sortList = yield _this.model('news_sort').select();
            _this.assign('sortList', sortList);
            return _this.display();
        })();
    }
    /*
    * 更新/添加栏目
    * */
    addAction() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            //如果sort-id存在 则是编辑栏目
            let sortId = _this2.ctx.param('sort-id');
            if (sortId) {
                let editSort = yield _this2.model('news_sort').where({ sort_id: sortId }).find();
                _this2.assign('editSort', editSort);
            }
            return _this2.display();
        })();
    }
    /*
    * 添加栏目 更新栏目
    * */
    addsortAction() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            if (_this3.isGet) {
                //get请求
                let sortName = _this3.get('sort-name');
                let userInfo = yield _this3.session('userinfo');
                let userName = userInfo.admin_name;
                let insertId = yield _this3.modelInstance.addSort(sortName, userName);
                if (insertId) {
                    _this3.success({ data: insertId }, '添加成功');
                } else {
                    _this3.success('添加失败');
                }
            }
        })();
    }
    /*
    * 删除栏目
    * */
    deleteAction() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4.isGet) {
                let sortId = _this4.get('sort-id');
                let model = _this4.model('news_sort');
                let offectedRows = yield model.where({ sort_id: sortId }).delete();
                if (offectedRows) {
                    _this4.success({ data: offectedRows }, '删除成功');
                } else {
                    _this4.success('删除失败');
                }
            }
        })();
    }
};