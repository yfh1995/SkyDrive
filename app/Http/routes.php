<?php

/**
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
Route::get('test','sky_drive\SD_Home_Controller@tt');
Route::get("Help","sky_drive\SD_Home_Controller@Help");
Route::get('/login','auth\LoginController@getlogin');								                                    //登陆页面1
Route::post('/login','auth\LoginController@postlogin');								                                    //登陆验证1
Route::get('/logout','auth\LogoutController@logout');								                                    //注销1
Route::get('/register','auth\RegisterController@get_register');							                                //注册页面1
Route::post('/register','auth\RegisterController@post_register');					                                    //注册并等待激活账户
Route::get('/register/activation_account','auth\RegisterController@activation_account');			                    //激活账户

Route::post('/email/create_user','emails\EmailController@create_user');                                                 //通知-创建用户

Route::group(['middleware'=>'auth'],function()
{
    Route::get('/reset','auth\ResetController@getreset');								                                //密码重置1
    Route::post('/reset','auth\ResetController@postreset');								                                //重置验证1
    Route::post('/auth/compulsory_change_password','auth\ResetController@compulsory_change_password');                  //管理员强制修改密码

    Route::post('/email/change_user_password','emails\EmailController@change_user_password');                           //通知-修改用户密码
    Route::post('/email/change_user_permission','emails\EmailController@change_user_permission');                       //通知-修改用户权限
    Route::post('/email/delete_user','emails\EmailController@delete_user');                                             //通知-删除用户
    Route::post('/email/change_group_permission','emails\EmailController@change_group_permission');                     //通知-权限组权限变更
    Route::post('/email/delete_permission_group','emails\EmailController@delete_permission_group');                     //通知-删除权限组
    Route::post('/email/restore_user','emails\EmailController@restore_user');                                           //通知-恢复用户

    Route::get('/', 'WelcomeController@index');									                                        //欢迎页面1

    Route::get('/home', 'HomeController@index');								                                        //网站主页1

    Route::get('/personal_center','personal_center\PE_Controller@index');		                                        //个人中心
    Route::post('/personal_center/storage_basic','personal_center\PE_Controller@storage_basic');		                //保存用户资料
    Route::post('/personal_center/storage_head','personal_center\PE_Controller@storage_head');		                    //保存用户头像
    Route::post('/personal_center/get_basic','personal_center\PE_Controller@get_basic');                                //取得用户资料
    Route::post('/personal_center/reset_password','personal_center\PE_Controller@reset_password');                      //修改密码

    Route::group(['middleware'=>'admin'],function()
    {
        Route::get('/admin/sky_drive','admin\SD_Controller@index');                                                     //网盘后台控制0
        Route::post('/admin/sky_drive/button_information','admin\SD_Controller@button_information');                    //按钮信息
        Route::post('/admin/sky_drive/user_information','admin\SD_Controller@user_information');                        //用户信息
        Route::post('/admin/sky_drive/admin_information','admin\SD_Controller@admin_information');                      //管理员信息
        Route::post('/admin/sky_drive/get_roles','admin\SD_Controller@get_roles');                                      //角色列表
        Route::post('/admin/sky_drive/get_permissions_by_name','admin\SD_Controller@get_permissions_by_name');          //获取权限
        Route::post('/admin/sky_drive/modify_roles','admin\SD_Controller@modify_roles');                                //修改用户角色
        Route::post('/admin/sky_drive/modify_permissions','admin\SD_Controller@modify_permissions');                    //更新角色权限
        Route::post('/admin/sky_drive/get_authority','admin\SD_Controller@get_authority');                              //取得权限组权限
        Route::post('/admin/sky_drive/delete_and_restore','admin\SD_Controller@delete_and_restore');                    //删除和还原用户、管理员
        Route::post('/admin/sky_drive/get_permission_group','admin\SD_Controller@get_permission_group');                //取得所有权限组
        Route::post('/admin/sky_drive/add_permission','admin\SD_Controller@add_permission');                            //添加权限组
        Route::post('/admin/sky_drive/delete_permission','admin\SD_Controller@delete_permission');                      //删除权限组
        Route::post('/admin/sky_drive/edit_permission','admin\SD_Controller@edit_permission');                          //修改权限组
        Route::post('/admin/sky_drive/get_suffix','admin\SD_Controller@get_suffix');                                    //取得后缀
        Route::post('/admin/sky_drive/add_suffix','admin\SD_Controller@add_suffix');                                    //添加后缀
        Route::post('/admin/sky_drive/delete_suffix','admin\SD_Controller@delete_suffix');                              //删除后缀
        Route::post('/admin/sky_drive/search_user','admin\SD_Controller@search_user');                                  //搜索用户
        Route::post('/admin/sky_drive/get_garbage_user','admin\SD_Controller@get_garbage_user');                        //获取被删除用户
        Route::get('/admin/sky_drive/get_different_files','admin\SD_Controller@get_different_files');                   //获取分类文件
        Route::post('/admin/sky_drive/delete_files','admin\SD_Controller@delete_files');                                //删除文件
        Route::get('/admin/sky_drive/delete_user','admin\SD_Controller@delete_user');                                   //彻底删除用户

        Route::get('/admin/forum','admin\Forum_Controller@index');                                                      //论坛后台控制0
    });

    Route::get('/sky_drive/home','sky_drive\SD_Home_Controller@index');					                                //网盘主页0
    Route::post('/sky_drive/type','sky_drive\SD_Home_Controller@type');                                                 //网盘分类0
    Route::post('/sky_drive/refresh','sky_drive\SD_Home_Controller@refresh');                                           //目录刷新
    Route::post('/sky_drive/upload','sky_drive\SD_Home_Controller@upload');                                             //文件上传处理
    Route::post('/sky_drive/set_up_catalog','sky_drive\SD_Home_Controller@set_up_catalog');                             //新建文件夹
    Route::post('/sky_drive/rename','sky_drive\SD_Home_Controller@rename');                                             //重命名
    Route::post('/sky_drive/delete_and_restore','sky_drive\SD_Home_Controller@delete_and_restore');                     //删除和还原
    Route::post('/sky_drive/get_garbage','sky_drive\SD_Home_Controller@get_garbage');                                   //获得垃圾文件
    Route::post('/sky_drive/get_page_information','sky_drive\SD_Home_Controller@get_page_information');                 //获得目录信息
    Route::post('/sky_drive/return_session_catalog','sky_drive\SD_Home_Controller@return_session_catalog');             //返回当前目录地址
    Route::post('/sky_drive/get_appoint_catalog','sky_drive\SD_Home_Controller@get_appoint_catalog');                   //取得指定目录的文件和文件夹
    Route::post('/sky_drive/get_move_catalog','sky_drive\SD_Home_Controller@get_move_catalog');                         //取得移动文件时所需目录信息
    Route::post('/sky_drive/move_catalog','sky_drive\SD_Home_Controller@move_catalog');                                 //移动文件、文件夹
    Route::post('/sky_drive/download_files','sky_drive\SD_Home_Controller@download_files');                             //下载文件
    Route::get('/sky_drive/share_list','sky_drive\SD_Home_Controller@getShareList');                                    //分享页面
    Route::get('/sky_drive/get_share_catalog','sky_drive\SD_Home_Controller@getShareCatalogs');                         //获取一次分享的目录信息
    Route::get('/sky_drive/deleteCatalogs','sky_drive\SD_Home_Controller@deleteCatalogs');                              //彻底删除目录

    Route::post('/sky_drive/preview','sky_drive\SD_Preview_Controller@preview');                                        //预览视频

    Route::post('/sky_drive/createShare','sky_drive\SD_Home_Controller@createShare');                                   //创建分享
    Route::get('/sky_drive/getShareData','sky_drive\SD_Home_Controller@getShareData');                                 //获取分享资源

    Route::get('/forum/home','forum\Forum_Home_Controller@index');					                                    //论坛主页0
    Route::get('/forum/post','forum\Forum_Home_Controller@index');					                                    //帖子页面0
});
