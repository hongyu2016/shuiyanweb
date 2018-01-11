/**
 * Created by Administrator on 2018/1/11.
 */
module.exports = class extends think.Model {
	get pk() {
		return 'introduce_id';
	}
	addintroduce(data) {
		const date = think.datetime();
		return this.add({
			introduce_simple: data.intro,
			introduce_all: data.content,
			create_time: date
		});
	}
	editintroduce(data) {
		const date = think.datetime();
		return this.where('1=1').update({ //  1=1 更新所有的
			introduce_simple: data.intro,
			introduce_all: data.content,
			create_time: date
		});
	}
	listintroduce() {
		return this.find();
	}
};