<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class message_messages extends Model {

	protected $table = 'message_messages';

    protected $fillable = [ 'body', 'owner_name', 'create_date'];

}
