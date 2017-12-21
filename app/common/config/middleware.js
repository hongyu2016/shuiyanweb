const path = require('path');
const isDev = think.env === 'development';
module.exports = [{
    handle: 'meta',
    options: {
        logRequest: isDev,
        sendResponseTime: isDev
    }
}, {
    handle: 'resource',
    enable: true, //原来是 isDev  开发下才开启静态资源
    options: {
        root: path.join(think.ROOT_PATH, 'www'),
        publicPath: /^\/(static|favicon\.ico)/
    }
}, {
    handle: 'trace',
    enable: !think.isCli,
    options: {
        debug: false, //关闭错误提示
        error(err) {
            console.log(err);
        },
        //basic set as string, then put 404.html, 500.html into error folder
        templates: path.join(__dirname, 'error'),

        //customed set as object 指定错误页面
        templates: {
            404: path.join(think.ROOT_PATH, 'view/error/404.html'),
            500: path.join(think.ROOT_PATH, 'view/error/500.html'),
            502: path.join(think.ROOT_PATH, 'view/error/502.html')
        }
    }
}, {
    handle: 'payload',
    options: {
        uploadDir: path.join(think.ROOT_PATH, 'tmp') //设置临时上传文件路径，否则使用系统tmp路径，导致rename报错
    }
}, {
    handle: 'router',
    options: {
        defaultModule: 'admin', //默认的模块
        defaultController: 'index',
        defaultAction: 'index',
        prefix: [],
        suffix: ['.html'],
        enableDefaultRouter: true,
        subdomainOffset: 2,
        subdomain: {},
        denyModules: []
    }
}, 'logic', 'controller'];