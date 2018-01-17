module.exports = class extends think.Model {
	get pk() {
		return 'article_id';
	}
	list(pageIndex) {
		return this.page(pageIndex, 10).countSelect();
	}
};