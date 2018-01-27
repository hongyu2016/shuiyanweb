/**
 * Created by Administrator on 2017/11/21.
 */
module.exports = class extends think.Model {
    get pk() {
        return 'role_id';
    }
	indexList(){
        return this
            .select();
    }
	addRole(data){
        const date=think.datetime();
        return this.add({
	        'role_name':data.role_name,
	        'role_remark':data.role_remark,
	        'status':2,
	        'create_time':date
        });
    }
    edit(data){
        return this.update(
            {
	            'role_name':data.role_name,
	            'role_remark':data.role_remark
            }
        )
    }
};