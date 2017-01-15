<?php namespace app\Http\Controllers\auth;
/**
 * Created by PhpStorm.
 * User: Yang
 * Date: 2015/10/14
 * Time: 21:03
 */
use App\Http\Controllers\Controller;
use Auth,Redirect;

class LogoutController extends Controller{

    public function logout(){
        if(Auth::check()){
            Auth::logout();
        }
        return Redirect::to('/login');
    }

}