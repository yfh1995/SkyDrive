@extends('app')

@section('content')
<link href="{{ asset('css/animate.css')}}" rel="stylesheet" type="text/css">
<style>
			*{
				padding:0px;
				margin:0px;
			}
			body{
				background-color: #000;
			}
			a{
				
			}
			.link {
				width: 180px;
				height: 50px;
				position: absolute;
				top:calc(50% - 25px);
				background-color:rgba(0,0,0,0.5)
				
			}
			.link-play1{
				left:calc(50% - 290px);
			}
			.link-play2{
				left:calc(50% - 90px);
			}
			.link-play3{
				left:calc(50% + 110px);
			}
			@media only screen and (max-width: 580px) {
				
				.link-play1{
					left:calc(50% - 90px)!important;
					top:calc(50% - 95px)!important;;
				}
				.link-play2{
					left:calc(50% - 90px)!important;;
					top:calc(50% - 25px)!important;;
				}
				.link-play3{
					left:calc(50% - 90px)!important;;
					top:calc(50% + 45px)!important;;
				}
			}
			/*添加一个箭头图片 设置位置*/
			
			.button {
				display: block;
				width: 180px;
				height: 50px;
				text-decoration: none!important;
				line-height: 50px;
				color:#33FF00;
				font-weight: bolder;
				border: 2px solid rgba(255, 255, 255, 0.8);
				font-size:20px;
				padding-left: 20px;
				margin: 0 auto;
				box-sizing: border-box;
				-webkit-box-sizing: border-box;
				background: url('img/allow.png') no-repeat 130px center;
				position: relative;
				transition: all 0.4s ease;
				-webkit-transition: all 0.4s ease;
				cursor: pointer;
			}
			
			.button:hover {
				border: 2px solid rgba(255, 255, 255, 1);
				background-position: 140px center;
			}
			.button .line {
				display: block;
				position: absolute;
				background: none;
				transition: all 0.4s ease;
				-webkit-transition: all 0.4s ease;
			}
			
			.button:hover .line {
				background-color: red;
			}
			/*
            1、高度不变
            2、宽度变（0-盒子的宽度）
            3、位置：左到右
        */
			
			.button .line-top {
				height: 2px;
				width: 0px;
				left: -110%;
				top: -2px;
			}
			
			.button:hover .line-top {
				width:calc(100% + 2px);
				left: 0px;
			}
			
			.button .line-bottom {
				width: 0px;
				height: 2px;
				right: -110%;
				bottom: -2px;
			}
			
			.button:hover .line-bottom {
				width: calc(100% + 2px);
				right: 0px;
			}
			
			.button .line-left {
				width: 2px;
				height: 0;
				left: -2px;
				bottom: -110%;
			}
			
			.button:hover .line-left {
				height: calc(100% + 2px);
				bottom: 0px;
			}
			
			.button .line-right {
				width: 2px;
				height: 0px;
				right: -2px;
				top: -110%;
			}
			
			.button:hover .line-right {
				height: calc(100% + 2px);
				top: 0px;
			}
			#c {
				display: block;
				position:fixed;
			}
		</style>
		<canvas id="c"></canvas>
		<div class="link link-play1">
			<a  class="button "  href="{{ url('/sky_drive/home?type=0') }}">
				<span class="line line-left"></span>
				<span class="line line-right"></span>
				<span class="line line-top"></span>
				<span class="line line-bottom"></span> 进入网盘
			</a>
		</div>
		<div class="link link-play2">
			<a  class="button "  href="{{ url('/personal_center') }}">
				<span class="line line-left"></span>
				<span class="line line-right"></span>
				<span class="line line-top"></span>
				<span class="line line-bottom"></span> 个人中心
			</a>
		</div>

		@if (Auth::user()->admin != config('system_config.roles.user.name'))
		<div class="link link-play3">
			<a  class="button "  href="{{ url('/admin/sky_drive') }}">
				<span class="line line-left"></span>
				<span class="line line-right"></span>
				<span class="line line-top"></span>
				<span class="line line-bottom"></span> 后台管理
			</a>
		</div>
		@endif
		<script>
			var texiao=["hinge","fadeOutDown","rollOut"];
			if($(".link").length==2){
				texiao=["hinge","rollOut"];
				$(".link").eq(0).css({
					"left":"calc(50% - 200px)"
				});
				$(".link").eq(1).css({
					"left":"calc(50% )"
				})
			}
			$(".link").on("click",function(){
				var index=$(this).index()-7;

				$(this).addClass('animated '+texiao[index]);
			})
			var c = document.getElementById("c");
			var ctx = c.getContext("2d");

			//全屏
			c.height = window.innerHeight;
			c.width = window.innerWidth;

			//文字
			var txts = "01";
			//转为数组
			txts = txts.split("");

			var font_size = 16;
			var columns = c.width / font_size;
			//用于计算输出文字时坐标，所以长度即为列数
			var drops = [];
			//初始值
			for(var x = 0; x < columns; x++)
				drops[x] = 1;

			function draw() {
				//让背景逐渐由透明到不透明
				ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
				ctx.fillRect(0, 0, c.width, c.height);

				ctx.fillStyle = "#0F0"; //文字颜色
				ctx.font = font_size + "px arial";
				//逐行输出文字
				for(var i = 0; i < drops.length; i++) {
					//随机取要输出的文字
					var text = txts[Math.floor(Math.random() * txts.length)];
					//输出文字，注意坐标的计算
					ctx.fillText(text, i * font_size, drops[i] * font_size);

					//如果绘满一屏或随机数大于0.95（此数可自行调整，效果会不同）
					if(drops[i] * font_size > c.height || Math.random() > 0.95)
						drops[i] = 0;

					//用于Y轴坐标增加
					drops[i]++;
				}
			}
			setInterval(draw,33);
		</script>
    <!--<a class="btn btn-link" href="{{ url('/sky_drive/home?type=0') }}">网盘</a><br/>
    <a class="btn btn-link" href="{{ url('/admin/sky_drive') }}">论坛</a>-->
    
    
@endsection