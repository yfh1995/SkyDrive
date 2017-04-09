<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class permission_group extends Model {

    protected $table = 'permission_group';

    protected $fillable = [ 'group_name'];

}
