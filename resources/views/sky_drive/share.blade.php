@extends('app')

@section('content')
<link href="{{ asset('/css/style.css')}}" rel="stylesheet" type="text/css">
<link href="{{ asset('/css/animate.css')}}" rel="stylesheet" type="text/css">
<style type="text/css">th {
	/*background-color: aqua;*/
	background-color: #000;
	color:#FFF;
}

td,
th {
	text-align: center;
}

td:nth-child(1) {
	text-align: left;
}

.table {
	margin-bottom: 0;
	padding: 0;
}

td {
	cursor: pointer;
}

.csshub-milky {
	font-family: "Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif;
	;
	text-transform: uppercase;
	display: block;
	font-size: 70px;
	color: #f1ebe5;
	text-shadow: 0 8px 9px #FFF, 0px -2px 1px #fff;
	font-weight: bold;
	letter-spacing: -4px;
	text-align: center;
	position: absolute;
	padding: 50px 0;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: 20px;
}

/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/

#modal-body::-webkit-scrollbar {
	width: 10px;
	height: 16px;
	background-color: #f5f5f5;
}
/*定义滚动条的轨道，内阴影及圆角*/

#modal-body::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
	border-radius: 10px;
	background-color: #f5f5f5;
	/*background-color: steelblue;*/
}


/*定义滑块，内阴影及圆角*/

#modal-body::-webkit-scrollbar-thumb {
	width: 3px;
	height: 10px;
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
	background-color: gray;
}
#searchInput {
	position: absolute;
	z-index: 100;
	left: 70%;
	top: 10px;
}

.input-group {
	width: 200px;
}
#myshareCodelist>tr{
	display: none;
}
</style>
<!--<div id="searchInput">
	<div id="shareCode "  class="input-group">
		<input id="shareCodeInput" type="text" class="form-control " placeholder="输入分享码">
		<span class="input-group-btn">
		<button id="SearchSareCodeBtn" class="btn btn-default" type="button">
		Go!
		</button> </span>
	</div>
</div>-->
<div class="TwoDivInYunpan"  >
	<div class="row" style="height:100%;">
		<div class="oneInTwoDiv col-md-2 col-lg-2 col-sm-2" style="padding:0;" >
			<ul id="systemSetting" class=" nav nav-pills nav-stacked"  >
				<li id="AllFileDiv" class="mdui-ripple " style="text-align: center;" >
					<a  href="{{ url('/sky_drive/home?type=0') }}">
						<i class="mdui-icon material-icons">&#xe24d;</i><strong style="color: gray;">全部文件</strong>
					</a>
				</li>
				<!--//onclick="refresh('','picture')"-->
				<li id="PictureDiv" class="mdui-ripple"  >

					<a  href="{{ url('/sky_drive/home?type=1&file_type=picture') }}">
						<strong style="color: gray;">图片</strong>
					</a>
				</li>
				<li id="FillDiv" class="mdui-ripple" >
					<a  href="{{ url('/sky_drive/home?type=1&file_type=text') }}">
						</span><strong style="color: gray;">文档</strong>
					</a>
				</li>
				<li id="VideoDiv" class="mdui-ripple" >
					<a  href="{{ url('/sky_drive/home?type=1&file_type=video') }}">
						<strong style="color: gray;">视频</strong>
					</a>
				</li>
				<li id="ZhongziDiv" class="mdui-ripple" >
					<a  href="{{ url('/sky_drive/home?type=1&file_type=bt') }}">
						<strong style="color: gray;">种子</strong>
					</a>
				</li>
				<li id="MiuseDiv" class="mdui-ripple" >
					<a  href="{{ url('/sky_drive/home?type=1&file_type=music') }}">
						<strong style="color: gray;">音乐</strong>
					</a>
				</li>
				<li id="OtherDiv" class="mdui-ripple"	 >
					<a   href="{{ url('/sky_drive/share_list') }}">
						<strong style="color: gray;"><i class="mdui-icon mdui-icon-left material-icons">&#xe80d;</i>我的分享</strong>
					</a>
				</li>
				<li id="RecycleDiv" class="mdui-ripple"  >
					<a  href="{{ url('/sky_drive/home?type=2&file_type=garbage') }}">
						<strong style="color: gray;"><i class="mdui-icon mdui-icon-left material-icons">&#xe872;</i>回收站</strong>
					</a>
				</li>
			</ul>
			<div  class="col-md-offset-2"  style="width:70%;margin-bottom: 0px;padding-bottom:0px;position:absolute;bottom:20px;">
				<div class="progress progress-striped active" >
					<div class="progress-bar progress-bar-success " role="progressbar" aria-valuenow="60"
					aria-valuemin="0" aria-valuemax="100" style="width:80%"></div>
				</div><strong>{{$data['user_info']->used_space}}/{{$data['user_info']->total_space}}</strong>
			</div>
		</div>
		<div class=" twoInTwoDiv col-md-10 col-sm-10 col-lg-10" style="height:100%; margin:0px;padding:0px;">

			<div id="ContentIntwoInTwoDiv" style="height:calc(85%);margin:0px;padding:0px;" >

				<div style="height:calc(15%);width:100%;background: #000;position: relative;">
					<div class="csshub-milky">
						我的分享
					</div>
				</div>
				<table class="table" style="height: 38px!important;overflow: hidden;">
					<thead>
						<tr>
							<th class='col-md-5 col-sm-5 col-lg-5'>分享码</th>
							<th class='col-md-2 col-sm-2 col-lg-2'>状态</th>
							<th class='col-md-3 col-sm-3 col-lg-3'>日期</th>
							<th class='col-md-2 col-sm-2 col-lg-2'>操作</th>
						</tr>
					</thead>
				</table>
				<div id="xiangangID"  >
					<div id='catalog' >
						<table class="table table-hover table-bordered ">

							<tbody id="myshareCodelist">
								@foreach($data['share_info'] as $v)
								<tr   class=" mytr {{$v->deadline<=time()?'success':'danger'}}" data-share={{$v->
									share_code}}  data-lastid={{$v->id}} >
									 <td class='col-md-5 col-sm-5 col-lg-5'>
									 	<span class='btnbtn' data-toggle="tooltip" data-placement="right" title="点击复制分享码" data-clipboard-text={{$v->share_code}}>{{$v->share_code}}</span></td>
									<td class='col-md-2 col-sm-2 col-lg-2'>{{$v->deadline<=time()?'可用':'过期'}}</td>
									<td class='col-md-3 col-sm-3 col-lg-3'>{{$v->created_at}}</td>
									<td class='col-md-2 col-sm-2 col-lg-2'><span id='LookFIleList' class='glyphicon glyphicon-eye-open'></span></td>
								</tr>

								@endforeach
							</tbody>
						</table>

					</div>
				</div>
				<div id="paging">
					<table class="table table-hover table-bordered ">

					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- 模态框（Modal） -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
				aria-hidden="true">
				×
				</button>
				<h4 class="modal-title" id="myModalLabel"> 分享文件列表 </h4>
			</div>
			<div id="modal-body" class="modal-body" style="height:200px;max-height:300px;overflow-y: auto;">
				<table class="table">
					<thead>
						<tr>
							<th style="background-color: #FFF;text-align: left;color:#000;">文件名称</th>
						</tr>
					</thead>

					<tbody id="shareList"  >
						<tr >
							
						</tr>

					</tbody>
				</table>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary"
				data-dismiss="modal">
				确定
				</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<script src="{{asset('/js/clipboard.min.js')}}"></script>
<script>$(document).ready(function() {
	/*
	 * 动画效果
	 */
	var clipboard = new Clipboard('.btnbtn');

	clipboard.on('success', function(e) {

		console.log(e);
	});

	clipboard.on('error', function(e) {
		console.log(e);
	});
	$("[data-toggle='tooltip']").tooltip();
	$("#shareCode").on('click', function() {
		$("#copyShareCode").click();
	})
	var AnimateEL=$("#myshareCodelist>tr");
	var AnimateLen=AnimateEL.length;
	var AniCnt=0;
	shouAnimate();
	function shouAnimate(){
		AnimateEL=$("#myshareCodelist>tr");
		AnimateLen=AnimateEL.length;
		setTimeout(function(){
		AnimateEL.eq(AniCnt++).addClass("animated slideInUp").show(200);
			if(AniCnt<AnimateLen)
			setTimeout(arguments.callee,200);
		},200);
	}
	var strTd = "",strTr;
	$(document).on("click", "#LookFIleList", function() {
		var shareCode = $(this).parent().parent().attr("data-share");
		$.ajax({
			url: "/sky_drive/get_share_catalog",
			type: 'GET',
			data: {
				share_code: shareCode
			},
			headers: {
				'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
			},
			success: function(data) {
				$("#shareList").empty();
				for(var i = 0; i < data.length; i++) {
					strTd = "<tr><td>" + data[i] + "</td></tr>";
					$("#shareList").append(strTd);
				}

				$('#myModal').modal('show');
			},
			error: function() {
				alert('调用失败');
			}
		});
	})
	$("#SearchSareCodeBtn").on('click', function() {
		var code = $("#shareCodeInput").val();
		window.location.href="/sky_drive/getShareData?share_code="+code;
//		$.ajax({
//			url: '',
//			type: 'post',
//			data: {
//				"share_code": code
//			},
//			headers: {
//				'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
//			},
//			success: function(data) {
//				console.log(data);
//				if(data.result == false) {
//					alert("该分享码错误，没有数据！");
//					return;
//				}
//				//				$("#xiangangID").append("<div id='catalog'></div>");
//				console.log(data);
//				$("#catalog").empty();
//				show_data(data.data);
//			},
//			error: function() {
//				alert('11数据读取发生错误！');
//			}
//		});
	})
	var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
	var nScrollTop = 0; //滚动到的当前位置
	var nDivHight = 0; //滚动div的高度
	$("#xiangangID").on("scroll", function() {
		nDivHight = $(this).height();
		nScrollHight = $(this)[0].scrollHeight;
		nScrollTop = $(this)[0].scrollTop;

		if(nScrollTop + nDivHight >= nScrollHight) {
			$.ajax({
				url: "/sky_drive/share_list",
				type: 'get',
				data: {
					last_id:$(".mytr:last-child").attr("data-lastid")
				},
				headers: {
					'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
				},
				success: function(data) {
					console.log(data);
//					<tr class="mytr success" data-share="d0917b0ec366e085dab21b3ebdafd11c" data-lastid="182"> 

//									<td class="col-md-2 col-sm-2 col-lg-2">可用</td>
//									<td class="col-md-4 col-sm-4 col-lg-4">2017-04-02 03:38:36</td>
//								</tr>
					var dd=new Date();
					for(var i=0;i<data.length;i++){
						var className=(new Date(data[i]["deadline"])<new Date()?'success':'danger');
						strTr="<tr data-share="+data[i]['share_code']+" class='mytr "+className+" 'data-lastid="+data[i]['id']+">";
						strTr+="<td class='col-md-5 col-sm-5 col-lg-5'><span class='btnbtn' data-toggle='tooltip' data-placement='right' title='点击复制分享码' data-clipboard-text='"+data[i]['share_code']+"'>"+data[i]['share_code']+"</span></td>";
						strTr+="<td class='col-md-2 col-sm-2 col-lg-2'>"+(new Date(data[i]["deadline"])<new Date()?'可用':'过期')+"</td>";
						strTr+="<td class='col-md-3 col-sm-3 col-lg-3'>"+data[i]['created_at']+"</td>";
						str+="<td class='col-md-2 col-sm-2 col-lg-2'><span id='LookFIleList' class='glyphicon glyphicon-eye-open'></span></td>";
						strTr+="</tr>";
						console.log(strTr);
						$("#myshareCodelist").append(strTr);
					}
					shouAnimate();
					$("[data-toggle='tooltip']").tooltip();
				},
				error: function() {
					alert('调用失败');
				}
			});

		}

	})
	
})</script>
@endsection
