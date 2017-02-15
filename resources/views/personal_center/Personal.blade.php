@extends('app')
@section('content')
    {{--个人中心头像上传插件--}}
    <script src="{{asset('/js/cropbox.js')}}" type="text/javascript"></script>
    <link href="{{asset('/css/style_picture.css')}}" rel="stylesheet"  type="text/css">

    <link href="{{asset('/css/Personal.css')}}" rel="stylesheet" type="text/css">
    <link href="{{asset('/particle/style.css')}}" rel="stylesheet" type="text/css">
    <script src="{{asset('/js/d3.js')}}" charset="GBK" type="text/javascript"></script>
     <script src="{{asset('/particle/particleground.all.js')}}" charset="GBK" type="text/javascript"></script>
    <script src="{{asset('/js/Personal.js')}}" charset="GBK" type="text/javascript"></script>

    <meta charset="utf-8">
    <style type="text/css">

    </style>
    <script>

    </script>
    <div id="demo"></div>
    <div id="KJKJKJ" style="display: none;"></div>
    <div class="container" >
        <div class="top">
            <ul id="mytab1" class="list-group">
                <li class="list-group-item textColor"><a><h1>个人中心 </h1></a></li>
            </ul>
        </div>
        <div class="left-top " >

            <ul id="mytab2" class="list-group hehe-1 col-md-2" >
                <div id="cao_1"  onclick="ckck()" style="width: 100px;height: 100px;  margin-left: 37px;">
                    <div id="cao_2" style="width: 100px;height: 100px; ">

                    </div>

                </div>
                <br>
                <li  class="list-group-item"><a><b>个人资料</b></a></li>
				
                <li id="List_1" onclick="akak();" class="list-group-item "><a style="text-decoration: none;" href="#basic">基本资料</a></li>
                <li id="List_3" onclick="D3show();" class="list-group-item ">
					<a style="text-decoration: none;" href="#basic">
					个人中心
					</a>
				</li>
                <li  class="list-group-item"><a><b>密码管理</b></a></li>
                <li id="List_2" onclick="bkbk();" class="list-group-item"><a style="text-decoration: none" href="#changes">修改密码</a></li>
            </ul>
			<div id="d3Divshow" class='col-md-10'>
			
			</div>
        </div>

        <div id="aaaa"></div>
        <div id="bbbb"></div>
        <div id="cccc"></div>


    </div>

@endsection