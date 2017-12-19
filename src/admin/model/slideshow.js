/**
 * Created by Administrator on 2017/11/21.
 */
module.exports = class extends think.Model {
    get pk() {
        return 'slide_id';
    }
    indexList(pageIndex){
        return this
            .page(pageIndex,10)
            .order('article_id ASC')
            .countSelect({
                'field':'slide_id,slide_title,slide_img,slide_text'});
    }
    addSlide(data){
        const date=think.datetime();
        return this.add({
            slide_id:data.slide_id,
            slide_title:data.slide_title,
            slide_img:data.slide_img,
            slide_text:data.slide_text,
            slide_jumpurl:data.slide_jumpurl,
            create_time:date
        });
    }
};