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
<script src="{{asset('/js/jquery.jplayer.min.js')}}"></script>
<script src="{{asset('/mplayer/js/mplayer.js')}}"></script>
<script src="{{asset('/mplayer/js/mplayer-list.js')}}"></script>
<script src="{{asset('/mplayer/js/mplayer-functions.js')}}"></script>
<script src="{{asset('/mplayer/js/jquery.nstSlider.min.js')}}"></script>
<script src="{{asset('/viewper/viewer.js')}}"></script>
<script src="{{asset('/mdui-v0.1.2/js/mdui.min.js')}}"></script>
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
//当前滚动文件所在的页数，type类型
var listPage = 0,
	listType = "catalog",
	listMulu = "";

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

	refresh('', 'catalog');
	var str = GetFileName();
	SetTileOfEntry(str);

});

$("#ajaxForm").ajaxForm(function() {

	refresh('', 'catalog');

});

//打开移动文件夹模态框
function MoveTheFile() {
	cnt = 0;
	//        获取哪些被选中
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

<div class="TwoDivInYunpan"  >
	<div class="row" style="height:100%;">
		<div class="oneInTwoDiv col-md-2 col-lg-2 col-sm-2" style="padding:0;" >
			<ul id="systemSetting" class=" nav nav-pills nav-stacked"  >
				<li id="AllFileDiv" class="mdui-ripple " style="text-align: center;" onclick="refresh('','catalog');">
					<a  href="#" >
						<i class="mdui-icon material-icons">&#xe24d;</i><strong style="color: gray;">全部文件</strong>
					</a>
				</li>
				<li id="PictureDiv" class="mdui-ripple" onclick="refresh('','picture')" >
					<a  href="#">
						<strong style="color: gray;">图片</strong>
					</a>
				</li>
				<li id="FillDiv" class="mdui-ripple"  onclick="refresh('','text')">
					<a  href="#">
						</span><strong style="color: gray;">文档</strong>
					</a>
				</li>
				<li id="VideoDiv" class="mdui-ripple" onclick="refresh('','video')">
					<a  href="#">
						<strong style="color: gray;">视频</strong>
					</a>
				</li>
				<li id="ZhongziDiv" class="mdui-ripple" onclick="refresh('','bt')">
					<a  href="#">
						<strong style="color: gray;">种子</strong>
					</a>
				</li>
				<li id="MiuseDiv" class="mdui-ripple" onclick="refresh('','music')">
					<a   href="#">
						<strong style="color: gray;">音乐</strong>
					</a>
				</li>
				<li id="OtherDiv" class="mdui-ripple"	 >
					<a   href="#">
						<strong style="color: gray;"><i class="mdui-icon mdui-icon-left material-icons">&#xe80d;</i>我的分享</strong>
					</a>
				</li>
				<li id="RecycleDiv" class="mdui-ripple" onclick="refresh('','garbage')" >
					<a   href="#">
						<strong style="color: gray;"><i class="mdui-icon mdui-icon-left material-icons">&#xe872;</i>回收站</strong>
					</a>
				</li>
			</ul>
			<div  class="col-md-offset-2"  style="width:70%;margin-bottom: 0px;padding-bottom:0px;position:absolute;bottom:20px;">
				<div class="progress progress-striped active" >
					<div class="progress-bar progress-bar-success " role="progressbar" aria-valuenow="60"
					aria-valuemin="0" aria-valuemax="100" style="width:80%"></div>
				</div><strong>8G/10G</strong>
			</div>
		</div>
		<div class=" twoInTwoDiv col-md-10 col-sm-10 col-lg-10" style="height:100%; margin:0px;padding:0px;">
			<div id="headerIntwoInTwoDiv" style="height:10%;max-height: 10%;">
				<div class="tabcaidan" style="float:left; margin-left: 10px;margin-top: 10px; ">
					<form id="ajaxForm" enctype="multipart/form-data" action="{{url('/sky_drive/upload')}}" method="POST" style="display: none;">
						<input type="hidden" name="_token" value="{{ csrf_token() }}">
						<input type="file" name="file" id="file" class="file" data-language="zh" onchange="sb.click()">
						<input name="sb" type="submit" id="sb">
					</form>
					<div id="fileOperator">
						<button   onclick="file.click();" type="button" class="mdui-btn mdui-color-light-blue-accent mdui-ripple">
						<a>
							<span class="glyphicon glyphicon-cloud-upload"></span>
						</a>
						上传文件
						</button>
						<button id="createNewFile" type="button" class="mdui-btn mdui-color-white-accent  mdui-ripple">
						<i class="mdui-icon material-icons">&#xe145;</i>
						新建文件夹
						</button>

						<button type="button" class="mdui-btn mdui-color-white-accent  mdui-ripple">
						<i class="mdui-icon material-icons">&#xe2c4;</i>
						离线下载
						</button>
						<div id='IsChooseFile' class="btn-group" style="display:none;" >
						<button id="DownLoadTheFile" class="btn mdui-btn mdui-color-white-accent  mdui-ripple ">
						<i class="mdui-icon material-icons">&#xe2c0;</i>
						下载
						</button>
						<button id="shareFile" class="btn mdui-btn mdui-color-white-accent  mdui-ripple ">
						<i class="mdui-icon material-icons">&#xe80d;</i>
						分享
						</button>
						<button type="button" class="btn mdui-btn mdui-color-white-accent  mdui-ripple" onclick="delete_and_restore_getdate(0)">
						<i class="mdui-icon material-icons " >&#xe872;</i>
						删除
						</button>

						<button id="moveFileButton" type="button" class="btn mdui-btn mdui-color-white-accent  mdui-ripple" onclick="javascript:MoveTheFile();" >
						移动到
						</button>
						<button id="previewBtn" type="button" class="btn mdui-btn mdui-color-white-accent  mdui-ripple" >
						预览
						</button>
						<button type="button" class="btn mdui-btn mdui-color-white-accent  mdui-ripple" onclick="delete_and_restore_getdate(1)">
						恢复
						</button>
					</div>
					</div>

					

				</div>

				<!--<div class="btn-group " style="float:right;margin:10px 10px;">
				<div class="btn-group btn-sm " id="LeftPicture" style="border: 1px solid #c0c0c0; background-color: gray;cursor: pointer;">
				<a href="#">
				<span class="glyphicon glyphicon-th-list" ></span>
				</a>
				</div>
				<div class="btn-group btn-sm " id="RightPicture" style="border: 1px solid #c0c0c0;cursor: pointer;">
				<a href="#">
				<span class="glyphicon glyphicon-th"></span>
				</a>
				</div>
				</div>-->
			</div>
			<div style="height:5%;">
				<div id="MeuOfHeader" style="float:left; margin-left:20px;" ></div>
				<p style="float:right; margin-right: 10px;">
					已加载
				</p>
			</div>
			<div id="ContentIntwoInTwoDiv" style="height:calc(85%);margin:0px;padding:0px;" >
				<div class='hearderlie'  style=" height:30px; ">
					<div  class="fistlie col-sm-7 col-md-7 "style="height:100%; "  >
						<label class="mdui-checkbox">
						<input id="FatherOfcheckbox" style='height:20px;width:20px; float: left;' class='hello' type="checkbox"  />
						<i class="mdui-checkbox-icon" ></i> 文件名 </label>
						
					</div>
					<div class="secondlie col-sm-3 col-md-3 " style="height:100%;">
						<p style="line-height: 30px;">
							大小
						</p>
					
					</div>
					<div  class="thridlie col-sm-2 col-md-2 ">
						<p style="line-height: 30px;">
							修改日期
						</p>

					</div>
				</div>
				<div id="xiangangID" >

				</div>
				<div id="paging">

				</div>
			</div>
		</div>
	</div>
</div>

<form id="FromOfVideo"  action="{{url('/sky_drive/preview')}}" method="POST" style="display: none;"target="_blank">
	<input type="hidden" name="_token" value="{{ csrf_token() }}">
	<input id="IDOFvideo" type="text" name="id" value="">
	<input id="SRCOFvideo" type="text" name="src" value="">
</form>
<script>$(document).ready(function() {
	/*
	 * 动态设置初始化div的高度
	 */
	//				$(".oneInTwoDiv").height($(window).height()-50);

})</script>
@endsection
