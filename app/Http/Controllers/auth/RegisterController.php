<?php namespace app\Http\Controllers\auth;
/**
 * Created by PhpStorm.
 * User: Yang
 * Date: 2015/10/14
 * Time: 21:03
 */
use app\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;
use Auth,Hash,DB,Mail;

class RegisterController extends Controller{

    public function get_register(){
        return view('auth/register');
    }

    public function post_register(Request $request){
//        return Redirect::to('/register')->withInput()->withErrors('Error','两次输入的密码不一样！');
        $this->validate($request,
            ['name'=>'required',//|unique:users
             'email'=>'required|email',//|unique:users
             'password'=>'required',
             'repeatpassword'=>'required']);
        $name=$request->get('name');
        $email=$request->get('email');
        $password=$request->get('password');
        $repeatpassword=$request->get('repeatpassword');


        if($password!=$repeatpassword){
            return Redirect::to('/register')->withInput()->with('Errors','两次输入的密码不一样！');
        }
        else if(Auth::attempt(['name'=>$name])){
            return Redirect::to('/register')->withInput()->withErrors('此用户名已注册，请更换重试！');
        }
        else if(Auth::attempt(['email'=>$email])){
            return Redirect::to('/register')->withInput()->withErrors('此邮箱已注册，请更换重试！');
        }
        else{
            //复制用户默认头像E:\SkyDrive\public\website\head_picture
            $prefix = getcwd();
            copy($prefix.'/img/value_head.jpg',$prefix.'/website/head_picture/'.$name.'.jpg');

            $timer=strtotime('now');
            $timer=$timer+24*60*60;
            $date=date('Y-m-d H:i:s',$timer);

            //创建用户
            $user=new User;
            $user->name=$name;
            $user->email=$email;
            $user->password=Hash::make($password);
            $user->head_address='/website/head_picture/'.$name.'.jpg';
            $user->delete_at=$date;
            $user->save();

            //发送激活邮件
            $data=['name'=>$name,'email'=>$email,'activation_code'=>$date];
            Mail::send('emails.create_user',$data,function($message) use($data)
            {
                $message->to($data['email'])->subject('Welcome to XX cloud disk!');
            });
            return $date;
        }
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
