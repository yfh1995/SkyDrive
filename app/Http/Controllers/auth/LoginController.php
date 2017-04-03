<?php namespace app\Http\Controllers\auth;
/**
 * Created by PhpStorm.
 * User: Yang
 * Date: 2015/10/14
 * Time: 21:02
 */

use Auth,DB,Hash,Mail;
use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\Registrar;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class LoginController extends Controller{

    use AuthenticatesAndRegistersUsers;

    public function test(){
        return view('');
    }

    public function getlogin(){
        return view('auth/login');
    }

    public function postlogin(Request $request){
        $this->validate($request,['email'=>'required','password'=>'required']);
        $email=$request->get('email');
        $password=$request->get('password');
        $list=DB::table('users')->where('email',$email)->get();
        if($list==NULL){
            return Redirect::to('/login')->withErrors('没有此账户！');
        }
        else if($list[0]->delete_at!='0000-00-00 00:00:00'){
            return Redirect::to('/login')->withErrors('此账户未激活！');
        }
        else{
            if(Auth::attempt(['email'=>$email,'password'=>$password],$request->get('remember'))){

                if(!isset($_SESSION)) session_start();
                $_SESSION['father_catalog_name']=Auth::user()->name;
                if(Auth::user()->admin!='admin'){
                    return Redirect::to('/');
                }
                else{
                    return Redirect::to('/admin/sky_drive');
                }
            }
            else{
                return  view('auth/login')->withErrors('密码错误！');
            }
        }
    }

}