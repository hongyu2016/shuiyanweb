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
  enable: true, //默认是isDev 开发时才开启 现在开发和生产环境都开启
  options: {
    root: path.join(think.ROOT_PATH, 'www'),
    publicPath: /^\/(static|favicon\.ico)/
  }
}, {
  handle: 'trace',
  enable: !think.isCli,
  options: {
    debug: isDev
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