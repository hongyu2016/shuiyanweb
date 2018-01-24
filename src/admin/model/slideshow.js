/**
 * Created by Administrator on 2017/11/21.
 */
module.exports = class extends think.Model {
    get pk() {
        return 'slide_id';
    }
    slideList(pageIndex){
        return this
            .page(pageIndex,10)
            .order('slide_id ASC')
            .countSelect({
                'field':'slide_id,slide_title,slide_thumb,slide_img,slide_text,slide_jumpurl,is_slide'});
    }
    addSlide(data){
        const date=think.datetime();
        return this.add({
            slide_title:data.slide_title,
            slide_img:data.slide_img,
            slide_text:data.slide_text,
            slide_jumpurl:data.slide_jumpurl,
            slide_thumb:data.slide_thumb,
            slide_createtime:date,
	        is_slide:data.is_slide
        });
    }
    editSlide(data){
        const date=think.datetime();
        return this.update({
            slide_title:data.slide_title,
            slide_img:data.slide_img,
            slide_text:data.slide_text,
            slide_jumpurl:data.slide_jumpurl,
            slide_thumb:data.slide_thumb,
            slide_createtime:date,
	        is_slide:data.is_slide
        });
    }
};