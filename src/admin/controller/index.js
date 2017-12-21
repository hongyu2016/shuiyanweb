const Base = require('./base.js');
const request_p=require('request-promise');  //请求
const cheerio = require('cheerio');//nodejs版本的jq
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

    async timingAction(){
        // 如果不是定时任务调用，则拒绝 #定时爬取heroku当前地址  防止30分钟后休眠
        if(!this.isCli) return this.fail(1000, 'deny');
        let $ = await request_p({
            url:'https://shuiyanweb.herokuapp.com/',
            transform: body => cheerio.load(body)
        });
        let content = $('.login').html();
        console.log(content);
    }

};
