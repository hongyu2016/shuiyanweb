const Base = require('./base.js');

module.exports = class extends Base {
	async indexAction() {
		let indexData=[];
	    let intro=await this.model('introduce').find(); //水研简介
		let news=await this.model('news').limit(3).order('create_time DESC').select();//水研新闻

		indexData={intro:intro,news:news};
		this.json({
			success:true,
			errmsg:'获取成功',
			data:{
				indexData:indexData
			}
		})
    }
    /*
    * 轮播图
    * */
    async slideAction(){
        let slideList=await this.model('slideshow')
            .where({'is_slide':'1'})
            .order('slide_id ASC')
            .limit(10).select();
        this.json({
            success:true,
            errmsg:'获取成功',
            data:{
                datalist:slideList
            }
        })

    }
    /*
    * 图库
    * */
    async piclistAction(){
	    let slideList=await this.model('slideshow')
	    .where({'is_slide':'0'})
	    .order('slide_id ASC')
	    .limit(12).select();
	    this.json({
		    success:true,
		    errmsg:'获取成功',
		    data:{
			    datalist:slideList
		    }
	    })
    }
};
