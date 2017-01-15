<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class message_messages extends Model {

    protected $fillable = [ 'body', 'owner_name', 'create_date'];

}
