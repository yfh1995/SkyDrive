@extends('app')

@section('content')
<link href="{{ asset('/css/register.css')}}" rel="stylesheet" type="text/css">
<link href="{{ asset('/css/animate.css')}}" rel="stylesheet" type="text/css">
<script>document.title = "注册";
var name, email, password, repeatpassword, activation_code;
$(document).on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", ".show-tips", function() {
	$(this).removeClass("animated tada");
	
	setTimeout(function(){
		$(".show-tips").hide();
	},500);

});

function register() {
	name = document.getElementById('name').value;
	email = document.getElementById('email').value;
	password = document.getElementById('password').value;
	repeatpassword = document.getElementById('repeatpassword').value;
	//	alert(name + "  " + email + "  " + password + "  " + repeatpassword);
	if(name == undefined || name == "") {
		$(".show-tips>span").text("请填写昵称")
		$(".show-tips").show().addClass('animated tada');
		return;
	}
	if(email == undefined || email == "") {
		$(".show-tips>span").text("邮箱不可以为空")
		$(".show-tips").show().addClass('animated tada');
		return;
	}
	if(password == undefined || password == "") {
		$(".show-tips>span").text("请填写密码")
		$(".show-tips").show().addClass('animated tada');
		return;
	}
	if(repeatpassword == undefined || repeatpassword == "") {
		$(".show-tips>span").text("两次密码不一样")
		$(".show-tips").show().addClass('animated tada');
		return;
	}
	$.ajax({
		url: '/register',
		type: 'post',
		async: false,
		data: {
			'name': name,
			'email': email,
			'password': document.getElementById('password').value,
			'repeatpassword': document.getElementById('repeatpassword').value
		},
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},
		success: function(data) {
			alert('success');
			activation_code = data;
			alert(activation_code);
		},
		error: function() {
			alert('error');
		}
	});
}

function send_email() {
	alert(name + "  " + email + "  " + activation_code);
	$.ajax({
		url: '/email/create_user',
		type: 'post',
		async: false,
		data: {
			'name': name,
			'email': email,
			'activation_code': activation_code
		},
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},
		success: function(data) {
			alert('success!!');
		},
		error: function() {
			alert('error!!');
		}
	});
}</script>
<div class="container-fluid register-box">
	<div class="row">
		<div class='show-tips' style=''>
			<span></span>
		</div>
		<!--<div class="col-md-8 col-md-offset-2">
		<div class="panel panel-default">
		<div class="panel-heading">注册</div>
		<div class="panel-body">
		@if (count($errors) > 0)
		<div class="alert alert-danger">
		<strong>我靠！</strong>你的输入有很大的问题！<br><br>
		<ul>
		@foreach ($errors->all() as $error)
		<li>{{ $error }}</li>
		@endforeach
		</ul>
		</div>
		@endif

		<form class="form-horizontal">

		<div class="form-group">
		<label class="col-md-4 control-label">昵称</label>
		<div class="col-md-6">
		<input type="text" class="form-control" id="name" name="name" value="{{ old('name') }}">
		</div>
		</div>

		<div class="form-group">
		<label class="col-md-4 control-label">邮箱</label>
		<div class="col-md-6">
		<input type="email" class="form-control" id="email" name="email" value="{{ old('email') }}">
		</div>
		</div>

		<div class="form-group">
		<label class="col-md-4 control-label">密码</label>
		<div class="col-md-6">
		<input type="password" class="form-control" id="password" name="password">
		</div>
		</div>

		<div class="form-group">
		<label class="col-md-4 control-label">确认密码</label>
		<div class="col-md-6">
		<input type="password" class="form-control" id="repeatpassword" name="repeatpassword">
		</div>
		</div>

		<div class="form-group">
		<div class="col-md-6 col-md-offset-4">
		<a class="btn btn-primary" onclick="register()">
		下一步
		</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		<a class="btn btn-primary" onclick="send_email()">
		发送激活链接至邮箱
		</a>
		</div>
		</div>
		</form>
		</div>
		</div>
		</div>-->
		<header>
			<h1>注册账号</h1>
		</header>
		<form class="form-horizontal">

			<div class="form-group" style="margin-top:10px;">
				<label class="col-md-4 control-label">昵称</label>
				<div class="col-md-6">
					<input type="text" class="form-control" id="name" name="name" value="{{ old('name') }}">
				</div>
			</div>

			<div class="form-group">
				<label class="col-md-4 control-label">邮箱</label>
				<div class="col-md-6">
					<input type="email" class="form-control" id="email" name="email" value="{{ old('email') }}">
				</div>
			</div>

			<div class="form-group">
				<label class="col-md-4 control-label">密码</label>
				<div class="col-md-6">
					<input type="password" class="form-control" id="password" name="password">
				</div>
			</div>

			<div class="form-group">
				<label class="col-md-4 control-label">确认密码</label>
				<div class="col-md-6">
					<input type="password" class="form-control" id="repeatpassword" name="repeatpassword">
				</div>
			</div>

			<div class="form-group">
				<div class="col-md-6 col-md-offset-4">
					<a class="btn btn-primary" onclick="register()">
						下一步
					</a>
					<!--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<a class="btn btn-primary" onclick="send_email()">
					发送激活链接至邮箱
					</a>-->
				</div>
			</div>
		</form>
	</div>
</div>
@endsection
