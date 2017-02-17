<?php namespace app\Http\Controllers\emails;
/**
 * Created by PhpStorm.
 * User: Yang
 * Date: 2015/11/29
 * Time: 18:05
 */


use DB,Auth,Mail;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EmailController extends Controller{

    public function create_user(Request $request){
        $this->validate($request,['name'=>'required',
                                  'email'=>'required',
                                  'activation_code'=>'required']);
        $params = $request->all();

        $data=['name'=>$params['name'],'email'=>$params['email'],'activation_code'=>$params['activation_code']];
        Mail::send('emails.create_user',$data,function($message) use($data)
        {
            $message->to($data['email'])->subject('欢迎注册本站！');
        });
    }

    public function notify_user_password($data){

        Mail::queue('emails.notify_user_password',$data,function($message) use($data)
        {
            $message->to($data['email'])->subject('您在本站的密码已被管理员修改');
        });
    }

    public function notify_user_permission($data){

        Mail::queue('emails.notify_user_permission',$data,function($message) use($data)
        {
            $message->to($data['email'])->subject('您在本站的权限已被管理员修改');
        });
    }

    public function notify_user_delete($data){

        Mail::queue('emails.notify_user_delete',$data,function($message) use($data)
        {
            $message->to($data['email'])->subject('您在本站的账号已被管理员删除');
        });
    }

    public function notify_user_become_user($data){

        Mail::queue('emails.notify_user_become_user',$data,function($message) use($data)
        {
            $message->to($data['email'])->subject('您已成为本站的普通用户');
        });
    }

    public function notify_user_restore_user($data){

        Mail::queue('emails.notify_user_restore_user',$data,function($message) use($data)
        {
            $message->to($data['email'])->subject('您的站账号已被恢复！');
        });
    }

    public function change_user_password(Request $request){
        $id=$request->get('id');
        $user=DB::table('users')->where('id',$id)->get();
        $password=$request->get('password');
        $data = ['email'=>$user[0]->email,'name'=>$user[0]->name,'password'=>$password];
        $this->notify_user_password($data);
        return 'ok';
    }

    public function get_permission_chinese_name($permission){
        $permission_cn='';
        $count=count($permission);
        for($i=0;$i<$count;$i++){
            $permission_cn=$permission_cn.'&nbsp;&nbsp;&nbsp;&nbsp;';
            $str=DB::table('permission')->where('permission_name',$permission[$i])->lists('chinese_name');
            $permission_cn=$permission_cn.$str[0];
            $permission_cn=$permission_cn.'<br/>';
        }
        return $permission_cn;
    }

    public function change_user_permission(Request $request){
        $id=$request->get('id');
        $permission=$request->get('permission');
        $permission_cn=$this->get_permission_chinese_name($permission);

        $count=count($id);
        for($i=0;$i<$count;$i++){
            $list=DB::table('users')->where('id',$id[$i])->get();
            $data=['email'=>$list[0]->email,'name'=>$list[0]->name,'permission'=>$permission_cn];
            $this->notify_user_permission($data);
        }
        return 'ok';
    }

    public function delete_user(Request $request){
        $id=$request->get('id');
        $count=count($id);
        for($i=0;$i<$count;$i++){
            $list=DB::table('users')->where('id',$id[$i])->get();
            $data=['email'=>$list[0]->email,'name'=>$list[0]->name];
            $this->notify_user_delete($data);
        }
        return 'ok';
    }

    public function change_group_permission(Request $request){
        $information=$request->get('information');
        $permission=$information[count($information)-1];
        $permission_cn=$this->get_permission_chinese_name($permission);

        $sum=count($information)-1;
        for($i=0;$i<$sum;$i++){
            $data=['name'=>$information[$i]['name'],'email'=>$information[$i]['email'],'permission'=>$permission_cn];
            $this->notify_user_permission($data);
        }
        return 'ok';
    }

    public function delete_permission_group(Request $request){

        $information=$request->get('information');
        $sum_sum=count($information);
        for($i=0;$i<$sum_sum;$i++){
            $sum=count($information[$i]);
            for($j=0;$j<$sum;$j++){
                $this->notify_user_become_user($information[$i][$j]);
            }
        }
        return 'ok';
    }

    public function restore_user(Request $request){
        $this->validate($request,['id'=>'required']);

        $id=$request->get('id');
        $sum=count($id);
        for($i=0;$i<$sum;$i++){
            $list=DB::table('users')->where('id',$id[$i])->get();
            $data=['name'=>$list[0]->name,'email'=>$list[0]->email];
            $this->notify_user_restore_user($data);
        }
    }

}