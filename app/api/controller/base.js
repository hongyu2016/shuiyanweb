module.exports = class extends think.Controller {
    __before() {
        //对应客户端的 xhrFields.withCredentials: true 参数，服务器端通过在响应 header 中设置 Access-Control-Allow-Credentials = true 来运行客户端携带证书式访问。通过对 Credentials 参数的设置，就可以保持跨域 Ajax 时的 Cookie。这里需要注意的是：//服务器端 Access-Control-Allow-Credentials = true时，参数Access-Control-Allow-Origin 的值不能为 '*' 。
        this.header("Access-Control-Allow-Origin", "*"); // || "*" this.header("origin")
        this.header("Access-Control-Allow-Headers", "X-Requested-With, Access-Control-Allow-Origin, X-HTTP-Method-Override, Content-Type, Authorization, Accept");
        this.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
        //this.header('Content-Type', '*');
        this.header('Access-Control-Allow-Credentials', true);
    }
    /*__call(){
        //跨域设置
        let method = this.http.method.toLowerCase();
        if(method === "options"){
            this.setCorsHeader();
            this.end();
            return;
        }
        this.setCorsHeader();
        return super.__call();
    }
    setCorsHeader(){
        this.header("Access-Control-Allow-Origin", this.header("origin") || "*");
        this.header("Access-Control-Allow-Headers", "x-requested-with");
        this.header("Access-Control-Request-Method", "GET,POST,PUT,DELETE");
        this.header("Access-Control-Allow-Credentials", "true");
    }*/
};
//# sourceMappingURL=base.js.map