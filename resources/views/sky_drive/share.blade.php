@extends('app')

@section('content')
<link href="{{ asset('/css/style.css')}}" rel="stylesheet" type="text/css">
<!--<link href="{{ asset('/css2/style.css') }}" rel="stylesheet" >-->
<link href="{{ asset('/css2/reset.css') }}" rel="stylesheet" >
<link href="{{ asset('/viewper/viewer.css') }}" rel="stylesheet" >
<link href="{{ asset('/mdui-v0.1.2/css/mdui.min.css') }}" rel="stylesheet" >
<link href="{{ asset('/mplayer/css/mplayer.css') }}" rel="stylesheet" >

<script src="{{asset('/js/jquery.js')}}" type="text/javascript" charset='utf8'></script>
<script src="{{asset('/js/jplayer.playlist.min.js')}}"></script>
<script src="{{asset('/js/jquery.pjax.js')}}"></script>
<script src="{{asset('/js/jquery.jplayer.min.js')}}"></script>
<script src="{{asset('/mplayer/js/mplayer.js')}}"></script>
<script src="{{asset('/mplayer/js/mplayer-list.js')}}"></script>
<script src="{{asset('/mplayer/js/mplayer-functions.js')}}"></script>
<script src="{{asset('/mplayer/js/jquery.nstSlider.min.js')}}"></script>
<script src="{{asset('/viewper/viewer.js')}}"></script>
<script src="{{asset('/mdui-v0.1.2/js/mdui.min.js')}}"></script>
<script src="{{asset('/js/clipboard.min.js')}}"></script>
<script src="{{asset('/js/iconfont.js')}}"></script>
<script>var IsCreateFileNow = false; //判断有没有点击新建文件夹
//给预览图片新建一个数组
var listOfPicture = new Array(10000);
var cntInPicture = 0;
var cntNowP = 0;
//给预览音乐新建一个数组
var listOfMusic = new Array(10001);
var cntInMusic = 0;
var cntNowM = 0;
//给预览视频新建一个数组
var listOfVideo = new Array(10001);
var cntInVideo = 0;
var cntNowV = 0;
//给预览txt新建一个数组
var listOfTxt = new Array(10001);
var cntInTxt = 0;
var cntNowT = 0;
//保存下载文件的地址和文件名
var DownloadFileAddress = new Array(100001);
var DownloadFileName = new Array(100001);
var DownloadFileID = new Array(100101);
var cntInFileAddress = 0;
var cntInFileName = 0;
var cntInFileID = 0;
//保存当前目录的所有子目录
var catalogOfSonF = new Array(100111);
var catalogOfSonFId = new Array(100111);
var catalogOfSonFcnt = 0;
//移动文件夹的每个文件添加一个标记值
var cntOfEveryCatalog = 1;
var EverycatalogFlag = new Array(1000002);
/*
 * 记录当前的请求翻页所需要的参数
 */
var father_catalog_nameNow = "",
	sizeNow = 15,
	typeNow = 0,
	last_idNow = 0,
	file_typeNow = "",
	ShareCodeNow = "";

var cntInwhichm = 0; //记录是第几个音乐
var cntInwhichv = 0; //记录是第几个视频
/*
 * 分享配置
 */
var inst;
//当前滚动文件所在的页数，type类型
var listPage = 0,
	listType = "catalog",
	listMulu = "";
var leftNow = 0;

function ChuShiHuaFlagOfmove() {
	for(var i = 0; i < 1000000; i++) {
		EverycatalogFlag[i] = 0;
	}
}
//移动文件夹移动到哪个文件夹下面的ID
var SureMoveId = 0;
//保存移动的文件夹有哪些
var numOfMoveFile = new Array(100);
var cntOfMoveFile = 0;
$(document).ready(function() {

	//	refresh('yfh', 'catalog');
	//	show_data_test();
	//	var str = GetFileName();
	//	SetTileOfEntry(str);

});

$("#ajaxForm").ajaxForm(function() {
	window.location.reload();
	//	refresh('', 'catalog');
});

//打开移动文件夹模态框
function MoveTheFile() {
	cnt = 0;
	//   获取哪些被选中
	$("#ContentIntwoInTwoDiv").find(':checkbox[id!=FatherOfcheckbox]').each(function() {
		if($(this).prop("checked")) {
			numOfMoveFile[cntOfMoveFile++] = $(this).attr('id');
		}
	});
	var F = "<div class='modal fade' id='myModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>";
	F += "<div class='modal-dialog'>";
	F += "<div class='modal-content'>";
	F += "<div class='modal-header'>";
	F += "<button type='button' class='close' data-dismiss='modal'aria-hidden='true'>×</button>";
	F += "<h4 class='modal-title' id='myModalLabel'>移动文件夹</h4></div>";
	F += "<div class='modal-body' style='height:360px;'>";
	F += "<div style='height:100%;padding:10px 5px; border: 1px solid saddlebrown;overflow: auto;'>";
	//添加浏览目录
	F += "<li style='list-style-type:none;' class='treeheadOflist ' id='0'>";
	F += "<div style='height:100%;' data-toggle='collapse' href='#collapse" + cntOfEveryCatalog + "'>";
	F += "<span class='glyphicon glyphicon-plus'>全部文件</span></div></li>";

	F += "</div>";
	F += "</div>";
	F += "<div class='modal-footer'>";
	F += "<button type='button' class='btn btn-default' style='float:left;'>新建文件夹</button>";
	F += "<button id='QueDingOfMoveFile' type='button' class='btn btn-primary'>确定</button>";
	F += "<button id='quxiaoOfMoveFile' type='button' class='btn btn-default' data-dismiss='modal'>取消</button>";
	F += "</div></div></div></div>";

	$("#xiangangID").prepend(F);
	$("#0").children('div').addClass('bcOfmoveFileList');
	$("#myModal").modal('show');
	showAllFilelist();
}
$(document).on('mouseover', '.treeheadOflist', function() {
	if($(this).attr('id') == SureMoveId) {
		return;
	}
	$(this).children('div').addClass('bcOfoverFileList');
})
$(document).on('mouseout', '.treeheadOflist', function() {
	$(this).children('div').removeClass('bcOfoverFileList');
})
//刚进来移动文件夹的时候 显示全部文件下面的所有的子菜单
function showAllFilelist() {
	EverycatalogFlag[0] = 1;
	GetFatherUnder_catalog(0);
	var F = "";
	F += "<ul class='collapse in' id='collapse1'>";
	for(var i = 0; i < catalogOfSonFcnt; i++) {
		cntOfEveryCatalog++;
		F += "<li style='list-style-type:none;' class='treeheadOflist ' id='" + catalogOfSonFId[i] + "'>";
		F += "<div style='height:100%;padding-left: 15px;'  data-toggle='collapse' href='#collapse" + cntOfEveryCatalog + "'>";
		F += "<span class='glyphicon glyphicon-plus'>" + catalogOfSonF[i] + "</span></div></li>";
	}
	F += "</ul>";
	$('.treeheadOflist').after(F);
}
//给移动文件夹的选项添加下拉选项
$(document).on('click', '.treeheadOflist', function() {
	//            alert($(this).attr('id'));
	//            alert();
	$('div').filter('.bcOfmoveFileList').removeClass('bcOfmoveFileList');
	SureMoveId = $(this).attr('id'); //让id等于当前点击的ID值

	$(this).children('div').addClass('bcOfmoveFileList');
	//ul的id值
	var idOfcollapse = $(this).children().attr('href');
	var idOfcollapse2 = idOfcollapse.substring(1, idOfcollapse.length);
	var strOfcatalog = $(this).attr('id');
	if(EverycatalogFlag[strOfcatalog] == 1) {
		return;
	}

	EverycatalogFlag[strOfcatalog] = 1;
	GetFatherUnder_catalog(strOfcatalog);
	if(catalogOfSonFcnt == 0) {
		return;
	}
	var JianJuZhi = $(this).children().css('padding-left');
	var JianJuZhi2 = JianJuZhi.substring(0, JianJuZhi.length - 2);
	var JianJuZhi3 = parseInt(JianJuZhi2) + 15;

	var F = "";
	F += "<ul class='collapse in' id='" + idOfcollapse2 + "'>";
	for(var i = 0; i < catalogOfSonFcnt; i++) {
		cntOfEveryCatalog++;
		F += "<li style='list-style-type:none;' class='treeheadOflist ' id='" + catalogOfSonFId[i] + "'>";
		F += "<div style='height:100%;padding-left: " + JianJuZhi3 + "px;'  data-toggle='collapse' href='#collapse" + cntOfEveryCatalog + "'>";
		F += "<span class='glyphicon glyphicon-plus'>" + catalogOfSonF[i] + "</span></div></li>";
	}
	F += "</ul>";
	$(this).after(F);
});
//当关闭移动文件夹框的时候
$(document).on('hide.bs.modal', "#myModal", function() {
	SureMoveId = 0; //标记ID值
	ChuShiHuaFlagOfmove(); //将数组重置，表示没有li标签被打开过
	$("#myModal").remove(); //移走模态框
})
//当确定移动文件夹的时候
$(document).on('click', '#QueDingOfMoveFile', function() {
	MoveFileOfYidongwenjianjia();
	SureMoveId = 0; //标记ID值
	ChuShiHuaFlagOfmove(); //将数组重置，表示没有li标签被打开过
	$("#myModal").modal('hide');
	$("#myModal").remove(); //移走模态框

})

//下载函数
$(document).on('click', '#DownLoadTheFile', function() {

	var addressN = new Array(100101);
	var filenameN = new Array(100101);

	var shuliang = 0;
	var HaveFileJiaflag = false;
	$("#ContentIntwoInTwoDiv").find(':checkbox[id!=FatherOfcheckbox]').each(function() {
		if($(this).prop("checked")) {
			addressN[shuliang] = DownloadFileAddress[$(this).val()];
			filenameN[shuliang++] = DownloadFileName[$(this).val()];

			//                  alert($(this).parent().siblings(".col-md-3").children("p").text());
			if($(this).parent().siblings(".col-md-3").children("p").text() == -1) {
				HaveFileJiaflag = true;
			}
		}
	});

	if(shuliang == 0) {
		alert("请选择文件");
	} else {
		if(HaveFileJiaflag == false) {
			for(var i = 0; i < shuliang; i++) {
				var aLink = document.createElement("a");
				evt = document.createEvent("HTMLEvents");

				evt.initEvent("click");
				aLink.download = filenameN[i];
				aLink.href = addressN[i];

				aLink.dispatchEvent(evt);
			}
		} else {
			alert("下载不可以有文件夹");
		}

	}
})</script>
<style type="text/css">th {
	background-color: aqua;
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
}</style>
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

				<div style="height:calc(15%)">

				</div>
				<table class="table" style="height: 38px!important;overflow: hidden;margin-top:38px;">
					<thead>
						<tr>
							<th class='col-md-6 col-sm-6 col-lg-6'>分享码</th>
							<th class='col-md-2 col-sm-2 col-lg-2'>状态</th>
							<th class='col-md-4 col-sm-4 col-lg-4'>日期</th>
						</tr>
					</thead>
				</table>
				<div id="xiangangID" >
					<div id='catalog' >
						<table class="table table-hover table-bordered ">
							
							<tbody>
								@foreach($data['share_info'] as $v)
								<tr class="{{$v->deadline<=time()?'success':'danger'}}" data-share={{$v->share_code}}>
									<td class='col-md-6 col-sm-6 col-lg-6'>{{$v->share_code}}</td>
									<td class='col-md-2 col-sm-2 col-lg-2'>{{$v->deadline<=time()?'可用':'过期'}}</td>
									<td class='col-md-4 col-sm-4 col-lg-4'>{{$v->created_at}}</td>
								</tr>

								@endforeach
							</tbody>
						</table>

					</div>
				</div>
				<div id="paging">

				</div>
			</div>
		</div>
	</div>
</div>


<script>$(document).ready(function() {
	$(document).on("click","tr",function(){
		var shareCode=$(this).attr("data-share");
		$.ajax({
				url: "/sky_drive/get_share_catalog",
				type: 'GET',
				data: {
					share_code:shareCode
				},
				
				success: function(data) {
					console.log(data);
//					show_data(data);
				},
				error: function() {
					alert('调用失败');
				}
			});
	})

})</script>
@endsection
