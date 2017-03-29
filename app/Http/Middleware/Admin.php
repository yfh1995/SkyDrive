<?php namespace App\Http\Middleware;

use Closure,Auth;

class Admin {


    public function handle($request, Closure $next){

        if(Auth::user()->admin!='abc'){
            return redirect('/admin/sky_drive');
        }

        return $next($request);
    }

}
