/**
 * Created by Administrator on 2017/11/21.
 */
module.exports = class extends think.Model {
    get pk() {
        return 'slide_id';
    }
    indexList(pageIndex) {
        return this.page(pageIndex, 10).order('article_id ASC').countSelect({
            'field': 'slide_id,slide_title,slide_img,slide_text' });
    }
};