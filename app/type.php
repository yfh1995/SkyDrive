<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class type extends Model {

    protected $table = 'type';

    protected $fillable = ['type_name','gid'];

}
