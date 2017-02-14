<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShareTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('share', function(Blueprint $table)
		{
			$table->increments('id');
            $table->string('share_code',32);
            $table->integer('catalog_id');
            $table->integer('owner_id');
            $table->timestamp('deadline');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('share');
	}

}
