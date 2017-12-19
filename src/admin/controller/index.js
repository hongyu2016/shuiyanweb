const Base = require('./base.js');

module.exports = class extends Base {
    async indexAction() {
        let articleNum = await this.model('news').count(); //查询文章总数
        //this.ctx.body=articleNum;
        this.assign('articleNum',articleNum);
        return this.display();
    }
    /*
    * 定时任务
    * */
    timingAction(){
        // 如果不是定时任务调用，则拒绝
        if(!this.isCli) return this.fail(1000, 'deny');
        let geturl=this.ctx.get('http://shuiyanweb.herokuapp.com');
        console.log(geturl)
    }
};
