const Base = require('./base.js');

module.exports = class extends Base {
	async indexAction() {
		let indexData=[];
	    let intro=await this.model('introduce').find(); //水研简介
		indexData.push(intro);
		this.json({
			success:true,
			errmsg:'获取成功',
			data:{
				indexData:indexData
			}
		})
    }
    async slideAction(){
        let slideList=await this.model('slideshow')
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
};
