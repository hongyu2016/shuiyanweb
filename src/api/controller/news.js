const Base = require('./base.js');

module.exports = class extends Base {
	async indexAction() {

    }
    async detailAction(){
		let id=this.get('news_id');
		if(!id){
			this.json({
				success:true,
				errmsg:'文章id不能为空',
				data:[]
			});
			return false;
		}
        let detail=await this.model('news')
            .where({article_id:id}).find();
        if(detail){
	        this.json({
		        success:true,
		        errmsg:'获取文章成功',
		        data:detail
	        })
        }else{
	        this.json({
		        success:true,
		        errmsg:'获取文章失败',
		        data:[]
	        })
        }


    }
};
