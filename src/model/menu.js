/**
 * Created by Administrator on 2017/11/17.
 */
module.exports = class extends think.Model {
    getMenu(){
        return this.select();
    }
};