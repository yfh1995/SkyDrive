<?php namespace app\Http\Controllers\admin;

use DB,Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;

class SD_Controller extends Controller{

    public function index(){
        return view('admin/sky_drive');
    }

    public function button_information(){

        $admin=Auth::user()->admin;
        $list=DB::table('permission_relationship')->where('group_name',$admin)->get();
        return $list;
    }

    public function user_information(Request $request){

        $this->validate($request,['skip' => 'required',
            'size' => 'required']);

        $skip=$request->get('skip');
        $size=$request->get('size');

        $list=DB::table('users')->where('admin','user')->where('delete_at','0000-00-00 00:00:00')->skip($skip)->take($size)->get();
        $list[count($list)]=count(DB::table('users')->where('admin','user')->where('delete_at','0000-00-00 00:00:00')->get());
        return $list;
    }

    public function admin_information(Request $request){

        $this->validate($request,['skip' => 'required',
            'size' => 'required']);

        $skip=$request->get('skip');
        $size=$request->get('size');

        $list=DB::table('users')->where('admin','<>','user')->where('admin','<>','superAdmin')->where('delete_at','0000-00-00 00:00:00')->skip
        ($skip)->take($size)->get();
        $list[count($list)]=count(DB::table('users')->where('admin','<>','user')->where('admin','<>','superAdmin')->where('delete_at','0000-00-00 00:00:00')->get());
        return $list;
    }

    public function get_authority(Request $request){

        $group_name=$request->get('group_name');

        $list=DB::table('permission_relationship')->where('group_name',$group_name)->lists('permission_name');
        return $list;
    }

    public function delete_and_restore(Request $request){
        $this->validate($request,['type'=>'required']);

        $list=$request->get('id');
        $type=$request->get('type');
        for($i=0;$i<count($list);$i++){
            $date=$type==0?"0000-00-00 00:00:00":date('Y-m-d H:i:s',time());
            DB::table('users')->where('id',$list[$i])->update(array('delete_at'=>$date));
            $address=DB::table('users')->where('id',$list[$i])->pluck('name');
            $son_list=DB::table('catalogs')->where('father_catalog_name',$address)->lists('id');
            $this->traverse_catalog($son_list,$date,$type);
        }
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

    public function modify_permissions(Request $request){
        $this->validate($request,['id' => 'required']);

        $id=$request->get('id');
        $permission=$request->get('permission');

        if($permission==null){
            $count=count($id);
            for($i=0;$i<$count;$i++) {
                DB::table('users')->where('id', $id[$i])->update(array('admin' => 'user'));
            }
            return 1;
        }

        $permission_group=DB::table('permission_group')->get();
        $count1=count($permission_group);
        for($i=0;$i<$count1;$i++){
            $list=DB::table('permission_relationship')->where('group_name',$permission_group[$i]->group_name)->lists('permission_name');
            $result1=array_diff($list,$permission);
            $result2=array_diff($permission,$list);
            if(empty($result1)&&empty($result2)){
                $count2=count($id);
                for($j=0;$j<$count2;$j++){
                    DB::table('users')->where('id',$id[$j])->update(array('admin'=>$permission_group[$i]->group_name));
                }
                return 1;
            }
        }
        return -1;
    }

    public function get_permission_group(Request $request){
        $this->validate($request,['skip'=>'required',
            'size'=>'required']);
        $skip=$request->get('skip');
        $size=$request->get('size');
        $list=DB::table('permission_group')->where('group_name','<>','superAdmin')->skip($skip)->take($size)->get();
        $list[count($list)]=count(DB::table('permission_group')->where('group_name','<>','superAdmin')->get());
        return $list;
    }

    public function add_permission(Request $request){
        $this->validate($request,['group_name'=>'required',
            'permission'=>'required']);

        $group_name=$request->get('group_name');
        $permission=$request->get('permission');
        $sum_per=count($permission);

        $list=DB::table('permission_group')->get();
        $sum_lis=count($list);

        for($i=0;$i<$sum_lis;$i++){
            if($list[$i]->group_name==$group_name){
                return -1;
            }
            $result=DB::table('permission_relationship')->where('group_name',$list[$i]->group_name)->get();
            $sum_res=count($result);
            if($sum_per!=$sum_res) continue;
            for($j=0;$j<$sum_res;$j++){
                if($permission[$j]!=$result[$j]->permission_name) break;
                if($j==$sum_res-1){
                    return $list[$i]->name;
                }
            }
        }
        DB::table('permission_group')->insert(
            array('group_name'=>$group_name,'created_at'=>date('Y-m-d H:i:s',time()))
        );
        for($l=0;$l<$sum_per;$l++){
            DB::table('permission_relationship')->insert(
                array('group_name'=>$group_name,'permission_name'=>$permission[$l])
            );
        }
        return 1;
    }

    public function delete_permission(Request $request){
        $this->validate($request,['group_name'=>'required']);

        $group_name=$request->get('group_name');
        $sum=count($group_name);
        $result=array();

        for($i=0;$i<$sum;$i++){
            $list=DB::table('users')->where('admin',$group_name[$i])->select('name','email')->get();
            $result[$i]=$list;
            DB::table('users')->where('admin',$group_name[$i])->update(array('admin'=>'user'));
            DB::table('permission_group')->where('group_name',$group_name[$i])->delete();
            DB::table('permission_relationship')->where('group_name',$group_name[$i])->delete();
        }
        return $result;
    }

    public function edit_permission(Request $request){
        $this->validate($request,['old_name'=>'required',
            'new_name'=>'required']);

        $old_name=$request->get('old_name');
        $new_name=$request->get('new_name');
        $permission=$request->get('permission');
        $sum_per=count($permission);

        if($sum_per==0){
            $need_notify=DB::table('users')->where('admin',$old_name)->select('name','email')->get();
            $need_notify[count($need_notify)]=$permission;
            DB::table('users')->where('admin',$old_name)->update(array('admin'=>'user'));
            DB::table('permission_group')->where('group_name',$old_name)->delete();
            DB::table('permission_relationship')->where('group_name',$old_name)->delete();
            return $need_notify;
        }

        $list=DB::table('permission_group')->get();
        $sum_lis=count($list);
        for($i=0;$i<$sum_lis;$i++){
            if($old_name!=$new_name&&$list[$i]->group_name==$new_name){
                return -1;
            }
            $result=DB::table('permission_relationship')->where('group_name',$list[$i]->group_name)->get();
            $sum_res=count($result);
            if($sum_per==$sum_res){
                for($j=0;$j<$sum_res;$j++){
                    if($permission[$j]!=$result[$j]->permission_name) break;
                    if($j==$sum_res-1){
                        if($old_name!=$new_name){
                            if($list[$i]->group_name!=$old_name) {
                                return array($list[$i]->group_name);
                            }
                            else{
                                DB::table('permission_group')->where('group_name',$old_name)->update(array('group_name'=>$new_name));
                                DB::table('permission_relationship')->where('group_name',$old_name)->update(array('group_name'=>$new_name));
                                return 1;
                            }
                        }
                        else{
                            if($list[$i]->group_name!=$old_name) {
                                return array($list[$i]->group_name);
                            }
                            else return 0;
                        }
                    }
                }
            }
        }
        DB::table('users')->where('admin',$old_name)->update(array('admin'=>$new_name));
        $need_notify=DB::table('users')->where('admin',$new_name)->select('name','email')->get();
        $need_notify[count($need_notify)]=$permission;
        DB::table('permission_group')->where('group_name',$old_name)->update(array('group_name'=>$new_name));
        DB::table('permission_relationship')->where('group_name',$old_name)->delete();
        for($l=0;$l<$sum_per;$l++){
            DB::table('permission_relationship')->insert(
                array('group_name'=>$new_name,'permission_name'=>$permission[$l])
            );
        }
        return $need_notify;
    }

    public function get_suffix(Request $request){
        $this->validate($request,['type'=>'required',
                                  'skip'=>'required',
                                  'size'=>'required']);

        $group_name=$request->get('type');
        $skip=$request->get('skip');
        $size=$request->get('size');
        $list=DB::table('type')->where('group_name',$group_name)->skip($skip)->take($size)->get();
        $list[count($list)]=count(DB::table('type')->where('group_name',$group_name)->get());
        return $list;
    }

    public function add_suffix(Request $request){
        $this->validate($request,['type'=>'required',
                                  'name'=>'required']);

        $group_name=$request->get('type');
        $name=$request->get('name');
        DB::table('type')->insert(array('type_name'=>$name,'group_name'=>$group_name));
        return 'ok';
    }

    public function delete_suffix(Request $request){
        $this->validate($request,['type_name'=>'required',
                                  'group_name'=>'required']);

        $type_name=$request->get('type_name');
        $group_name=$request->get('group_name');
        DB::table('type')->where('type_name',$type_name)->where('group_name',$group_name)->delete();
        return 'ok';
    }

    public function search_user(Request $request){
        $this->validate($request,['flag'=>'required',
                                  'name'=>'required']);

        $flag=$request->get('flag');
        $name=$request->get('name');
        $list=null;
        if($flag=='permissiongroup'){
            $list= DB::table('permission_group')->where('group_name','<>','superAdmin')->where('group_name',$name)->get();
        }
        else if($flag=='user'){
            $list= DB::table('users')->where('admin','user')->where('delete_at','0000-00-00 00:00:00')->where('name',$name)->get();
        }
        else if($flag=='gm'){
            $list= DB::table('users')->where('name','<>','user')->where('name','<>','superAdmin')->where('delete_at','0000-00-00 00:00:00')->where('name',$name)->get();
        }
        else if($flag=='recycle'){
            $list= DB::table('users')->where('delete_at','<>','0000-00-00 00:00:00')->where('name',$name)->get();
        }
        $list[count($list)]=count($list);
        return $list;
    }

    public function get_garbage_user(Request $request){
        $this->validate($request,['skip'=>'required',
                                  'size'=>'required']);

        $skip=$request->get('skip');
        $size=$request->get('size');
        $list=DB::table('users')->where('delete_at','<>','0000-00-00 00:00:00')->skip($skip)->take($size)->get();
        $list[count($list)]=count(DB::table('users')->where('delete_at','<>','0000-00-00 00:00:00')->get());
        return $list;
    }

}