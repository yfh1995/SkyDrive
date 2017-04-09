<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class permission_relationship extends Model {

    protected $table = 'permission_relationship';

    protected $fillable = [ 'group_name','permission_name'];

}
