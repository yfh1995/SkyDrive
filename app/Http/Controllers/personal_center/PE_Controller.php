<?php namespace app\Http\Controllers\personal_center;
/**
 * Created by PhpStorm.
 * User: Yang
 * Date: 2015/10/25
 * Time: 11:20
 */

use DB,Auth,Hash,Storage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PE_Controller extends Controller{

    public function index(){
        return view('personal_center.Personal');
    }

    public function storage_basic(Request $request){

        $this->validate($request,['nicheng'=>'required',
                                  'sex'=>'required',
                                  'email'=>'required']);

        $oldname=Auth::user()->name;
        $name=$request->get('nicheng');
        $sex=$request->get('sex');
        $email=$request->get('email');

        DB::table('users')->where('name',$oldname)->update(array('name'=>$name,'sex'=>$sex,'email'=>$email));

        return 'ok';
    }

    public function storage_head(Request $request){
        $this->validate($request,['head'=>'required']);

        $name=Auth::user()->name;
        $head=base64_decode(str_replace('data:image/png;base64,', '', $request->get('head')));
        $head_address='/website/head_picture/'.Auth::user()->name.'.jpg';

        $old_data = DB::table('users')->where('name',$name)->first();
        unlink(substr($old_data->head_address,1));
        DB::table('users')->where('name',$name)->update(array('head_address'=>$head_address));
        file_put_contents(substr($old_data->head_address,1),$head);
        return 'ok';
    }

    public function get_basic(){

        $list=DB::table('users')->where('name',Auth::user()->name)->get();
        return $list;
    }

    public function reset_password(Request $request){
        $this->validate($request,['oldpassword'=>'required',
                                    'newpassword'=>'required',
                                    'repeatnewpassword'=>'required']);

        $name=Auth::user()->name;
        $oldpassword=$request->get('oldpassword');
        $newpassword=$request->get('newpassword');
        $repeatnewpassword=$request->get('repeatpassword');

        if($newpassword!=$repeatnewpassword){
            return '������������벻һ���������ԣ�';
        }
        else if(Auth::attempt(['name'=>$name,'password'=>$oldpassword])){
            if(DB::table('users')->where('name',$name)->update(array('password'=>Hash::make($newpassword)))) {
                return 1;
            }
            else{
                return 2;
            }
        }
        else{
            return '������������������ԣ�';
        }
    }

}