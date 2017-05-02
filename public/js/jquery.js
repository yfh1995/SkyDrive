$(document).ready(function() {
	/*
	 * 设置进度条宽度js
	 */
	var data=$("#progress_data").text();
	var Prodatatype=0;
	data=data.split("/")[0];
	var num1;
	if(data.indexOf("KB")>=0){
		num1=parseFloat(data)/1000;
	}else if(data.indexOf("MB")>=0){
		num1=parseFloat(data);
	}else if(data.indexOf("GB")>=0){
		num1=parseFloat(data)*1000;
	}
	var num2=parseFloat(10*1024);
	var proPercent=num1/num2*100;
	console.log(proPercent)
	$(".progress-bar").css({
		"width":proPercent+"%"
	})
	console.log(num1);
	$("#upload").on('click', function() {
		$("#fatherName").val(father_catalog_nameNow);
	});
	$(document).on("click",".icon",function(){
		$(this).parent().siblings("label").find("input").prop("checked",true);
		var index=$(this).index();
		if(index==0){
			shareFile();
		}else if(index==1){
			downloadFile();
		}
	});
	console.log("asdasd"+$("#catalog").height()+" "+$("#xiangangID").height())
	/*
	 * 右键菜单
	 */
	
	$(document).on("contextmenu", ".firsttablelie", function(e) {
		leftNow=0;
		window.leftNow=leftNow;
	})
	$(document).on("contextmenu", ".secondtablelie", function(e) {
		leftNow=$(".firsttablelie").width();
		window.leftNow=leftNow;
	})
	$(document).on("contextmenu", ".thridtablelie ", function(e) {
		leftNow=$(".firsttablelie").width()+$(".secondtablelie").width();
		window.leftNow=leftNow;
	})
	$(document).on("contextmenu", ".FileShowLine", function(e) {
		if(file_typeNow=="garbage"){
			return ;
		}
		var index = $(this).index() - 1,
			topNow = index * 36;
		var scrollTop = $("#xiangangID").scrollTop();
		topNow -= scrollTop;
		var leftNow=$(this).parent().offfsetX;
		var left = e.offsetX+window.leftNow,
			top = e.offsetY + topNow;

		$("input[name='checkboxOfFile']").eq(index).prop("checked", true);
		/*
		 * 根据选中的数量来判断是否可以点击按钮
		 */
		var $subs = $("input[name='checkboxOfFile']");
		if($subs.filter(":checked").length >= 1) {
			$("#IsChooseFile").show();
		} else {
			$("#IsChooseFile").hide();
		}
		var countInputChecked = getCheckShuliang();
		if(countInputChecked <= 1) {
			$(".openFile,.renameFileC").removeClass("disable");
		} else {
			$(".openFile,.renameFileC").addClass("disable");
		}
		if(top > $("#xiangangID").height() / 2) {
			top -= 160;
		}
		$(".list").css({
			"display": "block",
			"left": left,
			"top": top
		});
		
		if(getCheckShuliang()==0){
			$("#showCountFIle").text("文件名");
		}else{
			$("#showCountFIle").text("已选中"+getCheckShuliang()+"个文件");
		}
		return false;
	});
	$(document).on("contextmenu", ".context-menu", function(e) {
		return false;
	});
	$(document).on('click', function() {
		$(".list").css({ "display": "none" });
	})
	/*
	 * 点击按钮复制分享码
	 */
	var clipboard = new Clipboard('#copyShareCode');

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
	$("#copyShareCode").on("click", function() {
		$("#IsCopyWancheng").animate({
			"opacity": '1'
		}, 500);
		setTimeout(function() {
			$("#IsCopyWancheng").animate({
				"opacity": '0'
			}, 500);
		}, 500);
	})
	//	console.log(GetQueryString('aaaa'))
	//	$.ajaxSetup({
	// 	   headers: { 'X-CSRF-TOKEN' : '{{ csrf_token() }}' }
	//	});
	inst = new mdui.Dialog(".mdui-dialog", {
		"overlay": true,
		"history": true
	});
	typeNow = GetQueryString("type");
	file_typeNow = GetQueryString('file_type');
	ShareCodeNow=GetQueryString('share_code');
	last_idNow = 100000;
	$(".checkboxInput").each(function() {
		last_idNow = last_idNow > $(this).attr("id") ? $(this).attr("id") : last_idNow;
	})
	father_catalog_nameNow = $(".FileShowLine").attr("data-father");
	if(father_catalog_nameNow == null) {
		father_catalog_nameNow = decodeURI(GetQueryString("father_catalog_name"));
	}
	/*
	 * 当在回收站的时候的设置
	 */
	if(file_typeNow=="garbage"){
		$("#HuiFuFile").show().siblings("button").hide();
	}else{
		$("#HuiFuFile").hide();
	}
	SetTileOfEntry(father_catalog_nameNow);
	$("#mytab a").click(function(e) {
		e.preventDefault();
		$(this).tab("show");
	});
	$("#caretHoverEvent ").hover(function(e) {
		e.preventDefault();
		$(this).tab("show");
	});
	$("#closeShareCode").on("click", function() {
		inst.close();
	})
	$("#LeftPicture").click(function() {
		$("#LeftPicture").css({
			"background-color": "gray"
		});
		$("#RightPicture").css({
			"background-color": "inherit"
		});
	});
	$("#RightPicture").click(function() {
		$("#LeftPicture").css({
			"background-color": "inherit"
		});
		$("#RightPicture").css({
			"background-color": "gray"
		});
	});
	$("#FileButtongShangChuang").click(function() {

	});
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
	$("#shareCodeInput").on("change", function() {

	})
	//复选框事件和样式
	$("#FatherOfcheckbox").addClass("checkbox");

	$("#FatherOfcheckbox").click(function() {
		$("input[name='checkboxOfFile']").prop("checked", this.checked);
		$("#ContentIntwoInTwoDiv").find(':checkbox[id!=FatherOfcheckbox]').each(function() {
			var flag = 0;
			if($(this).prop("checked")) {
				$(this).parent().parent().parent().children().addClass('bcOfListWhileHover');
				flag = 1;
			} else {
				$(this).parent().parent().parent().children().removeClass('bcOfListWhileHover');
			}
			if(flag == 1) {
				$("#IsChooseFile").show();
			} else {
				$("#IsChooseFile").hide();
			}
		});
		
		if(getCheckShuliang()==0){
			$("#showCountFIle").text("文件名");
		}else{
			$("#showCountFIle").text("已选中"+getCheckShuliang()+"个文件");
		}
		
	});

	//新建文件夹按钮事件

	$("#createNewFile").click(function() {
		if(IsCreateFileNow) return;
		IsCreateFileNow = true;
		var F = "<div id='div1' class='row' style='margin-left: 1px;'  >";

		F += "<div  class='col-md-7'>";
		F += "<td><label class='mdui-checkbox' style='height:20px;width:20px; float: left;'><input type='checkbox' name='checkboxOfFile' value='新建文件夹'  /><i class='mdui-checkbox-icon'></i></label>";
		F += "<a > <span class='glyphicon glyphicon-folder-open' style='float:left;margin-top: 10px;color:gray;'></span>";
		F += "<a id='Filename' style='display: none;' href='#'  >文件名</a></a>";
		F += "<input type='text' id='text1' value='新建文件夹'><button onclick='SureButtonFunction();' id='createFileSure' class='mdui-btn'>确定</button><button class='mdui-btn ' onclick='createFileQuXiao();' id='createFileFlase'>取消</button>";
		F += "</td> </div>";
		F += "<div class='col-md-3'>";
		F += "<td><p style='float:left;'>-</p></td>"
		F += "</div>";

		F += "<div class='col-md-2'>";
		F += "<td><p id='TimeOfCreateFile' style='float:left;'>" + getNowTime() + "</p></td>";
		F += "</div>";
		F += "</div>";

		$("#xiangangID").before(F);
	});
	/*
	 * 监听滚动条事件，当滚动到底部的时候处理方法
	 */
	var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
	var nScrollTop = 0; //滚动到的当前位置
	var nDivHight = 0; //滚动div的高度
	$("#xiangangID").on("scroll", function() {
		nDivHight = $(this).height();
		nScrollHight = $(this)[0].scrollHeight;
		nScrollTop = $(this)[0].scrollTop;

		if(nScrollTop + nDivHight+1 >= nScrollHight) {
			var dataset = {
				"size": sizeNow,
				"type": typeNow,
				"last_id": last_idNow
			}
			var url='/sky_drive/home';
			if(typeNow == 0 || typeNow == 2) {
				dataset.father_catalog_name = father_catalog_nameNow;
			} else {
				dataset.file_type = file_typeNow;
			}
			if(ShareCodeNow!==""&&ShareCodeNow!==null&&ShareCodeNow!==undefined){
				dataset={};
				dataset={
					"last_id": last_idNow,
					"share_code":ShareCodeNow
				};
				url="/sky_drive/getShareData"
			}
//						console.log(dataset);
			$.ajax({
				url: url,
				type: 'get',
				data: dataset,
				headers: {
					'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
				},
				success: function(data) {
					console.log(data);
					show_data(data);
				},
				error: function() {
					alert('调用失败');
				}
			});

		}

	})
	updateData();
});

/*
 * 更新数据
 */
function updateData() {
	mplayer_song[0].splice(0);
	mplayer_song[0].push({
		"basic": true,
		"name": "播放列表1",
		"singer": "未知",
		"singer": "未知"
	});

	cntInPicture = 0;
	cntInwhichm = 0;
	$(".Filename").each(function() {
		var tt = $(this).attr("data-type"),
			tturl = $(this).attr("data-url"),
			ttName=$(this).text();
		if(tt == "music") {
			mplayer_song[0].push({
				name: ttName,
				src: tturl,
				lrc: "无歌词"
			});
			cntInwhichm++;
		} else if(tt == "picture") {
			listOfPicture[cntInPicture++] = tturl;
		}
	});
	//	console.log(listOfPicture);
}
//当复选框选中的时候判断纵选中的要不要选中和可以该行添加背景颜色
$(document).on('click', 'input[name="checkboxOfFile"]', function() {
	var $subs = $("input[name='checkboxOfFile']");
	$("#FatherOfcheckbox").prop("checked", $subs.length == $subs.filter(":checked").length ? true : false);
	
	if($subs.filter(":checked").length >= 1) {
		$("#IsChooseFile").show();
	} else {
		$("#IsChooseFile").hide();
	}
	if($(this).prop("checked")) {
		$(this).parent().parent().parent().children().addClass('bcOfListWhileHover');
	} else {
		$(this).parent().parent().parent().children().removeClass('bcOfListWhileHover');
	}
	if(getCheckShuliang()==0){
			$("#showCountFIle").text("文件名");
		}else{
			$("#showCountFIle").text("已选中"+getCheckShuliang()+"个文件");
	}
})
/*
 * 给右键按钮添加事件
 */
function getCheckShuliang() {
	var cnt = 0;
	$("#ContentIntwoInTwoDiv").find(':checkbox[id!=FatherOfcheckbox]').each(function() {
		if($(this).prop("checked")) {
			var str = $(this).attr("id");
			cnt++;
		}
	});
	return cnt;
}

function clickfile() {
	if(getCheckShuliang() == 1) {
		$("#ContentIntwoInTwoDiv").find(':checkbox[id!=FatherOfcheckbox]').each(function() {
			if($(this).prop("checked")) {
				$(this).parent().siblings('a').click();
			}
		});
	}
}
function renameFile(){
	if(getCheckShuliang() == 1) {
		$("#ContentIntwoInTwoDiv").find(':checkbox[id!=FatherOfcheckbox]').each(function() {
			if($(this).prop("checked")) {
				$(this).parent().siblings("#toggletuBiao").find("#renameButton").click();
			}
		});
	}
}
$(".disable").on('click', function(e) {
	e.stopPropagation();
	e.preventDefault();
})
//给列表绑定悬浮事件
$(document).on('mouseover', '.FileShowLine', function() {
	if(file_typeNow=="garbage"){
			return ;
		}
	$(this).children().addClass('bcOfListWhileHover');
	$(this).find("DIV #toggletuBiao").show();
}).on("mouseout", '.FileShowLine', function() {
	if(file_typeNow=="garbage"){
			return ;
		}
	$(this).find("DIV #toggletuBiao").hide();
	if($(this).find("input").is(":checked") == false) {
		$(this).children().removeClass('bcOfListWhileHover');
	}

})

//返回上个目录
function BackTheBeforeFile(str) {
	//	console.log(str);
	//	refresh(str, 'catalog');
	//	$("#TitleDiv").remove();
	//	SetTileOfEntry(str);
	var hrefText = "/sky_drive/home?type=" + typeNow + "&father_catalog_name=" + str;
	window.location.href = hrefText;
}

//设置进入的标题目录
function SetTileOfEntry(str) {

	var addr = str.split("/");
	var strCopy = addr[0];
	var strCopy2 = addr[0];
	for(var i = 1; i < addr.length - 1; i++) {
		strCopy2 += "/";
		strCopy2 += addr[i];
	}
	$("#TitleDiv").remove();
	var F = "<div id='TitleDiv'>";
	if(addr.length == 1) {
		F += "<strong>全部文件</strong>";
	} else {
		F += "<a href='#' onclick='javascript:BackTheBeforeFile(\"" + strCopy2 + "\")'>" + "返回上一级" + "</a>";
		F += " | ";
		F += "<a href='#' onclick='javascript:BackTheBeforeFile(\"" + strCopy + "\")'>" + "全部文件" + "</a>";
	}

	for(var i = 1; i < addr.length; i++) {
		strCopy += "/";
		strCopy += addr[i];
		F += " > ";
		if(i == addr.length - 1) {
			F += "<strong>" + addr[i] + "</strong>";
		} else {
			F += "<a href='#' onclick='javascript:BackTheBeforeFile(\"" + strCopy + "\")'>" + addr[i] + "</a>";

		}
	}
	F += "</div>";
	$("#MeuOfHeader").append(F);
}

//获取当前的目录
function GetFileName() {
	var catalog;
	$.ajax({
		url: '/sky_drive/return_session_catalog',
		type: 'post',
		async: false,
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},
		success: function(data) {
			catalog = data;

		},
		error: function() {
			alert('11数据读取发生错误！');
		}
	});
	return catalog;
}

//点击文件夹
function EntryNextFile(str) {
	var hrefText = "/sky_drive/home?type=" + typeNow + "&father_catalog_name=" + father_catalog_nameNow + "/" + str;
	window.location.href = hrefText;

}

//点击文件,图片
function showTheFile(index) {

	if(cntInPicture == 0) {
		return;
	}
	$('#sucaihuo').remove();
	$("body").append('<ul id="sucaihuo" style="display:none"></ul>')
	for(var i = 0; i < cntInPicture; i++) {
		var str = '<li><img class="pictureForYou" data-original="' + listOfPicture[i] + '" src="' + listOfPicture[i] + '" alt="图片' + i + '"></li>';
		$("#sucaihuo").append(str);
	}
	$('#sucaihuo').viewer({
		url: 'data-original',
	});
	$(".pictureForYou").eq(index).click();
}
//点击音乐
function showTheFileMusic(index) {

	cntNowM = index; //表示点击该目录下的第几个音乐
	var str = "<div class='mp'><div class='mp-box'><img src='../mplayer/img/mplayer_error.png' alt='music cover' class='mp-cover'><div class='mp-info'><p class='mp-name'>未知</p><p class='mp-singer'>未知</p><p><span class='mp-time-current'>00:00</span>/<span class='mp-time-all'>00:00</span></p></div><div class='mp-btn'><button class='mp-prev' title='上一首'></button><button class='mp-pause' title='播放'></button><button class='mp-next' title='下一首'></button><button class='mp-mode' title='播放模式'></button>	<div class='mp-vol'><button class='mp-vol-img' title='静音'></button><div class='mp-vol-range' data-range_min='0' data-range_max='100' data-cur_min='80'><div class='mp-vol-current'></div><div class='mp-vol-circle'></div></div></div></div><div class='mp-pro'><div class='mp-pro-current'></div></div><div class='mp-menu'><button class='mp-list-toggle'></button><button class='mp-lrc-toggle'></button></div></div><button class='mp-toggle'><span class='mp-toggle-img'></span></button><div class='mp-lrc-box'><ul class='mp-lrc'></ul></div><button class='mp-lrc-close'></button><div class='mp-list-box'><ul class='mp-list-title'></ul><table class='mp-list-table'><thead><tr><th>歌名</th><th>歌手</th><th>时长</th></tr></thead><tbody class='mp-list'></tbody></table></div></div>";
	initMusic();

	function initMusic() {
		var modeText = ['顺序播放', '单曲循环', '随机播放', '列表循环'];
		$('.mp').remove();
		$("audio").remove()
		$("body").append(str);
		var player = new MPlayer({
			// 容器选择器名称
			containerSelector: '.mp',
			// 播放列表
			songList: mplayer_song,
			// 专辑图片错误时显示的图片
			defaultImg: '../mplayer/img/mplayer_error.png',
			// 自动播放
			autoPlay: true,
			// 播放模式(0->顺序播放,1->单曲循环,2->随机播放,3->列表循环(默认))
			playMode: 0,
			playList: 0,
			playSong: index,
			// 当前歌词距离顶部的距离
			lrcTopPos: 34,
			// 列表模板，用${变量名}$插入模板变量
			listFormat: '<tr><td>${name}$</td><td>${singer}$</td><td>${time}$</td></tr>',
			// 音量滑块改变事件名称
			volSlideEventName: 'change',
			// 初始音量
			defaultVolume: 80
		}, function() {
			// 绑定事件
			this.on('afterInit', function() {
				//				console.log('播放器初始化完成，正在准备播放');
			}).on('beforePlay', function() {
				var $this = this;
				var song = $this.getCurrentSong(true);
				var songName = song.name + ' - ' + song.singer;
				//				console.log('即将播放' + songName + '，return false;可以取消播放');
			}).on('timeUpdate', function() {
				var $this = this;
				//				console.log('当前歌词：' + $this.getLrc());
			}).on('end', function() {
				var $this = this;
				var song = $this.getCurrentSong(true);
				var songName = song.name + ' - ' + song.singer;
				//				console.log(songName + '播放完毕，return false;可以取消播放下一曲');
			}).on('mute', function() {
				var status = this.getIsMuted() ? '已静音' : '未静音';
				//				console.log('当前静音状态：' + status);
			}).on('changeMode', function() {
				var $this = this;
				var mode = modeText[$this.getPlayMode()];
				$this.dom.container.find('.mp-mode').attr('title', mode);
				//				console.log('播放模式已切换为：' + mode);
			});
		});
		$(document.body).append(player.audio); // 测试用
		setEffects(player);
		$(".mp-toggle").click();
	}
}

function SureButtonFunction() {
	//alert($("#text1").attr("value"));
	var cur_catalog_name = document.getElementById("text1").value;
	//alert(cur_catalog_name);
	if(cur_catalog_name == null && cur_catalog_name == "") {
		myAlert("请重新输入");
	} else {
		$.ajax({
			url: '/sky_drive/set_up_catalog',
			type: 'post',
			async: false,
			data: {
				'cur_catalog_name': cur_catalog_name
			},
			headers: {
				'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
			},
			success: function(data) {
				if(data == 'ok') {
					myAlert("创建文件夹成功了！");
					$(".errorBtnSure").attr("Isreload","true");
//					IsCreateFileNow = false;
//					alert('创建成功！');
//					$(".Filename").text(cur_catalog_name);
//					$(".Filename").show();
//					$("#text1").hide();
//					$("#createFileSure").hide();
//					$("#createFileFlase").hide();
//					$("#TimeOfCreateFile").text(getNowTime());
//					remove_data('div1');
//					refresh('', 'catalog');
					
				} else if(data == 'duplication of name') {
					myAlert('创建失败！此文件名和本目录下文件名重复！');
				} else {
					myAlert('因为未知原因创建失败！');
				}
			},
			error: function() {
				myAlert('创建失败！');
			}
		});

	}

}

function createFileQuXiao() {
	IsCreateFileNow = false;
	$("#div1").remove();
}
//点击视频
function showTheFileVideo(str) {
	//for(var i=0;i<cntInVideo;i++){
	//    alert(listOfVideo[i]);
	//}
	var strnum = str.split(".");

	$("#SRCOFvideo").val(listOfVideo[strnum[1]]);
	$("#IDOFvideo").val(strnum[0]);
	//	$("#IDOFvideo").val(45);
	//	$("#SRCOFvideo").val("/website/storage/video/610c5dce66c50a43aa147c009ed47ac1.mp4");
	$("#FromOfVideo").submit();
}

function getNowTime() {
	var curDate = new Date();
	var curYear = curDate.getFullYear();
	var curMonth = curDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
	var curDay = curDate.getDate(); //获取当前日(1-31)
	var curHour = curDate.getHours(); //获取当前小时数(0-23)
	var curMinute = curDate.getMinutes(); // 获取当前分钟数(0-59)
	var curSecond = curDate.getSeconds();
	return curYear + "-" + curMonth + "-" + curDay + "  " + curHour + ":" + curMinute + ":" + curSecond;
}

//设置每个文件的图标
function GetTuBiaoLogo(str) {
	switch(str) {
		case "text":
			str = "<img style='height:20px;width:20px;margin:8px 5px;' src='/img/txtlogo.jpg'>";
			break;
		case "picture":
			str = "<img style='height:20px;width:20px;margin:8px 5px;' src='/img/pictureLogo.jpg'>";
			break;
		case "music":
			str = "<img style='height:20px;width:20px;margin:8px 5px;' src='/img/musicLogo.jpg'>";
			break;
		case "bt":
			str = "<img style='height:20px;width:20px;margin:8px 5px;' src='/img/btLogo.jpg'>";
			break;
		case "video":
			str = "<img style='height:20px;width:20px;margin:8px 5px;' src='/img/videoLogo.jpg'>";
			break;
		case "archive":
			str = "<img style='height:20px;width:20px;margin:8px 5px;' src='/img/archiveLogo.jpg'>";
			break;
		default:
			str = "<img style='height:20px;width:20px;margin:8px 5px;' src='/img/otherLogo.jpg'>";
			break;

	}
	return str;
}
//点击移动文件夹按钮
$(document).on('click', '#removeButton', function() {

})
//点击重命名按钮
$(document).on('click', '#renameButton', function() {
	$(this).parent().parent().siblings(".Filename").hide();
	var ss = $(this).parent().parent().siblings(".Filename").text();
	var ss2 = ss.substring(ss.lastIndexOf('.'), ss.length);
	$(this).parent().parent().siblings("#Filerename").show();
	$(this).parent().parent().siblings("#Filerename").children("input").select();
	//alert($(this).parent().parent().siblings("#Filerename").children("input").attr('type'));
})
//确定重命名
$(document).on('click', '#renameFileSure', function() {
	var choose = $(this).parent().parent().attr('id');
	var GetId = $(this).parent().siblings("label").children("input").attr('id');
	//原先的名字
	var NameFirst = $(this).parent().siblings(".Filename").text();
	//原先名字的前缀
	var NameFirstMEIHOUZHUI = NameFirst.substring(0, NameFirst.lastIndexOf('.'));

	//原先名字的后缀
	var HouZhuiFileName = NameFirst.substring(NameFirst.lastIndexOf('.'), NameFirst.length);

	//修改之后的名字
	var NameNow = $(this).siblings("input").val();

	if(choose == 0) { //修改的是文件夹的名字

	} else { //其他情况
		NameNow += HouZhuiFileName;
	}
	if(NameFirst == NameNow) {
		$(this).parent().hide();
		$(this).parent().siblings(".Filename").text(NameNow);
		$(this).parent().siblings(".Filename").show();
	} else {
		var resultOfrename = "";
		$.ajax({
			url: '/sky_drive/rename',
			type: 'post',
			async: false,
			data: {
				'id': GetId,
				'rename': NameNow
			},
			headers: {
				'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
			},
			success: function(data) {
				resultOfrename = data;
			},
			error: function() {
				myAlert('命名失败！');
			}
		});
		if(resultOfrename == "ok") {
			myAlert("重命名成功！");
			$(".errorBtnSure").attr("Isreload","true");
		} else {
			myAlert("当前目录下已经有相同的目录请重新命名");
		}
	}

})
//对文件重命名取消renameFileFlase
$(document).on('click', '#renameFileFlase', function() {
	$(this).parent().siblings(".Filename").show();
	$(this).parent().hide();
	var NameFirst = $(this).parent().siblings(".Filename").text();
	var HouZhuiFileName = NameFirst.substring(0, NameFirst.lastIndexOf('.'));
	$(this).siblings("input").val(HouZhuiFileName);
})

//当点击这一行的时候被选中
$(document).on('mousevoer', '.FileShowLine', function() {
	$(this).children().children("input").prop("checked");
})

//上传文件之后显示数据
function show_data(data) {
	//	console.log(data);
	//	$("#div1").remove();
	//将图片的地址整合成一个数组
	//	cntInPicture = 0;
	//	for(var i = 0; i < data.length - 1; i++) {
	//		if(data[i]['md5'] != null) {
	//			var strOfLogoTypeGet = data[i]['address'].split("/"); //获得后缀，判断文件类型
	//			if(strOfLogoTypeGet[strOfLogoTypeGet.length - 1] == "picture") {
	//				listOfPicture[cntInPicture] = data[i]['address'];
	//				listOfPicture[cntInPicture] += "/";
	//				listOfPicture[cntInPicture] += data[i]['md5'];
	//				listOfPicture[cntInPicture++] += data[i]['cur_catalog_name'].substring(data[i]['cur_catalog_name'].lastIndexOf('.'), data[i]['cur_catalog_name'].length);
	//			}
	//		}
	//	}
	//	//	showTheFile(cntInwhichp);
	//	//将音乐的地址整合成一个数组
	//	cntInMusic = 0;
	//	for(var i = 0; i < data.length - 1; i++) {
	//		if(data[i]['md5'] != null) {
	//			var strOfLogoTypeGet = data[i]['address'].split("/"); //获得后缀，判断文件类型
	//			if(strOfLogoTypeGet[strOfLogoTypeGet.length - 1] == "music") {
	//				listOfMusic[cntInMusic] = data[i]['address'];
	//				listOfMusic[cntInMusic] += "/";
	//				listOfMusic[cntInMusic] += data[i]['md5'];
	//				listOfMusic[cntInMusic++] += data[i]['cur_catalog_name'].substring(data[i]['cur_catalog_name'].lastIndexOf('.'), data[i]['cur_catalog_name'].length);
	//			}
	//		}
	//	}
	//	//将视频的地址整合成一个数组
	//	cntInVideo = 0;
	//	for(var i = 0; i < data.length - 1; i++) {
	//		if(data[i]['md5'] != null) {
	//			var strOfLogoTypeGet = data[i]['address'].split("/"); //获得后缀，判断文件类型
	//			if(strOfLogoTypeGet[strOfLogoTypeGet.length - 1] == "video") {
	//				listOfVideo[cntInVideo] = ;
	//				listOfVideo[cntInVideo] += "/";
	//				listOfVideo[cntInVideo] += ;
	//				listOfVideo[cntInVideo++] += ;
	//			}
	//		}
	//	}
	//
	var strOfLogoType = "";

	cntInFileAddress = 0;
	cntInFileName = 0;
	cntInFileID = 0;

	var F = "";
	for(var i = 0; i < data.length; i++) {
		last_idNow = last_idNow > data[i]['id'] ? data[i]['id'] : last_idNow;
		var urlNow = data[i]['address'] + "/" + data[i]['md5'] + data[i]['cur_catalog_name'].substring(data[i]['cur_catalog_name'].lastIndexOf('.'), data[i]['cur_catalog_name'].length);
		DownloadFileAddress[cntInFileAddress++] = data[i]['address'] + "/" + data[i]['md5'] + data[i]['cur_catalog_name'].substring(data[i]['cur_catalog_name'].lastIndexOf('.'), data[i]['cur_catalog_name'].length);
		DownloadFileName[cntInFileName++] = data[i]['cur_catalog_name'];
		DownloadFileID[cntInFileID++] = data[i]['id'];
		strOfLogoType = data[i]['address'];

		F += "<div class='FileShowLine' class='row' style='margin:0px;padding:0px; '   >";
		if(data[i]['address'] == null) {
			F += "<div id='0' class='firsttablelie col-sm-7'>";
		} else {
			F += "<div id='1' class='firsttablelie col-sm-7'>";
		}
		//      F+="<td><input  style='height:20px;width:20px; margin:8px;float: left;'  type='checkbox' >";
		F += "<td><label class='mdui-checkbox' style='height:20px;width:20px; float: left;'><input id=" + data[i]['id'] + " type='checkbox' name='checkboxOfFile' value=" + i + " /><i class='mdui-checkbox-icon'></i></label>"
		//设置文件图标
		if(data[i]['address'] == null) {
			F += " <span  class='glyphicon glyphicon-folder-open' style='height:20px;width:20px;margin:8px 5px;color: gray;'></span>";
		} else {
			var strOfLogoTypeGet = strOfLogoType.split("/"); //获得后缀，判断文件类型
			F += GetTuBiaoLogo(strOfLogoTypeGet[strOfLogoTypeGet.length - 1]);
		}
		//设置文件的点击事件类型
		if(data[i]['md5'] != null) {
			var strOfLogoTypeGet = strOfLogoType.split("/"); //获得后缀，判断文件类型
			if(strOfLogoTypeGet[strOfLogoTypeGet.length - 1] == "picture") {
				//				data[i]['cur_catalog_name'].substring(data[i]['cur_catalog_name'].lastIndexOf('.'), data[i]['cur_catalog_name'].length)
				F += "<a class='Filename' href='JavaScript:;'data-type='picture' data-url=" + urlNow + " onclick='showTheFile(\"" + cntInPicture + "\");' style='padding-bottom: 5px;'>" + data[i]['cur_catalog_name'] + "</a>";
				cntInPicture++;
			} else if(strOfLogoTypeGet[strOfLogoTypeGet.length - 1] == "music") {
				F += "<a class='Filename' href='JavaScript:;'data-type='music' data-url=" + urlNow + " onclick='showTheFileMusic(\"" + cntInwhichm + "\");' style='padding-bottom: 5px;'>" + data[i]['cur_catalog_name'] + "</a>";
				cntInwhichm++;
			} else if(strOfLogoTypeGet[strOfLogoTypeGet.length - 1] == "video") {
				F += "<a class='Filename' href='JavaScript:;' data-type='video' data-url=" + urlNow + " onclick='showTheFileVideo(\"" + data[i]['id'] + "." + urlNow + "\");' style='padding-bottom: 5px;'>" + data[i]['cur_catalog_name'] + "</a>";
				cntInwhichv++;
			} else {
				F += "<a class='Filename' href='JavaScript:;'  style='padding-bottom: 5px;'>" + data[i]['cur_catalog_name'] + "</a>";
			}
		} else {
			F += "<a class='Filename' href='JavaScript:;' onclick='javascript:EntryNextFile(\"" + data[i]['cur_catalog_name'] + "\");'>" + data[i]['cur_catalog_name'] + "</a></a>";
		}
		var NoQianZhuiName = data[i]['cur_catalog_name'];
		var NoQianZhuiName2 = NoQianZhuiName.substring(0, NoQianZhuiName.lastIndexOf('.'));
		if(data[i]['md5'] != null) {
			F += "<a id='Filerename' style='display:none;'><input type='text'  value='" + NoQianZhuiName2 + "'><button  id='renameFileSure'>确定</button><button  id='renameFileFlase'>取消</button></a>";

		} else {
			F += "<a id='Filerename' style='display:none;'><input type='text'  value='" + NoQianZhuiName + "'><button  id='renameFileSure'>确定</button><button  id='renameFileFlase'>取消</button></a>";

		}

		F += "<div id='toggletuBiao' class='dropdown' style='float:right;display: none;' > ";
//		F += "<a  role='button'data-toggle='dropdown' data-target='#'  ><span class='glyphicon glyphicon-triangle-bottom'style='margin-top:8px;'><span></a>"
		F +="<svg class='icon' aria-hidden='true' style='margin-top:8px;width:20;height:20;cursor:pointer;'><use xlink:href='#icon-fenxiang'></use></svg><svg class='icon' aria-hidden='true' style='margin-top:8px;width:20;height:20;cursor:pointer;'><use xlink:href='#icon-xiazai'></use></svg><svg data-toggle='dropdown' data-target='#' class='icon' aria-hidden='true' style='margin-top:8px;width:20;height:20;cursor:pointer;'><use xlink:href='#icon-shenglvehao'></use></svg>";	
		F += "<ul class='dropdown-menu' role='menu' aria-labelledby='dLabel' style='left:-50px;width:100px;' onmouseout='$(this).dropdown('toggle');'>";
		F += "<li id='removeButton' style='text-align: center;cursor: pointer;'><a>移动</a></a></li>";
		F += "<li role='presentation' class='divider'></li>";
		F += "<li id='renameButton'  style='text-align: center;cursor: pointer;' ><a>重命名</a></li>";
		F += "</ul>";
		F += "</div>"
		F += "</td> </div>";
		F += "<div class='secondtablelie  col-sm-3'>";
		F += "<td><p style='float:left;line-height:36px;'>" + data[i]['size'] + "</p></td>";
		F += "</div>";

		F += "<div class='thridtablelie col-sm-2'>";
		F += "<td><p id='TimeOfCreateFile' style='float:left;line-height:36px;white-space:nowrap; '>" + data[i]['created_at'] + "</p></td>";
		F += "</div>";

		F += "</div>";
		F += "<div  class='mdui-divider-inset-light'></div>"

	}
	//	if(data.length == 0) {
	//		F += "<h4>尚无此类文件或文件夹!</h4>";
	//	}
	//	F += "</div>";
	$("#catalog").append(F);
	updateData();
}

function show_data_test() {

	var data = [{
		address: "/website/storage/music",
		click: 0,
		created_at: "2015-11-30 11:55:15",
		cur_catalog_name: "很累 - 五.mp3",
		download: 2,
		father_catalog_name: "yfh",
		garbage: "0000-00-00 00:00:00",
		id: 49,
		md5: "6436b0043144fdee01f0a2baecf76be7",
		owner_name: "yfh",
		root_garbage: 0,
		size: 1526888,
		updated_at: "2015-11-30 11:55:15",
		validate: null
	}, {
		address: "/website/storage/music",
		click: 0,
		created_at: "2015-11-30 11:55:15",
		cur_catalog_name: "修改代码-.-.mp3",
		download: 2,
		father_catalog_name: "yfh",
		garbage: "0000-00-00 00:00:00",
		id: 49,
		md5: "6436b0043144fdee01f0a2baecf76be7",
		owner_name: "yfh",
		root_garbage: 0,
		size: 1526888,
		updated_at: "2015-11-30 11:55:15",
		validate: null
	}]
	var F = "<div id='catalog' >";
	console.log(data.length);
	for(var i = 0; i < data.length; i++) {
		var strOfLogoType = data[i]['address'];
		F += "<div class='FileShowLine' class='row' style='margin:0px;padding:0px; '   >";
		if(data[i]['address'] == null) {
			F += "<div id='0' class='firsttablelie col-sm-7'>";
		} else {
			F += "<div id='1' class='firsttablelie col-sm-7'>";
		}
		F += "<td><label class='mdui-checkbox' style='height:20px;width:20px; float: left;'><input id=" + data[i]['id'] + " type='checkbox' name='checkboxOfFile' value=" + i + " /><i class='mdui-checkbox-icon'></i></label>"
		//设置文件图标
		if(data[i]['address'] == null) {
			F += " <span  class='glyphicon glyphicon-folder-open' style='height:20px;width:20px;margin:8px 5px;color: gray;'></span>";
		} else {
			var strOfLogoTypeGet = strOfLogoType.split("/"); //获得后缀，判断文件类型
			F += GetTuBiaoLogo(strOfLogoTypeGet[strOfLogoTypeGet.length - 1]);
		}
		//设置文件的点击事件类型
		if(data[i]['md5'] != null) {
			var strOfLogoTypeGet = strOfLogoType.split("/"); //获得后缀，判断文件类型
			if(strOfLogoTypeGet[strOfLogoTypeGet.length - 1] == "picture") {
				F += "<a id='Filename' href='JavaScript:;'  style='padding-bottom: 5px;'>" + data[i]['cur_catalog_name'] + "</a>";

			} else if(strOfLogoTypeGet[strOfLogoTypeGet.length - 1] == "music") {
				F += "<a id='Filename' href='JavaScript:;'  style='padding-bottom: 5px;'>" + data[i]['cur_catalog_name'] + "</a>";

			} else if(strOfLogoTypeGet[strOfLogoTypeGet.length - 1] == "video") {
				F += "<a id='Filename' href='JavaScript:;' style='padding-bottom: 5px;'>" + data[i]['cur_catalog_name'] + "</a>";

			} else {
				F += "<a id='Filename' href='JavaScript:;'  style='padding-bottom: 5px;'>" + data[i]['cur_catalog_name'] + "</a>";
			}
		} else {
			F += "<a id='Filename' href='JavaScript:;' onclick='javascript:EntryNextFile(\"" + data[i]['cur_catalog_name'] + "\");'>" + data[i]['cur_catalog_name'] + "</a></a>";
		}
		var NoQianZhuiName = data[i]['cur_catalog_name'];
		var NoQianZhuiName2 = NoQianZhuiName.substring(0, NoQianZhuiName.lastIndexOf('.'));
		if(data[i]['md5'] != null) {
			F += "<a id='Filerename' style='display:none;'><input type='text'  value='" + NoQianZhuiName2 + "'><button  id='renameFileSure'>确定</button><button  id='renameFileFlase'>取消</button></a>";

		} else {
			F += "<a id='Filerename' style='display:none;'><input type='text'  value='" + NoQianZhuiName + "'><button  id='renameFileSure'>确定</button><button  id='renameFileFlase'>取消</button></a>";

		}

		F += "<div id='toggletuBiao' class='dropdown' style='float:right;display: none;' > ";
//		F += "<a  role='button'data-toggle='dropdown' data-target='#'  ><span class='glyphicon glyphicon-triangle-bottom'style='margin-top:8px;'><span></a>"
		F +="<svg class='icon' aria-hidden='true' style='margin-top:8px;width:20;height:20;cursor:pointer;'><use xlink:href='#icon-fenxiang'></use></svg><svg class='icon' aria-hidden='true' style='margin-top:8px;width:20;height:20;cursor:pointer;'><use xlink:href='#icon-xiazai'></use></svg><svg data-toggle='dropdown' data-target='#' class='icon' aria-hidden='true' style='margin-top:8px;width:20;height:20;cursor:pointer;'><use xlink:href='#icon-shenglvehao'></use></svg>";
		F += "<ul class='dropdown-menu' role='menu' aria-labelledby='dLabel' style='left:-50px;width:100px;' onmouseout='$(this).dropdown('toggle');'>";
		F += "<li id='removeButton' style='text-align: center;cursor: pointer;'><a>移动</a></a></li>";
		F += "<li role='presentation' class='divider'></li>";
		F += "<li id='renameButton'  style='text-align: center;cursor: pointer;' ><a>重命名</a></li>";
		F += "</ul>";
		F += "</div>"
		F += "</td> </div>";
		F += "<div class='secondtablelie  col-sm-3'>";
		F += "<td><p style='float:left;line-height:36px;'>" + data[i]['size'] + "</p></td>";
		F += "</div>";

		F += "<div class='thridtablelie col-sm-2'>";
		F += "<td><p id='TimeOfCreateFile' style='float:left;line-height:36px;white-space:nowrap; '>" + data[i]['created_at'] + "</p></td>";
		F += "</div>";

		F += "</div>";
		F += "<div  class='mdui-divider-inset-light'></div>"

	}
	if(data.length == 0) {
		F += "<h4>尚无此类文件或文件夹!</h4>";
	}
	F += "</div>";
	$("#xiangangID").prepend(F);
}

function mouseOnDIv() {

}

//整个移除显示
function remove_data(id) {
	$("#" + id).remove();
}

//获得哪些选中
function getAllcheckbox() {
	var cnt = 0;
	$("#ContentIntwoInTwoDiv").find(':checkbox[id!=FatherOfcheckbox]').each(function() {
		if($(this).prop("checked")) {
			var str = $(this).attr("id");
			cnt++;
		}
	});
	var list = new Array(cnt);
	cnt = 0;
	$("#ContentIntwoInTwoDiv").find(':checkbox[id!=FatherOfcheckbox]').each(function() {
		if($(this).prop("checked")) {
			var str = $(this).attr("id");
			list[cnt++] = parseInt(str);
		}
	});
	return list;
}
/*
 * 分享文件
 */
function shareFile() {
	var list = getAllcheckbox();
	//	console.log(list)
	$.ajax({
		url: '/sky_drive/createShare',
		type: 'post',
		data: {
			'ids': list,
			'deadline': 3600
		},
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},
		success: function(data) {
			$("#shareCode").text(data.message);
			inst.open();
		},
		error: function() {
			myAlert("分享失败");
		}
	});
}
/*
 * 下载文件
 */
function downloadFile() {
	var list = getAllcheckbox();
	console.log(list);
	$("#DownloadFileIds").val(list);
	console.log($("#DownloadFileIds").val());
	$("#DownloadFileFather_catalog_name").val(father_catalog_nameNow);
	
	$("#DownloadFileForm").submit();
//	$.ajax({
//		url: '/sky_drive/download_files',
//		type: 'post',
//		data: {
//			'ids': list,
//			"father_catalog_name": father_catalog_nameNow
//		},
//		headers: {
//			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
//		},
//		success: function(data) {
//			console.log(data);
//		},
//		error: function() {
//			alert("下载失败");
//		}
//	});
}
/*
 * 删除与文件
 */
function delete_and_restore_getdate(flag) {

	var list = getAllcheckbox();
	delete_and_restore(list, flag);
}

//设置文件为已在回收站
function delete_and_restore(list, flag) {

	var date;
	if(flag == 0) date = getNowTime();
	else date = "0000-00-00 00:00:00";

	$.ajax({
		url: '/sky_drive/delete_and_restore',
		type: 'post',
		async: false,
		data: {
			'list': list,
			'date': date
		},
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},
		success: function(data) {
			if(flag == 0) {
				myAlert("删除成功！你可以在回收站还原已删除文件！");
				$(".errorBtnSure").attr("Isreload","true");
			} else {
				myAlert("还原成功！");
				$(".errorBtnSure").attr("Isreload","true");
			}

			//			refresh('', 'catalog');
		},
		error: function() {
			if(flag == 0) myAlert("删除失败！");
			else myAlert("还原失败！");
		}
	});
}

/*
 * 刷新页面操作
 */
function refresh(father_catalog_name, type) {
	//  移除了换页的按钮 所以下面的代码注释了。
	//	remove_data('show_paging');
	if(type == 'catalog') {
		show_catalog(father_catalog_name, type, 0, 20, 0);
	} else if(type == 'garbage') {
		show_garbage(type, 0, 20, 0);
	} else {
		show_type(type, 0, 20, 0);
	}
}
//侧边菜单分类显示
function show_type(type, page, size, flag) {
	$.ajax({
		url: '/sky_drive/type',
		type: 'post',
		async: false,
		data: {
			'type': type,
			'skip': page * size,
			'size': size
		},
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},
		success: function(data) {
			remove_data('catalog');
			show_data(data);
			//			if(flag == 0) {
			//				show_paging(Math.ceil(data[data.length - 1] / size), type, size, 1);
			//			}
		},
		error: function() {
			myAlert('数据读取发生错误！');
		}
	});
}

function show_garbage(type, page, size, flag) {

	$.ajax({
		url: '/sky_drive/get_garbage',
		type: 'post',
		async: false,
		data: {
			'type': type,
			'skip': page * size,
			'size': size
		},
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},
		success: function(data) {
			remove_data('catalog');
			show_data(data);
			//			if(flag == 0) {
			//				show_paging(Math.ceil(data[data.length - 1] / size), type, size, 1);
			//			}
		},
		error: function() {
			myAlert("数据读取错误！");
		}
	});
}

/*
 * 根据当前的查看文件的类型、页数、size来获取数据
 */
function show_catalog(father_catalog_name, type, page, size, flag) {
	listMulu = father_catalog_name;
	listPage = page + 1, listType = type;
	$.ajax({
		url: '/sky_drive/refresh',
		type: 'post',
		async: false,
		//dataType : 'json',
		data: {
			'father_catalog_name': father_catalog_name,
			'skip': page * size,
			'size': size
		},
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},
		success: function(data) {
			remove_data('catalog');
			show_data(data);

			//			if(flag == 0) {
			//				show_paging(Math.ceil(data[data.length - 1] / size), type, size, 1);
			//			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			myAlert(XMLHttpRequest.status);
			myAlert(XMLHttpRequest.readyState);
			myAlert(textStatus);
			myAlert('数据读取发生错误！');
		}
	});
}
/*
 * 动态添加的数据
 */
function show_catalog2() {
	var size = 20;
	$.ajax({
		url: '/sky_drive/refresh',
		type: 'post',
		async: false,
		//dataType : 'json',
		data: {
			'father_catalog_name': listMulu,
			'skip': listPage * size,
			'size': size
		},
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},
		success: function(data) {
			show_data(data);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			myAlert(XMLHttpRequest.status);
			myAlert(XMLHttpRequest.readyState);
			myAlert(textStatus);
			myAlert('数据读取发生错误！');
		}
	});
}

function show_paging(sum, type, size, flag) {

	var F = "<div id=show_paging></div>";
	$("#ContentIntwoInTwoDiv").after(F);

	$('#show_paging').Paging({
		pagesize: size,
		count: sum * 10,
		toolbar: false,
		callback: function(page, size, count) {
			if(type == 'catalog') {
				show_catalog('', type, page - 1, size, flag);
			} else if(type == 'garbage') {
				show_garbage(type, page - 1, size, flag);
			} else {
				show_type(type, page - 1, size, flag);
			}
		}
	});
}

//获得移动文件夹的根目录
function GetFatherUnder_catalog(str) {
	$.ajax({
		url: '/sky_drive/get_move_catalog',
		type: 'post',
		async: false,
		data: {
			'id': str
		},
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},
		success: function(data) {
			if(data == -1) {
				catalogOfSonFcnt = 0;
			} else {
				catalogOfSonFcnt = 0;
				for(var i = 0; i < data.length; i++) {
					if(data[i]['size'] == -1) {
						catalogOfSonFId[catalogOfSonFcnt] = data[i]['id'];
						catalogOfSonF[catalogOfSonFcnt++] = data[i]['cur_catalog_name'];
					}
				}
			}

		},
		error: function() {
			myAlert("提取子目录发生错误");
		}
	});
}

//移动文件夹，传选中ID和移动哪个目录下面
function MoveFileOfYidongwenjianjia() {
	$.ajax({
		url: '/sky_drive/move_catalog',
		type: 'post',
		async: false,
		data: {
			'move_id': numOfMoveFile,
			'be_moved_id': SureMoveId
		},
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},
		success: function() {
			myAlert('移动文件夹成功了');
			$(".errorBtnSure").attr("Isreload","true");
		},
		error: function() {
			myAlert("移动文件夹错误");
		}
	});
}