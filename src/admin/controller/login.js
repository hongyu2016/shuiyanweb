import ThinkSvgCaptcha from 'think-svg-captcha';

module.exports = class extends think.Controller {
    indexAction() {
        return this.display();
    }

    /*
     * 验证码
     * */
    captchaAction() {
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
            charPreset: '0123456789' // random character preset
        };
        let captcha = new ThinkSvgCaptcha(options);
        let c = captcha.create(); // returns an object that has the following property: {data: 'svg path data', text: 'captcha text'}
        this.success({captcha: c}, '获取验证码成功');
    }

    /*
     * 登陆
     * */
    async dologinAction() {
        if (this.isPost) {
            let username = this.post('username'); //获取用户名
            let password = this.post('password'); //获取密码

	        if(!username ||!password){
		        this.json({
			        success:false,
			        errmsg:'请输入用户名、密码',
			        data:[]
		        });
		        return false;
	        }

            let data = await this.model('admin').where({admin_name: username, admin_pass: password}).find(); //查询数据库
	        if (think.isEmpty(data)){
		        this.json({
			        success:false,
			        errmsg:'账号密码错误！请重新填写',
			        data:[]
		        });
		        return false;
	        }
	        //判断是否被禁用
	        let role_status=await this.model('role').where({'role_id':data.role_id}).field('status').select();
	        if(role_status[0].status==1){
		        this.json({
			        success:false,
			        errmsg:'此用户已被禁用，请联系管理员',
			        data:[]
		        });
		        return false;
	        }else {
		        this.session('userinfo', data);//存储session
		        return this.json({
			        success:true,
			        errmsg:'登陆成功',
			        data:{username: username}
		        });

	        }

        }

    }

    /**
     * 注销
     */
    async logoutAction() {
        await this.session(null);
        this.redirect('/index');//注销成功清空session，返回到user首页。
    }
    /*
    * 修改密码
    * */
    async changepwAction(){
        if(this.isPost){
            let user=this.post('user');
            let oldpsw=this.post('old_psw');
            let newpsw=this.post('new_psw');
            let confirmpsw=this.post('confirm_psw');
            if(!oldpsw){
                this.fail(403,'请填写原密码');
                return false;
            }
            if(!newpsw){
                this.fail(403,'请填写新密码');
                return false;
            }
            if(newpsw!=confirmpsw){
                this.fail(403,'两次密码不相等');
                return false;
            }
            let adminModel=this.model('admin');
            let userInfo=await adminModel.where({admin_name:user}).find();
            if(oldpsw!=userInfo.admin_pass){
                this.fail(403,'原密码不正确');
                return false;
            }

            let userChange=await adminModel.where({admin_name:user}).update({admin_pass: confirmpsw});
            await this.session(null);

            //this.redirect('/index');
            this.success({data:userChange},'修改密码成功');
        }else{
            this.fail(403,'请使用post提交');
        }

    }
};
