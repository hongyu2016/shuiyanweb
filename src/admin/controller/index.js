const Base = require('./base.js');
const request_p=require('request-promise');  //请求
const cheerio = require('cheerio');//nodejs版本的jq
module.exports = class extends Base {
    async indexAction() {
        let articleNum = await this.model('news').count(); //查询文章总数
	    let noticeNum = await this.model('notice').count(); //查询公告总数
	    let slideshowNum = await this.model('slideshow').count(); //查询图库总数
	    let contactNum = await this.model('contact').count(); //查询联系我们总数
        this.assign('articleNum',articleNum);
	    this.assign('noticeNum',noticeNum);
	    this.assign('slideshowNum',slideshowNum);
	    this.assign('contactNum',contactNum);
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
            transform: body => cheerio.load(body,{
	            ignoreWhitespace: true
            })
        });
        let content = $('.login').html();
        console.log(content);
    }
    
};
