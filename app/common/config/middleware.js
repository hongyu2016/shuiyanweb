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
    debug: false //关闭错误提示
  }
}, {
  handle: 'payload',
  options: {}
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