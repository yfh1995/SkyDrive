@extends('app')
@section('content')

<link href="{{ asset('/layui/css/layui.css')}}" rel="stylesheet" type="text/css">
<link href="{{ asset('/css/login.css')}}" rel="stylesheet" type="text/css">
  <div class="csshub-ribbon-wrapper">
      <a class="csshub-ribbon" href="https://github.com/yfh1995/SkyDrive" target="_blank">Github</a>
    </div>

<!--<div class="container-fluid">
<div class="row">
<div class="col-md-8 col-md-offset-2">
<div class="panel panel-default">
<div class="panel-heading">
想玩？滚去注册先！
</div>
<div class="panel-body">
@if (count($errors) > 0)
<div class="alert alert-danger">
<strong>我靠！</strong>你的输入有很大的问题！
<br>
<br>
<ul>
@foreach ($errors->all() as $error)
<li>
{{ $error }}
</li>
@endforeach
</ul>
</div>
@endif

<form class="form-horizontal" role="form" method="POST" action="{{ url('/login') }}">
<input type="hidden" name="_token" value="{{ csrf_token() }}">

<div class="form-group">
<label class="col-md-4 control-label">邮箱</label>
<div class="col-md-6">
<input type="email" class="form-control" name="email" value="{{ old('email') }}">
</div>
</div>

<div class="form-group">
<label class="col-md-4 control-label">密码</label>
<div class="col-md-6">
<input type="password" class="form-control" name="password">
</div>
</div>

<div class="form-group">
<div class="col-md-6 col-md-offset-4">
<div class="checkbox">
<label>
<input type="checkbox" name="remember">
记住我 </label>
</div>
</div>
</div>

<div class="form-group">
<div class="col-md-6 col-md-offset-4">
<button type="submit" class="btn btn-primary">
登录
</button>

<a class="btn btn-link" href="">
忘记密码？
</a>
</div>
</div>
</form>
</div>
</div>
</div>
</div>
</div>-->
<div id="lay_bg" style="position:absolute;top:0;left:0;bottom:0;right:0;z-index:-1	;overflow: hidden;">
			<img id="lay_bg_img" style="position:absolute;opacity: .8;" src="./img/loginbg4.jpg" alt="" />
</div>
<div  class="container"  >
	<div class="row">
		<div class="login-box">
			<header>
				<h1>欢迎登录</h1>
			</header>
			<div class='login-main'>
				<form class="form-horizontal layui-form layui-form-pane1" role="form" method="POST" action="{{ url('/login') }}">
					<input type="hidden" name="_token" value="{{ csrf_token() }}">
					<div class="form-group" style="margin-top:50px;">
						<label class="womendouxiao  col-sm-4 col-md-4 col-lg-4 control-label">邮箱</label>
						<div class=" col-sm-6 col-md-6 col-lg-6">
							<input type="email" class="form-control" name="email" value="{{ old('email') }}">
						</div>
					</div>

					<div class="form-group">
						<label class="womendouxiao col-sm-4 col-md-4 col-lg-4 control-label">密码</label>
						<div class=" col-sm-6 col-md-6 col-lg-6">
							<input type="password" class="form-control" name="password">
						</div>
					</div>
					<div class="form-group">
						<label class="womendouxiao  col-sm-4 col-md-4 col-lg-4	 control-label"></label>
						<label class=" col-sm-2 col-md-2 col-lg-2 control-label" style="white-space:nowrap;">记住账号?</label>
						<div class=" col-sm-4 col-md-4 col-lg-4">
							<input type="checkbox" checked name="open" lay-skin="switch" lay-filter="switchTest" title="开关">
						</div>
					</div>

					<div class="form-group">
						<label class="womendouxiao  col-sm-4 col-md-4 col-lg-4	 control-label"></label>
						<div class=" col-sm-6 col-md-6 col-lg-6 ">
							<button type="submit" class="btn btn-primary">
							登录
							</button>
							<a class="btn btn-link" href="">
								忘记密码？
							</a>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
<script src="{{asset("/layui/layui.js")}}"></script>
<script>
document.title="登录";
layui.use('form', function() {
	var form = layui.form();

});

			window.onresize=function(){
				changeBGWidthAndHeight();
			}
changeBGWidthAndHeight();
function changeBGWidthAndHeight(){
				var bg=document.getElementById("lay_bg"),
				bg_img=document.getElementById("lay_bg_img"),
				cw=$(window).width(),
				ch=$(window).height(),
				iw=bg_img.offsetWidth,
				ih=bg_img.offsetWidth;
				console.log(cw+" "+ch+" "+iw+" "+ih);
				
			bg.style.width = cw + "px";
			bg.style.height = ch + "px";

			if(cw / ch > iw / ih){
				var new_h = cw * ih / iw,
						imgTop = (ch - new_h) / 2;
				bg_img.style.width = cw + "px";
				bg_img.style.height = new_h + "px";
				bg_img.style.top = imgTop + "px";
				bg_img.style.left = "";
			}else{
				var new_w = ch * iw / ih,
						imgLeft = (cw - new_w) / 2;
				bg_img.style.width = new_w + "px";
				bg_img.style.height = ch + "px";
				bg_img.style.left = imgLeft + "px";
				bg_img.style.top = "";
			}
			}
</script>
@endsection
