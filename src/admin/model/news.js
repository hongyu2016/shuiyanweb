/**
 * Created by Administrator on 2017/11/21.
 */
module.exports = class extends think.Model {
    addArticle(data){
        const date=think.datetime();
        return this.add({
            sort_id:data.sort,
            title:data.title,
            sub_title:data.subTitle,
            intro:data.intro,
            content:data.content,
            author:data.author,
            copyfrom:data.copyfrom,
            create_time:date
        });
    }
};