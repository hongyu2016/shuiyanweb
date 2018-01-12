/**
 * Created by Administrator on 2017/12/18.
 */
module.exports = [{
    interval: '1200s',
    immediate: true,
    /*handle: () => {
      }*/
    handle: '/timing'
}, {
    cron: '0 */1 * * *',
    //handle: '/admin',
    worker: 'all'
}];