<?php

use Illuminate\Database\Seeder;
use App\User;

class UserTableSeeder extends Seeder {

    public function run() {
        DB::table('users')->delete();

        User::create([
            'id'=>1,
            'name'=>'yfh',
            'email'=>'690828339@qq.com',
            'password'=>Hash::make('690828339'),
            'admin'=>1
        ]);
    }

}
