/**
 * Created by Administrator on 2017/11/20.
 */
module.exports = class extends think.Model {
    async getSort(){
        let sortList=await this.select();
        return sortList;
    }
};
