<?php namespace app\Http\Controllers\auth;
/**
 * Created by PhpStorm.
 * User: Yang
 * Date: 2015/10/14
 * Time: 21:03
 */
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;
use Auth,Hash,DB,Mail;

class RegisterController extends Controller{

    public function post_register(Request $request){

        $this->validate($request, [
                'name'                  =>  'required|unique:users',
                'email'                 =>  'required|email|unique:users',
                'password'              =>  'required|confirmed',
                'password_confirmation' =>  'required'
            ],[
                'name.required'         =>  '缺少用户名',
                'name.unique'           =>  '用户名已被占用',
                'email.required'        =>  '缺少邮箱',
                'email.email'           =>  '邮箱格式错误',
                'email.unique'          =>  '邮箱已被占用',
                'password.required'     =>  '缺少密码',
                'password.confirmed'    =>  '两次输入的密码不一致',
                'password_confirmation.required'=>  '请确认密码'
            ]);
        $name=$request->get('name');
        $email=$request->get('email');
        $password=$request->get('password');


        //默认头像地址E:\SkyDrive\public\website\head_picture
        $prefix = getcwd();
        copy($prefix.'/img/value_head.jpg',$prefix.'/website/head_picture/'.$name.'.jpg');

        $timer=strtotime('now');
        $timer=$timer+24*60*60;
        $date=date('Y-m-d H:i:s',$timer);

        //创建用户信息
        $user=new User;
        $user->name=$name;
        $user->email=$email;
        $user->password=Hash::make($password);
        $user->head_address='/website/head_picture/'.$name.'.jpg';
        $user->delete_at=$date;
        $user->save();

        //发送验证邮件
        $data=['name'=>$name,'email'=>$email,'activation_code'=>$date];
        Mail::send('emails.create_user',$data,function($message) use($data)
        {
            $message->to($data['email'])->subject('Welcome to XX cloud disk!');
        });
        return redirect('login')->withErrors('我们已向您指定的邮箱发送激活邮件，请前往激活！');
    }

    public function activation_account(Request $request){

        $this->validate($request,['activation_code'=>'required',
                                  'name'=>'required']);

        $name=$request->get('name');
        $activation_code=$request->get('activation_code');

        $list=DB::table('users')->where('name',$name)->where('delete_at',$activation_code)->get();
        if($list==NULL){
            return view('auth.activation_account')->with('flag',0);
        }
        else{
            DB::table('users')->where('name',$name)->update(array('delete_at'=>'0000-00-00 00:00:00'));
            return view('auth.activation_account')->with('flag',1);
        }
    }
}
