<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class files extends Model {

	protected $table = 'files';

    protected $fillable = ['md5', 'file_size', 'create_date', 'owner_num', 'type','validate'];

}
