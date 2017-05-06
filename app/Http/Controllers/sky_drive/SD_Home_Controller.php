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

    /**
     * 网盘首页，包含全部文件、分类文件、垃圾文件的首次、翻页访问
     * @param Request $request
     * @return $this
     */
    public function Help(){
    	return view("sky_drive/wangpanHelp");
    }
    public function index(Request $request){
        $params = $request->all();

        $user_name = Auth::user()->name;
        $size = config('system_config.page_size');
        if(isset($params['size'])) $size = (int)$params['size'];
        $where['owner_name'] = $user_name;

        //如果未指明请求类型，或未知的请求类型，则ajax请求返回空，正常请求返回主页面
        if(!isset($params['type']) || $params['type']<0 || $params['type']>2){
            if(isset($params['last_id'])) return [];
            else return view('sky_drive.show');
        }

        //如果为全部文件的请求
        if($params['type']==0){
            $where['garbage'] = '0000-00-00 00:00:00';
            $where['father_catalog_name'] = isset($params['father_catalog_name'])?$params['father_catalog_name']:$user_name;
        }
        //如果为分类的请求
        else if($params['type']==1){
            if(!isset($params['file_type'])) return [];
            $where['garbage'] = '0000-00-00 00:00:00';
            $where['address'] = '/website/storage/' . $params['file_type'];
        }
        //如果为回收站的请求
        else{
            //如果有父目录信息
            if(isset($params['father_catalog_name'])){
                $where['father_catalog_name'] = $params['father_catalog_name'];
            }else{
                $where['root_garbage'] = 1;
            }
        }

        //如果为翻页或为分类文件，则判断last_id是否为文件，若为文件则只取文件
        if(isset($params['last_id']) || $params['type']==1){
            if(isset($params['last_id'])) $last_info = DB::table('catalogs')->where('id',$params['last_id'])->first();
            if($params['type']==1 || $last_info->address){
                $table = DB::table('catalogs')->where($where)->where('size','<>','-1');

                if(isset($params['last_id'])) $table->where('id','<',$params['last_id']);

                $catalogs_info = $table->orderBy('id','desc')->take($size)->get();
                foreach($catalogs_info as $v){
                    $v->size = $v->size=='-1'?$v->size:$this->getShowSize($v->size);
                }

                $user_info = DB::table('users')->select('used_space')->where('id',Auth::user()->id)->first();
                $user_info->used_space = $this->getShowSize($user_info->used_space);
                $user_info->total_space = $this->getShowSize(config('system_config.storage_space_size'));

                if(isset($params['last_id'])) return $catalogs_info;
                else return view('sky_drive.show')->with('data',['user_info'=>$user_info,'catalogs_info'=>$catalogs_info]);
            }
        }

        //取文件夹数据
        $table = DB::table('catalogs');
        $table = $table->where($where)->where('size','-1');
        if(isset($params['last_id'])) $table->where('id','<',$params['last_id']);
        $catalogs_info = $table->orderBy('id','desc')->take($size)->get();

        //转换数据单位
        foreach($catalogs_info as &$v){
            $v->size = $v->size=='-1'?$v->size:$this->getShowSize($v->size);
        }

        //如果文件夹数据不足一页数据量，则取文件
        if($size-count($catalogs_info)){
            $file_info = DB::table('catalogs')
                ->where($where)
                ->where('size','<>','-1')
                ->orderBy('id','desc')
                ->take($size-count($catalogs_info))
                ->get();
            foreach($file_info as &$v){
                $v->size = $v->size=='-1'?$v->size:$this->getShowSize($v->size);
                $catalogs_info[] = $v;
            }
        }

        $user_info = DB::table('users')->select('used_space')->where('id',Auth::user()->id)->first();
        $user_info->used_space = $this->getShowSize($user_info->used_space);
        $user_info->total_space = $this->getShowSize(config('system_config.storage_space_size'));

        if(isset($params['last_id'])) return $catalogs_info;
        else return view('sky_drive.show')->with('data',['user_info'=>$user_info,'catalogs_info'=>$catalogs_info]);
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

//        $params = $request->all();
//
//        $user_name = Auth::user()->name;
//        $size = 10;
//        if(isset($params['size'])) $size = (int)$params['size'];
//        $where['owner_name'] = $user_name;
//        $where['garbage'] = '0000-00-00 00:00:00';
//        $where['father_catalog_name'] = $user_name;
//        if(isset($params['father_catalog_name'])) $where['father_catalog_name'] = $params['father_catalog_name'];
//        if(isset($params['type'])) $where['address'] = '/website/storage/'.$params['type'];
//
//        $data = DB::table('catalogs')
//            ->where($where)
//            ->orderBy('address')
//            ->get();
//        ->paginate($size);

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
        $this->validate($request,['file' => 'required']);
        $params = $request->all();

        $file=$request->file('file');
        $father_catalog_name = isset($params['father_catalog_name'])?$params['father_catalog_name']:Auth::user()->name;
        $md5 = md5_file($file);
        if ($md5) {
            $gid=DB::table('type')->where('type_name',$file->getClientOriginalExtension())->first();
            if($gid==NULL) $type='other';
            else $type=$gid->group_name;

            $cur_catalog_same_file = DB::table('catalogs')->where('father_catalog_name', $father_catalog_name)->where('md5', $md5)->first();
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

                    $request->file('file')->move( 'website/storage/'.$type,$md5.'.'.$file->getClientOriginalExtension());
//                    Storage::disk($type)->put($md5.'.'.$file->getClientOriginalExtension(), fopen($file, "r+"));
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
                $create_catalog->father_catalog_name = $father_catalog_name;
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

    public function createShare(Request $request){
        $params = $request->all();

        $ids = $params['ids'];
        $deadline = $params['deadline'];
        if(empty($ids)) return ['result'=>'false','message'=>'分享的资源数组不能为空！'];
        if(empty($deadline)) return ['result'=>'false','message'=>'分享期限不能为空！'];
        $shareCode = $this->createShareCode($ids);
        $user_id = Auth::user()->id;
//        $user_id = 30;
        $data = array();
        $time = time();
        foreach($ids as $id){
            $one = array();
            $one['share_code'] = $shareCode;
            $one['catalog_id'] = $id;
            $one['owner_id'] = $user_id;
            $one['deadline'] = date('Y-m-d H:i:s',$time + $deadline);
            $one['created_at'] = date('Y-m-d H:i:s',$time);
            $one['updated_at'] = date('Y-m-d H:i:s',$time);
            $data[] = $one;
        }

        $rs = DB::table('share')->insert($data);
        if($rs === false) return ['result'=>false,'message'=>'创建失败！'];
        else return ['result'=>true,'message'=>$shareCode];
    }

    public function createShareCode($ids){
        $str = time();
        foreach($ids as $id){
            $str .= $id;
        }
        return md5($str);
    }

    public function getShareData(Request $request){
        $params = $request->all();

        $time = date('Y-m-d H:i:s',time());
        $size = isset($params['size'])?$params['size']:config('system_config.page_size');
        if(!isset($params['share_code'])) return ['result'=>false,'message'=>'分享码为空！'];

        //如果为翻页，则判断last_id是否为文件，若为文件则只取文件
        if(isset($params['last_id'])){
            $last_info = DB::table('catalogs')->where('id',$params['last_id'])->first();
            if($last_info->address){
                $data = DB::table('share as s')
                    ->join('catalogs as c','c.id','=','s.catalog_id')
                    ->select(DB::raw('c.*'))
                    ->where('s.deadline','<',$time)
                    ->where('s.share_code',$params['share_code'])
                    ->where('c.size','<>','-1')
                    ->where('c.id','<',$params['last_id'])
                    ->orderBy('c.id','desc')
                    ->take($size)
                    ->get();
                foreach($data as $v){
                    $v->size = $v->size=='-1'?$v->size:$this->getShowSize($v->size);
                }
                return $data;
            }
        }

        //取文件夹数据
        $table = DB::table('share as s');
        $table = $table
            ->join('catalogs as c','c.id','=','s.catalog_id')
            ->select(DB::raw('c.*'))
            ->where('s.deadline','<',$time)
            ->where('s.share_code',$params['share_code'])
            ->where('c.size','-1');
        if(isset($params['last_id'])) $table->where('c.id','<',$params['last_id']);
        $catalogs_info = $table->orderBy('c.id','desc')->take($size)->get();

        //转换数据单位
        foreach($catalogs_info as $v){
            $v->size = $v->size=='-1'?$v->size:$this->getShowSize($v->size);
        }

        //如果文件夹数据不足一页数据量，则取文件
        if($size-count($catalogs_info)){
            $file_info = DB::table('share as s')
                ->join('catalogs as c','c.id','=','s.catalog_id')
                ->select(DB::raw('c.*'))
                ->where('s.deadline','>',$time)
                ->where('s.share_code',$params['share_code'])
                ->where('c.size','<>','-1')
                ->orderBy('c.id','desc')
                ->take($size-count($catalogs_info))
                ->get();
            foreach($file_info as $v){
                $v->size = $v->size=='-1'?$v->size:$this->getShowSize($v->size);
                $catalogs_info[] = $v;
            }
        }

        $user_info = DB::table('users')->select('used_space')->where('id',Auth::user()->id)->first();
        $user_info->used_space = $this->getShowSize($user_info->used_space);
        $user_info->total_space = $this->getShowSize(config('system_config.storage_space_size'));

        if(isset($params['last_id'])) return $catalogs_info;
        else return view('sky_drive.show')->with('data',['user_info'=>$user_info,'catalogs_info'=>$catalogs_info]);
    }

    public function download_files(Request $request){
        $params = $request->all();

        if(!isset($params['ids']) || !$params['ids']) return;
		$params['ids']=explode(",", $params['ids']);
        $father_catalog_name = isset($params['father_catalog_name'])?$params['father_catalog_name']:Auth::user()->name;
		
        $data = DB::table('catalogs')->whereIn('id',$params['ids'])->get();

        $zipFileName = 'website/storage/other/'.$father_catalog_name.'.zip';
//        $zipFileName = $father_catalog_name.'.zip';

        $zip = new \ZipArchive();
        if($zip->open($zipFileName, \ZipArchive::CREATE)=== TRUE){
            $this->addFileToZip($data, $zip, ''); //调用方法，对要打包的根目录进行操作，并将ZipArchive的对象传递给方法
            $zip->close(); //关闭处理的zip文件
        }

        if(!file_exists($zipFileName))
        {
            echo '文件压缩失败！或者未生成压缩包！！';
            exit;
        }

        header("Cache-Control: public");
        header("Content-Description: File Transfer");
        header('Content-disposition: attachment; filename='.basename($zipFileName)); //文件名
        header("Content-Type: application/octet-stream"); //zip格式的
        header("Content-Transfer-Encoding: binary"); //告诉浏览器，这是二进制文件
        header('Content-Length: '. filesize($zipFileName)); //告诉浏览器，文件大小
        @readfile($zipFileName);
        unlink($zipFileName);
    }

    public function addFileToZip($data,$zip,$path){

        foreach($data as $v){
            if($v->size == '-1'){
                $catalog_data = DB::table('catalogs')->where('father_catalog_name',$v->father_catalog_name.'/'.$v->cur_catalog_name)->get();
                $this->addFileToZip($catalog_data,$zip,$path.$v->cur_catalog_name.'/');
            }else{
                $file_data = DB::table('catalogs as c')
                    ->join('files as f','f.md5','=','c.md5')
                    ->select(DB::raw('f.md5,f.address,f.type,c.father_catalog_name,c.cur_catalog_name'))
                    ->where('c.id',$v->id)
                    ->first();
                $address = $file_data->address.'/'.$file_data->md5.'.'.$file_data->type;
                $zip->addFile(substr($address,1),$path.$file_data->cur_catalog_name);
            }
        }
    }

    public function getShareList(Request $request){
        $params = $request->all();

        $size = isset($params['size'])?$params['size']:config('system_config.page_size');

        $table = DB::table('share')->where('owner_id',Auth::user()->id);
        if(isset($params['last_id'])) $table->where('id','<',$params['last_id']);
        $data = $table->groupBy('share_code')->orderBy('id','desc')->take($size)->get();

        if(isset($params['last_id'])) return $data;
        else{
            $user_info = DB::table('users')->select('used_space')->where('id',Auth::user()->id)->first();
            $user_info->used_space = $this->getShowSize($user_info->used_space);
            $user_info->total_space = $this->getShowSize(config('system_config.storage_space_size'));

            return view('sky_drive.share')->with('data',['user_info'=>$user_info,'share_info'=>$data]);
        }
    }

    public function getShareCatalogs(Request $request){
        $this->validate($request,[
            'share_code'    =>  'required'
        ],[
            'share_code.required'   =>  '缺少分享码'
        ]);

        $data = DB::table('share as s')
            ->join('catalogs as c','c.id','=','s.catalog_id')
            ->select(DB::raw('c.cur_catalog_name,c.father_catalog_name'))
            ->where('s.share_code',$request->get('share_code'))
            ->get();
        $result = [];
        foreach($data as $v){
            $result[] = $v->father_catalog_name.'/'.$v->cur_catalog_name;
        }

        return $result;
    }

    public function deleteCatalogs(Request $request){
        $params = $request->all();

        if(!isset($params['ids'])) return '操作对象数组不存在';

        $rs = DB::table('catalogs')->whereIn('id',$params['ids'])->delete();
        if(!$rs) return '删除失败！';
        else return 1;
    }
}