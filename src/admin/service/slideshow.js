/**
 * Created by Administrator on 2018/1/23.
 * 上传文件到七牛云
 *
 */
const fs = require('fs');
const path = require('path');
const helper = require('think-helper');

const qiniu=require('qiniu');

const accessKey = 'If1SWAP60HYq8YUtCWSvgNiL-dvIh_sjVgS3-YPc';
const secretKey = 'CBcrPNhdn17uTo5fKT3lx-bBgqRI5TFeDs-dizET';
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
let bucket='iyuge'
let options = {
	scope: bucket,  //空间名称
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
module.exports = class extends think.Service {
	constructor() {
		super();
	}
	/*
	* 上传图片到七牛
	* */
	async putfileQiniu(file,name) {

		let filepath=file,
			newname=name;

		const formUploader = new qiniu.form_up.FormUploader(config);  //文件上传 表单上传
		const putExtra = new qiniu.form_up.PutExtra();

		function up(uploadToken,newname,filepath,putExtra) {
			let deferred = think.defer();
			let returnInfo={};
			formUploader.putFile(uploadToken,newname, filepath, putExtra, function(respErr,respBody, respInfo){
				if (respErr) {
					deferred.resolve(
						returnInfo={
							msg:'error_1',
							data:[]
						}
					);

				}
				if (respInfo.statusCode == 200) {  //上传文件成功 然后复制一个副本作为缩略图

					deferred.resolve(
						returnInfo={
							msg:'success',
							data:respBody
						}
					);

				} else {
					//console.log(respInfo.statusCode);
					//console.log(respBody);
					deferred.resolve(
						returnInfo={
							msg:'error_2',
							data:respBody
						}
					);

				}

			});
			return deferred.promise;
		}

		return await up(uploadToken,newname,filepath,putExtra);

	}
	/*
	* 删除七牛上的图片
	* */
	async deleteQiniuImg(file){
		let filePath=file;
		const bucketManager = new qiniu.rs.BucketManager(mac, config);  //资源管理
		let deferred = think.defer();
		let returnInfo={};

		function deleteFile(filePath) {
			bucketManager.delete(bucket, filePath, function(err, respBody, respInfo) {
				if (err) {
					deferred.resolve(
						returnInfo={
							msg:'error',
							data:'删除失败'
						}
					);
				}
				if(respInfo.statusCode==200)
				{
					deferred.resolve(
						returnInfo={
							msg:'success',
							data:'删除成功'
						}
					);
				}else{
					deferred.resolve(
						returnInfo={
							msg:'error',
							data:'删除失败'
						}
					);
				}

			});
			return deferred.promise;
		}
		return await deleteFile(filePath);

	}
	/*
	* 查询七牛上的图片文件
	* */
	async queryInfoImg(file){
		let filePath=file;
		const bucketManager = new qiniu.rs.BucketManager(mac, config);  //资源管理
		let deferred = think.defer();
		let returnInfo={};
		function getInfo(filePath) {
			bucketManager.stat(bucket, filePath, function(err, respBody, respInfo) {
				if (err) {
					deferred.resolve(
						returnInfo={
							msg:'error',
							data:'删除失败'
						}
					);
				}

				if (respInfo.statusCode == 200) {
					/*console.log(respBody.hash);
					 console.log(respBody.fsize);
					 console.log(respBody.mimeType);
					 console.log(respBody.putTime);
					 console.log(respBody.type);*/
					console.log(respBody)
					deferred.resolve(
						returnInfo={
							msg:'success',
							data:respBody
						}
					);
				} else {
					deferred.resolve(
						returnInfo={
							msg:'error',
							data:'删除失败'
						}
					);
				}

			});
			return deferred.promise;
		}
		return await getInfo(filePath);
	}
};