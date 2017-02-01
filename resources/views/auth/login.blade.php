@extends('app')
@section('content')

<link href="{{ asset('/layui/css/layui.css')}}" rel="stylesheet" type="text/css">
<link href="{{ asset('/css/login.css')}}" rel="stylesheet" type="text/css">

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
						<label class=" col-md-4 control-label">邮箱</label>
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
						<label class="col-md-4	 control-label"></label>
						<label class="col-md-2 control-label" style="white-space:nowrap;">记住账号?</label>
						<div class="col-md-4">
							<input type="checkbox" checked name="open" lay-skin="switch" lay-filter="switchTest" title="开关">
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
<script src="{{asset("/layui/layui.js")}}"></script>
<script>
document.title="登录";
layui.use('form', function() {
	var form = layui.form();

});

</script>
@endsection
