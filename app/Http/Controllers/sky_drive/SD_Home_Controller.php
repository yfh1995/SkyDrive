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

class SD_Home_Controller extends Controller{

    public function index(){

        return view('sky_drive.show');
    }

    public function type(Request $request){

        $this->validate($request,['skip'=>'required',
                                  'size'=>'required']);

        $type=$request->get('type');
        $skip=$request->get('skip');
        $size=$request->get('size');

        $address='/website/storage/'.$type;
        $list=DB::table('catalogs')->where('owner_name',Auth::user()->name)->where('address',$address)->where('garbage','0000-00-00 00:00:00')->skip($skip)->take($size)->get();
        $list[count($list)]=count(DB::table('catalogs')->where('owner_name',Auth::user()->name)->where('address',$address)->where('garbage','0000-00-00 00:00:00')->get());
        return $list;
    }

    public function refresh(Request $request){

        $this->validate($request,['skip'=>'required',
                                  'size'=>'required']);

        $father_catalog_name=$request->get('father_catalog_name');
        $skip=$request->get('skip');
        $size=$request->get('size');

        if(!isset($_SESSION)) session_start();
        if($father_catalog_name=='') $father_catalog_name=$_SESSION['father_catalog_name'];
        else $_SESSION['father_catalog_name']=$father_catalog_name;

        $list=DB::table('catalogs')->where('father_catalog_name',$father_catalog_name)->where('garbage','0000-00-00 00:00:00')->skip($skip)->take($size)->get();
        $list[count($list)]=count(DB::table('catalogs')->where('father_catalog_name',$father_catalog_name)->where('garbage','0000-00-00 00:00:00')->get());
        //print_r($list);
        //substr($list, 3);
        return $list;
    }

    public function get_garbage(Request $request){

        $this->validate($request,['skip'=>'required',
            'size'=>'required']);

        $type=$request->get('type');
        $skip=$request->get('skip');
        $size=$request->get('size');

        $list=DB::table('catalogs')->where('owner_name',Auth::user()->name)->where('root_garbage',1)->skip($skip)->take($size)->get();
        $list[count($list)]=count(DB::table('catalogs')->where('owner_name',Auth::user()->name)->where('root_garbage',1)->get());
        return $list;
    }

    public function set_up_catalog(Request $request)
    {
        if(!isset($_SESSION)) session_start();
        $this->validate($request,['cur_catalog_name' => 'required']);
        $cur_catalog_name=$request->get('cur_catalog_name');

        $query_catalog_name=DB::table('catalogs')->where('father_catalog_name',$_SESSION['father_catalog_name'])
                                                ->where('cur_catalog_name',$cur_catalog_name)->get();

        if($query_catalog_name==NULL){
            $create_catalog = new catalogs();
            $create_catalog->owner_name = Auth::user()->name;
            $create_catalog->md5 = NULL;
            $create_catalog->cur_catalog_name = $cur_catalog_name;
            $create_catalog->father_catalog_name = $_SESSION['father_catalog_name'];
            $create_catalog->validate = NULL;
            $create_catalog->address= NULL;
            $create_catalog->save();
            return 'ok';
        }

        return 'duplication of name';
    }

    public function rename(Request $request){
        $this->validate($request,['id'=>'required',
                                  'rename'=>'required']);

        $id=$request->get('id');
        $rename=$request->get('rename');

        $list1=DB::table('catalogs')->where('id',$id)->get();
        $list2=DB::table('catalogs')->where('father_catalog_name',$list1[0]->father_catalog_name)->where('cur_catalog_name',$rename)->get();
        if($list2==NULL){
            DB::table('catalogs')->where('id',$id)->update(array('cur_catalog_name'=>$rename));
            return 'ok';
        }
        else{
            return 'duplication';
        }
    }

    public function upload(Request $request)
    {
        if(!isset($_SESSION)) session_start();
        $this->validate($request,['file' => 'required']);

        $file=$request->file('file');
        $md5 = md5_file($file);
        if ($md5) {
            $gid=DB::table('type')->where('type_name','<>',$file->getClientOriginalExtension())->first();
            if($gid==NULL){
                $type='other';
            }
            else{
                $type=DB::table('type_group')->where('id','=',$gid->gid)->first();
                $type=$type->group_name;
            }
            $cur_catalog_same_file = DB::table('catalogs')->where('father_catalog_name',$_SESSION['father_catalog_name'])->where('md5', $md5)->first();
            if($cur_catalog_same_file==NULL){
                $size=filesize($file);

                $query_same_md5 = DB::table('files')->where('md5', $md5)->first();
                if ($query_same_md5 == NULL) {

                    $create_file = new files;
                    $create_file->md5 = $md5;
                    $create_file->file_size = $size;
                    $create_file->address = '/website/storage/'.$type;
                    $create_file->owner_num = 1;
                    $create_file->type = $file->getClientOriginalExtension();
                    $create_file->save();

                    Storage::disk($type)->put($md5.'.'.$file->getClientOriginalExtension(), fopen($file, "r+"));
                }
                else{
                    $ls_file=files::find($query_same_md5->id);
                    $ls_file->owner_num=$ls_file->owner_num+1;
                    $ls_file->save();
                }

                $create_catalog = new catalogs();
                $create_catalog->owner_name = Auth::user()->name;
                $create_catalog->md5 = $md5;
                $create_catalog->cur_catalog_name = $file->getClientOriginalName();
                $create_catalog->father_catalog_name = $_SESSION['father_catalog_name'];
                $create_catalog->validate = NULL;
                $create_catalog->address='/website/storage/'.$type;
                $create_catalog->size=$size;
                $create_catalog->save();
                $user=User::find(Auth::user()->id);
                $user->used_space+=$size;
                $user->save();
            }
            return 'ok';
        }
    }

    public function delete_and_restore(Request $request){

        $list=$request->get('list');
        $date=$request->get('date');
        if($date=='0000-00-00 00:00:00') $flag=0;
        else $flag=1;
        $this->traverse_catalog($list,$date,$flag);
        return 'ok';
    }

    public function traverse_catalog($list,$date,$flag){
        for($i=0;$i<count($list);$i++){
            DB::table('catalogs')->where('id',$list[$i])->update(array('garbage'=>$date,'root_garbage'=>$flag));
            $this->sign_catalog($list[$i],$date);
        }
    }

    public function sign_catalog($id,$date){
        $ls=DB::table('catalogs')->where('id',$id)->get();
        if($ls[0]->md5==null){
            $list=DB::table('catalogs')->where('father_catalog_name',$ls[0]->father_catalog_name.'/'.$ls[0]->cur_catalog_name)->get();

            for($i=0;$i<count($list);$i++){
                DB::table('catalogs')->where('id',$list[$i]->id)->update(array('garbage'=>$date));
            }
            for($i=0;$i<count($list);$i++){
                $this->sign_catalog($list[$i]->id,$date);
            }
        }
    }

    public function return_session_catalog(){
        if(!isset($_SESSION)) session_start();
        return $_SESSION['father_catalog_name'];
    }

    public function set_session_catalog(Request $request){
        $this->validate($request,['father_catalog_name' => 'required']);

        if(!isset($_SESSION)) session_start();
        $_SESSION['father_catalog_name']=$request->get('father_catalog_name');
        return 'ok';
    }

    public function get_page_information(Request $request){

        $type=$request->get('type');
        if($type=='catalog'){
            if(!isset($_SESSION)) session_start();
            $list=DB::table('catalogs')->where('father_catalog_name',$_SESSION['father_catalog_name'])->where('garbage','0000-00-00 00:00:00')->get();
            return count($list);
        }
        else{
            $address='/website/storage/'.$type;
            $list=DB::table('catalogs')->where('owner_name',Auth::user()->name)->where('address',$address)->where('garbage','0000-00-00 00:00:00')->get();
            return count($list);
        }

    }

    public function get_appoint_catalog(Request $request){

        $this->validate($request,['father_catalog_name'=>'required']);

        $father_catalog_name=$request->get('father_catalog_name');
        $list=DB::table('catalogs')->where('father_catalog_name',$father_catalog_name)->where('garbage','0000-00-00 00:00:00')->get();
        return $list;
    }

    public function get_move_catalog(Request $request){
        $this->validate($request,['id'=>'required']);

        $id=$request->get('id');
        if($id==0){
            return DB::table('catalogs')->where('father_catalog_name',Auth::user()->name)->where('garbage','0000-00-00 00:00:00')->get();
        }
        else{
            $list=DB::table('catalogs')->where('id',$id)->get();
            if($list[0]->md5==NULL){
                $catalog=$list[0]->father_catalog_name.'/'.$list[0]->cur_catalog_name;
                return DB::table('catalogs')->where('father_catalog_name',$catalog)->where('garbage','0000-00-00 00:00:00')->get();
            }
            else{
                return -1;
            }
        }
    }

    public function move_catalog(Request $request){
        $this->validate($request,['move_id'=>'required',
                                  'be_moved_id'=>'required']);

        $move=$request->get('move_id');
        $moved=DB::table('catalogs')->where('id',$request->get('be_moved_id'))->get();
        $name=$moved[0]->father_catalog_name.'/'.$moved[0]->cur_catalog_name;
        $sum=count($move);

        for($i=0;$i<$sum;$i++){
            $this->set_father_catalog_name($move[$i],$name);
        }
    }

    public function set_father_catalog_name($id,$name){

        $list=DB::table('catalogs')->where('id',$id)->get();
        $ls_name=$list[0]->father_catalog_name.'/'.$list[0]->cur_catalog_name;
        DB::table('catalogs')->where('id',$id)->update(array('father_catalog_name'=>$name));
        if($list[0]->md5==NULL){
            $new_name=$name.'/'.$list[0]->cur_catalog_name;
            $result=DB::table('catalogs')->where('father_catalog_name',$ls_name)->lists('id');
            $sum=count($result);
            for($i=0;$i<$sum;$i++){
                $this->set_father_catalog_name($result[$i],$new_name);
            }
        }
    }
}