/**
 * Created by Administrator on 2017/11/21.
 */
module.exports = class extends think.Model {
    addSort(sortName,userName){
        const date=think.datetime();
        return this.add({sort_name:sortName,create_user:userName,create_time:date});
    }
};