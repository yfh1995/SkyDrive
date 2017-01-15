<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCatalogsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('catalogs', function(Blueprint $table)
		{
			$table->increments('id');
			$table->char('owner_name',255);
			$table->char('md5',64)->default(NULL);
			$table->timestamp('garbage');
			$table->char('cur_catalog_name',255);
			$table->char('father_catalog_name',255);
			$table->boolean('validate')->default(NULL);
			$table->integer('click')->default(0);
			$table->integer('download')->default(0);
			$table->char('address',255)->default(NULL);
			$table->bigInteger('size')->default(-1);
			$table->tinyInteger('root_garbage')->default(0);
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
		Schema::drop('catalogs');
	}

}
