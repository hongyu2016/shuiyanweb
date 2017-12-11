const Base = require('./base.js');

module.exports = class extends Base {
    async indexAction() {
        let articleNum = await this.model('news').count(); //查询文章总数
        //this.ctx.body=articleNum;
        this.assign('articleNum',articleNum);
        return this.display();
    }
};
