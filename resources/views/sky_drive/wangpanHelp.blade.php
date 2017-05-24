@extends('app')

@section('content')
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Bootstrap 附加导航（Affix）插件</title>

		<style>/* Custom Styles */

ul.nav-tabs {
	width: 140px;
	margin-top: 20px;
	border-radius: 4px;
	border: 1px solid #ddd;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.067);
}

ul.nav-tabs li {
	margin: 0;
	border-top: 1px solid #ddd;
}

ul.nav-tabs li:first-child {d
	border-top: none;
}

ul.nav-tabs li a {
	margin: 0;
	padding: 8px 16px;
	border-radius: 0;
}

ul.nav-tabs li.active a,
ul.nav-tabs li.active a:hover {
	color: #fff;
	background: #0088cc;
	border: 1px solid #0088cc;
}

ul.nav-tabs li:first-child a {
	border-radius: 4px 4px 0 0;
}

ul.nav-tabs li:last-child a {
	border-radius: 0 0 4px 4px;
}

ul.nav-tabs.affix {
	top: 30px;
	/* Set the top position of pinned element */
}

#HelpContent {
	border: #bbd4ef 1px solid;
	box-shadow: 0 3px 9px rgba(0, 0, 0, 0.4);
}

.hp-title {
	color: blue;
}

.hp-img-outer {
	width: 100%;
	text-align: center;
	margin-bottom: 20px;
}

.hp-img-outer img {
	max-width: 80%;
	padding:10px;
}

.hp-img-outer p {
	text-align: left;
	padding-left: 40px;
}

.top {
	display: none;
	text-decoration: none;
	position: fixed;
	bottom: 74px;
	right: 20px;
	overflow: hidden;
	z-index: 999;
	width: 32px;
	height: 32px;
	border: none;
	text-indent: 100%;
	background: url("/img/help/arr.png") no-repeat 0px 0px;
}</style>
	</head>

	<body data-spy="scroll" data-target="#myScrollspy">
		<a href="javascript:;" class="top"></a>
		<div class="container">
			<div class="jumbotron">
				<h1>教你正确打开网盘的姿势</h1>
			</div>
			<div class="row">
				<div class="col-xs-3" id="myScrollspy">
					<ul class="nav nav-tabs nav-stacked" data-spy="affix" data-offset-top="125">
						<li class="active">
							<a href="#section-1">
								如何上传文件
							</a>
						</li>
						<li>
							<a href="#section-2">
								如何预览文件
							</a>
						</li>
						<li>
							<a href="#section-3">
								如何使用分享
							</a>
						</li>
						<li>
							<a href="#section-4">
								文件操作
							</a>
						</li>
						<li>
							<a href="#section-5">
								回收站
							</a>
						</li>
						<li>
							<a href="#section-6">
								个人中心
							</a>
						</li>
					</ul>
				</div>
				<div id='HelpContent' class="col-xs-7 col-md-7" >
					<h2 id="section-1" class='hp-title'>如何上传一个文件？</h2>
					<div class='hp-text-step'>
						<b>第一步：</b>点击上传文件
					</div>
					<div class="hp-img-outer">
						<img src="/img/help/1.png"/>
					</div>
					<div class='hp-text-step'>
						<b>第二步：</b>选择文件
					</div>
					<div class="hp-img-outer">
						<img src="/img/help/2.png"/>
					</div>
					<div class='hp-text-step'>
						<b>第三步：</b>完成上传
					</div>
					<div class="hp-img-outer">
						<p>
							等待上传完成就可以了
						</p>
					</div>
					<hr>
					<h2 id="section-2" class='hp-title'>如何预览一个文件？</h2>
					<div class='hp-text-step'>
						<b>方法：</b>预览文件有三种方法：
					</div>
					<div class="hp-img-outer">

						<p>
							第一种方法:选中文件之后，直接点击上面的预览按钮即可。
						</p>
						<p>
							第二种方法：直接右键文件列表，点击右键菜单中的打开。
						</p>
						<p>
							第三种种方法：直接点击文件名字，如果不是文件夹就可以进行预览，否则就进入文件夹。
						</p>
					</div>
					<div class='hp-text-step'>
						<b>图片展示：</b>
					</div>
					<div class="hp-img-outer">
						<img src="/img/help/3.png"/>
					</div>
					<div class='hp-text-step'>
						<b>预览说明：</b>
					</div>
					<div class="hp-img-outer">
						<p>
							现在可以预览图片、音乐、视频，其他文件则不支持预览。
						</p>
					</div>
					<hr>
					<h2 id="section-3" class='hp-title'>如何使用分享功能？</h2>
					<div class='hp-text-step'>
						<b>分享功能介绍：</b>
					</div>
					<div class="hp-img-outer">
						<p>
							所谓好的资源都是可以和别人共享的。所以我就添加了这个功能。
						</p>
						<p>
							功能：你可以将自己上传过的资源分享给别人。
						</p>
						<p>
							接下来向您展示分享流程：
						</p>
					</div>
					<div class='hp-text-step'>
						<b>第一步：选中文件，然后点击其中一个分享就可以按钮即可</b>
					</div>
					<div class="hp-img-outer">
						<img src="/img/help/4.png"/>
					</div>
					<div class='hp-text-step'>
						<b>第二步：复制分享码。然后将分享码发给自己想要分享的人。</b>
					</div>
					<div class="hp-img-outer">
						<img src="/img/help/5.png"/>
					</div>
					<div class='hp-text-step'>
						<b>第三步：获取分享文件，在导航栏输入框输入分享码点击按钮即可</b>
					</div>
					<div class="hp-img-outer">
						<img src="/img/help/6.png"/>
					</div>
					<hr>
					<h2 id="section-4" class='hp-title'>文件操作说明</h2>
					<div class='hp-text-step'>
						<b>功能说明：</b>
					</div>
					<div class="hp-img-outer">
						<p>
							文件操作现有：上传、下载、分享、预览、移动文件夹、重命名、删除、恢复
						</p>
					</div>
					<hr>
					<h2 id="section-5" class='hp-title'>回收站说明</h2>
					<div class='hp-text-step'>
						<b>文件的删除与恢复：</b>
					</div>
					<div class="hp-img-outer">
						<p>
							为了方便用户想要删除自己的上传过的文件，所以就有了这个功能。
						</p>
						<p>
							文件删除不是立刻就删除了，他会在收回站在放置一星期。
						</p>
						<p>
							如果一星期之内想要恢复自己删除过的文件，那么就可以进行文件的恢复。
						</p>
						<p>
							超时时间文件就会永久被删除。
						</p>
					</div>
					<hr>
					<h2 id="section-6" class="hp-title">个人中心功能介绍：</h2>
					<div class='hp-text-step'>
						<b>如何进入个人中心：点击头像，选择个人中心</b>
					</div>
					<div class="hp-img-outer">
						<img src="/img/help/header.png"/>
					</div>
					<div class='hp-text-step'>
						<b>功能1:修改头像，展示自我个性。操作步骤如图例所示：</b>
					</div>
					<div class="hp-img-outer">
						<img src="/img/help/10.png"/>
					</div>
					<div class='hp-text-step'>
						<b>功能2：修改密码，提高账号安全性</b>
					</div>
					<div class="hp-img-outer">
						<img src="/img/help/11.png"/>
					</div>
					
				</div>
			</div>
		</div>

		<script>$(document).ready(function() {
	$(window).scroll(function() {
		setTimeout(chuliscroll(), 500);
	});
	var win_h = $(window).height();

	function chuliscroll() {
		var scrolltop = $(this).scrollTop();
		if(scrolltop > win_h / 2) {
			$(".top").stop().fadeIn();
		} else {
			$(".top").stop().fadeOut();
		}
	}
	$(".top").click(function() {
		$("body,html").stop().animate({
			scrollTop: 0
		}, 300)
	});
})</script>
	</body>
</html>
@endsection
