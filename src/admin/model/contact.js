/**
 * Created by Administrator on 2018/1/11.
 */
module.exports = class extends think.Model {
	get pk() {
		return 'contact_id';
	}
	list(pageIndex){
		return this.page(pageIndex,10).countSelect();
	}

};