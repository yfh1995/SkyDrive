<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class permission extends Model {

	protected $table = 'permission';

    protected $fillable = [ 'permission_name', 'chinese_name'];

}
