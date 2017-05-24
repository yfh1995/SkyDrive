<?php namespace app\Http\Controllers\auth;
/**
 * Created by PhpStorm.
 * User: Yang
 * Date: 2015/10/14
 * Time: 21:03
 */

use Auth,DB,Hash;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;

class ResetController extends Controller{

    public function getreset(){
        return view('auth.reset');
    }

    public function postreset(Request $request,$id){
        $this->validate($request,
            ['oldpassword'=>'required',
             'newpassword'=>'required',
             'repeatnewpassword'=>'required']);

        $oldpassword=hash::make(Input::get('oldpassword'));
        $newpassword=Input::get('newpassword');
        $repeatnewpassword=Input::get('repeatpassword');

        if($newpassword!=$repeatnewpassword){
            return Redirect::route('/reset')->withInput()->withErrors('������������벻һ�������ԣ�');
        }
        else if(Auth::attempt(['password'=>$oldpassword])){
            if(DB::table('users')->where('id',$id)->update(array('password'=>hash::make($newpassword)))){
                return Redirect::route('/');
            }
            else{
                return Redirect::route('/reset')->withInput()->withErrors('������������������ԣ�');
            }
        }
        else{
            return Redirect::route('/reset')->withInput()->withErrors('����ʧ�ܣ�');
        }
    }

    public function compulsory_change_password(Request $request){
        $this->validate($request,['id'=>'required',
                                  'password'=>'required']);

        $id=$request->get('id');
        $password=$request->get('password');

        if(DB::table('users')->where('id',$id)->update(array('password'=>Hash::make($password)))){
//          return '�����޸ĳɹ�';
			return 1;
        }
        else{
//          return 'δ֪ԭ�������޸�ʧ��';
			return 0;
        }
    }

}