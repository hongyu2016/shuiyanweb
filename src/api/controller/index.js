const Base = require('./base.js');

module.exports = class extends Base {
    indexAction() {
        return this.display();
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
