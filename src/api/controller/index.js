const Base = require('./base.js');

module.exports = class extends Base {
	async indexAction() {
		let indexData=[];
	    let intro=await this.model('introduce').find(); //水研简介
		let news=await this.model('news').limit(3).order('create_time DESC').select();//水研新闻

		indexData={intro:intro,news:news};
		if(intro&&news){
			this.json({
				success:true,
				errmsg:'获取成功',
				data:{
					indexData:indexData
				}
			})
		}else {
			this.json({
				success:true,
				errmsg:'获取失败',
				data:[]
			})
		}

    }
    /*
    * 轮播图
    * */
    async slideAction(){
        let slideList=await this.model('slideshow')
            .where({'is_slide':'1'})
            .order('slide_id ASC')
            .limit(10).select();
        if(slideList){
	        this.json({
		        success:true,
		        errmsg:'获取成功',
		        data:{
			        datalist:slideList
		        }
	        })
        }else{
	        this.json({
		        success:true,
		        errmsg:'获取失败',
		        data:[]
	        })
        }

    }
    /*
    * 公告
    * */
    async noticeAction(){
	    let notice=await this.model('notice').limit(20).order('create_time DESC').select();
	    this.json({
		    success:true,
		    errmsg:'获取成功',
		    data:notice
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
	    if(slideList){
		    this.json({
			    success:true,
			    errmsg:'获取成功',
			    data:{
				    datalist:slideList
			    }
		    })
	    }else{
		    this.json({
			    success:true,
			    errmsg:'获取失败',
			    data:[]
		    })
	    }

    }
};
