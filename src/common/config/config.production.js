// production config, it will load in production enviroment
module.exports = {
    workers: 1,
    port: process.env.PORT || 5000
};