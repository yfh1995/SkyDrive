<?php namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesCommands;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;

abstract class Controller extends BaseController {

	use DispatchesCommands, ValidatesRequests;

	public function getShowSize($size){
		if($size<1024) return $size.'B';
		$size = round($size/1024,2);
		if($size<1024) return $size.'KB';
		$size = round($size/1024,2);
		if($size<1024) return $size.'MB';
		return round($size/1024,2).'GB';
	}

	function object_array($array) {
		if(is_object($array)) {
			$array = (array)$array;
		} if(is_array($array)) {
			foreach($array as $key=>$value) {
				$array[$key] = $this->object_array($value);
			}
		}
		return $array;
	}
}
