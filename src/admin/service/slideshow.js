/**
 * Created by Administrator on 2018/1/23.
 */
const qiniu=require('qiniu');
module.exports = class extends think.Service {
	constructor(localFile, key) {
		super();
		this.localFile = localFile;
		this.key = key;
	}
	async putfileQiniu() {

		const accessKey = 'If1SWAP60HYq8YUtCWSvgNiL-dvIh_sjVgS3-YPc';
		const secretKey = 'CBcrPNhdn17uTo5fKT3lx-bBgqRI5TFeDs-dizET';
		const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
		let options = {
			scope: 'iyuge',  //空间名称
		};
		let putPolicy = new qiniu.rs.PutPolicy(options);
		let uploadToken=putPolicy.uploadToken(mac); //创建一个token

		let config = new qiniu.conf.Config();
		// 空间对应的机房
		config.zone = qiniu.zone.Zone_z0; //华东
		// 是否使用https域名
		//config.useHttpsDomain = true;
		// 上传是否使用cdn加速
		//config.useCdnDomain = true;

		const formUploader = new qiniu.form_up.FormUploader(config);
		const putExtra = new qiniu.form_up.PutExtra();

		let deferred = think.defer();

		formUploader.putFile(uploadToken, this.key, this.localFile, putExtra, function(respErr,respBody, respInfo){
			if (respErr) {
				throw respErr;

			}
			if (respInfo.statusCode == 200) {
				deferred.resolve({
					success: respBody
				});
				//console.log(respBody)



			} else {
				console.log(respInfo.statusCode);
				console.log(respBody);

			}
			return deferred.promise;
		});

		return await this.putfileQiniu();


	}
};