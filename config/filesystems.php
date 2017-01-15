<?php

return [

	/*
	|--------------------------------------------------------------------------
	| Default Filesystem Disk
	|--------------------------------------------------------------------------
	|
	| Here you may specify the default filesystem disk that should be used
	| by the framework. A "local" driver, as well as a variety of cloud
	| based drivers are available for your choosing. Just store away!
	|
	| Supported: "local", "s3", "rackspace"
	|
	*/

	'default' => 'local',

	/*
	|--------------------------------------------------------------------------
	| Default Cloud Filesystem Disk
	|--------------------------------------------------------------------------
	|
	| Many applications store files both locally and in the cloud. For this
	| reason, you may specify a default "cloud" driver here. This driver
	| will be bound as the Cloud disk implementation in the container.
	|
	*/

	'cloud' => 's3',

	/*
	|--------------------------------------------------------------------------
	| Filesystem Disks
	|--------------------------------------------------------------------------
	|
	| Here you may configure as many filesystem "disks" as you wish, and you
	| may even configure multiple disks of the same driver. Defaults have
	| been setup for each driver as an example of the required options.
	|
	*/

	'disks' => [

		'archive' => [
			'driver' => 'local',
			'root' => 'F:/Chowder/laravel2/public/website/storage/archive',
			/*'root'   => storage_path().'/app',*/
		],

		'bt' => [
			'driver' => 'local',
			'root' => 'F:/Chowder/laravel2/public/website/storage/bt',
			/*'root'   => storage_path().'/app',*/
		],

		'music' => [
			'driver' => 'local',
			'root' => 'F:/Chowder/laravel2/public/website/storage/music',
			/*'root'   => storage_path().'/app',*/
		],

		'other' => [
			'driver' => 'local',
			'root' => 'F:/Chowder/laravel2/public/website/storage/other',
			/*'root'   => storage_path().'/app',*/
		],

		'picture' => [
			'driver' => 'local',
			'root' => 'F:/Chowder/laravel2/public/website/storage/picture',
			/*'root'   => storage_path().'/app',*/
		],

		'text' => [
			'driver' => 'local',
			'root' => 'F:/Chowder/laravel2/public/website/storage/text',
			/*'root'   => storage_path().'/app',*/
		],

		'video' => [
			'driver' => 'local',
			'root' => 'F:/Chowder/laravel2/public/website/storage/video',
			/*'root'   => storage_path().'/app',*/
		],

		'head_picture' => [
			'driver' => 'local',
			'root' => 'F:/Chowder/laravel2/public/website/head_picture',
		],

		's3' => [
			'driver' => 's3',
			'key'    => 'your-key',
			'secret' => 'your-secret',
			'region' => 'your-region',
			'bucket' => 'your-bucket',
		],

		'rackspace' => [
			'driver'    => 'rackspace',
'username'  => 'your-username',
			'key'       => 'your-key',
			'container' => 'your-container',
			'endpoint'  => 'https://identity.api.rackspacecloud.com/v2.0/',
			'region'    => 'IAD',
			'url_type'  => 'publicURL'
		],

	],

];
