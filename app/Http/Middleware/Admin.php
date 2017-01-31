<?php namespace App\Http\Middleware;

use Closure,Auth;

class Admin {


    public function handle($request, Closure $next){

        if(Auth::user()->admin!='admin'){
            return redirect('/');
        }

        return $next($request);
    }

}
