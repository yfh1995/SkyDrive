<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class posts extends Model {

    protected $fillable = ['title', 'body', 'owner_name', 'create_date'];

}