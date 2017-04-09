<?php namespace App\Http\Middleware;

use Closure,Auth;

class Admin {


    public function handle($request, Closure $next){

        //如果当前访问账号角色不为超级管理员和普通管理员则返回原页面
        if(Auth::user()->admin!=config('system_config.roles.root.name') && Auth::user()->admin!=config('system_config.roles.admin.name')){
            return redirect()->back()->withErrors('权限不足！');
        }

        return $next($request);
    }

}
