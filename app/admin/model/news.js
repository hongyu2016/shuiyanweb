/**
 * Created by Administrator on 2017/11/21.
 */
module.exports = class extends think.Model {
    get pk() {
        return 'article_id';
    }
    indexList(pageIndex) {
        return this.join('sy_news_sort ON sy_news.sort_id=sy_news_sort.sort_id').page(pageIndex, 10).order('news_create_time DESC').countSelect({
            'field': 'article_id,sort_name,thumb,update_time,intro,author,copyfrom,hits,title,sy_news_sort.create_time as sort_create_time,sy_news.create_time as news_create_time' });
    }
    addArticle(data) {
        const date = think.datetime();
        return this.add({
            sort_id: data.sort,
            title: data.title,
            sub_title: data.subTitle,
            intro: data.intro,
            content: data.content,
            author: data.author,
            thumb: data.thumb,
            copyfrom: data.copyfrom,
            create_time: date
        });
    }
    editNews(data) {
        const date = think.datetime();
        return this.update({
            sort_id: data.sort,
            title: data.title,
            sub_title: data.subTitle,
            intro: data.intro,
            content: data.content,
            author: data.author,
            thumb: data.thumb,
            copyfrom: data.copyfrom,
            update_time: date
        });
    }
};
//# sourceMappingURL=news.js.map