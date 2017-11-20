import ThinkSvgCaptcha from 'think-svg-captcha';

module.exports = class extends think.Controller {
  indexAction() {
      return this.display();
  }
  /*
  * 验证码
  * */
    captchaAction(){
        const options = {
            size: 4, // size of random string
            ignoreChars: '', // filter out some characters
            noise: 1, // number of noise lines
            color: false, // default grey, true if background option is set
            background: '#ffffff', // background color of the svg image
            width: 80, // width of captcha
            height: 35, // height of captcha
            //fontPath: './fonts/Comismsh.ttf', // your font path
            fontSize: 50, // captcha text size
            charPreset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' // random character preset
        };
        let captcha=new ThinkSvgCaptcha(options);
        let c=captcha.create(); // returns an object that has the following property: {data: 'svg path data', text: 'captcha text'}
        this.success({captcha:c},'获取验证码成功');
    }

  /*
  * 登陆
  * */
  async dologinAction(){
     if(this.isPost){
         let username=this.post('username'); //获取用户名
         let password=this.post('password'); //获取密码
         let data=await this.model('admin').where({admin_name:username,admin_pass:password}).find(); //查询数据库
         if(think.isEmpty(data)){
             return this.fail(403,'账号密码错误！请重新填写');//登陆失败
         }else{
             this.session('userinfo',data);
             //return this.redirect('/index/index');//登陆成功 存入session 跳转首页
             //this.success({errmsg: "登陆成功", data: {username:username}});
             this.success({username:username},'登陆成功');

         }
     }
     //return this.display();
  }
    /**
     * 注销
     */
    async logoutAction(){
        await this.session(null);
        this.redirect('/index/index');//登录成功将用户信息写入session，返回到user首页。
    }
};
