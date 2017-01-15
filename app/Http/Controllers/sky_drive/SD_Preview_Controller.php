<?php namespace app\Http\Controllers\sky_drive;
/**
 * Created by PhpStorm.
 * User: Yang
 * Date: 2015/10/18
 * Time: 12:36
 */

use DB,Auth,Storage,Input,Response;
use App\catalogs;
use App\files;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SD_Preview_Controller extends Controller{

    public function index(){

    }

    public function preview(Request $request)
    {
        $this->validate($request, ['id' => 'required',
            'src' => 'required']);

        $id = $request->get('id');
        $src = $request->get('src');

        DB::table('catalogs')->where('id', $id)->increment('click', 1);

        return view('BoFangMovies')->with('src', $src);
    }
}