<!DOCTYPE HTML>
<html lang="zh-CN">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="_token" content="{{ csrf_token() }}" />
		<title>Laravel</title>

		<link href="{{ asset('/css/app.css') }}" rel="stylesheet">
		<link href="{{ asset('/bootstrap-3.3.5-dist/css/bootstrap.min.css') }}" rel="stylesheet">
		<link href="{{ asset('/css/paging.css') }}" rel="stylesheet">
		<link href="{{ asset('/bootstrap-3.3.5-dist/css/fileinput.min.css')}}" media="all" rel="stylesheet" type="text/css" />
		<link rel='icon' href="{{ asset('/favicon.ico') }}"  type='image/x-ico' />
		<link href="{{ asset('/mdui-v0.1.2/css/mdui.min.css') }}" rel="stylesheet" >

		<script src="{{asset('/js/jquery-2.1.1.min.js')}}" type="text/javascript"></script>
		<script src="{{asset('/bootstrap-3.3.5-dist/js/bootstrap.min.js')}}" type="text/javascript"></script>
		<script src="{{asset('/js/jquery-form.js')}}" type="text/javascript"></script>
		<script src="{{asset('/js/query.js')}}" type="text/javascript"></script>
		<script src="{{asset('/js/paging.js')}}" type="text/javascript"></script>
		<script src="{{asset('/js/common.js')}}" type="text/javascript"></script>

		<script src="{{asset('/js/WangPanJS.js')}}" type="text/javascript" charset='gb2312'></script>
		<script src="{{asset('/bootstrap-3.3.5-dist/js/plugins/canvas-to-blob.min.js')}}" type="text/javascript"></script>
		<script src="{{asset("/bootstrap-3.3.5-dist/js/fileinput.min.js")}}"></script>
		<script src="{{asset("/bootstrap-3.3.5-dist/js/fileinput_locale_zh.js")}}"></script>
		<script src="{{asset('/mdui-v0.1.2/js/mdui.min.js')}}"></script>

		<!-- Fonts -->

		<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
		<script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
		<script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->

		@yield('style')

	</head>
	<body>

		@include('message')

		<nav class="navbar navbar-default " style="margin:0px;padding:0px;">
			<div class="" >
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
					<span class="sr-only">Toggle Navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand mdui-ripple" href="#">
						Laravel
					</a>
				</div>
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav">
						<li>
							<a class='mdui-ripple' href="{{ url('/') }}">
								Home
							</a>
						</li>
					</ul>
					<ul class="nav navbar-nav navbar-right">
						@if (Auth::guest())
						<li>
							<a class='mdui-ripple' href="{{ url('/login') }}">
								登录
							</a>
						</li>
						<li>
							<a class='mdui-ripple' href="{{ url('/register') }}">
								注册
							</a>
						</li>
						@else
						<li>
							<div id="photoofhead1" class="profile-header" style=" width: 50px;height: 50px;margin: 0px;padding: 0px;" >
								<div id="photoofhead2" class="profile-header" style="width: 50px;height: 50px;margin: 0px;padding: 0px;">
									<a >
										<img src="/website/head_picture/{{Auth::user()->name}}.jpg" >
									</a>
								</div>
							</div>
						</li>
						<li class="dropdown">
							<a href="{{ url('/personal_center') }}" id="yangfuhao">
								{{ Auth::user()->name }}
							</a>
						</li>
						<!--@if(Auth::user()->admin != config('system_config.roles.user'))
						<li><a href="{{ url('admin/sky_drive') }}">后台管理</a></li>
						@endif-->
						<!--<li><a href="{{ url('logout') }}">注销</a></li>-->
						@endif
					</ul>
					<div id='myDownList'>
						<div class='mylist_info'>
							<div class="mylist_info_arrwo"></div>
							<p class='mylist_info_img'>
								<img src="/website/head_picture/{{Auth::user()->name}}.jpg" alt="" />
							</p>
							<p class='mylist_info_name'>
								{{ Auth::user()->name }}
							</p>
						</div>
						<div class='myOperatorList'>
							<div class='myOperatorList_item'>
								<a href="{{url('/personal_center')}}">
									个人中心
								</a><span></span>
							</div>
							<div class='myOperatorList_item'>
								<a href="{{ url('Help') }}">
									网盘帮助
								</a><span></span>
							</div>
							@if(Auth::user()->admin != config('system_config.roles.user'))
							<div class='myOperatorList_item'>
								<a href="{{ url('admin/sky_drive') }}">
									后台管理
								</a><span></span>
							</div>
							@endif
							<div class='myOperatorList_item'>
								<a href="{{ url('logout') }}">
									退出
								</a>
							</div>
						</div>

					</div>
				</div>
			</div>
		</nav>

		@yield('content')

		<!-- Scripts -->

		<script>
			function myAlert(str) {
		$(".ErrorTips").remove();
		$("#alertErrorBox").prepend("<p class='ErrorTips'>" + str + "！</p>");
		$("#coverBg").show();
	}
			$(document).ready(function() {
	

	function getTop(e) {
		var offset = e.offsetTop;
		if(e.offsetParent != null) offset += getTop(e.offsetParent);
		return offset;
	}

	//获取元素的横坐标
	function getLeft(e) {
		var offset = e.offsetLeft;
		if(e.offsetParent != null) offset += getLeft(e.offsetParent);
		return offset;
	}
	var IsoverList = false; //用来判断是否在下拉菜单上面
	var headimg = document.getElementById("photoofhead2");
	var left, top;

	$("#photoofhead2").on("click", function() {
		IsoverList = true;
		left = getLeft(headimg) - 100 + 20,
			top = 70;
		$("#myDownList").css({
			"top": top + "px",
			"left": left + "px"
		}).show();

	});
	$(document).on("click", function(e) {
		console.log(e.pageX + " " + e.pageY);

		console.log(left + " " + top);
		if(left <= e.pageX && (left + 200) >= e.pageX && e.pageY >= top && e.pageY <= top + 215) {

		} else {

			if(!IsoverList)
				$("#myDownList").hide();
			IsoverList = false;
		}
	})

})</script>
	</body>
</html>
