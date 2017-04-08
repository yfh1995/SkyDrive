$("#mytab2").click(function(e) {
	e.prventDefault();
	$(this).tab("show");

});

function jujiao1() {
	//            alert(111);
	//            $("#firstofpassword2").hide();
	//            $("#firstofpassword").removeClass('font-colorOfTixing');
	//
	//            $("#firstofpassword").show();

	$("#firstofpassword").show();
	$("#firstofpassword2").hide();
	$("#firstofpassword3").hide();
	$("#firstofpassword4").hide();
}

function bujujiao1() {
	//            if($("#now").val()==""){
	//                $("#firstofpassword").addClass('font-colorOfTixing');
	//            }
	//            else{
	//                $("#firstofpassword").hide();
	//            }
	$("#firstofpassword").hide();

	var lengthofnowpassword = $("#now").val().length;
	if(lengthofnowpassword > 0) {
		$("#firstofpassword4").show();

		$("#firstofpassword2").hide();
		$("#firstofpassword3").hide();
	} else if(lengthofnowpassword == 0) {
		$("#firstofpassword2").show();

		$("#firstofpassword3").hide();
		$("#firstofpassword4").hide();
	}

}

function jujiao2() {
	//            alert(111);
	$("#secondofpassword").show();
	$("#secondofpassword2").hide();
	$("#secondofpassword3").hide();
	$("#secondofpassword4").hide();
	$("#secondofpassword5").hide();

}

function bujujiao2() {
	$("#secondofpassword").hide();

	var lengthOftext = $("#new").val().length;
	if(lengthOftext >= 6 && lengthOftext <= 16) {
		$("#secondofpassword3").show();

		$("#secondofpassword2").hide();
		$("#secondofpassword4").hide();
		$("#secondofpassword5").hide();
	} else if(lengthOftext < 6 && lengthOftext > 0) {
		$("#secondofpassword4").show();

		$("#secondofpassword2").hide();
		$("#secondofpassword3").hide();
		$("#secondofpassword5").hide();
	} else if(lengthOftext > 16) {
		$("#secondofpassword5").show();

		$("#secondofpassword2").hide();
		$("#secondofpassword3").hide();
		$("#secondofpassword4").hide();
	} else if(lengthOftext == 0) {
		$("#secondofpassword2").show();

		$("#secondofpassword3").hide();
		$("#secondofpasswor4").hide();
		$("#secondofpassword5").hide();

	}

}

function jujiao3() {
	//            alert(111);
	$("#thirdofpassword").show();
	$("#thirdofpassword2").hide();
	$("#thirdofpassword3").hide();
	$("#thirdofpassword4").hide();
	$("#thirdofpassword5").hide();
	$("#thirdofpassword6").hide();
}

function bujujiao3() {
	//            alert(111);
	$("#thirdofpassword").hide();

	var lengthofpassword = $("#sure").val().length;
	if(lengthofpassword > 0 && lengthofpassword < 6) {
		$("#htirdofpassword3").show();

		$("#thirdofpassword2").hide();
		$("#thirdofpassword4").hide();
		$("#thirdofpassword5").hide();
		$("#thirdofpassword6").hide();
	} else if(lengthofpassword >= 6 && lengthofpassword <= 16) {
		if($("#new").val() == $("#sure").val()) {
			$("#thirdofpassword2").show();

			$("#thirdofpassword3").hide();
			$("#thirdofpassword4").hide();
			$("#thirdofpassword5").hide();
			$("#thirdofpassword6").hide();
		} else {
			$("#thirdofpassword5").show();

			$("#thirdofpassword2").hide();
			$("#thirdofpassword3").hide();
			$("#thirdofpassword4").hide();
			$("#thirdofpassword6").hide();
		}
	} else if(lengthofpassword > 16) {
		$("#thirdofpassword4").show();

		$("#thirdofpassword2").hide();
		$("#thirdofpassword3").hide();
		$("#thirdofpassword5").hide();
		$("#thirdofpassword6").hide();
	} else if(lengthofpassword == 0) {
		$("#thirdofpassword6").show();

		$("#thirdofpassword2").hide();
		$("#thirdofpassword3").hide();
		$("#thirdofpassword4").hide();
		$("#thirdofpassword5").hide();
	}

}

function CharMode(iN) {
	if(iN >= 48 && iN <= 57) //数字
		return 1;
	if(iN >= 65 && iN <= 90) //大写字母
		return 2;
	if(iN >= 97 && iN <= 122) //小写
		return 4;
	else
		return 8; //特殊字符
}

//bitTotal函数
//计算出当前密码当中一共有多少种模式
function bitTotal(num) {
	modes = 0;
	for(i = 0; i < 4; i++) {
		if(num & 1) modes++;
		num >>>= 1;
	}
	return modes;
}

//checkStrong函数
//返回密码的强度级别

function checkStrong(sPW) {
	//            if (sPW.length<=5)
	//                return 0; //密码太短
	Modes = 0;
	for(i = 0; i < sPW.length; i++) {
		//测试每一个字符的类别并统计一共有多少种模式.
		Modes |= CharMode(sPW.charCodeAt(i));
	}

	return bitTotal(Modes);

}

//pwStrength函数
//当用户放开键盘或密码输入框失去焦点时,根据不同的级别显示不同的颜色

function pwStrength(pwd) {

	O_color = "#eeeeee";
	L_color = "#FF0000";
	M_color = "#FF9900";
	H_color = "#33CC00";
	if(pwd == null || pwd == '') {
		Lcolor = Mcolor = Hcolor = O_color;
	} else if(pwd.length <= 5) {
		Lcolor = Mcolor = Hcolor = O_color;
	} else {
		S_level = checkStrong(pwd);
		switch(S_level) {

			case 0:
				Lcolor = Mcolor = Hcolor = O_color;
			case 1:
				Lcolor = L_color;
				Mcolor = Hcolor = O_color;
				break;
			case 2:
				Lcolor = Mcolor = M_color;
				Hcolor = O_color;
				break;
			default:
				Lcolor = Mcolor = Hcolor = H_color;
		}
	}

	document.getElementById("strength_L").style.background = Lcolor;
	document.getElementById("strength_M").style.background = Mcolor;
	document.getElementById("strength_H").style.background = Hcolor;
	return;
}

$(document).ready(function() {
	new Particleground.particle('#demo', {
		// range等于0，表示不连线
		range: 0,
		num: 18,
		maxR: 20,
		maxSpeed: 3
	});
	var data1 = GetFileName();
	username = data1[0]['name'];
	akak();
	//            bkbk();
	//            ckck();
	$("#div2,#div3").hide(); //隐藏除第一个之外的所有的
	$("#List_1").addClass("hehecolor");

	$("#List_1").click(function() {
		$("#div1").show();
		//                show_basic();
		$("#div2,#div3").hide();
		$("#List_1").addClass("hehecolor");
		$("#List_2,#cao_1").removeClass("hehecolor");

		$("#div2,#div3").remove();
	});
	$("#List_2").click(function() {
		$("#div2").show(); //只显示第二个

		$("#div1,#div3").hide(); //不显示的 都写在这里面
		$("#List_2").addClass("hehecolor"); //菜单背景颜色 显示被选中
		$("#List_1,#cao_1").removeClass("hehecolor"); //其他菜单都移除

		$("#div1,#div3").remove();
	});

	$("#cao_1").click(function() {
		$("#div3").show();

		$("#div1,#div2").hide();
		$("#cao_1").addClass("hehecolor");
		$("#List_1,#List_2").removeClass("hehecolor");

		$("#div1,#div2").remove();
	});

	$("#btnone").click(function() {});

	//show_basic();
});

//        function show_basic(){
//            var data1=GetFileName();
//            document.getElementById('nicheng').value=data1[0]['name'];
//
//            if(data1[0]['sex']=='male')
//            {
//                document.getElementById('male').checked='checked';
//            }
//            else if(data1[0]['sex']=='female')
//            {
//                document.getElementById('female').checked='checked';
//            }
//
//
//            document.getElementById('email').value=data1[0]['email'];
//
//
//        }

//获取当前的数据
function GetFileName() {
	var catalog;
	$.ajax({
		url: '/personal_center/get_basic',
		type: 'post',
		async: false,
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},
		success: function(data) {
			catalog = data;

		},
		error: function() {
			alert('11数据读取发生错误11！');
		}
	});
	return catalog;
}

function reset_password() {
	alert(document.getElementById('new').value + document.getElementById('sure').value);
	$.ajax({
		url: '/personal_center/reset_password',
		type: 'post',
		async: false,
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},

		data: {
			'oldpassword': document.getElementById('now').value,
			'newpassword': document.getElementById('new').value,
			'repeatnewpassword': document.getElementById('sure').value
		},
		success: function(data) {
			if(data == 1) {
				alert('修改密码成功');
				$("#firstofpassword4").hide();
				$("#secondofpassword3").hide();
				$("#thirdofpassword2").hide();
			} else {
				$("#firstofpassword3").show();

				$("#firstofpassword4").hide();
				$("#firstofpassword2").hide();
			}

		},
		error: function() {
			alert('数据读取错误');
		}
	})

	document.getElementById('xiugai').reset();
	document.getElementById("strength_L").style.background = "#eeeeee";
	document.getElementById("strength_M").style.background = "#eeeeee";
	document.getElementById("strength_H").style.background = "#eeeeee";

}

$(window).load(function() {

	var F = "<div id='cao_2' style='width: 100px;height: 100px; '>";
	F += "<img src='/website/head_picture/" + username + ".jpg' class='headerImage'>";
	F += "</div>";

	$("#cao_1").prepend(F);

	var F = "<iframe style='display:none'id='img_header' src='/website/head_picture/" + username + ".jpg'> </iframe>";
	$("#KJKJKJ").prepend(F);

	var options = {
		thumbBox: '.cutPicture_thumbBox',
		spinner: '.cutPicture_spinner',
		imgSrc: '/website/head_picture/yfh.jpg'
	};
	var cropper = $('.cutPicture_imageBox').cropbox(options);
	$(document).on('change', '#cutPicture_upload-file', function() {
		//alert("cutPicture_upload-file");

		var reader = new FileReader();
		reader.onload = function(e) {
			options.imgSrc = e.target.result;
			cropper = $('.cutPicture_imageBox').cropbox(options);
		};
		reader.readAsDataURL(this.files[0]);
		this.files = [];

	});
	$(document).on('click', '#cutPicture_btnCrop', function() {

		var img = cropper.getDataURL();
		$('.cutPicture_cropped').html('');
		$('.cutPicture_cropped').append('<img src="' + img + '" align="absmiddle" style="width:64px;margin-top:4px;border-radius:64px;box-shadow:0px 0px 12px #7E7E7E;" ><p>64px*64px</p>');
		$('.cutPicture_cropped').append('<img src="' + img + '" align="absmiddle" style="width:128px;margin-top:4px;border-radius:128px;box-shadow:0px 0px 12px #7E7E7E;"><p>128px*128px</p>');
		$('.cutPicture_cropped').append('<img src="' + img + '" align="absmiddle" style="width:180px;margin-top:4px;border-radius:180px;box-shadow:0px 0px 12px #7E7E7E;"><p>180px*180px</p>');

		upload_head_picture(img);
	});
	$(document).on('click', '#cutPicture_btnZoomIn', function() {
		cropper.zoomIn();
	});
	$(document).on('click', '#cutPicture_btnZoomOut', function() {
		cropper.zoomOut();
	});
});

function upload_head_picture(img) {

	$.ajax({
		url: '/personal_center/storage_head',
		type: 'post',
		async: false,
		data: {
			'head': img
		},
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},
		success: function(data) {
			document.getElementById("img_header").contentDocument.location.reload();
			show_head_picture();

		},
		error: function() {
			alert("图片上传出错");
		}

	});

}

function show_head_picture() {
	$("#cao_2").remove();
	var F = "<div id='cao_2' style='width: 100px;height: 100px; '>";
	F += "<img src='/website/head_picture/" + username + ".jpg' style='width: 100px;height: 100px;'>";
	//            F+="<img src='documen t.getElementById('img_header').contentDocument.location.reload()' style='width: 64px;height: 64px;'>";
	F += "</div>";
	$("#cao_1").prepend(F);

	$("#photoofhead2").remove();
	var F = "<div id='photoofhead2' style='width: 50px;height: 50px; '>";
	F += "<a href='http://localhost/personal_center'><img src='/website/head_picture/" + username + ".jpg' style='width: 50px;height: 50px;'></a>";
	F += "</div>";
	$("#photoofhead1").prepend(F);

}

function akak() {
	$("#div1").remove();
	$("#div2").remove();
	$("#d3Divshow").hide();
	$("#List_1").addClass("hehecolor").siblings("li").removeClass("hehecolor");
	var data1 = GetFileName();
//	username = data1[0]['name'];
//	var F = "<div id='div1' class='right-1 col-md-offset-2'>";
//	F += " <div class='right-top'>";
//	F += " <ul id='table-1' class='list-group col-md-12'>";
//	F += " <li class='list-group-item' style='border-bottom: none' ><br><a><h3 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;基本资料</h3></a><br></li>";
//	F += "<li class='list-group-item ' style='height: 70px; font-size: large; border-top: none;' ><a class='hehe col-md-2'>昵称：</a> <a>" + data1[0]['name'] + "</a></li>"
//	F += "<li class='list-group-item'style='height: 70px;font-size: large;border-top: none;'>";
//	F += "<a class='hehe col-md-2 ' >性别：</a>";
//	F += "<a>" + data1[0]['sex'] + "</a>";
//	F += "</li>";
//	F += "<li class='list-group-item' style='height: 70px;font-size: large;border-top: none;'><a class='hehe col-md-2'>邮箱：</a><a>" + data1[0]['email'] + "</a></li>"
//	F += "</ul>";
//	F += "</div>";
//
//	F += "</div>";
	var F='<div id="div1" class="csshub-btn right-1 col-md-offset-4">基本资料<br/>昵称：'+data1[0]['name']+'<br/>性别：'+data1[0]['sex']+'<br/>邮箱：'+data1[0]['email']+'</div>';
	
	$("#aaaa").prepend(F);
}

function bkbk() {
	$("#div1").remove();
	$("#div2").remove();
	$("#d3Divshow").hide();
	$("#List_2").addClass("hehecolor").siblings("li").removeClass("hehecolor");
	var F = " <div id='div2' class='right-3 col-md-offset-2'>";
	F += " <div class='right-top'>";
	F += " <form id='xiugai'>";
	F += " <ul id='table-3' class='list-group col-md-12'>";
	F += " <li class='list-group-item' style='border-bottom: none'><a><h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;修改密码</h3></a><br></li>";
	F += " <li class='list-group-item' style='border-top: none'>";
	F += " <a class='hehe col-md-2'>当前密码</a>";
	F += " <input id='now' type='password' onclick='jujiao1();' onblur='bujujiao1();' value=''>";
	F += " <a id='firstofpassword'  style='display: none;'>请输入密码</a>";
	F += " <a id='firstofpassword2'  style='display: none; color: red;'>请输入密码</a>";
	F += " <a id='firstofpassword3'  style='display: none;color:red;'>密码错误</a>";
	F += " <span id='firstofpassword4' class='glyphicon glyphicon-ok' style='display: none;color:green;'></span>";
	F += " </li>";
	F += "<li class='list-group-item' style='border-top: none'>";
	F += "  <a class='hehe col-md-2'>新密码</a>";
	F += "<input  id='new' type='password'  onKeyUp=pwStrength(this.value); onblur='bujujiao2();'onBlur=pwStrength(this.value); onclick='jujiao2();'>";
	F += "<a id='secondofpassword' style='display: none;'>请输入6-16位半角字符（由数字，字符，符号组成）</a>";
	F += "<a id='secondofpassword2' style='display: none;color:red;'>请输入密码</a>";
	F += " <span id='secondofpassword3' class='glyphicon glyphicon-ok' style='display: none;color:green;'></span>";
	F += " <a id='secondofpassword4'  style='display: none;color: red;'>密码不足6位</a>";
	F += " <a id='secondofpassword5'  style='display: none;color: red;'>密码超过16位</a>";
	F += "</li>";
	F += "<li class='list-group-item' style='border-top: none'>";
	F += " <a class='hehe col-md-2'>密码强度</a>";
	F += "<table border='1' cellspacing='0' cellpadding='1' style='border: none;display:inline'  >";
	F += " <tr align='center'  class='' >";
	F += "  <td class=''  id='strength_L' width='50px;'  >11</td>";
	F += " <td  class='' id='strength_M' width='50px;' >22</td>";
	F += " <td class='' id='strength_H' width='50px;' >33</td>";
	F += " </tr>";
	F += "</table>";
	F += "</li>";
	F += "<li class='list-group-item' style='border-top: none'>";
	F += " <a class='hehe col-md-2'>确认密码</a>";
	F += "<input  id='sure' type='password' onfocus='jujiao3();' onblur='bujujiao3();'>";
	F += " <a id='thirdofpassword' style='display: none;'>请确认密码</a>";
	F += " <span id='thirdofpassword2' class='glyphicon glyphicon-ok' style='display: none;color:green;'></span>";
	F += " <a id='thirdofpassword3'  style='display: none;color: red;'>密码不足6位</a>";
	F += " <a id='thirdofpassword4'  style='display: none;color: red;'>密码超过16位</a>";
	F += " <a id='thirdofpassword5'  style='display: none;color: red;'>两次输入的密码不一致</a>";
	F += " <a id='thirdofpassword6' style='display: none;color:red;'>请输入密码</a>";
	F += "</li>";
	F += "<li class='list-group-item' style='border-top: none'>";
	F += " <button id='submit' onclick='reset_password()' type='submit'  class='btn btn-primary col-md-offset-2'>保存</button><br><br>";
	F += "</li>";
	F += "</ul>";
	F += "</form>";
	F += "</div>";
	F += "</div>";

	$("#bbbb").prepend(F);
}

function ckck() {
	$("#d3Divshow").hide();
	$("#div3").remove();
	var F = "<div id='div3' class='right-3 col-md-offset-2'>";
	F += "<div class='cutPicture_container'>";
	F += "<div class='cutPicture_imageBox'>";
	F += "<div class='cutPicture_thumbBox'></div>";
	F += "<div class='cutPicture_spinner' style='display: none'>Loading...</div>";
	F += "</div>";
	F += "<div class='cutPicture_action'>";
	F += "<div class='cutPicture_new-contentarea tc'>";
	F += "<a href='javascript:void(0)' class='cutPicture_upload-img'>";
	F += "<label for='upload-file'>上传图像</label>";
	F += "</a>";
	F += "<input type='file' class='' name='cutPicture_upload-file' id='cutPicture_upload-file' />";
	F += "</div>";
	F += "<input type='button' id='cutPicture_btnCrop'  class='cutPicture_Btnsty_peyton' value='裁切'>";
	F += "<input type='button' id='cutPicture_btnZoomIn' class='cutPicture_Btnsty_peyton' value='+'  >";
	F += "<input type='button' id='cutPicture_btnZoomOut' class='cutPicture_Btnsty_peyton' value='-' >";
	F += "</div>";
	F += "<div class='cutPicture_cropped'></div>";
	F += "</div>";
	F += "</div>";
	$("#cccc").prepend(F);
}

/*
 * 用D3画饼图
 */
function D3show() {
	$("#div1").remove();
	$("#div2").remove();
	$("#d3Divshow").show().addClass("hehecolor");
	$("#List_3").addClass("hehecolor").siblings("li").removeClass("hehecolor");

	$("#d3Divshow").empty();

	//文件类型+数量
	var dataset = [
		["text", 1],
		["picture", 1],
		["music", 1],
		["bt", 1],
		["video", 1],
		["archive", 1],
		['other', 1]
	];
	var width = 400,
		height = 200;
	var svg = d3.select("#d3Divshow").append("svg")
		.attr("width", width)
		.attr("height", height)
		.append('g')
		.attr("transform", "translate(" + width / 4 + "," + height / 2 + ")");
	//设置饼图变量
	var pie = d3.layout.pie().value(function(d) {
		return d[1]
	});
	var piedata = pie(dataset);
	console.log(piedata);
	var color = d3.scale.category10(),
		outerRadius = 100,
		innerRadius = 0;
	var arc = d3.svg.arc()
		.outerRadius(outerRadius)

	console.log(piedata);
	var arcs = svg.selectAll("g")
		.data(piedata) //绑定转换后的数据piedata
		.enter()
		.append("g");
	var tooltip = d3.select("body")
		.append("div")
		.attr("class", "tooltip")
		.style("opacity", 0.0);
	arcs.append('path') //添加路径
		.attr('fill', function(d, i) { //根据i的下标给每一个元素添加不同的颜色。
			return color(i);
		})
		.on("mouseover", function(d) {

			tooltip.html("" + d.data[0] + "数量：" + d.data[1] + "个 ")
				.style("left", (d3.event.pageX) + "px")
				.style("top", (d3.event.pageY + 20) + "px")
				.style("opacity", 1.0);
		})
		.on("mousemove", function(d) {
			/* 鼠标移动时，更改样式 left 和 top 来改变提示框的位置 */
			tooltip.style("left", (d3.event.pageX) + "px")
				.style("top", (d3.event.pageY + 20) + "px");
		})
		.on("mouseout", function(d) {
			/* 鼠标移出时，将透明度设定为0.0（完全透明）*/
			tooltip.style("opacity", 0.0);
		})
		//		.attr("d", function(d, i) {
		//					console.log(d);
		//					return arc(d);		
		//				})
		.transition() //设置动画
		.ease('bounce') //动画效果
		.duration(1500) //持续时间
		.attrTween('d', tweenPie) //两个属性之间平滑的过渡。
		.transition()
		.ease("elastic")
		.delay(function(d, i) {
			return 1500 + i * 50
		}) //设置了一个延迟时间，让每一个内半径不在同一个时间缩小。
		.duration(750)
		.attrTween('d', tweenDonut);

	function tweenPie(b) {
		//这里将每一个的弧的开始角度和结束角度都设置成了0
		//然后向他们原始的角度(b)开始过渡，完成动画。
		var i = d3.interpolate({
			startAngle: 0,
			endAngle: 0
		}, b);
		//下面的函数就是过渡函数，他是执行多次最终达到想要的状态。
		return function(t) {
			return arc(i(t));
		};
	}

	function tweenDonut(b) {
		//设置内半径不为0
		b.innerRadius = outerRadius * .3;
		//然后内半径由0开始过渡
		var i = d3.interpolate({
			innerRadius: 0
		}, b);
		return function(t) {
			return arc(i(t));
		};
	}

	var label = svg.selectAll('.label') //添加右上角的标签
		.data(piedata)
		.enter()
		.append('g')
		.attr("transform", "translate(" + (width / 4 + 20) + ", -" + height / 4 + ")");
	label.append('rect') //标签中的矩形
		.style('fill', function(d, i) {
			return color(i);
		})
		.attr('x', function(d, i) {
			return 0 + parseInt(i / 4) * 60;
		})
		.attr("y", function(d, i) {
			return 10 + i % 4 * 30;
		})
		.attr('rx', '5') //rx=ry 会出现圆角
		.attr('ry', '5')
		.attr('width', 50)
		.attr('height', 20);
	label.append('text') //标签中的文字
		.attr('x', function(d, i) {
			return 0 + parseInt(i / 4) * 60 + 25; //因为rect宽度是50，所以把文字偏移25,在后面再将文字设置居中
		})
		.attr("y", function(d, i) {
			return 15 + 10 + i % 4 * 30;
		})
		.text(function(d) {
			return d.data[0];
		})
		.style({
			"font-size": "10px",
			"text-anchor": "middle",
			'fill': "white",
			"font-weight": 600
		});

	data = [];
	var currentValue = 100;
	var random = d3.random.normal(0, 20.0);
	for(var i = 0; i < 7; i++) {
		var currentDate = new Date();
		currentDate.setDate(currentDate.getDate() - i);
		data.push([currentDate, currentValue]);
		currentValue = currentValue + random();
	}
	drawLineGraph(data);
}

function drawLineGraph(data) {
	var width = 600,
		height = 190;
	var svg = d3.select("#d3Divshow").append("svg")
		.attr("width", width)
		.attr("height", height)
	var margin = {
		top: 20,
		left: 40,
		right:40,
		bottom: 30
	};
	height = height - 40, width = width -margin.left-margin.right;
	//d3.extent找数组中的最大值和最小值
	var xDomain = d3.extent(data, function(d) {
		return d[0];
	})
	var yDomain = d3.extent(data, function(d) {
		return d[1];
	});
	console.log(xDomain);
	//d3.time.scale()不知道，先不管~
	var xScale = d3.time.scale().range([0, width]).domain(xDomain);
	var yScale = d3.scale.linear().range([height, 0]).domain(yDomain);
	//定义坐标系在里面添加比例尺。
	var xAxis = d3.svg.axis().scale(xScale).orient('bottom').ticks(7);
	var yAxis = d3.svg.axis().scale(yScale).orient('left').ticks(10);

	//定义线布局
	var line = d3.svg.line()
		.x(function(d) {
			return xScale(d[0]);
		})
		.y(function(d) {
			return yScale(d[1]);
		});
	//定义区域图布局
	var area = d3.svg.area()
		.x(function(d) {
			return xScale(d[0]);
		})
		.y0(function(d) {
			return yScale(d[1]);
		})
		.y1(height);
	//定义一个g：svg里面添加一个g分组，并且偏移一定的边距
	var g = svg.append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

	//定义一个渐变的颜色。
	var defs = svg.append("defs");
	var linearGradient = defs.append("linearGradient")
		.attr("id", "linearColor")
		.attr("x1", "0%")
		.attr("y1", "0%")
		.attr("x2", "0%")
		.attr("y2", "100%");
	var stop1 = linearGradient.append("stop")
		.attr("offset", "0%") //设置开始渐变的起始位置
		.style("stop-color", "blue"); //渐变开始颜色    

	var stop2 = linearGradient.append("stop")
		.attr("offset", "100%") //设置结束的渐变的位置
		.style("stop-color", "yellow"); //渐变末尾的颜色
	//添加区域图布局到g中去
	g.append('path')
		.datum(data)
		.attr('class', 'area')
		.attr('d', area)
		.style('fill', "url(#linearColor)");

	//将上面的定义的x坐标系放在g中去----------------------------------------
	g.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0, ' + height + ')')
		.call(xAxis);

	d3.selectAll('g.x g.tick')
		.append('line')
		.attr({
			x1: 0,
			y1: 0,
			x2: 0,
			y2: -height
		})
		.style('stroke', '#ccc')

	//将上面的定义的y坐标系放在g中区    

	g.append('g')
		.attr('class', 'y axis')
		.call(yAxis)
		.append('text') //添加一个文本文字，
		//                  .attr('transform', 'rotate(-90)')//逆时针旋转90度。
		.attr('y', -margin.top / 2)
		.attr('dy', '.71em')
		.attr('text-anchor', 'start')
		.text("一周数据(个)");

	d3.selectAll('g.y g.tick')
		.append('line')
		.attr({
			x1: 0,
			y1: 0,
			x2: width,
			y2: 0
		})
		.style('stroke', '#ccc');

	//区域图上面边缘的线。
	g.append('path')
		.datum(data)
		.attr('class', 'line')
		.attr('d', line);

	g.selectAll('circle').data(data).enter().append('circle')
		.attr('cx', function(d) {
			return xScale(d[0]);
		})
		.attr('cy', function(d) {
			return yScale(d[1]);
		})
		.attr('r', 5)
		.attr('class', 'circle');

	// focus tracking
	//在分组g中添加一个g,定义focus,并且设置为不可见
	var focus = g.append('g').style('display', 'none');

	//在focus分组里面添加了一个xline和yline和一个circle
	focus.append('line')
		.attr('id', 'focusLineX')
		.attr('class', 'focusLine');
	focus.append('line')
		.attr('id', 'focusLineY')
		.attr('class', 'focusLine');
	focus.append('circle')
		.attr('id', 'focusCircle')
		.attr('r', 5)
		.attr('class', 'circle focusCircle');
	//二分查找函数，
	var bisectDate = d3.bisector(function(d) {
		return d[0];
	}).left;
	g.append('rect')
		.attr('class', 'overlay')
		.attr('width', width)
		.attr('height', height)
		//              .on('mouseover', function() { focus.style('display', null); })      //鼠标移入的时候将focus的display设为null,即可见。
		//              .on('mouseout', function() { focus.style('display', 'none'); })     //鼠标移出的时候将focus设置为不可见。
		//              .on('mousemove', function() {
		//                  //----------------------------------------------------设置十字架的主要代码----------------------------------
		//                  //d3.mouse获取容器相对定位的位置。
		//                  var mouse = d3.mouse(this);
		//                  //invert根据传入一个值，找到对应定义域的值。通过获取的鼠标当前在g上面的x轴相对位置。从而获取
		//                  var mouseDate = xScale.invert(mouse[0]);
		//                  // console.log("获取比较精确的值"+mouseDate);
		//                  //通过一个对象data,和一个
		//                  var i = bisectDate(data, mouseDate); // returns the index to the current data item
		//                  // console.log("二分查找到一个接近值："+i);
		//                  var d0 = data[i - 1];
		//                  var d1 = data[i];
		//                  // work out which date value is closest to the mouse
		//                  // 比较当前中间点更加靠近哪边。
		//                  var d = mouseDate - d0[0] > d1[0] - mouseDate ? d1 : d0;
		//                  // console.log("两个点跟靠近哪一个点："+d);
		//
		//                  //通过上面找到离得最近的一个点。然后获取他的点。
		//                  var x = xScale(d[0]);
		//                  var y = yScale(d[1]);
		//                  //选中之前定义的circle然后给他设置x,y坐标
		//                  focus.select('#focusCircle')
		//                      .attr('cx', x)
		//                      .attr('cy', y);
		//                  //根据上面得到的x y来设置当前的显示line的位置。
		//                  focus.select('#focusLineX')
		//                      .attr('x1', x).attr('y1', yScale(yDomain[0]))
		//                      .attr('x2', x).attr('y2', yScale(yDomain[1]));
		//                  focus.select('#focusLineY')
		//                      .attr('x1', xScale(xDomain[0])).attr('y1', y)
		//                      .attr('x2', xScale(xDomain[1])).attr('y2', y);
		//              });	
}