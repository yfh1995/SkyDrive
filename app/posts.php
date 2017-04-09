<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class posts extends Model {

    protected $table = 'posts';

    protected $fillable = ['title', 'body', 'owner_name', 'create_date'];

}
