<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<title></title>
		<style type="text/css">
			* {
				padding: 0p;
				x margin: 0px;
			}
			
			body {
				color: #555;
				font-size: 15px;
				line-height: 1.7;
				font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
				background: #f7fafc;
				-webkit-font-smoothing: subpixel-antialiased;
			}
			
			#box {
				width: 100%;
				height: 100%;
				background-color: #F7FAFC;
				background-image: url('');
				background-size: cover;
				background-position: 50% 50%;
				background-repeat: no-repeat;
				position: fixed;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 0;
			}
			
			.content {
				position: absolute;
				z-index: 11;
				width: 300px;
				height: 600px;
				left: 50%;
				transform: translateX(-50%);
			}
			
			.cent-box-header {
				text-align: center;
				margin-top: 40px;
			}
			
			.cent-box-header .main-title {
				width: 160px;
				height: 74px;
				margin: 0 auto;
				background-size: contain;
				color: blue;
				font-size: 60px;
				font-weight: 500;
			}
			
			.cent-box-header .sub-title {
				margin: 30px 0 20px;
				font-weight: 400;
				font-size: 18px;
				line-height: 1;
			}
			
			.index-tab-navs {
				width: 100%;
				height: 60px;
				text-align: center;
			}
			
			.navs-slider {
				position: relative;
				width: 8em;
				height: 35px;
				margin: auto;
			}
			
			.index-tab-navs a {
				text-decoration: none;
				color: #333;
				float: left;
				width: 4em;
				line-height: 35px;
				text-align: center;
				/*width:50%;*/
				opacity: .7;
				/*font-size: 1em;*/
				-ms-filter: "alpha(Opacity=70)";
				-webkit-transition: opacity .15s, color .15s;
				transition: opacity .15s, color .15s;
			}
			
			.index-tab-navs a:hover {
				opacity: 1;
				-ms-filter: "alpha(Opacity=100)";
			}
			
			.index-tab-navs a.active {
				opacity: 1;
				-ms-filter: "alpha(Opacity=100)";
				color: #0f88eb!important;
			}
			
			.navs-slider-bar {
				content: "";
				width: 50%;
				height: 3px;
				background-color: #0f88eb;
				position: absolute;
				bottom: 0;
				left: 0;
				-webkit-transition: left .15s;
				transition: left .15s;
			}
			
			.ndex-tab-body {
				float: none;
				margin: auto;
				width: 300px;
				text-align: left;
			}
			
			.group-ipt {
				position: relative;
				margin: 0;
				overflow: hidden;
				padding: 1px 0;
				border: 1px solid #d5d5d5;
				border-radius: 3px;
				background-color: #FFF;
			}
			
			input:focus {
				outline: none;
			}
			
			.group-ipt input {
				padding: 1em .8em;
				width: 100%;
				box-sizing: border-box;
				border: 0;
				border-radius: 0;
				box-shadow: none;
				background: rgba(255, 255, 255, 0.5);
				font-family: 'Microsoft Yahei';
				color: #666;
				position: relative;
			}
			
			.button {
				margin-top: 18px;
			}
			
			#button {
				width: 100%;
				background: #0f88eb;
				box-shadow: none;
				border: 0;
				border-radius: 3px;
				line-height: 41px;
				color: #fff;
				display: block;
				font-size: 15px;
				cursor: pointer;
				font-family: 'Microsoft Yahei';
			}
			
			#button:hover {
				background: #80c3f7;
			}
			
			#signinForm {
				display: none;
			}
		</style>
	</head>

	<body>
		<div id="box"></div>
		<div class="content">
			<div class="cent-box-header">
				<h1 class="main-title ">网盘</h1>
				<h2 class="sub-title">安全存储 在线预览 好友分享</h2>
			</div>
			<div class='loginOrReg'>
				<div class="index-tab-navs">
					<div class="navs-slider">
						<a href="#signup" class="active">注册</a>
						<a href="#signin">登录</a>
						<span class="navs-slider-bar"></span>
					</div>
				</div>
				<div class="ndex-tab-body">
					<form id='signupForm' role="form" method="POST" action="{{ url('/register') }}">
						
						<div class="group-inputs">
							<div class="group-ipt name">
								<!--<input type="text" name="email" id="email" class="ipt" placeholder="邮箱地址" required>-->
								<input type="text"  id="name" name="name" value="{{ old('name') }}" placeholder="输入一个帅气的名字" required>
							</div>
							<div class="group-ipt email">
								<!--<input type="password" name="password" id="password" class="ipt" placeholder="输入密码" required>-->
								<input type="email" id="email" name="email" value="{{ old('email') }}"placeholder="邮箱地址"  required>
							</div>
							<div class="group-ipt password">
								<!--<input type="password" name="password" id="repassword" class="ipt" placeholder="确认密码" required>-->
								<input type="password"  id="password" name="password" placeholder="输入密码" required>
							</div>
							<div class="group-ipt repeatpassword">
								<!--<input type="password" name="password" id="repassword" class="ipt" placeholder="确认密码" required>-->
								<input type="password" id="repeatpassword" name="repeatpassword"placeholder="确认密码" required>
							</div>
						</div>
						<div class="button">
							<button type="submit" class="login-btn register-btn" id="button"  >注册</button>
						</div>
					</form>
					<form id='signinForm' role="form" method="POST" action="{{ url('/login') }}">
						<input type="hidden" name="_token" value="{{ csrf_token() }}">
						<div class="group-inputs">
							<div class="group-ipt email">
								<input type="text" name="email" id="email" class="ipt" placeholder="邮箱地址" required>
							</div>
							<div class="group-ipt password">
								<input type="password" name="password" id="password" class="ipt" placeholder="输入您的登录密码" required>
							</div>

						</div>
						<div class="button">
							<button type="submit" class="login-btn register-btn" id="button">登录</button>
						</div>
					</form>
				</div>
			</div>
		</div>



		<script src="{{asset("js/jquery-2.1.1.min.js")}}"></script>
		<script src="{{asset("js/particles.js")}}"></script>
		<script src="{{asset("js/background.js")}}"></script>
		<script type="text/javascript">
			$(".navs-slider a").on("click", function() {
				$(this).addClass("active").siblings().removeClass("active");
				var index = $(this).index();
				var left = index == 0 ? "0%" : "50%";
				$(".navs-slider-bar").css({
					"left": left
				});
				if(index == 0) {
					$("#signinForm").hide();
					$("#signupForm").show();
				} else {
					$("#signinForm").show();
					$("#signupForm").hide();
				}
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
	
	
}
		</script>
	</body>

</html>