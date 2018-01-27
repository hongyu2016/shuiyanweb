/**
 * Created by Administrator on 2017/11/21.
 */
module.exports = class extends think.Model {
    get pk() {
        return 'admin_id';
    }
	indexList(){
        return this
            .join('sy_role ON sy_admin.role_id=sy_role.role_id')
            .select({
                'field':'admin_id,admin_name,admin_email,login_ip,login_time,label,sy_admin.create_time as admin_create_time,sy_role.create_time as role_create_time,role_name,role_remark'});
    }
	addAdmin(data){
        const date=think.datetime();
        return this.add({
			'admin_name':data.admin_name,
	        'admin_email':data.admin_email,
	        'role_id':data.role_id,
	        'admin_pass':data.admin_pass,
	        'create_time':date
        });
    }
    edit(data){
        const date=think.datetime();
        return this.update(
            {
	            'admin_name':data.admin_name,
	            'admin_email':data.admin_email,
	            'role_id':data.role_id,
	            'admin_pass':data.admin_pass
            }
        )
    }
};