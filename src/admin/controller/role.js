/**
 * Created by Administrator on 2017/11/17.
 */
const Base = require('./base');
import commonFun from "../common_function/common_function.js";//自定义类 里面有自定义函数
module.exports = class extends Base {
	/*
	 * 构造函数 便于使用model文件
	 * */
	constructor(...args) {
		super(...args);//调用父级的 constructor 方法
		this.modelInstance = this.model('role'); //增加一个方法
	}

	/*
	 * 栏目列表
	 * */
	async indexAction() {
		//显示页面
		let data = await this.modelInstance.indexList();
		this.assign('data', data);
		return this.display();
	}

	async addAction() {
		let id = this.get('role-id');
		if(id) {
			let data = await this.modelInstance.where({'role_id': id}).find();
			this.assign('data', data);
		}
		return this.display();
	}

	async doaddAction() {
		if(this.isGet) {
			let editId = this.get('editId'),
				role_name = this.get('role_name'),
				role_remark = this.get('role_remark');
			let parms = {
				editId: editId,
				role_name: role_name,
				role_remark: role_remark
			};
			if(editId != 0 || editId != '0') {
				//编辑
				let data = await this.modelInstance.where({'role_id': editId}).edit(parms);
				if(data) {
					this.json({
						success: true,
						errmsg: '编辑成功',
						data: data
					});
				}
				else {
					this.json({
						success: false,
						errmsg: '编辑失败',
						data: []
					});
				}
			}
			else {
				let data = await this.modelInstance.addRole(parms);
				if(data) {
					this.json({
						success: true,
						errmsg: '新增成功',
						data: data
					});
				}
				else {
					this.json({
						success: false,
						errmsg: '新增失败',
						data: []
					});
				}
			}
		}
	}

	/*
	 * 禁用，启用
	 * */
	async doenableAction() {
		if(this.isGet) {
			let id = this.get('id');
			let status = this.get('status')
			let data = await this.modelInstance.where({'role_id': id}).update({'status': status});
			if(data) {
				this.json({
					success: true,
					errmsg: '修改状态成功',
					data: data
				});
			}
			else {
				this.json({
					success: false,
					errmsg: '修改状态失败',
					data: []
				});
			}
		}
	}

	/*
	 * 删除角色
	 * */
	async deleteAction() {
		if(this.isGet) {
			let id = this.get('id');
			let data = await this.modelInstance.where({'role_id': id}).delete();
			if(data) {
				this.json({
					success: true,
					errmsg: '删除角色成功',
					data: data
				});
			}
			else {
				this.json({
					success: false,
					errmsg: '删除角色失败',
					data: []
				});
			}
		}
	}

	/*
	 * 查看角色成员
	 * */
	async viewMemberAction() {
		if(this.isGet) {
			let id = Number(this.get('id'));
			if(!id || id == '') {
				this.json({
					success: false,
					errmsg: 'id不能为空',
					data: []
				});
				return false;
			}
			let data = await this.model('admin').where({'role_id': id}).select({'field': 'admin_name'});
			if(data) {
				this.json({
					success: true,
					errmsg: '获取成功',
					data: data
				});
			}
			else {
				this.json({
					success: false,
					errmsg: '获取失败',
					data: []
				});
			}
		}
	}

	/*
	 * 分配角色
	 * */
	async distributeAuthAction() {
		let commonFunion = new commonFun(); //需要new一下才能用
		if(this.isGet) {
			let role_id = Number(this.get('role_id'));
			if(!role_id || !think.isNumber(role_id) || think.isNull(role_id)) {
				this.json({
					success: false,
					errmsg: 'id参数错误',
					data: []
				});
				return false;
			}
			let data = await this.model('authority').select();
			let authData = commonFunion.formatAuthMenu(data);  //返回权限列表
			let authIds = await this.modelInstance.where({'role_id':role_id}).getField('auth_rule');
			if(data) {
				this.json({
					success: true,
					errmsg: '获取权限列表成功',
					data: {
						'authTree':authData,
						'authIds':authIds[0]
					}
				});

			}
			else {
				this.json({
					success: false,
					errmsg: '获取权限列表失败',
					data: []
				});
			}

		}
	}

	/*
	 * 设置，修改权限
	 * */
	async doAuthAction() {
		if(this.isGet) {
			let auth_id = this.get('auth_id');
			let role_id = this.get('role_id');
			if(!auth_id || !role_id) {
				this.json({
					success: false,
					errmsg: 'role_id或者auth_id不能为空',
					data: []
				});
				return false;
			}
			let data = await this.modelInstance.where({'role_id': role_id}).update({'auth_rule': auth_id});
			if(data) {
				this.json({
					success: true,
					errmsg: '修改权限成功',
					data: auth_id
				});
			}
			else {
				this.json({
					success: false,
					errmsg: '修改权限成功',
					data: []
				});
			}

		}
	}

	/*
	 * 通过角色id role_id返回 该角色所拥有的权限id  格式为  1,2,3,4
	 * */
	/*async roleAuthAction() {
		if(this.isGet) {
			let role_id = Number(this.get('role_id'));
			if(!role_id || !think.isNumber(role_id) || think.isNull(role_id)) {
				this.json({
					success: false,
					errmsg: 'id参数错误',
					data: []
				});
				return false;
			}
			let data = await this.modelInstance.where({'role_id':role_id}).getField('auth_rule');
			if(data) {
				this.json({
					success: true,
					errmsg: '获取权限列表成功',
					data: data
				});

			}
			else {
				this.json({
					success: false,
					errmsg: '获取权限列表失败',
					data: []
				});
			}
		}
	}*/

};
