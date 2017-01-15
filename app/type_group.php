<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class type_group extends Model {

    protected $fillable = ['owner_name'];

    public function hasManyComments()
    {
        return $this->hasMany('App\type', 'gid', 'id');
    }

}
