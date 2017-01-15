<?php namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class catalogs extends Model {
    use SoftDeletes;
    protected $fillable = ['owner_name', 'md5', 'garbage', 'cur_catalog_name', 'father_catalog_name','validate',
                            'click','download','address','size','root_garbage'];
    protected $dates = ['deleted_at'];
}
