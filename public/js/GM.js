var GM_single_or_All = 1;
var GM_user_or_GM = 1;
var nameNow = "",IDNow=-1;

function addGM_Recycle() //加载回收站按钮
{
	var str1 = "<li><a data-toggle='tab' onclick='GM_clickBtnShow(0)'><span class='glyphicon glyphicon-trash'></span>&nbsp;&nbsp;回收站</a></li>";
	$("#GM_people").append(str1);
}

function addGM_peoplev1() //加载用户按钮
{
	var str1 = "<li><a data-toggle='tab' onclick='GM_clickBtnShow(5)'><span class='glyphicon glyphicon-user'></span>&nbsp;&nbsp;管理员</a></li>";
	$("#GM_people").append(str1);
	//debug
	
//	var str1 = "<li><a data-toggle='tab' onclick='GM_clickBtnShow(4)'><span class='glyphicon glyphicon-user'></span>&nbsp;&nbsp;角色</a></li>";
//	$("#GM_people").append(str1);
//	//	debug
	var str1 = "<li><a data-toggle='tab' onclick='GM_clickBtnShow(1)'><span class='glyphicon glyphicon-user'></span>&nbsp;&nbsp;用户</a></li>";
	$("#GM_people").append(str1);
}

function addGM_peoplev2() //加载管理员按钮
{
	var str1 = "<li><a data-toggle='tab' onclick='GM_clickBtnShow(2)'><span class='glyphicon glyphicon-user' style='color: red'></span>&nbsp;&nbsp;管理员</a></li>";
	$("#GM_people").append(str1);
}

function addGM_homePagev1() //加载滑动展览按钮
{
	var GM_ul1 = document.getElementById("GM_homePage");
	var newnode = document.createElement("li");
	newnode.innerHTML = "<a href='#' data-toggle='tab'><span class='glyphicon glyphicon-resize-horizontal'></span>&nbsp;&nbsp;滑动展览</a>";
	GM_ul1.appendChild(newnode);
}

function addGM_homePagev2() //加载热度TOP榜按钮
{
	var GM_ul1 = document.getElementById("GM_homePage");
	var newnode = document.createElement("li");
	newnode.innerHTML = "<a href='#' data-toggle='tab'><span class='glyphicon glyphicon-sort-by-attributes-alt'></span>&nbsp;&nbsp;热度TOP榜</a>";
	GM_ul1.appendChild(newnode);
}

function addGM_homePagev3() //加载下载TOP榜按钮
{
	var GM_ul1 = document.getElementById("GM_homePage");
	var newnode = document.createElement("li");
	newnode.innerHTML = "<a href='#' data-toggle='tab'><span class='glyphicon glyphicon-download'></span>&nbsp;&nbsp;下载TOP榜</a>";
	GM_ul1.appendChild(newnode);
}

function addGM_homePagev4() //加载管理员推荐按钮
{
	var GM_ul1 = document.getElementById("GM_homePage");
	var newnode = document.createElement("li");
	newnode.innerHTML = "<a href='#' data-toggle='tab'><span class='glyphicon glyphicon-thumbs-up'></span>&nbsp;&nbsp;管理员推荐</a>";
	GM_ul1.appendChild(newnode);
}

function addGM_suffix() //加载后缀按钮
{
	var GM_ul1 = document.getElementById("GM_onlineDisk");
	var newnode1 = document.createElement("li");
	newnode1.innerHTML = "<a href='#' data-toggle='tab' onclick='GM_clickBtnShow(3)'><span class='glyphicon glyphicon-minus'></span>&nbsp;&nbsp;后缀</a>";
	GM_ul1.appendChild(newnode1);
}

function addGM_delete() //加载删除按钮
{
//	var GM_ul1 = document.getElementById("GM_onlineDisk");
//	var newnode = document.createElement("li");
//	newnode.innerHTML = "<a  href='#GM_delete' class='nav-header collapsed' data-toggle='collapse'><span class='glyphicon glyphicon-remove-circle'></span>&nbsp;&nbsp;删除<b class='caret'></b></a>" +
//		"<ul id='GM_delete' style='width:90%;float:right;'class='nav nav-list collapse secondmenu nav-pills nav-stacked'>" +
//		"<li><a href='#' data-toggle='tab'><span class='glyphicon glyphicon-picture'></span>&nbsp;&nbsp;图片</a></li>" +
////		"<li><a href='#' data-toggle='tab'><span class='glyphicon glyphicon-film'></span>&nbsp;&nbsp;视频</a></li>" +
////		"<li><a href='#' data-toggle='tab'><span class='glyphicon glyphicon-list-alt'></span>&nbsp;&nbsp;文本</a></li>" +
////		"<li><a href='#' data-toggle='tab'><span class='glyphicon glyphicon-leaf'></span>&nbsp;&nbsp;种子</a></li>" +
//		"</ul> ";
//	GM_ul1.appendChild(newnode);
}

function ShowAllBtn() //选择复选框后判断是显示多选按钮
{
	var GM_data1 = document.getElementsByName("GM_user");
	var GM_I = 0;
	if(GM_data1[0].id == 'search')
		GM_I = 1;
	for(var GM_k = GM_I; GM_k < GM_data1.length; GM_k++) {
		if(GM_data1[GM_k].checked) {
			$("#GM_selectAllBtnTwoBtn").attr("style", "display:block");
			return 0;
		}
	}
	$("#GM_selectAllBtnTwoBtn").attr("style", "display:none");

}

function GM_selectAll() //全选js
{
	var GM_a = document.getElementsByTagName("input");
	var GM_I = 0;
	if(GM_a[0].id == 'search')
		GM_I = 1;
	if(GM_a[GM_I].checked) {
		for(var GM_i = GM_I; GM_i < GM_a.length; GM_i++) {
			if(GM_a[GM_i].name == 'GM_user') GM_a[GM_i].checked = false;
		}
	} else {
		for(var GM_i = GM_I; GM_i < GM_a.length; GM_i++) {
			if(GM_a[GM_i].name == 'GM_user') GM_a[GM_i].checked = true;
		}
	}
	ShowAllBtn();
}
//------------------------------搜索ajax-------------------------------------------------------------------------------------------------
function GM_Search() //搜索ajax
{
	var flag = $('#search').attr('whatever');
	var name = $('#search').val();
	var GM_name = name.split('');

	if(GM_name == '') {
		if(flag == 'permissiongroup') {
			GM_getGMslist2(0, 10, false);
		} else if(flag == 'user') {
			GM_getUserslist(0, 10, false);
		} else if(flag == 'gm') {
			GM_getGMslist1(0, 10, false);
		} else if(flag == 'recycle') {
			GM_getRecycleBinlist(0, 10, false);
		}
		return 0;
	}
	$.ajax({
		url: '/admin/sky_drive/search_user',
		type: 'post',
		async: false,
		data: {
			'flag': flag,
			'name': name
		},
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},
		success: function(data) {

			if(flag == 'permissiongroup')
				GM_showGMsTable(2, data);
			else if(flag == 'user')
				GM_showUsersTable(data);
			else if(flag == 'gm')
				GM_showGMsTable(1, data);
			else if(flag == 'recycle') {
				GM_ShowRecycleBinTable(data);
			}
		},
		error: function() {
			$('#GM_information').find('.modal-body').text('数据读入出错');
			document.getElementById('GM_informationBtn').click();
		}
	});
}
//------------------------------回收站---------------------------------------------------------------------------------------------------
function GM_ShowRecycleBinFrame() //加载回收站框架
{
	var GM_div1 = document.getElementById("GM_Show");
	GM_div1.innerHTML = "<div id='GM_title'></div><div id='GM_exhibition' > </div> <div id='show_paging'> </div><div id='GM_userM'></div>";
	var str1 = "<div id='GM_usersModal2' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel' aria-hidden='true'><div class='modal-dialog modal-sm'> <div class='modal-content'> <div class='modal-header'><button type='button' class='close'data-dismiss='modal' aria-hidden='true'> &times;</button> <h4 class='modal-title' >确定要恢复这个用户 </h4> </div>  <div class='modal-footer'><div class='col-md-5'> <div class='col-md-10'style='margin: 0;padding: 0;'>通知用户</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_ToUser'></div> </div><div class='col-md-7'><button type='button' class='btn btn-default'data-dismiss='modal'>取消</button><button type='button' class='btn btn-primary' data-dismiss='modal' onclick='GM_getRecycleBinRevise(1)'>确定</button></div> </div> </div> </div> </div>";
	//恢复
	str1 += "<div id='GM_usersModalAll2' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel' aria-hidden='true'> <div class='modal-dialog modal-sm'> <div class='modal-content'> <div class='modal-header'><button type='button' class='close'data-dismiss='modal' aria-hidden='true'> &times;</button><h4 class='modal-title' >确定要恢复这个用户</h4> </div>  <div class='modal-footer'><div class='col-md-5'> <div class='col-md-10'style='margin: 0;padding: 0;'>通知用户</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_ToUser'></div> </div><div class='col-md-7'><button type='button' class='btn btn-default'data-dismiss='modal'>取消</button><button type='button' class='btn btn-primary' data-dismiss='modal' onclick='GM_getRecycleBinRevise(2)'>确定</button> </div> </div></div> </div> </div>";
	//全选恢复
	$("#GM_userM").append(str1);
	$('#GM_usersModal2').on('show.bs.modal', function(event) {
		var button = $(event.relatedTarget);
		var GM_SS = button.data('whatever');
		var modal = $(this);
		$("#GM_usersModal2").attr("whatever", GM_SS);
		GM_SS = GM_SS.split(' ');
		modal.find('.modal-title').text('确定恢复: ' + GM_SS[1]);
	})
	$('#GM_usersModalAll2').on('show.bs.modal', function(event) {
		var GM_obj = document.getElementsByName("GM_user");
		var GM_check_val = [];
		for(var GM_k in GM_obj) {
			if(GM_obj[GM_k].checked) {
				GM_check_val.push(GM_obj[GM_k].value);
			}
		}
		var modal = $(this);
		modal.find('.modal-title').text('确定恢复: ' + GM_check_val + '等');
	})
	var GM_div1 = document.getElementById("GM_title");
	GM_div1.innerHTML = "<div> <ol class='breadcrumb GM_breadcrumb'> <li>控制台</li> <li>人员管理</li> <li style='color: #080808'>回收站</li> </ol> </div>";
}

function GM_getsRecycleBinPaging(sum, size, flag) //加载回收站分页
{
	var GM_div1 = document.getElementById("show_paging");
	GM_div1.innerHTML = "";

	$('#show_paging').Paging({
		pagesize: size,
		count: sum * 10,
		toolbar: false,
		callback: function(page, size, count) {
			GM_getRecycleBinlist(page - 1, size, flag);
		}
	});
}

function GM_ShowRecycleBin() //加载回收站页面
{
	var GM_div1 = document.getElementById("GM_exhibition");
	GM_div1.innerHTML = "";
	var GM_str2 =
		"<div class='col-md-12' id='GM_usersTa'> <table class='table table-bordered table-hover'> <caption><div class='col-md-4'style='float:left;'>回收站</div><div   id='GM_selectAllBtnTwoBtn' class='col-md-4'style='float:right;display: none' ><div style='display:inline;padding:0;margin-left:10px;'><a class='btn btn-success btn-xs GM_userInput' data-toggle='modal' data-target='#GM_usersModalAll2' > <i class='glyphicon glyphicon-trash icon-white'></i>恢复身份</a></div></div><div class='col-md-4'style='float:right;'><div style='width:80%;float:left;' ><input id='search'class='form-control'  placeholder='请输入姓名'  whatever='recycle'></div><div style='width:20%;float:left;'><a class='btn btn-primary GM_userInput' onclick=GM_Search()>搜索 </a></div></div></caption> <thead> <tr> <th>选择<button class='btn btn-success btn-xs GM_userInput' onclick='GM_selectAll()'>全选/不选</button></th><th>ID</th> <th>账户</th> <th>用户名</th> <th>创建时间</th><th>删除时间</th><th>权限</th> <th>操作</th> </tr> </thead><tbody id='GM_usersTbody'></tbody></table></div>";
	GM_div1.innerHTML = GM_str2;
}

function GM_ShowRecycleBinTable(GM_data1) //加载回收站表单
{
	var str1 = "";
	for(var i = 0; i < GM_data1.length - 1; i++) {
		str1 = str1 + "<tr><td class='GM_userInput'><div style='text-align:center' ><input onclick=' ShowAllBtn()' type='checkbox' name='GM_user'  value='" + GM_data1[i]['id'] + "'></div></td><td><div>" + GM_data1[i]['id'] + "</div></td><td><div>" + GM_data1[i]['email'] + "</div></td><td><div>" + GM_data1[i]['name'] + "</div></td><td><div>" + GM_data1[i]['created_at'] + "</div></td><td><div>" + GM_data1[i]['delete_at'] + "</div></td><td><div style='padding:0;' > <a  id='GM_GMLookAdmin" + GM_data1[i]['id'] + "' tabindex='0' type='button' class='btn btn-warning btn-xs' title='该管理员权限' data-container='body' data-toggle='popover' data-trigger='focus' data-placement='left' whatever='" + GM_data1[i]['admin'] + "'>" + GM_data1[i]['admin'] + "</a></div></td><td><div style='text-align: center'><div style='display:inline;padding:0;margin:20px;'><a class='btn btn-info btn-xs GM_userInput' data-toggle='modal' data-target='#GM_usersModal2' data-whatever='" + GM_data1[i]['id'] + ' ' + GM_data1[i]['name'] + "' > <i class='glyphicon glyphicon-thumbs-up'></i>恢复身份 </a></div></div></td></tr>";
	}
	var GM_div1 = document.getElementById("GM_usersTbody");
	GM_div1.innerHTML = str1;
	for(var i = 0; i < GM_data1.length - 1; i++) {
		$("#GM_GMLookAdmin" + GM_data1[i]['id']).on('show.bs.popover', function() {
			var GM_str1 = $(this).attr('whatever');
			var GM_str2 = $(this).attr('id');
			GM_GMPopover(GM_str1, GM_str2);
		})
	}
	$("[data-toggle='popover']").popover();

}
//-------------------------------回收站ajax-------------------------------------------------------------------------------------------------
function GM_getRecycleBinlist(page, size, flag) //回收站ajax
{
	$.ajax({
		url: '/admin/sky_drive/get_garbage_user',
		type: 'post',
		async: false,
		data: {
			'skip': page * size,
			'size': size
		},
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},
		success: function(data) {
			console.log(data);
			if(flag == false) {
				GM_clearAddition();
				GM_ShowRecycleBinFrame();
			}
			GM_ShowRecycleBin();
			GM_ShowRecycleBinTable(data);
			if(flag == false)
				GM_getsRecycleBinPaging(Math.ceil(data[data.length - 1] / size), size, true);
		},
		error: function() {
			$('#GM_information').find('.modal-body').text('数据读入出错');
			document.getElementById('GM_informationBtn').click();
		}
	});
}

function GM_getRecycleBinRevise(GM_flag) //回收站恢复ajax
{
	var data1 = [];
	var data2 = 0;
	if(GM_flag == 1) {
		var GM_data1 = $('#GM_usersModal2').attr('whatever').split(' ');
		data1.push(GM_data1[0]);
		var GM_data2 = document.getElementsByName("GM_ToUser");
		for(var GM_k in GM_data2) {
			if(GM_data2[GM_k].checked) {
				data2 = 1;
			}
		}
	} else if(GM_flag == 2) {
		var GM_data1 = document.getElementsByName("GM_user");
		for(var GM_k in GM_data1) {
			if(GM_data1[GM_k].checked) {
				data1.push(GM_data1[GM_k].value);
			}
		}
		var GM_data2 = document.getElementsByName("GM_ToUser");
		for(var GM_k in GM_data2) {
			if(GM_data2[GM_k].checked) {
				data2 = 1;
			}
		}
	}
	$.ajax({
		url: '/admin/sky_drive/delete_and_restore',
		type: 'post',
		async: false,
		data: {
			'id': data1,
			'type': 0
		},
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},
		success: function(data) {
			GM_clickBtnShow(0);
			if(data2 == 1) {
				$.ajax({
					url: '/email/restore_user',
					type: 'post',
					async: false,
					data: {
						'id': data1
					},
					headers: {
						'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
					},
					success: function(data) {
						$('#GM_information').find('.modal-body').text('邮件发送成功');
						document.getElementById('GM_informationBtn').click();
					},
					error: function() {
						$('#GM_information').find('.modal-body').text('邮件发送出错');
						document.getElementById('GM_informationBtn').click();
					}
				});
			}
		},
		error: function() {
			$('#GM_information').find('.modal-body').text('数据读入出错');
			document.getElementById('GM_informationBtn').click();
		}
	});
}
//-------------------------------用户-----------------------------------------------------------------------------------------------------
function GM_Addition(GM_flag1, GM_flag2, GM_flag3) //加载增加的模块
{

	var GM_div1 = document.getElementById("GM_addition");
	GM_div1.style.background = "#f5f5f5";
	if(GM_flag2 == 1) {
		if(GM_flag1 == 1) //修改密码
		{
			$(".GM_userInput").attr("style", "pointer-events: none;background:#000;opacity:0.1;");
			GM_div1.innerHTML = "<div class='col-md-12 btn-info'><h4>修改密码</h4></div> <div  class='col-md-12 GM_Boder' style='text-align:center;'> <div class='col-md-12'style='margin-top: 20px;padding: 0'><input type='password' id='GM_passWord' class='form-control'  placeholder='Password'> </div> <div class='col-md-12'style='margin-top: 20px;margin-bottom:15px;padding: 0'> <input type='password' id='GM_RepassWord' class='form-control'  placeholder='Repeat'> </div><div id='GM_warning' class='col-md-12 alert alert-danger' style='margin-top: 20px;margin-bottom:15px;padding: 0;display:none '></div> </div> <div class='col-md-12' style='text-align:center;margin:20px 0px 400px 0px;'><div class='col-md-12'style='margin-top: 20px;'> <div class='col-md-10'style='margin: 0;padding: 0;'>通知用户</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_ToUser'></div> </div> <div style='float:left;padding: 0;margin-top: 20px' class='col-md-6' > <a class='btn btn-info btn-xs' onclick='GM_clearAddition()'> <i class='glyphicon glyphicon-edit icon-white' ></i>取消 </a> </div> <div style='float:left;padding: 0;margin-top: 20px' class='col-md-6'> <a class='btn btn-danger btn-xs' data-toggle='modal' data-target='#GM_isSureChangePass' > <i class='glyphicon glyphicon-trash icon-white'> </i>确定 </a> </div> </div>";
		}
		if(GM_flag1 == 2) { //获取权限
			if(GM_flag3 == 1) {
				$.ajax({
					url: "/admin/sky_drive/get_roles",
					type: 'post',
					headers: {
						'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
					},
					success: function(data) {
						console.log(data);
						$(".GM_userInput").attr("style", "pointer-events: none;background:#000;opacity:0.1;");
						var strOfGM_div1 = "<div  class='col-md-12 btn-danger' style='text-align:center;'><h4 >角色管理</h4></div> ";
						strOfGM_div1 += "<div class='col-md-12 GM_Boder'>";
						for(var i = 0; i < data.length; i++) {
							strOfGM_div1 += '<div class="col-md-12" style="margin-top: 15px;padding: 0;">';
							strOfGM_div1 += ' <div class="col-md-10" style="margin: 0;padding: 0;">' + data[i].cn_name + '</div>';
							strOfGM_div1 += ' <div class="col-md-2" style="margin: 0;padding: 0">';
							var women = data[i].cn_name+"_"+data[i].group_name;
							strOfGM_div1 += "<input type='radio' name='GM_userSetSelect2' value=" + women + " /></div> </div>";
						}
						strOfGM_div1 += "</div>";
						strOfGM_div1 += '<div class="col-md-12" style="text-align:center;margin:20px 0px 400px 0px;"><div class="col-md-10" style="margin: 0;padding: 0;">通知管理员</div> <div class="col-md-2" style="margin: 0;padding: 0"><input type="checkbox" name="GM_ToUser" value="12"></div> <div style="float:left;padding: 0;margin-top: 20px" class="col-md-6"> <a class="btn btn-info btn-xs" onclick="GM_clearAddition()"> <i class="glyphicon glyphicon-edit icon-white"></i>取消 </a> </div> <div style="float:left;padding: 0;margin-top: 20px" class="col-md-6"> <a class="btn btn-danger btn-xs" data-toggle="modal" data-target="#GM_isSurePower2"> <i class="glyphicon glyphicon-trash icon-white"></i>确定 </a> </div> </div>';
						GM_div1.innerHTML = strOfGM_div1;


					},
					error: function() {
						alert('调用失败');
					}
				});
			} else {
				$.ajax({
					url: "/admin/sky_drive/get_permissions_by_name",
					type: 'post',
					data: {
						group_name: nameNow
					},
					headers: {
						'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
					},
					success: function(data) {
						$(".GM_userInput").attr("style", "pointer-events: none;background:#000;opacity:0.1;");
						var strOfGM_div1 = "<div  class='col-md-12 btn-danger' style='text-align:center;'><h4 >设置权限</h4></div> ";
						strOfGM_div1 += "<div class='col-md-12 GM_Boder'>";
						for(var i = 0; i < data.length; i++) {
							strOfGM_div1 += '<div class="col-md-12" style="margin-top: 15px;padding: 0;">';
							strOfGM_div1 += ' <div class="col-md-10" style="margin: 0;padding: 0;">' + data[i].chinese_name + '</div>';
							strOfGM_div1 += ' <div class="col-md-2" style="margin: 0;padding: 0">';
							var women = data[i].permission_name;
							women += "_" + data[i].chinese_name;
							strOfGM_div1 += "<input type='checkbox' name='GM_userSetSelect' value=" + women + " /></div> </div>";
						}
						strOfGM_div1 += "</div>";
						strOfGM_div1 += '<div class="col-md-12" style="text-align:center;margin:20px 0px 400px 0px;"><div class="col-md-10" style="margin: 0;padding: 0;">通知管理员</div> <div class="col-md-2" style="margin: 0;padding: 0"><input type="checkbox" name="GM_ToUser" value="12"></div> <div style="float:left;padding: 0;margin-top: 20px" class="col-md-6"> <a class="btn btn-info btn-xs" onclick="GM_clearAddition()"> <i class="glyphicon glyphicon-edit icon-white"></i>取消 </a> </div> <div style="float:left;padding: 0;margin-top: 20px" class="col-md-6"> <a class="btn btn-danger btn-xs" data-toggle="modal" data-target="#GM_isSurePower"> <i class="glyphicon glyphicon-trash icon-white"></i>确定 </a> </div> </div>';
						GM_div1.innerHTML = strOfGM_div1;
						//					GM_div1.innerHTML = " <div  class='col-md-12 btn-danger' style='text-align:center;'><h4 >设置权限</h4></div><div class='col-md-12 GM_Boder'><div class='col-md-12'style='margin-top: 15px;padding: 0;'> <div class='col-md-10'style='margin: 0;padding: 0;'>回收站</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_userSetSelect' value='recycle 回收站'></div> </div><div class='col-md-12'style='margin-top: 15px;padding: 0;'> <div class='col-md-10'style='margin: 0;padding: 0;'>滑动展览</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_userSetSelect' value='homePagev1 滑动展览'></div> </div> <div class='col-md-12'style='margin-top: 15px;padding: 0;'> <div class='col-md-10'style='margin: 0;padding: 0;'>热度TOP榜</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_userSetSelect' value='homePagev2 热度TOP榜' ></div> </div> <div class='col-md-12'style='margin-top: 15px;padding: 0;'> <div class='col-md-10'style='margin: 0;padding: 0;'>下载TOP榜</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_userSetSelect' value='homePagev3 下载TOP榜'></div> </div> <div class='col-md-12'style='margin-top: 15px;padding: 0;'> <div class='col-md-10'style='margin: 0;padding: 0;'>管理员推荐</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_userSetSelect' value='homePagev4 管理员推荐'></div> </div> <div class='col-md-12'style='margin-top: 15px;padding: 0;'> <div class='col-md-10'style='margin: 0;padding: 0;'>后缀</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox'name='GM_userSetSelect' value='suffix 后缀'></div> </div> <div class='col-md-12'style='margin-top: 15px;margin-bottom:15px;padding: 0;'> <div class='col-md-10'style='margin: 0;padding: 0;'>删除</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_userSetSelect' value='delete 删除'></div> </div> </div> <div class='col-md-12' style='text-align:center;margin:20px 0px 400px 0px;'> <div class='col-md-10'style='margin: 0;padding: 0;'>通知管理员</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_ToUser' value='12'></div> <div style='float:left;padding: 0;margin-top: 20px' class='col-md-6' > <a class='btn btn-info btn-xs' onclick='GM_clearAddition()'> <i class='glyphicon glyphicon-edit icon-white' ></i>取消 </a> </div> <div style='float:left;padding: 0;margin-top: 20px' class='col-md-6'> <a class='btn btn-danger btn-xs' data-toggle='modal' data-target='#GM_isSurePower'> <i class='glyphicon glyphicon-trash icon-white'></i>确定 </a> </div> </div>";

					},
					error: function() {
						alert('调用失败');
					}
				});
			}
		}
	} else if(GM_flag2 == 2) {
		if(GM_flag1 == 1) //修改密码
		{
			$(".GM_userInput").attr("style", "pointer-events: none;background:#000;opacity:0.1;");
			GM_div1.innerHTML = "<div class='col-md-12 btn-info'><h4>修改密码</h4></div> <div  class='col-md-12 GM_Boder' style='text-align:center;'> <div class='col-md-12'style='margin-top: 20px;padding: 0'><input type='password' id='GM_passWord' class='form-control'  placeholder='Password'> </div> <div class='col-md-12'style='margin-top: 20px;margin-bottom:15px;padding: 0'> <input type='password' id='GM_RepassWord' class='form-control'  placeholder='Repeat'> </div><div id='GM_warning' class='col-md-12 alert alert-danger' style='margin-top: 20px;margin-bottom:15px;padding: 0;display:none '></div> </div> <div class='col-md-12' style='text-align:center;margin:20px 0px 400px 0px;'> <div class='col-md-12'style='margin-top: 20px;'> <div class='col-md-10'style='margin: 0;padding: 0;'>通知管理员</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_ToUser'></div> </div> <div style='float:left;padding: 0;margin-top: 20px' class='col-md-6' > <a class='btn btn-info btn-xs' onclick='GM_clearAddition()'> <i class='glyphicon glyphicon-edit icon-white' ></i>取消 </a> </div> <div style='float:left;padding: 0;margin-top: 20px' class='col-md-6'> <a class='btn btn-danger btn-xs' data-toggle='modal' data-target='#GM_isSureChangePass'> <i class='glyphicon glyphicon-trash icon-white'> </i>确定 </a> </div> </div>";
		}
		if(GM_flag1 == 2) {
			$(".GM_userInput").attr("style", "pointer-events: none;background:#000;opacity:0.1;");
			GM_div1.innerHTML = " <div  class='col-md-12 btn-danger' style='text-align:center;'> <h4 >设置权限</h4> </div> <div class='col-md-12 GM_Boder'><div class='col-md-12'style='margin-top: 15px;padding: 0;'> <div class='col-md-10'style='margin: 0;padding: 0;'>回收站</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_userSetSelect' value='recycle 回收站'></div> </div><div class='col-md-12'style='margin-top: 15px;padding: 0;'> <div class='col-md-10'style='margin: 0;padding: 0;'>用户</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_userSetSelect' value='peoplev1 用户'></div> </div>  <div class='col-md-12'style='margin-top: 15px;padding: 0;'> <div class='col-md-10'style='margin: 0;padding: 0;'>滑动展览</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_userSetSelect' value='homePagev1 滑动展览'></div> </div> <div class='col-md-12'style='margin-top: 15px;padding: 0;'> <div class='col-md-10'style='margin: 0;padding: 0;'>热度TOP榜</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_userSetSelect' value='homePagev2 热度TOP榜' ></div> </div> <div class='col-md-12'style='margin-top: 15px;padding: 0;'> <div class='col-md-10'style='margin: 0;padding: 0;'>下载TOP榜</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_userSetSelect' value='homePagev3 下载TOP榜'></div> </div> <div class='col-md-12'style='margin-top: 15px;padding: 0;'> <div class='col-md-10'style='margin: 0;padding: 0;'>管理员推荐</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_userSetSelect' value='homePagev4 管理员推荐'></div> </div> <div class='col-md-12'style='margin-top: 15px;padding: 0;'> <div class='col-md-10'style='margin: 0;padding: 0;'>后缀</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox'name='GM_userSetSelect' value='suffix 后缀'></div> </div> <div class='col-md-12'style='margin-top: 15px;margin-bottom:15px;padding: 0;'> <div class='col-md-10'style='margin: 0;padding: 0;'>删除</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_userSetSelect' value='delete 删除'></div> </div> </div> <div class='col-md-12' style='text-align:center;margin:20px 0px 400px 0px;'> <div class='col-md-10'style='margin: 0;padding: 0;'>通知管理员</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_ToUser' value='12'></div> <div style='float:left;padding: 0;margin-top: 20px' class='col-md-6' > <a class='btn btn-info btn-xs' onclick='GM_clearAddition()'> <i class='glyphicon glyphicon-edit icon-white' ></i>取消 </a> </div> <div style='float:left;padding: 0;margin-top: 20px' class='col-md-6'> <a class='btn btn-danger btn-xs' data-toggle='modal' data-target='#GM_isSurePower'> <i class='glyphicon glyphicon-trash icon-white'></i>确定 </a> </div> </div>";
		}
	}
}
$(document).on("click",".GM_userInput",function(){
		IDNow=$(this).attr("data-id")
})	
function GM_showUsersFrame() //加载用户页面框架
{

	GM_user_or_GM = 1;
	var GM_div1 = document.getElementById("GM_Show");
	console.log(GM_div1);
	GM_div1.innerHTML = "<div id='GM_title'></div><div id='GM_exhibition' > </div> <div id='show_paging'> </div><div id='GM_userM'></div>";
	var str1 = "<div id='GM_usersModal1' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel' aria-hidden='true'> <div class='modal-dialog modal-sm'> <div class='modal-content'> <div class='modal-header'><button type='button' class='close'data-dismiss='modal' aria-hidden='true'> &times;</button> <h4 class='modal-title' >请选择需要编辑的选项 </h4> </div> <div class='modal-footer'><div style='width:50%;float:left;text-align:center'> <button type='button' class='btn btn-info'data-dismiss='modal' onclick='GM_Addition(1,1)'>修改密码</button></div><div style='width:50%;float:left;text-align:center'><button type='button' class='btn btn-danger' data-dismiss='modal' onclick='GM_Addition(2,1)'>设置权限</button></div> </div> </div> </div> </div>";
	//编辑按钮
	str1 += "<div id='GM_usersModal2' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel' aria-hidden='true'><div class='modal-dialog modal-sm'> <div class='modal-content'> <div class='modal-header'><button type='button' class='close'data-dismiss='modal' aria-hidden='true'> &times;</button> <h4 class='modal-title' >确定要删除这个用户 </h4> </div>  <div class='modal-footer'><div class='col-md-5'> <div class='col-md-10'style='margin: 0;padding: 0;'>通知用户</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_ToUser'></div> </div><div class='col-md-7'><button type='button' class='btn btn-default'data-dismiss='modal'>取消</button><button type='button' class='btn btn-primary' data-dismiss='modal' onclick='GM_sureDeleteUser(1,1)'>确定</button></div> </div> </div> </div> </div>";
	//删除按钮
	str1 += "<div id='GM_isSurePower' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel' aria-hidden='true'> <div class='modal-dialog modal-sm'> <div class='modal-content'> <div class='modal-header'><button type='button' class='close'data-dismiss='modal' aria-hidden='true'> &times;</button><h4 class='modal-title' >确定给这些权限</h4> </div> <div class='modal-body'> <p>One fine body&hellip;</p> </div> <div class='modal-footer'><button type='button' class='btn btn-default'data-dismiss='modal'>取消</button><button type='button' class='btn btn-primary setPower' data-dismiss='modal' onclick='GM_SetPower()'>确定</button> </div> </div> </div> </div>";
	//确定已经设置权限成功
	str1 += "<div id='GM_isSureChangePass' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel' aria-hidden='true'> <div class='modal-dialog modal-sm'> <div class='modal-content'> <div class='modal-header'><button type='button' class='close'data-dismiss='modal' aria-hidden='true'> &times;</button><h4 class='modal-title' >确定修改密码</h4> </div>  <div class='modal-footer'><button type='button' class='btn btn-default'data-dismiss='modal'>取消</button><button type='button' class='btn btn-primary' data-dismiss='modal' onclick='GM_ChangePass()'>确定</button> </div> </div> </div> </div>";
	//确定已经修改密码成功

	str1 += "<div id='GM_usersModalAll1' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel' aria-hidden='true'> <div class='modal-dialog modal-sm'> <div class='modal-content'> <div class='modal-header'><button type='button' class='close'data-dismiss='modal' aria-hidden='true'> &times;</button><h4 class='modal-title' >请选择需要编辑的选项 </h4> </div>  <div class='modal-footer'><div style='float:center;text-align:center'> <button type='button' class='btn btn-info'data-dismiss='modal' onclick='GM_Addition(1,2)'>修改密码</button></div> </div> </div> </div> </div>";
	//全选编辑按钮

	str1 += "<div id='GM_usersModalAll2' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel' aria-hidden='true'> <div class='modal-dialog modal-sm'> <div class='modal-content'> <div class='modal-header'><button type='button' class='close'data-dismiss='modal' aria-hidden='true'> &times;</button><h4 class='modal-title' >确定要删除这个用户</h4> </div>  <div class='modal-footer'><div class='col-md-5'> <div class='col-md-10'style='margin: 0;padding: 0;'>通知用户</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_ToUser'></div> </div><div class='col-md-7'><button type='button' class='btn btn-default'data-dismiss='modal'>取消</button><button type='button' class='btn btn-primary' data-dismiss='modal' onclick='GM_sureDeleteUser(2,2)'>确定</button> </div> </div></div> </div> </div>";
	//全选删除按钮
	$("#GM_userM").append(str1);
	$('#GM_usersModal1').on('show.bs.modal', function(event) {
		var button = $(event.relatedTarget);
		var GM_SS = button.data('whatever');
		var modal = $(this);
		$("#GM_usersModal1").attr("whatever", GM_SS);
		GM_SS = GM_SS.split(' ');
		modal.find('.modal-title').text('编辑 ' + GM_SS[1] + ' 的选项');
		nameNow = GM_SS[1];

		
//		console.log("我在这里呀！！！"+$(this).parent().parent().parent());
		GM_single_or_All = 1;
	})
	$('#GM_usersModal2').on('show.bs.modal', function(event) {
		var button = $(event.relatedTarget);
		var GM_SS = button.data('whatever');
		var modal = $(this);
		$("#GM_usersModal2").attr("whatever", GM_SS);
		GM_SS = GM_SS.split(' ');
		modal.find('.modal-title').text('确定删除: ' + GM_SS[1]);
		GM_single_or_All = 1;
	})
	$('#GM_usersModalAll1').on('show.bs.modal', function(event) {
		var GM_obj = document.getElementsByName("GM_user");
		var GM_check_val = [];
		for(var GM_k in GM_obj) {
			if(GM_obj[GM_k].checked) {
				GM_check_val.push(GM_obj[GM_k].value);
			}
		}
		var modal = $(this);
		modal.find('.modal-title').text('编辑: ' + GM_check_val + '等的选项');
		GM_single_or_All = 2;
	})
	$('#GM_usersModalAll2').on('show.bs.modal', function(event) {
		var GM_obj = document.getElementsByName("GM_user");
		var GM_check_val = [];
		for(var GM_k in GM_obj) {
			if(GM_obj[GM_k].checked) {
				GM_check_val.push(GM_obj[GM_k].value);
			}
		}
		var modal = $(this);
		modal.find('.modal-title').text('确定删除: ' + GM_check_val + '等');
		GM_single_or_All = 2;
	})
	$('#GM_isSurePower').on('show.bs.modal', function(event) {
		var GM_data1 = document.getElementsByName("GM_userSetSelect");
		var data1 = [];
		for(var i = 0; i < GM_data1.length; i++) {
			if(GM_data1[i].checked) {
				var GM_data2 = GM_data1[i].value.split('_')
				data1.push(GM_data2[1]);
			}
		}
		var modal = $(this);
		modal.find('.modal-title').text('确定给这些权限');
		modal.find('.modal-body').text(data1);
	})
	var GM_div1 = document.getElementById("GM_title");
	GM_div1.innerHTML = "<div> <ol class='breadcrumb GM_breadcrumb'> <li>控制台</li> <li>人员管理</li> <li style='color: #080808'>用户管理表</li> </ol> </div>";
}

function GM_showJuesesFrame() //加载用户页面框架
{

	GM_user_or_GM = 1;
	var GM_div1 = document.getElementById("GM_Show");
	console.log(GM_div1);
	GM_div1.innerHTML = "<div id='GM_title'></div><div id='GM_exhibition' > </div> <div id='show_paging'> </div><div id='GM_userM'></div>";
	var str1 = "<div id='GM_usersModal11' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel' aria-hidden='true'> <div class='modal-dialog modal-sm'> <div class='modal-content'> <div class='modal-header'><button type='button' class='close'data-dismiss='modal' aria-hidden='true'> &times;</button> <h4 class='modal-title' >请选择需要编辑的选项 </h4> </div> <div class='modal-footer'><div style='width:50%;float:left;text-align:center'> <button type='button' class='btn btn-info'data-dismiss='modal' onclick='GM_Addition(1,1)'>修改密码</button></div><div style='width:50%;float:left;text-align:center'><button type='button' class='btn btn-danger' data-dismiss='modal' onclick='GM_Addition(2,1,1)'>设置用户类型</button></div> </div> </div> </div> </div>";
	//编辑按钮

	str1 += "<div id='GM_isSurePower2' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel' aria-hidden='true'> <div class='modal-dialog modal-sm'> <div class='modal-content'> <div class='modal-header'><button type='button' class='close'data-dismiss='modal' aria-hidden='true'> &times;</button><h4 class='modal-title' >确定给这些权限</h4> </div> <div class='modal-body'> <p>One fine body&hellip;</p> </div> <div class='modal-footer'><button type='button' class='btn btn-default'data-dismiss='modal'>取消</button><button type='button' class='btn btn-primary setPower' data-dismiss='modal'>确定</button> </div> </div> </div> </div>";
	//确定已经设置权限成功
	str1 += "<div id='GM_isSureChangePass' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel' aria-hidden='true'> <div class='modal-dialog modal-sm'> <div class='modal-content'> <div class='modal-header'><button type='button' class='close'data-dismiss='modal' aria-hidden='true'> &times;</button><h4 class='modal-title' >确定修改密码</h4> </div>  <div class='modal-footer'><button type='button' class='btn btn-default'data-dismiss='modal'>取消</button><button type='button' class='btn btn-primary' data-dismiss='modal' onclick='GM_ChangePass()'>确定</button> </div> </div> </div> </div>";
	//确定已经修改密码成功

	str1 += "<div id='GM_usersModalAll1' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel' aria-hidden='true'> <div class='modal-dialog modal-sm'> <div class='modal-content'> <div class='modal-header'><button type='button' class='close'data-dismiss='modal' aria-hidden='true'> &times;</button><h4 class='modal-title' >请选择需要编辑的选项 </h4> </div>  <div class='modal-footer'><div style='float:center;text-align:center'> <button type='button' class='btn btn-info'data-dismiss='modal' onclick='GM_Addition(1,2)'>修改密码</button></div> </div> </div> </div> </div>";
	//全选编辑按钮

	str1 += "<div id='GM_usersModalAll2' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel' aria-hidden='true'> <div class='modal-dialog modal-sm'> <div class='modal-content'> <div class='modal-header'><button type='button' class='close'data-dismiss='modal' aria-hidden='true'> &times;</button><h4 class='modal-title' >确定要删除这个用户</h4> </div>  <div class='modal-footer'><div class='col-md-5'> <div class='col-md-10'style='margin: 0;padding: 0;'>通知用户</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_ToUser'></div> </div><div class='col-md-7'><button type='button' class='btn btn-default'data-dismiss='modal'>取消</button><button type='button' class='btn btn-primary' data-dismiss='modal' onclick='GM_sureDeleteUser(2,2)'>确定</button> </div> </div></div> </div> </div>";
	//全选删除按钮
	$("#GM_userM").append(str1);
	$('#GM_usersModal11').on('show.bs.modal', function(event) {
		var button = $(event.relatedTarget);
		var GM_SS = button.data('whatever');
		var modal = $(this);
		$("#GM_usersModal1").attr("whatever", GM_SS);
		GM_SS = GM_SS.split(' ');
		modal.find('.modal-title').text('编辑 ' + GM_SS[1] + ' 的选项');
		nameNow = GM_SS[1];
		GM_single_or_All = 1;
	})
	$('#GM_usersModal2').on('show.bs.modal', function(event) {
		var button = $(event.relatedTarget);
		var GM_SS = button.data('whatever');
		var modal = $(this);
		$("#GM_usersModal2").attr("whatever", GM_SS);
		GM_SS = GM_SS.split(' ');
		modal.find('.modal-title').text('确定删除: ' + GM_SS[1]);
		GM_single_or_All = 1;
	})
	$('#GM_usersModalAll1').on('show.bs.modal', function(event) {
		var GM_obj = document.getElementsByName("GM_user");
		var GM_check_val = [];
		for(var GM_k in GM_obj) {
			if(GM_obj[GM_k].checked) {
				GM_check_val.push(GM_obj[GM_k].value);
			}
		}
		var modal = $(this);
		modal.find('.modal-title').text('编辑: ' + GM_check_val + '等的选项');
		GM_single_or_All = 2;
	})
	$('#GM_usersModalAll2').on('show.bs.modal', function(event) {
		var GM_obj = document.getElementsByName("GM_user");
		var GM_check_val = [];
		for(var GM_k in GM_obj) {
			if(GM_obj[GM_k].checked) {
				GM_check_val.push(GM_obj[GM_k].value);
			}
		}
		var modal = $(this);
		modal.find('.modal-title').text('确定删除: ' + GM_check_val + '等');
		GM_single_or_All = 2;
	})
	$('#GM_isSurePower2').on('show.bs.modal', function(event) {
		var GM_data1 = document.getElementsByName("GM_userSetSelect2");
		var data1 = "",data2="";
		for(var i = 0; i < GM_data1.length; i++) {
			if(GM_data1[i].checked) {
				data1 = GM_data1[i].value.split("_")[0];
				data2=GM_data1[i].value.split("_")[1];
				break;
			}
		}
		var modal = $(this);
		
		if(data1.length==0){
			modal.find('.modal-title').text('错误提示:');
			modal.find('.modal-body').text("请选择一个正确的用户角色类型！！");
			return ;
		}
		var modal = $(this);
		modal.find('.modal-title').text('是否将该用户的角色类型变成:');
		modal.find('.modal-body').text(data1);
		GM_SetPower2(data2);
	})
	var GM_div1 = document.getElementById("GM_title");
	GM_div1.innerHTML = "<div> <ol class='breadcrumb GM_breadcrumb'> <li>控制台</li> <li>人员管理</li> <li style='color: #080808'>用户管理表</li> </ol> </div>";
}

function GM_showUsers() //加载用户页面
{
	var GM_div1 = document.getElementById("GM_exhibition");
	GM_div1.innerHTML = "";
	var GM_str2 =
		"<div class='col-md-12' id='GM_usersTa'> <table class='table table-bordered table-hover'> <caption><div class='col-md-4'style='float:left;'>用户管理表</div><div   id='GM_selectAllBtnTwoBtn' class='col-md-4' style='float:left;text-align: center;display: none' ><div style='display:inline;padding:0;margin-right:10px;' ><a class='btn btn-success btn-xs GM_userInput' data-toggle='modal' data-target='#GM_usersModalAll1'  > <i class='glyphicon glyphicon-edit icon-white' ></i>编辑 </a></div><div style='display:inline;padding:0;margin-left:10px;'><a class='btn btn-success btn-xs GM_userInput' data-toggle='modal' data-target='#GM_usersModalAll2' > <i class='glyphicon glyphicon-trash icon-white'></i>删除 </a></div></div><div class='col-md-4'style='float:right;'><div style='width:80%;float:left;' ><input id='search'class='form-control'  placeholder='请输入姓名'  whatever='user'></div><div style='width:20%;float:left;'><a class='btn btn-primary GM_userInput' onclick=GM_Search()>搜索 </a></div></div></caption> <thead> <tr> <th>选择<button class='btn btn-success btn-xs GM_userInput' onclick='GM_selectAll()'>全选/不选</button></th><th>ID</th> <th>账户</th> <th>用户名</th> <th>创建时间</th> <th>操作</th> </tr> </thead><tbody id='GM_usersTbody'></tbody></table></div>";
	GM_div1.innerHTML = GM_str2;
}

function GM_showJueses() { //加载角色页面
	var GM_div1 = document.getElementById("GM_exhibition");
	GM_div1.innerHTML = "";
	var GM_str2 =
		"<div class='col-md-12' id='GM_usersTa'> <table class='table table-bordered table-hover'> <caption><div class='col-md-4'style='float:left;'>用户管理表</div><div   id='GM_selectAllBtnTwoBtn' class='col-md-4' style='float:left;text-align: center;display: none' ><div style='display:inline;padding:0;margin-right:10px;' ><a class='btn btn-success btn-xs GM_userInput' data-toggle='modal' data-target='#GM_usersModalAll1'  > <i class='glyphicon glyphicon-edit icon-white' ></i>编辑 </a></div><div style='display:inline;padding:0;margin-left:10px;'><a class='btn btn-success btn-xs GM_userInput' data-toggle='modal' data-target='#GM_usersModalAll2' > <i class='glyphicon glyphicon-trash icon-white'></i>删除 </a></div></div><div class='col-md-4'style='float:right;'><div style='width:80%;float:left;' ><input id='search'class='form-control'  placeholder='请输入姓名'  whatever='user'></div><div style='width:20%;float:left;'><a class='btn btn-primary GM_userInput' onclick=GM_Search()>搜索 </a></div></div></caption> <thead> <tr> <th>选择<button class='btn btn-success btn-xs GM_userInput' onclick='GM_selectAll()'>全选/不选</button></th><th>ID</th> <th>账户</th> <th>用户名</th> <th>创建时间</th> <th>操作</th> </tr> </thead><tbody id='GM_usersTbody'></tbody></table></div>";
	GM_div1.innerHTML = GM_str2;
}

function GM_showJuesesTable(GM_data1) //加载用户表单
{
	var str1 = "";
	for(var i = 0; i < GM_data1.length - 1; i++) {
		str1 = str1 + "<tr><td class='GM_userInput'><div style='text-align:center' ><input onclick=' ShowAllBtn()' type='checkbox' name='GM_user'  value='" + GM_data1[i]['id'] + "'></div></td><td><div>" + GM_data1[i]['id'] + "</div></td><td><div>" + GM_data1[i]['email'] + "</div></td><td><div>" + GM_data1[i]['name'] + "</div></td><td><div>" + GM_data1[i]['created_at'] + "</span></div></td>";
		str1 += "<td><div style='text-align: center'><div style='display:inline;padding:0;margin:20px;' >";
		str1 += "<a class='btn btn-info btn-xs GM_userInput' data-toggle='modal' data-target='#GM_usersModal11' data-whatever='" + GM_data1[i]['id'] + ' ' + GM_data1[i]['name'] + "' data-id=" + GM_data1[i]['id'] + "  > <i class='glyphicon glyphicon-edit icon-white' ></i>";
		str1 += "编辑 </a></div></div></td></tr>";
	}
	var GM_div1 = document.getElementById("GM_usersTbody");
	GM_div1.innerHTML = str1;
}

function GM_showUsersTable(GM_data1) //加载用户表单
{
	var str1 = "";
	for(var i = 0; i < GM_data1.length - 1; i++) {
		str1 = str1 + "<tr><td class='GM_userInput'><div style='text-align:center' ><input onclick=' ShowAllBtn()' type='checkbox' name='GM_user'  value='" + GM_data1[i]['id'] + "'></div></td><td><div>" + GM_data1[i]['id'] + "</div></td><td><div>" + GM_data1[i]['email'] + "</div></td><td><div>" + GM_data1[i]['name'] + "</div></td><td><div>" + GM_data1[i]['created_at'] + "</span></div></td><td><div style='text-align: center'><div style='display:inline;padding:0;margin:20px;' ><a class='btn btn-info btn-xs GM_userInput' data-toggle='modal' data-target='#GM_usersModal1' data-whatever='" + GM_data1[i]['id'] + ' ' + GM_data1[i]['name'] + "' data-id=" + GM_data1[i]['id'] + " > <i class='glyphicon glyphicon-edit icon-white' ></i>编辑 </a></div><div style='display:inline;padding:0;margin:20px;'><a class='btn btn-danger btn-xs GM_userInput' data-toggle='modal' data-target='#GM_usersModal2' data-whatever='" + GM_data1[i]['id'] + ' ' + GM_data1[i]['name'] + "' > <i class='glyphicon glyphicon-trash icon-white'></i>删除 </a></div></div></td></tr>";
	}
	var GM_div1 = document.getElementById("GM_usersTbody");
	GM_div1.innerHTML = str1;
}
//<tr>
//<td class="GM_userInput">
//	<div style="text-align:center">
//		<input onclick=" ShowAllBtn()" type="checkbox" name="GM_user" value="25">
//	</div>
//</td>
//<td>
//	<div>25</div>
//</td>
//<td>
//	<div>892498546@qq.com</div>
//</td>
//<td>
//	<div>kj</div></td>
//<td>
//	<div>2015-12-20 08:31:45</div>
//</td>
//<td>
//	<div style="text-align: center">
//		<div style="display:inline;padding:0;margin:20px;">
//			<a class="btn btn-info btn-xs GM_userInput" data-toggle="modal" data-target="#GM_usersModal1" data-whatever="25 kj">
//			<i class="glyphicon glyphicon-edit icon-white"></i>编辑 </a>
//		</div>
//		<div style="display:inline;padding:0;margin:20px;">
//		<a class="btn btn-danger btn-xs GM_userInput" data-toggle="modal" data-target="#GM_usersModal2" data-whatever="25 kj"> 
//		<i class="glyphicon glyphicon-trash icon-white"></i>
//		删除 </a>
//		</div>
//		</div>
//</td>
//</tr>
function GM_showUsersPaging(sum, size, flag) //加载用户分页
{
	var GM_div1 = document.getElementById("show_paging");
	GM_div1.innerHTML = "";

	$('#show_paging').Paging({
		pagesize: size,
		count: sum * 10,
		toolbar: false,
		callback: function(page, size, count) {
			GM_getUserslist(page - 1, size, flag);
		}
	});
}

//-------------------------------管理员-----------------------------------------------------------------------------------------------------
function GM_seIndexActive(GM_flag) //二级按钮active切换
{
	var GM_a = document.getElementsByName('GM_seIndex');
	for(var GM_i = 0; GM_i < GM_a.length; GM_i++) {
		GM_a[GM_i].className = '';
	}
	GM_a[GM_flag - 1].className = 'active';
}

function GM_GMSelect() //把GM二级按钮打印出来
{
	var GM_str1 = "<div class='col-md-12'><div class='col-md-4'> <ul id='GM_seBtnUl' class='nav nav-tabs nav-justified'><li name='GM_seIndex'onclick='GM_getGMslist1(0,10,false)'><a>管理员表</a></li><li name='GM_seIndex' onclick='GM_getGMslist2(0,10,false)'><a>管理组表</a></li></ul></div></div>";
	$("#GM_exhibition").before(GM_str1);
}

function GM_showGMsFrame() //加载管理员框架
{
	GM_user_or_GM = 2;
	var GM_div1 = document.getElementById("GM_Show");
	GM_div1.innerHTML = "<div id='GM_title'></div><div id='GM_exhibition' > </div> <div id='show_paging'> </div><div id='GM_userM'></div>";
	var str1 = "<div id='GM_usersModal1' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel' aria-hidden='true'> <div class='modal-dialog modal-sm'> <div class='modal-content'> <div class='modal-header'><button type='button' class='close'data-dismiss='modal' aria-hidden='true'> &times;</button> <h4 class='modal-title' >请选择需要编辑的选项 </h4> </div> <div class='modal-footer'><div style='width:50%;float:left;text-align:center'> <button type='button' class='btn btn-info'data-dismiss='modal' onclick='GM_Addition(1,2)'>修改密码</button></div><div style='width:50%;float:left;text-align:center'><button type='button' class='btn btn-danger' data-dismiss='modal' onclick='GM_Addition(2,2)'>设置权限</button></div> </div> </div> </div> </div>";
	//编辑按钮
	str1 += "<div id='GM_usersModal2' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel' aria-hidden='true'><div class='modal-dialog modal-sm'> <div class='modal-content'> <div class='modal-header'><button type='button' class='close'data-dismiss='modal' aria-hidden='true'> &times;</button> <h4 class='modal-title' >确定要删除这个管理员 </h4> </div>  <div class='modal-footer'><div class='col-md-5'> <div class='col-md-10'style='margin: 0;padding: 0;'>通知管理员</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_ToUser'></div> </div><div class='col-md-7'><button type='button' class='btn btn-default'data-dismiss='modal'>取消</button><button type='button' class='btn btn-primary' data-dismiss='modal' onclick='GM_sureDeleteUser(1,1)'>确定</button></div> </div> </div> </div> </div>";
	//删除按钮
	str1 += "<div id='GM_isSurePower' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel' aria-hidden='true'> <div class='modal-dialog modal-sm'> <div class='modal-content'> <div class='modal-header'><button type='button' class='close'data-dismiss='modal' aria-hidden='true'> &times;</button><h4 class='modal-title' >确定给这些权限</h4> </div> <div class='modal-body'> <p>One fine body&hellip;</p> </div> <div class='modal-footer'><button type='button' class='btn btn-default'data-dismiss='modal'>取消</button><button type='button' class='btn btn-primary' data-dismiss='modal' onclick='GM_SetPower()'>确定</button> </div> </div> </div> </div>";
	//确定已经设置权限成功
	str1 += "<div id='GM_isSureChangePass' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel' aria-hidden='true'> <div class='modal-dialog modal-sm'> <div class='modal-content'> <div class='modal-header'><button type='button' class='close'data-dismiss='modal' aria-hidden='true'> &times;</button><h4 class='modal-title' >确定修改密码</h4> </div>  <div class='modal-footer'><button type='button' class='btn btn-default'data-dismiss='modal'>取消</button><button type='button' class='btn btn-primary' data-dismiss='modal' onclick='GM_ChangePass()'>确定</button> </div> </div> </div> </div>";
	//确定已经修改密码成功

	str1 += "<div id='GM_usersModalAll1' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel' aria-hidden='true'> <div class='modal-dialog modal-sm'> <div class='modal-content'> <div class='modal-header'><button type='button' class='close'data-dismiss='modal' aria-hidden='true'> &times;</button><h4 class='modal-title' >请选择需要编辑的选项 </h4> </div>  <div class='modal-footer'><div style='float:center;text-align:center'> <button type='button' class='btn btn-info'data-dismiss='modal' onclick='GM_Addition(1,2)'>修改密码</button></div></div> </div> </div> </div>";
	//全选编辑按钮

	str1 += "<div id='GM_usersModalAll2' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel' aria-hidden='true'> <div class='modal-dialog modal-sm'> <div class='modal-content'> <div class='modal-header'><button type='button' class='close'data-dismiss='modal' aria-hidden='true'> &times;</button><h4 class='modal-title' >确定要删除这个管理员</h4> </div>  <div class='modal-footer'><div class='col-md-5'> <div class='col-md-10'style='margin: 0;padding: 0;'>通知管理员</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_ToUser'></div> </div><div class='col-md-7'><button type='button' class='btn btn-default'data-dismiss='modal'>取消</button><button type='button' class='btn btn-primary' data-dismiss='modal' onclick='GM_sureDeleteUser(2,2)'>确定</button> </div> </div></div> </div> </div>";
	//全选删除按钮

	//--管理组---------------------------------------------------------------------------------------------------------------------------------------------------------------
	str1 += "<div id='GM_GMGroupModal' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel' aria-hidden='true'> <div class='modal-dialog modal-sm'> <div class='modal-content'> <div class='modal-header'><button type='button' class='close'data-dismiss='modal' aria-hidden='true'> &times;</button><h4 class='modal-title' >确定要删除管理组</h4> </div>  <div class='modal-footer'><div class='col-md-5'> <div class='col-md-10'style='margin: 0;padding: 0;'>通知管理员</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_ToUser'></div> </div><div class='col-md-7'><button type='button' class='btn btn-default'data-dismiss='modal'>取消</button><button type='button' class='btn btn-primary' data-dismiss='modal' onclick='GM_sureDeleteGM_group(1)'>确定</button> </div> </div> </div> </div></div>";
	//确定删除
	str1 += "<div id='GM_GMGroupModalAll' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel' aria-hidden='true'> <div class='modal-dialog modal-sm'> <div class='modal-content'> <div class='modal-header'><button type='button' class='close'data-dismiss='modal' aria-hidden='true'> &times;</button><h4 class='modal-title' >确定要删除管理组</h4> </div>  <div class='modal-footer'><div class='col-md-5'> <div class='col-md-10'style='margin: 0;padding: 0;'>通知管理员</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_ToUser'></div> </div><div class='col-md-7'><button type='button' class='btn btn-default'data-dismiss='modal'>取消</button><button type='button' class='btn btn-primary' data-dismiss='modal' onclick='GM_sureDeleteGM_group(2)'>确定</button> </div> </div> </div></div> </div>";
	//全选确定删除
	str1 += "<div id='GM_GMGroupIsSurePower' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel' aria-hidden='true'> <div class='modal-dialog modal-sm'> <div class='modal-content'> <div class='modal-header'><button type='button' class='close'data-dismiss='modal' aria-hidden='true'> &times;</button><h4 class='modal-title' >确定给这些权限</h4> </div> <div class='modal-body'><p id='GM_groupBody1'>fsdfdsfsdfdsf</p><p  id='GM_groupBody2'>aaa</p> </div> <div class='modal-footer'><button type='button' class='btn btn-default'data-dismiss='modal'>取消</button><button type='button' class='btn btn-primary' data-dismiss='modal' onclick='GM_GMGroupSetPower()'>确定</button> </div> </div> </div> </div>";
	//确定修改权限成功
	str1 += "<div id='GM_GMGroupAddPower' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel' aria-hidden='true'> <div class='modal-dialog modal-sm'> <div class='modal-content'> <div class='modal-header'><button type='button' class='close'data-dismiss='modal' aria-hidden='true'> &times;</button><h4 class='modal-title' >确定给这些权限</h4> </div> <div class='modal-body'><p id='GM_groupAddBody1'>fsdfdsfsdfdsf</p><p  id='GM_groupAddBody2'>aaa</p> </div> <div class='modal-footer'><button type='button' class='btn btn-default'data-dismiss='modal'>取消</button><button type='button' class='btn btn-primary' data-dismiss='modal' onclick='GM_GMGroupAddPower()'>确定</button> </div> </div> </div> </div>";
	//增加权限成功

	$("#GM_userM").append(str1);
	$('#GM_usersModal1').on('show.bs.modal', function(event) //编辑管理员模态框数据添加
		{
			var button = $(event.relatedTarget);
			var GM_SS = button.data('whatever');
			var modal = $(this);
			$("#GM_usersModal1").attr("whatever", GM_SS);
			var GM_SS1 = GM_SS.split(' ');
			modal.find('.modal-title').text('编辑 ' + GM_SS1[1] + ' 的选项');
			GM_single_or_All = 1;
		});
	$('#GM_usersModal2').on('show.bs.modal', function(event) //删除管理员模态框数据添加
		{
			var button = $(event.relatedTarget);
			var GM_SS = button.data('whatever');
			var modal = $(this);
			$("#GM_usersModal2").attr("whatever", GM_SS);
			var GM_SS1 = GM_SS.split(' ');
			modal.find('.modal-title').text('确定删除: ' + GM_SS1[1]);
			GM_single_or_All = 1;
		});
	$('#GM_usersModalAll1').on('show.bs.modal', function(event) //全选编辑管理员模态框数据添加
		{
			var GM_obj = document.getElementsByName("GM_user");
			var GM_check_val = [];
			for(var GM_k in GM_obj) {
				if(GM_obj[GM_k].checked) {
					GM_check_val.push(GM_obj[GM_k].value);
				}
			}
			var modal = $(this);
			modal.find('.modal-title').text('编辑: ' + GM_check_val + '等的选项');
			GM_single_or_All = 2;
		});
	$('#GM_usersModalAll2').on('show.bs.modal', function(event) //全选删除管理员模态框数据添加
		{
			var GM_obj = document.getElementsByName("GM_user");
			var GM_check_val = [];
			for(var GM_k in GM_obj) {
				if(GM_obj[GM_k].checked) {
					GM_check_val.push(GM_obj[GM_k].value);
				}
			}
			var modal = $(this);
			modal.find('.modal-title').text('确定删除: ' + GM_check_val + '等');
			GM_single_or_All = 2;
		});
	$('#GM_isSurePower').on('show.bs.modal', function(event) //全选设置权限管理员模态框数据添加
		{
			var GM_data1 = document.getElementsByName("GM_userSetSelect");
			var data1 = [];
			for(var GM_k in GM_data1) {
				if(GM_data1[GM_k].checked) {
					var GM_data2 = GM_data1[GM_k].value.split(' ')
					data1.push(GM_data2[1]);
				}
			}
			var modal = $(this);
			modal.find('.modal-title').text('确定给这些权限');
			modal.find('.modal-body').text(data1);
		});
	$('#GM_GMGroupIsSurePower').on('show.bs.modal', function(event) //修改管理组模态框数据添加
		{
			var button = $(event.relatedTarget);
			var GM_SS = button.data('whatever');
			var modal = $(this);
			$("#GM_GMGroupIsSurePower").attr("whatever", GM_SS);
			var GM_data1 = document.getElementsByName("GM_userSetSelect");
			var data1 = [];
			for(var GM_k in GM_data1) {
				if(GM_data1[GM_k].checked) {
					var GM_data11 = GM_data1[GM_k].value.split(' ');
					data1.push(GM_data11[1]);
				}
			}
			var GM_data2 = document.getElementById("GM_gmGroupName");
			var data2 = GM_data2.value;
			var modal = $(this);
			modal.find('.modal-title').text("确定 " + GM_SS + " 修改后");
			modal.find('.modal-body #GM_groupBody1').text('组名为：' + data2);
			modal.find('.modal-body #GM_groupBody2').text('权限为：' + data1);
		});
	$('#GM_GMGroupAddPower').on('show.bs.modal', function(event) //增加管理组模态框数据添加
		{
			var modal = $(this);
			var GM_data1 = document.getElementById("GM_gmGroupNameAdd");
			var data1 = GM_data1.value;
			var GM_data2 = document.getElementsByName("GM_userSetSelect");
			var data2 = [];
			for(var GM_k in GM_data2) {
				if(GM_data2[GM_k].checked) {
					var GM_data21 = GM_data2[GM_k].value.split(' ');
					data2.push(GM_data21[1]);
				}
			}
			var modal = $(this);
			modal.find('.modal-title').text("确定增加权限组");
			modal.find('.modal-body #GM_groupAddBody1').text('组名为：' + data1);
			modal.find('.modal-body #GM_groupAddBody2').text('权限为：' + data2);
		});
	$('#GM_GMGroupModal').on('show.bs.modal', function(event) //删除管理员模态框数据添加
		{
			var button = $(event.relatedTarget);
			var GM_SS = button.data('whatever');
			var modal = $(this);
			$("#GM_GMGroupModal").attr("whatever", GM_SS);
			var GM_SS1 = GM_SS.split(' ');
			modal.find('.modal-title').text('确定删除: ' + GM_SS1[1]);
		});
	$('#GM_GMGroupModalAll').on('show.bs.modal', function(event) //全选删除管理员模态框数据添加
		{
			var GM_obj = document.getElementsByName("GM_user");
			var GM_check_val = [];
			for(var GM_k in GM_obj) {
				if(GM_obj[GM_k].checked) {
					GM_check_val.push(GM_obj[GM_k].value);
				}
			}
			var modal = $(this);
			modal.find('.modal-title').text('确定删除: ' + GM_check_val + '等');
		});
	var GM_div1 = document.getElementById("GM_title");
	GM_div1.innerHTML = "<div> <ol class='breadcrumb GM_breadcrumb'> <li>控制台</li> <li>人员管理</li> <li style='color: #080808'>管理员表</li> </ol> </div>";
}

function GM_GMGroupAddition(GM_flag, GM_GMgroupName) //管理组的增加和修改选项
{
	var GM_div1 = document.getElementById("GM_addition");
	GM_div1.style.background = "#f5f5f5";
	if(GM_flag == 1) //修改
	{
		$(".GM_userInput").attr("style", "pointer-events: none;background:#000;opacity:0.1;");
		GM_div1.innerHTML = " <div  class='col-md-12 btn-info' style='text-align:center;'> <h4 >修改权限</h4> </div> <div class='col-md-12 GM_Boder'><div class='col-md-12 'style='margin-top: 15px;padding: 0;'> <div class='col-md-12' style='margin:0;padding: 0;'>组名改为</div><div class='col-md-12'style='margin: 0;padding: 0;' ><input  id='GM_gmGroupName'class='form-control'value='" + GM_GMgroupName + "' placeholder='组名'> </div></div><div class='col-md-12'style='margin-top: 15px;padding: 0;'> <div class='col-md-10'style='margin: 0;padding: 0;'>回收站</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_userSetSelect' value='recycle 回收站'></div> </div><div class='col-md-12'style='margin-top: 15px;padding: 0;'> <div class='col-md-10'style='margin: 0;padding: 0;'>用户</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_userSetSelect' value='peoplev1 用户'></div> </div>  <div class='col-md-12'style='margin-top: 15px;padding: 0;'> <div class='col-md-10'style='margin: 0;padding: 0;'>滑动展览</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_userSetSelect' value='homePagev1 滑动展览'></div> </div> <div class='col-md-12'style='margin-top: 15px;padding: 0;'> <div class='col-md-10'style='margin: 0;padding: 0;'>热度TOP榜</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_userSetSelect' value='homePagev2 热度TOP榜' ></div> </div> <div class='col-md-12'style='margin-top: 15px;padding: 0;'> <div class='col-md-10'style='margin: 0;padding: 0;'>下载TOP榜</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_userSetSelect' value='homePagev3 下载TOP榜'></div> </div> <div class='col-md-12'style='margin-top: 15px;padding: 0;'> <div class='col-md-10'style='margin: 0;padding: 0;'>管理员推荐</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_userSetSelect' value='homePagev4 管理员推荐'></div> </div> <div class='col-md-12'style='margin-top: 15px;padding: 0;'> <div class='col-md-10'style='margin: 0;padding: 0;'>后缀</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox'name='GM_userSetSelect' value='suffix 后缀'></div> </div> <div class='col-md-12'style='margin-top: 15px;margin-bottom:15px;padding: 0;'> <div class='col-md-10'style='margin: 0;padding: 0;'>删除</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_userSetSelect' value='delete 删除'></div> </div><div id='GM_warning' class='col-md-12 alert alert-danger' style='margin-top: 20px;margin-bottom:15px;padding: 0;display:none '></div> </div> <div class='col-md-12' style='text-align:center;margin:20px 0px 400px 0px;'> <div class='col-md-10'style='margin: 0;padding: 0;'>通知管理员</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_ToUser' value='12'></div> <div style='float:left;padding: 0;margin-top: 20px' class='col-md-6' > <a class='btn btn-info btn-xs' onclick='GM_clearAddition()'> <i class='glyphicon glyphicon-edit icon-white' ></i>取消 </a> </div> <div style='float:left;padding: 0;margin-top: 20px' class='col-md-6'> <a class='btn btn-danger btn-xs' data-toggle='modal' data-target='#GM_GMGroupIsSurePower' data-whatever='" + GM_GMgroupName + "'> <i class='glyphicon glyphicon-trash icon-white'></i>确定 </a> </div> </div>";
	} else if(GM_flag == 2) //增加
	{
		$(".GM_userInput").attr("style", "pointer-events: none;background:#000;opacity:0.1;");
		GM_div1.innerHTML = " <div  class='col-md-12 btn-primary' style='text-align:center;'> <h4 >增加权限</h4> </div> <div class='col-md-12 GM_Boder'><div class='col-md-12 'style='margin-top: 15px;padding: 0;'> <div class='col-md-12' style='margin:0;padding: 0;'>组名为</div><div class='col-md-12'style='margin: 0;padding: 0;' ><input id='GM_gmGroupNameAdd'class='form-control'  placeholder='组名'></div></div><div class='col-md-12'style='margin-top: 15px;padding: 0;'> <div class='col-md-10'style='margin: 0;padding: 0;'>回收站</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_userSetSelect' value='recycle 回收站'></div> </div><div class='col-md-12'style='margin-top: 15px;padding: 0;'> <div class='col-md-10'style='margin: 0;padding: 0;'>用户</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_userSetSelect' value='peoplev1 用户'></div> </div>  <div class='col-md-12'style='margin-top: 15px;padding: 0;'> <div class='col-md-10'style='margin: 0;padding: 0;'>滑动展览</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_userSetSelect' value='homePagev1 滑动展览'></div> </div> <div class='col-md-12'style='margin-top: 15px;padding: 0;'> <div class='col-md-10'style='margin: 0;padding: 0;'>热度TOP榜</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_userSetSelect' value='homePagev2 热度TOP榜' ></div> </div> <div class='col-md-12'style='margin-top: 15px;padding: 0;'> <div class='col-md-10'style='margin: 0;padding: 0;'>下载TOP榜</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_userSetSelect' value='homePagev3 下载TOP榜'></div> </div> <div class='col-md-12'style='margin-top: 15px;padding: 0;'> <div class='col-md-10'style='margin: 0;padding: 0;'>管理员推荐</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_userSetSelect' value='homePagev4 管理员推荐'></div> </div> <div class='col-md-12'style='margin-top: 15px;padding: 0;'> <div class='col-md-10'style='margin: 0;padding: 0;'>后缀</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox'name='GM_userSetSelect' value='suffix 后缀'></div> </div> <div class='col-md-12'style='margin-top: 15px;margin-bottom:15px;padding: 0;'> <div class='col-md-10'style='margin: 0;padding: 0;'>删除</div> <div class='col-md-2' style='margin: 0;padding: 0'><input type='checkbox' name='GM_userSetSelect' value='delete 删除'></div> </div><div id='GM_warning' class='col-md-12 alert alert-danger' style='margin-top: 20px;margin-bottom:15px;padding: 0;display:none '></div> </div> <div class='col-md-12' style='text-align:center;margin:20px 0px 400px 0px;'>  <div style='float:left;padding: 0;margin-top: 20px' class='col-md-6' > <a class='btn btn-info btn-xs' onclick='GM_clearAddition()'> <i class='glyphicon glyphicon-edit icon-white' ></i>取消 </a> </div> <div style='float:left;padding: 0;margin-top: 20px' class='col-md-6'> <a class='btn btn-danger btn-xs' data-toggle='modal' data-target='#GM_GMGroupAddPower' > <i class='glyphicon glyphicon-trash icon-white'></i>确定 </a> </div> </div>";
	}
	$("#GM_gmGroupName").click(function() {
		$(this).select();
	})
}

function GM_ShowGM(GM_flag) //加载管理员页面
{
	if(GM_flag == 1) {
		var GM_div1 = document.getElementById("GM_title");
		GM_div1.innerHTML = "<div> <ol class='breadcrumb GM_breadcrumb'> <li>控制台</li> <li>人员管理</li> <li style='color: #080808'>管理员表</li> </ol> </div>";
		var GM_div2 = document.getElementById("GM_exhibition");
		GM_div2.innerHTML = "";
		var GM_str3 =
			"<div class='col-md-12' id='GM_usersTa'> <table class='table table-bordered table-hover'> <caption><div class='col-md-4' style='float:left;'>管理员表</div><div   id='GM_selectAllBtnTwoBtn' class='col-md-4' style='float:left;text-align: center;display: none' ><div style='display:inline;padding:0;margin-right:10px;' ><a class='btn btn-success btn-xs GM_userInput' data-toggle='modal' data-target='#GM_usersModalAll1'  > <i class='glyphicon glyphicon-edit icon-white' ></i>编辑 </a></div><div style='display:inline;padding:0;margin-left:10px;'><a class='btn btn-success btn-xs GM_userInput' data-toggle='modal' data-target='#GM_usersModalAll2' > <i class='glyphicon glyphicon-trash icon-white'></i>删除 </a></div></div><div class='col-md-4'style='float:right;'><div style='width:80%;float:left;' ><input id='search'class='form-control'  placeholder='请输入姓名'  whatever='gm'></div><div style='width:20%;float:left;'><a class='btn btn-primary GM_userInput' onclick=GM_Search()>搜索 </a></div></div></caption> <thead> <tr> <th>选择<button class='btn btn-success btn-xs GM_userInput' onclick='GM_selectAll()'>全选/不选</button></th><th>ID</th> <th>账户</th> <th>管理员名</th><th>创建时间</th> <th>管理组</th> <th>操作</th> </tr> </thead><tbody id='GM_usersTbody'></tbody></table></div>";
		GM_div2.innerHTML = GM_str3;
	} else if(GM_flag == 2) {
		var GM_div1 = document.getElementById("GM_title");
		GM_div1.innerHTML = "<div> <ol class='breadcrumb GM_breadcrumb'> <li>控制台</li> <li>人员管理</li> <li style='color: #080808'>管理组表</li> </ol> </div>";
		var GM_div2 = document.getElementById("GM_exhibition");
		GM_div2.innerHTML = "";
		var GM_str3 =
			"<div class='col-md-12' id='GM_usersTa'><table class='table table-bordered table-hover'> <caption><div class='col-md-2' style='float:left;'>管理组表</div><div id='GM_addPow' class='col-md-2'style='float:left;text-align: center;'><a class='btn btn-primary btn-xs GM_userInput' onclick=GM_GMGroupAddition(2,'')> <i class='glyphicon glyphicon-edit icon-white' ></i>增加 </a></div><div   id='GM_selectAllBtnTwoBtn' class='col-md-4'style='float:left;text-align: center;display: none' ><div style='display:inline;padding:0;margin-left:10px;'><a class='btn btn-success btn-xs GM_userInput' data-toggle='modal' data-target='#GM_GMGroupModalAll' > <i class='glyphicon glyphicon-trash icon-white'></i>删除 </a></div></div><div class='col-md-4'style='float:right;'><div style='width:80%;float:left;' ><input id='search'class=' form-control'  placeholder='请输入权限名'  whatever='permissiongroup'></div><div style='width:20%;float:left;'><a class='btn btn-primary GM_userInput' onclick=GM_Search()>搜索 </a></div></div></caption> <thead> <tr> <th>选择<button class='btn btn-success btn-xs GM_userInput' onclick='GM_selectAll()'>全选/不选</button></th><th>ID</th> <th>管理组名</th> <th>创建时间</th> <th>操作</th> </tr> </thead><tbody id='GM_usersTbody'></tbody></table></div>";
		GM_div2.innerHTML = GM_str3;
	}
}

function GM_showGMsTable(GM_flag, GM_data1) //加载管理员表单
{
	if(GM_flag == 1) {
		var str1 = "";
		for(var i = 0; i < GM_data1.length - 1; i++) {
			str1 = str1 + "<tr><td class='GM_userInput'><div style='text-align:center' ><input onclick=' ShowAllBtn()' type='checkbox' name='GM_user'  value='" + GM_data1[i]['id'] + "'></div></td><td><div>" + GM_data1[i]['id'] + "</div></td><td><div>" + GM_data1[i]['email'] + "</div></td><td><div>" + GM_data1[i]['name'] + "</div></td><td><div>" + GM_data1[i]['created_at'] + "</div></td><td><div style='padding:0;' > <a  id='GM_GMLookAdmin" + GM_data1[i]['id'] + "' tabindex='0' type='button' class='btn btn-warning btn-xs' title='该管理员权限' data-container='body' data-toggle='popover' data-trigger='focus' data-placement='left' whatever='" + GM_data1[i]['admin'] + "'>" + GM_data1[i]['admin'] + "</a></div></td><td><div style='text-align: center'><div style='display:inline;padding:0;margin:20px;' ><a class='btn btn-info btn-xs GM_userInput' data-toggle='modal' data-target='#GM_usersModal1' data-whatever='" + GM_data1[i]['id'] + ' ' + GM_data1[i]['name'] + "' > <i class='glyphicon glyphicon-edit icon-white' ></i>编辑 </a></div><div style='display:inline;padding:0;margin:20px;'><a class='btn btn-danger btn-xs GM_userInput' data-toggle='modal' data-target='#GM_usersModal2' data-whatever='" + GM_data1[i]['id'] + ' ' + GM_data1[i]['name'] + "' > <i class='glyphicon glyphicon-trash icon-white'></i>删除 </a></div></div></td></tr>";

		}
		var GM_div1 = document.getElementById("GM_usersTbody");
		GM_div1.innerHTML = str1;
		for(var i = 0; i < GM_data1.length - 1; i++) {
			$("#GM_GMLookAdmin" + GM_data1[i]['id']).on('show.bs.popover', function() {
				var GM_str1 = $(this).attr('whatever');
				var GM_str2 = $(this).attr('id');
				GM_GMPopover(GM_str1, GM_str2);
			})
		}
		$("[data-toggle='popover']").popover();
	} else if(GM_flag == 2) {
		var str1 = "";
		for(var i = 0; i < GM_data1.length - 1; i++) {
			str1 = str1 + "<tr><td class='GM_userInput'><div style='text-align:center' ><input onclick=' ShowAllBtn()' type='checkbox' name='GM_user'  value='" + GM_data1[i]['group_name'] + "'></div></td><td><div>" + GM_data1[i]['id'] + "</div></td><td><div><a  id='GM_GMLookAdmin" + GM_data1[i]['id'] + "' tabindex='0' type='button' class='btn btn-warning btn-xs' title='该管理组权限' data-container='body' data-toggle='popover' data-trigger='focus' data-placement='left' whatever='" + GM_data1[i]['group_name'] + "'>" + GM_data1[i]['group_name'] + "</a></div></td><td><div>" + GM_data1[i]['created_at'] + "</div></td><td><div style='text-align: center'><div style='display:inline;padding:0;margin:20px;' ><a class='btn btn-info btn-xs GM_userInput' data-whatever='" + GM_data1[i]['id'] + ' ' + GM_data1[i]['group_name'] + "' onclick=GM_GMGroupAddition(1,'" + GM_data1[i]['group_name'] + "')> <i class='glyphicon glyphicon-edit icon-white' ></i>修改权限 </a></div><div style='display:inline;padding:0;margin:20px;'><a class='btn btn-danger btn-xs GM_userInput' data-toggle='modal' data-target='#GM_GMGroupModal' data-whatever='" + GM_data1[i]['id'] + ' ' + GM_data1[i]['group_name'] + "' > <i class='glyphicon glyphicon-trash icon-white'></i>删除 </a></div></div></td></tr>";
		}
		var GM_div1 = document.getElementById("GM_usersTbody");
		GM_div1.innerHTML = str1;
		for(var i = 0; i < GM_data1.length - 1; i++) {
			$("#GM_GMLookAdmin" + GM_data1[i]['id']).on('show.bs.popover', function() {
				var GM_str1 = $(this).attr('whatever');
				var GM_str2 = $(this).attr('id');
				GM_GMPopover(GM_str1, GM_str2);
			})
		}
		$("[data-toggle='popover']").popover();
	}
}

function GM_showGM1Paging(sum, size, flag) //加载管理员分页
{
	var GM_div1 = document.getElementById("show_paging");
	GM_div1.innerHTML = "";
	$('#show_paging').Paging({
		pagesize: size,
		count: sum * 10,
		toolbar: false,
		callback: function(page, size, count) {
			GM_getGMslist1(page - 1, size, flag);
		}
	});
}

function GM_showGM2Paging(sum, size, flag) //加载管理组分页
{
	var GM_div1 = document.getElementById("show_paging");
	GM_div1.innerHTML = "";

	$('#show_paging').Paging({
		pagesize: size,
		count: sum * 10,
		toolbar: false,
		callback: function(page, size, count) {
			GM_getGMslist2(page - 1, size, flag);
		}
	});
}
//-------------------------------------人员管理部分函数-----------------------------------------------------------------------------------------------------------------------------------------------
function GM_clearAddition() //清空副栏
{
	var GM_div1 = document.getElementById("GM_addition");
	GM_div1.innerHTML = "";
	$(".GM_userInput").attr("style", "");
}

function GM_clearShow() //清空展览页面
{
	var GM_div1 = document.getElementById("GM_Show");
	GM_div1.innerHTML = "";
}

function GM_clickBtnShow(btn) //按钮对应选择器
{
	$("#GM_Show").show();
	switch(btn) {
		case 0:
			GM_getRecycleBinlist(0, 10, false);
			break;
		case 1: //用户
			GM_getUserslist(0, 10, false);
			break;
		case 2:
			GM_getGMslist1(0, 10, false);
			break;
		case 3:
			GM_getDisksSuffixList('video', 0, 25, false);
			break;
		case 4: //用户
			GM_getJuseslist(0, 10, false);
			break;
		case 5: //管理员
			GM_getAdminslist(0, 10, false);
			break;
	}
}
//-------------------------------角色ajax-------------------------------------
function GM_getJueSelist(page, size, flag) {
	$.ajax({
		url: '/admin/sky_drive/get_roles',
		type: 'post',
		async: false,
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},
		success: function(data) {
			console.log(data);
			if(flag == false) {
				GM_clearAddition();
				GM_showUsersFrame();
			}
			GM_showUsers();
			GM_showUsersTable(data);
			if(flag == false)
				GM_showUsersPaging(Math.ceil(data[data.length - 1] / size), size, true);
		},
		error: function() {
			$('#GM_information').find('.modal-body').text('数据读入出错');
			document.getElementById('GM_informationBtn').click();
		}
	});
}
//-------------------------------用户ajax-----------------------------------------------------------------------------------------------------
function GM_getUserslist(page, size, flag) //用户ajax
{
	$.ajax({
		url: '/admin/sky_drive/user_information',
		type: 'post',
		async: false,
		data: {
			'skip': page * size,
			'size': size
		},
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},
		success: function(data) {
			console.log(data);
			if(flag == false) {
				GM_clearAddition();
				GM_showUsersFrame();
			}
			GM_showJueses();
			GM_showUsersTable(data);
			if(flag == false)
				GM_showUsersPaging(Math.ceil(data[data.length - 1] / size), size, true);
		},
		error: function() {
			$('#GM_information').find('.modal-body').text('数据读入出错');
			document.getElementById('GM_informationBtn').click();
		}
	});
}

function GM_getJuseslist(page, size, flag) //用户ajax
{
	$.ajax({
		url: '/admin/sky_drive/user_information',
		type: 'post',
		async: false,
		data: {
			'skip': page * size,
			'size': size
		},
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},
		success: function(data) {
			console.log(data);
			if(flag == false) {
				GM_clearAddition();
				GM_showJuesesFrame();
			}
			GM_showUsers();
			GM_showJuesesTable(data);
			if(flag == false)
				GM_showUsersPaging(Math.ceil(data[data.length - 1] / size), size, true);
		},
		error: function() {
			$('#GM_information').find('.modal-body').text('数据读入出错');
			document.getElementById('GM_informationBtn').click();
		}
	});
}
function GM_getAdminslist(page, size, flag) //用户ajax
{
	$.ajax({
		url: '/admin/sky_drive/admin_information',
		type: 'post',
		async: false,
		data: {
			'skip': page * size,
			'size': size
		},
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},
		success: function(data) {
			console.log(data);
			if(flag == false) {
				GM_clearAddition();
				GM_showJuesesFrame();
			}
			GM_showUsers();
			GM_showJuesesTable(data);
			if(flag == false)
				GM_showUsersPaging(Math.ceil(data[data.length - 1] / size), size, true);
		},
		error: function() {
			$('#GM_information').find('.modal-body').text('数据读入出错');
			document.getElementById('GM_informationBtn').click();
		}
	});
}
function GM_sureDeleteUser(GM_flag) //删除用户
{
	var data1 = [];
	var data2 = 0;
	if(GM_flag == 1) {
		var GM_data1 = $('#GM_usersModal2').attr('whatever').split(' ');
		data1.push(GM_data1[0]);
		var GM_data2 = document.getElementsByName("GM_ToUser");
		for(var GM_k in GM_data2) {
			if(GM_data2[GM_k].checked) {
				data2 = 1;
			}
		}
	} else if(GM_flag == 2) {
		var GM_data1 = document.getElementsByName("GM_user");
		for(var GM_k in GM_data1) {
			if(GM_data1[GM_k].checked) {
				data1.push(GM_data1[GM_k].value);
			}
		}
		var GM_data2 = document.getElementsByName("GM_ToUser");
		for(var GM_k in GM_data2) {
			if(GM_data2[GM_k].checked) {
				data2 = 1;
			}
		}
	}
	$.ajax({
		url: '/admin/sky_drive/delete_and_restore',
		type: 'post',
		async: false,
		data: {
			'id': data1,
			'type': 1
		},
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},
		success: function(data) {
			GM_clickBtnShow(GM_user_or_GM);
			$('#GM_information').find('.modal-body').text('删除成功');
			document.getElementById('GM_informationBtn').click();
			if(data2 == 1) {
				$.ajax({
					url: '/email/delete_user',
					type: 'post',
					async: false,
					data: {
						'id': data1
					},
					headers: {
						'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
					},
					success: function(data) {
						$('#GM_information').find('.modal-body').text('邮件发送成功');
						document.getElementById('GM_informationBtn').click();
					},
					error: function() {
						$('#GM_information').find('.modal-body').text('邮件发送出错');
						document.getElementById('GM_informationBtn').click();
					}
				});
			}
		},
		error: function() {
			$('#GM_information').find('.modal-body').text('数据读入出错');
			document.getElementById('GM_informationBtn').click();
		}
	});
}

function GM_SetPower() //设置用户权限
{
	var data1 = [];
	var data2 = [];
	var data3 = 0;
	if(GM_single_or_All == 1) {
		var GM_data1 = $('#GM_usersModal1').attr('whatever').split(' ');
		data1.push(GM_data1[0]);
		var GM_data2 = document.getElementsByName("GM_userSetSelect");
		for(var GM_k in GM_data2) {
			if(GM_data2[GM_k].checked) {
				var GM_data21 = GM_data2[GM_k].value.split('_');
				data2.push(GM_data21[0]);
			}
		}
		var GM_data3 = document.getElementsByName("GM_ToUser");
		for(var GM_k in GM_data3) {
			if(GM_data3[GM_k].checked) {
				data3 = 1;
			}
		}
		GM_clearAddition();
	} else if(GM_single_or_All == 2) {
		var GM_data1 = document.getElementsByName("GM_user");
		for(var GM_k in GM_data1) {
			if(GM_data1[GM_k].checked) {
				data1.push(GM_data1[GM_k].value);
			}
		}
		var GM_data2 = document.getElementsByName("GM_userSetSelect");
		for(var GM_k in GM_data2) {
			if(GM_data2[GM_k].checked) {
				var GM_data21 = GM_data2[GM_k].value.split('_');
				data2.push(GM_data21[0]);
			}
		}
		var GM_data3 = document.getElementsByName("GM_ToUser");
		for(var GM_k in GM_data3) {
			if(GM_data3[GM_k].checked) {
				data3 = true;
			}
		}
		GM_clearAddition();
	}
	$.ajax({
		url: '/admin/sky_drive/modify_permissions',
		type: 'post',
		async: false,
		data: {
			'group_name': nameNow,
			'permission': data2
		},
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},
		success: function(data) {
			console.log(data);
			if(data == -1) {
				$('#GM_information').find('.modal-body').text('未找到对应权限组');
				document.getElementById('GM_informationBtn').click();
			} else {
				GM_clickBtnShow(GM_user_or_GM);
				$('#GM_information').find('.modal-body').text('设置权限成功');
				document.getElementById('GM_informationBtn').click();
				if(data3 == true) {
					$.ajax({
						url: '/email/change_user_permission',
						type: 'post',
						async: false,
						data: {
							'id': data1,
							'permission': data2
						},
						headers: {
							'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
						},
						success: function(data) {
							$('#GM_information').find('.modal-body').text('发送邮件成功');
							document.getElementById('GM_informationBtn').click();
						},
						error: function() {
							$('#GM_information').find('.modal-body').text('发送邮件失败');
							document.getElementById('GM_informationBtn').click();
						}
					});
				}
			}
		},
		error: function() {
			$('#GM_information').find('.modal-body').text('数据读入出错');
			document.getElementById('GM_informationBtn').click();
		}
	});
}
function GM_SetPower2(data2) //设置哟农户类型
{
	$.ajax({
		url: '/admin/sky_drive/modify_roles',
		type: 'post',
		async: false,
		data: {
			'id': IDNow,
			'group_name': data2
		},
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},
		success: function(data) {
			console.log(data);
			GM_clearAddition();
//			if(data == -1) {
//				$('#GM_information').find('.modal-body').text('未找到对应权限组');
//				document.getElementById('GM_informationBtn').click();
//			} else {
//				GM_clickBtnShow(GM_user_or_GM);
//				$('#GM_information').find('.modal-body').text('设置权限成功');
//				document.getElementById('GM_informationBtn').click();
//				if(data3 == true) {
//					$.ajax({
//						url: '/email/change_user_permission',
//						type: 'post',
//						async: false,
//						data: {
//							'id': data1,
//							'permission': data2
//						},
//						headers: {
//							'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
//						},
//						success: function(data) {
//							$('#GM_information').find('.modal-body').text('发送邮件成功');
//							document.getElementById('GM_informationBtn').click();
//						},
//						error: function() {
//							$('#GM_information').find('.modal-body').text('发送邮件失败');
//							document.getElementById('GM_informationBtn').click();
//						}
//					});
//				}
//			}
		},
		error: function() {
			$('#GM_information').find('.modal-body').text('数据读入出错');
			document.getElementById('GM_informationBtn').click();
		}
	});
}

function GM_ChangePass() //修改用户密码
{
	var data1 = [];
	var data2 = [];
	var data3 = 0;
	var GM_str1 = document.getElementById("GM_warning");
	GM_str1.innerHTML = "123";
	if(GM_single_or_All == 1) {
		var GM_data1 = $('#GM_usersModal11').attr('whatever').split(' ');
		data1.push(GM_data1[0]);

		var GM_data2_pa = $("#GM_passWord").val();
		var GM_data2_repa = $("#GM_RepassWord").val();
		if(GM_data2_pa != GM_data2_repa) {
			$("#GM_warning").attr("style", "display:block");
			GM_str1.innerHTML = "<strong>两场密码不一致!</strong> ";
			return 0;
		} else if(GM_data2_pa == '') {
			$("#GM_warning").attr("style", "display:block");
			GM_str1.innerHTML = "<strong>密码不能为空!</strong>";
			return 0;
		} else {
			data2 = GM_data2_pa;
		}

		var GM_data3 = document.getElementsByName("GM_ToUser");
		for(var GM_k in GM_data3) {
			if(GM_data3[GM_k].checked) {
				data3 = 1;
			}
		}
		GM_clearAddition();
	} else if(GM_single_or_All == 2) {
		var GM_data1 = document.getElementsByName("GM_user");
		for(var GM_k in GM_data1) {
			if(GM_data1[GM_k].checked) {
				data1.push(GM_data1[GM_k].value);
			}
		}

		var GM_data2_pa = $("#GM_passWord").val();
		var GM_data2_repa = $("#GM_RepassWord").val();
		if(GM_data2_pa != GM_data2_repa) {
			$("#GM_warning").attr("style", "display:block");
			GM_str1.innerHTML = " <strong>两场密码不一致!</strong>";
			return 0;
		} else if(GM_data2_pa == '') {
			$("#GM_warning").attr("style", "display:block");
			GM_str.innerHTML = "<strong>密码不能为空!</strong>";
			return 0;
		} else {
			data2 = GM_data2_pa;
		}

		var GM_data3 = document.getElementsByName("GM_ToUser");
		for(var GM_k in GM_data3) {
			if(GM_data3[GM_k].checked) {
				data3 = 1;
			}
		}
		GM_clearAddition();
	}

	$.ajax({
		url: '/auth/compulsory_change_password',
		type: 'post',
		async: false,
		data: {
			'id': data1,
			'password': data2
		},
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},
		success: function(data) {
			GM_clickBtnShow(GM_user_or_GM);
			$('#GM_information').find('.modal-body').text('密码修改成功');
			document.getElementById('GM_informationBtn').click();
			if(data3 == 1) {
				$.ajax({
					url: '/email/change_user_password',
					type: 'post',
					async: false,
					data: {
						'id': data1,
						'password': data2
					},
					headers: {
						'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
					},
					success: function(data) {
						$('#GM_information').find('.modal-body').text('邮件发送成功');
						document.getElementById('GM_informationBtn').click();
					},
					error: function() {
						$('#GM_information').find('.modal-body').text('邮件发送失败');
						document.getElementById('GM_informationBtn').click();
					}
				})
			}
		},
		error: function() {
			$('#GM_information').find('.modal-body').text('数据读入出错');
			document.getElementById('GM_informationBtn').click();
		}
	})
}
////-------------------------------管理员ajax-----------------------------------------------------------------------------------------------------
function GM_getGMslist1(page, size, flag) //管理员ajax
{
	$.ajax({
		url: '/admin/sky_drive/admin_information',
		type: 'post',
		async: false,
		data: {
			'skip': page * size,
			'size': size
		},
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},
		success: function(data) {
			console.log(data);
			if(flag == false) {
				GM_clearAddition();
				GM_showGMsFrame();
				GM_GMSelect();
				GM_seIndexActive(1);
			}
			GM_ShowGM(1);
			GM_showGMsTable(1, data);
			if(flag == false)
				GM_showGM1Paging(Math.ceil(data[data.length - 1] / size), size, true);
		},
		error: function() {
			$('#GM_information').find('.modal-body').text('数据读入出错');
			document.getElementById('GM_informationBtn').click();
		}
	});
}

function GM_getGMslist2(page, size, flag) //管理组ajax
{
	$.ajax({
		url: '/admin/sky_drive/get_permission_group',
		type: 'post',
		async: false,
		data: {
			'skip': page * size,
			'size': size
		},
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},
		success: function(data) {
			if(flag == false) {
				GM_clearAddition();
				GM_showGMsFrame();
				GM_GMSelect();
				GM_seIndexActive(2);
			}
			GM_ShowGM(2);
			GM_showGMsTable(2, data);
			if(flag == false)
				GM_showGM2Paging(Math.ceil(data[data.length - 1] / size), size, true);
		},
		error: function() {
			$('#GM_information').find('.modal-body').text('数据读入出错');
			document.getElementById('GM_informationBtn').click();
		}
	});
}

function GM_sureDeleteGM_group(GM_flag) //删除管理组
{
	var data1 = [];
	var data2 = 0;
	if(GM_flag == 1) {
		var GM_data1 = $('#GM_GMGroupModal').attr('whatever').split(' ');
		data1.push(GM_data1[1]);
		var GM_data2 = document.getElementsByName("GM_ToUser");
		for(var GM_k in GM_data2) {
			if(GM_data2[GM_k].checked) {
				data2 = 1;
			}
		}
	} else if(GM_flag == 2) {
		var GM_data1 = document.getElementsByName("GM_user");
		for(var GM_k in GM_data1) {
			if(GM_data1[GM_k].checked) {
				data1.push(GM_data1[GM_k].value);
			}
		}
		var GM_data2 = document.getElementsByName("GM_ToUser");
		for(var GM_k in GM_data2) {
			if(GM_data2[GM_k].checked) {
				data2 = 1;
			}
		}
	}
	$.ajax({
		url: '/admin/sky_drive/delete_permission',
		type: 'post',
		async: false,
		data: {
			'group_name': data1,
		},
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},
		success: function(data) {
			$('#GM_information').find('.modal-body').text('管理组删除成功');
			document.getElementById('GM_informationBtn').click();
			GM_getGMslist2(0, 10, false);
			if(data2 == 1) {
				$.ajax({
					url: '/email/delete_permission_group',
					type: 'post',
					async: false,
					data: {
						'id': data1
					},
					headers: {
						'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
					},
					success: function(data) {
						$('#GM_information').find('.modal-body').text('邮件发送成功');
						document.getElementById('GM_informationBtn').click();
					},
					error: function() {
						$('#GM_information').find('.modal-body').text('邮件发送失败');
						document.getElementById('GM_informationBtn').click();
					}
				});
			}
		},
		error: function() {
			$('#GM_information').find('.modal-body').text('数据读入出错');
			document.getElementById('GM_informationBtn').click();
		}
	});
}

function GM_GMGroupSetPower() //管理组设置权限
{
	var data3 = [];
	var data4 = 0;
	var data1 = $('#GM_GMGroupIsSurePower').attr('whatever');
	var data2 = $("#GM_gmGroupName").val();
	var GM_data3 = document.getElementsByName("GM_userSetSelect");
	for(var GM_k in GM_data3) {
		if(GM_data3[GM_k].checked) {
			var GM_data31 = GM_data3[GM_k].value.split(' ');
			data3.push(GM_data31[0]);
		}
	}
	var GM_data4 = document.getElementsByName("GM_ToUser");
	for(var GM_k in GM_data4) {
		if(GM_data4[GM_k].checked) {
			data4 = 1;
		}
	}
	var data21 = data2.split(' ');
	if(data21[0] == "") {
		var GM_str1 = document.getElementById("GM_warning");
		GM_str1.innerHTML = "";
		$("#GM_warning").attr("style", "display:block");
		GM_str1.innerHTML = "<strong>管理组名不能为空</strong> ";
		return 0;
	}
	if(data3 == "") {
		var GM_str1 = document.getElementById("GM_warning");
		GM_str1.innerHTML = "";
		$("#GM_warning").attr("style", "display:block");
		GM_str1.innerHTML = "<strong>管理组权限不能为空</strong> ";
		return 0;
	}
	$.ajax({
		url: '/admin/sky_drive/edit_permission',
		type: 'post',
		async: false,
		data: {
			'old_name': data1,
			'new_name': data2,
			'permission': data3
		},
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},
		success: function(data) {
			var GM_str1 = document.getElementById("GM_warning");
			GM_str1.innerHTML = "";
			if(data == 0) {
				$("#GM_warning").attr("style", "display:block");
				GM_str1.innerHTML = "<strong>权限组不能和以前一样</strong> ";
			} else if(data == -1) {
				$("#GM_warning").attr("style", "display:block");
				GM_str1.innerHTML = "<strong>这个组名已经被使用</strong> ";
			} else if(data == 1) {
				$('#GM_information').find('.modal-body').text('修改成功');
				document.getElementById('GM_informationBtn').click();
			} else if(data.length == 1) {
				$("#GM_warning").attr("style", "display:block");
				GM_str1.innerHTML = "<strong>权限组内容与" + data + "权限内容一样</strong> ";
			} else {
				GM_clearAddition();
				GM_getGMslist2(0, 10, false);
				$('#GM_information').find('.modal-body').text('修改成功');
				document.getElementById('GM_informationBtn').click();
				if(data4 == 1) {
					$.ajax({
						url: '/email/change_group_permission',
						type: 'post',
						async: false,
						data: {
							'information': data
						},
						headers: {
							'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
						},
						success: function(data) {
							$('#GM_information').find('.modal-body').text('发送邮件成功');
							document.getElementById('GM_informationBtn').click();
						},
						error: function() {
							$('#GM_information').find('.modal-body').text('邮件发送失败');
							document.getElementById('GM_informationBtn').click();
						}
					});
				}
			}
		},
		error: function() {
			$('#GM_information').find('.modal-body').text('数据读入出错');
			document.getElementById('GM_informationBtn').click();
		}
	});
}

function GM_GMGroupAddPower() //增加管理组
{
	var data2 = [];
	var data1 = $("#GM_gmGroupNameAdd").val();
	var GM_data2 = document.getElementsByName("GM_userSetSelect");
	for(var GM_k in GM_data2) {
		if(GM_data2[GM_k].checked) {
			var GM_data21 = GM_data2[GM_k].value.split(' ');
			data2.push(GM_data21[0]);
		}
	}
	var data11 = data1.split(' ');
	if(data11[0] == "") {
		var GM_str1 = document.getElementById("GM_warning");
		GM_str1.innerHTML = "";
		$("#GM_warning").attr("style", "display:block");
		GM_str1.innerHTML = "<strong>管理组名不能为空</strong> ";
		return 0;
	}
	if(data2 == "") {
		var GM_str1 = document.getElementById("GM_warning");
		GM_str1.innerHTML = "";
		$("#GM_warning").attr("style", "display:block");
		GM_str1.innerHTML = "<strong>管理组权限不能为空</strong> ";
		return 0;
	}
	$.ajax({
		url: '/admin/sky_drive/add_permission',
		type: 'post',
		async: false,
		data: {
			'group_name': data1,
			'permission': data2
		},
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},
		success: function(data) {
			var GM_str1 = document.getElementById("GM_warning");
			GM_str1.innerHTML = "";
			if(data == 1) {
				GM_clearAddition();
				GM_getGMslist2(0, 10, false);
				$('#GM_informationBtn').find('.modal-body').text('增加成功');
				document.getElementById('GM_informationBtn').click();
			} else if(data == -1) {
				$("#GM_warning").attr("style", "display:block");
				GM_str1.innerHTML = "<strong>已有该权限组名</strong> ";
			} else if(data.length == 1) {
				$("#GM_warning").attr("style", "display:block");
				GM_str1.innerHTML = "<strong>权限内容与" + data + "重合</strong> ";
			}
		},
		error: function() {
			$('#GM_information').find('.modal-body').text('数据读入出错');
			document.getElementById('GM_informationBtn').click();
		}
	});
}

function GM_GMPopover(data, data_id) {
	$.ajax({
		url: '/admin/sky_drive/get_authority',
		type: 'post',
		async: false,
		data: {
			'group_name': data
		},
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				if(data[i] == 'recycle') {
					data[i] = '回收站';
				} else if(data[i] == 'peoplev1') {
					data[i] = '用户';
				} else if(data[i] == 'peoplev2')
					data[i] = '管理员';
				else if(data[i] == 'homePagev1')
					data[i] = '滑动展览';
				else if(data[i] == 'homePagev2')
					data[i] = '热度TOP榜';
				else if(data[i] == 'homePagev3')
					data[i] = '下载TOP榜';
				else if(data[i] == 'homePagev4')
					data[i] = '管理员推荐';
				else if(data[i] == 'suffix')
					data[i] = '后缀';
				if(data[i] == 'delete')
					data[i] = '删除';
			}
			$("#" + data_id).attr("data-content", data);
		},
		error: function() {
			$('#GM_information').find('.modal-body').text('数据读入出错');
			document.getElementById('GM_informationBtn').click();
		}
	});
}
//----------------------后缀-----------------------------------------------------------------------------------------------
function GM_showDisksSuffixFrame() //加载网盘后缀页面框架
{
	var GM_div1 = document.getElementById("GM_Show");
	GM_div1.innerHTML = "<div id='GM_title'></div><div id='GM_exhibition' > </div> <div id='show_paging'> </div><div id='GM_userM'></div>";
	var GM_div1 = document.getElementById("GM_title");
	GM_div1.innerHTML = "<div> <ol class='breadcrumb GM_breadcrumb'> <li>控制台</li> <li>网盘</li><li>后缀</li> <li style='color: #080808'>视频</li> </ol> </div>";
	var str1 = "<div id='GM_diskSuffixAdd' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel' aria-hidden='true'><div class='modal-dialog modal-sm'> <div class='modal-content'> <div class='modal-header'><button type='button' class='close'data-dismiss='modal' aria-hidden='true'> &times;</button> <h4 class='modal-title' >确定要增加这个后缀 </h4> </div><div class='modal-body'></div>  <div class='modal-footer'><div><button type='button' class='btn btn-default'data-dismiss='modal'>取消</button><button type='button' class='btn btn-primary' data-dismiss='modal' onclick='GM_AddDisksSuffix()'>确定</button></div> </div> </div> </div> </div>";
	str1 += "<div id='GM_diskSuffixDelete' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel' aria-hidden='true'><div class='modal-dialog modal-sm'> <div class='modal-content'> <div class='modal-header'><button type='button' class='close'data-dismiss='modal' aria-hidden='true'> &times;</button> <h4 class='modal-title' >确定要删除这个后缀 </h4> </div>  <div class='modal-footer'><div><button type='button' class='btn btn-default'data-dismiss='modal'>取消</button><button type='button' class='btn btn-primary' data-dismiss='modal' onclick='GM_DeleteDisksSuffix()'>确定</button></div> </div> </div> </div> </div>";
	$("#GM_userM").append(str1);
	$('#GM_diskSuffixAdd').on('show.bs.modal', function(event) {
		var modal = $(this);
		modal.find('.modal-title').text('确定增加选项');
		var cs1 = $('#GM_disksSuffixAdd').val();
		modal.find('.modal-body').text(cs1);

	})
	$('#GM_diskSuffixDelete').on('show.bs.modal', function(event) //删除管理员模态框数据添加
		{
			var button = $(event.relatedTarget);
			var GM_SS = button.data('whatever');
			var modal = $(this);
			$("#GM_diskSuffixDelete").attr("whatever", GM_SS);
			var GM_SS1 = GM_SS.split(' ');
			modal.find('.modal-title').text('确定删除后缀: ' + GM_SS1[0]);
		});
}

function GM_DisksSuffixSelect() //把网盘后缀二级按钮打印出来
{
	var GM_str1 = "<div class='col-md-12'><div class='col-md-10'> <ul id='GM_seBtnUl' class='nav nav-tabs nav-justified'><li name='GM_seIndex' onclick=GM_getDisksSuffixList('video',0,25,false)><a>视频</a></li><li name='GM_seIndex' onclick=GM_getDisksSuffixList('music',0,50,false)><a>音乐</a></li><li name='GM_seIndex'onclick=GM_getDisksSuffixList('text',0,50,false)><a>文本</a></li><li name='GM_seIndex' onclick=GM_getDisksSuffixList('picture',0,50,false)><a>图片</a></li><li name='GM_seIndex' onclick=GM_getDisksSuffixList('archive',0,50,false)><a>压缩</a></li><li name='GM_seIndex'onclick=GM_getDisksSuffixList('bt',0,50,false)><a>种子</a></li><li name='GM_seIndex' onclick=GM_getDisksSuffixList('other',0,50,false)><a>其他</a></li></ul></div></div>";
	$("#GM_exhibition").before(GM_str1);
}

function GM_DisksSuffixShow(GM_str) //加载网盘后缀表
{
	if(GM_str == 'video') {
		GM_seIndexActive(1);
		var GM_div1 = document.getElementById("GM_title");
//		GM_div1.innerHTML = "<div> <ol class='breadcrumb GM_breadcrumb'> <li>控制台</li> <li>网盘</li><li>后缀</li> <li style='color: #080808'>视频</li> </ol> </div>";
		GM_div1.innerHTML = "<div> <ol class='breadcrumb GM_breadcrumb'> <li>控制台</li> <li>网盘</li><li>后缀</li> <li style='color: #080808'>视频</li> </ol> </div>";
		var GM_div2 = document.getElementById("GM_exhibition");
		GM_div2.innerHTML = "";
		var GM_str3 =
			"<div class='col-md-12' id='GM_usersTa'> <table  style='table-layout:fixed;'class='table table-condensed' border='0'> <caption><div style='width:70%;float:left;'>视频后缀表</div><div style='width:30%;float:left;'><div style='width:80%;float:left;' ><input id='GM_disksSuffixAdd'class='form-control'  placeholder='后缀名增加'  whatever='video'></div><div style='width:20%;float:left;'><a class='btn btn-primary GM_userInput' data-toggle='modal' data-target='#GM_diskSuffixAdd' >增加 </a></div></div></caption> <tbody id='GM_usersTbody'></tbody></table></div>";
		GM_div2.innerHTML = GM_str3;
	} else if(GM_str == 'music') {
		GM_seIndexActive(2);
		var GM_div1 = document.getElementById("GM_title");
		GM_div1.innerHTML = "<div> <ol class='breadcrumb GM_breadcrumb'> <li>控制台</li> <li>网盘</li><li>后缀</li> <li style='color: #080808'>音乐</li> </ol> </div>";
		var GM_div2 = document.getElementById("GM_exhibition");
		GM_div2.innerHTML = "";
		var GM_str3 =
			"<div class='col-md-12' id='GM_usersTa'> <table  style='table-layout:fixed;'class='table table-condensed' border='0'> <caption><div style='width:70%;float:left;'>音乐后缀表</div><div style='width:30%;float:left;'><div style='width:80%;float:left;' ><input id='GM_disksSuffixAdd'class='form-control'  placeholder='后缀名增加'  whatever='music'></div><div style='width:20%;float:left;'><a class='btn btn-primary GM_userInput' data-toggle='modal' data-target='#GM_diskSuffixAdd' >增加 </a></div></div></caption> <tbody id='GM_usersTbody'></tbody></table></div>";
		GM_div2.innerHTML = GM_str3;
	} else if(GM_str == 'text') {
		GM_seIndexActive(3);
		var GM_div1 = document.getElementById("GM_title");
		GM_div1.innerHTML = "<div> <ol class='breadcrumb GM_breadcrumb'> <li>控制台</li> <li>网盘</li><li>后缀</li> <li style='color: #080808'>文本</li> </ol> </div>";
		var GM_div2 = document.getElementById("GM_exhibition");
		GM_div2.innerHTML = "";
		var GM_str3 =
			"<div class='col-md-12' id='GM_usersTa'> <table  style='table-layout:fixed;'class='table table-condensed' border='0'> <caption><div style='width:70%;float:left;'>文本后缀表</div><div style='width:30%;float:left;'><div style='width:80%;float:left;' ><input id='GM_disksSuffixAdd'class='form-control'  placeholder='后缀名增加'  whatever='text'></div><div style='width:20%;float:left;'><a class='btn btn-primary GM_userInput' data-toggle='modal' data-target='#GM_diskSuffixAdd' >增加 </a></div></div></caption> <tbody id='GM_usersTbody'></tbody></table></div>";
		GM_div2.innerHTML = GM_str3;
	} else if(GM_str == 'picture') {
		GM_seIndexActive(4);
		var GM_div1 = document.getElementById("GM_title");
		GM_div1.innerHTML = "<div> <ol class='breadcrumb GM_breadcrumb'> <li>控制台</li> <li>网盘</li><li>后缀</li> <li style='color: #080808'>图片</li> </ol> </div>";
		var GM_div2 = document.getElementById("GM_exhibition");
		GM_div2.innerHTML = "";
		var GM_str3 =
			"<div class='col-md-12' id='GM_usersTa'> <table  style='table-layout:fixed;'class='table table-condensed' border='0'> <caption><div style='width:70%;float:left;'>图片后缀表</div><div style='width:30%;float:left;'><div style='width:80%;float:left;' ><input id='GM_disksSuffixAdd'class='form-control'  placeholder='后缀名增加'  whatever='picture'></div><div style='width:20%;float:left;'><a class='btn btn-primary GM_userInput' data-toggle='modal' data-target='#GM_diskSuffixAdd' >增加 </a></div></div></caption> <tbody id='GM_usersTbody'></tbody></table></div>";
		GM_div2.innerHTML = GM_str3;
	} else if(GM_str == 'archive') {
		GM_seIndexActive(5);
		var GM_div1 = document.getElementById("GM_title");
		GM_div1.innerHTML = "<div> <ol class='breadcrumb GM_breadcrumb'> <li>控制台</li> <li>网盘</li><li>后缀</li> <li style='color: #080808'>压缩包</li> </ol> </div>";
		var GM_div2 = document.getElementById("GM_exhibition");
		GM_div2.innerHTML = "";
		var GM_str3 =
			"<div class='col-md-12' id='GM_usersTa'> <table  style='table-layout:fixed;'class='table table-condensed' border='0'> <caption><div style='width:70%;float:left;'>压缩包后缀表</div><div style='width:30%;float:left;'><div style='width:80%;float:left;' ><input id='GM_disksSuffixAdd'class='form-control'  placeholder='后缀名增加'  whatever='archive'></div><div style='width:20%;float:left;'><a class='btn btn-primary GM_userInput' data-toggle='modal' data-target='#GM_diskSuffixAdd' >增加 </a></div></div></caption> <tbody id='GM_usersTbody'></tbody></table></div>";
		GM_div2.innerHTML = GM_str3;
	} else if(GM_str == 'bt') {
		GM_seIndexActive(6);
		var GM_div1 = document.getElementById("GM_title");
		GM_div1.innerHTML = "<div> <ol class='breadcrumb GM_breadcrumb'> <li>控制台</li> <li>网盘</li><li>后缀</li> <li style='color: #080808'>种子</li> </ol> </div>";
		var GM_div2 = document.getElementById("GM_exhibition");
		GM_div2.innerHTML = "";
		var GM_str3 =
			"<div class='col-md-12' id='GM_usersTa'> <table  style='table-layout:fixed;'class='table table-condensed' border='0'> <caption><div style='width:70%;float:left;'>种子后缀表</div><div style='width:30%;float:left;'><div style='width:80%;float:left;' ><input id='GM_disksSuffixAdd'class='form-control'  placeholder='后缀名增加'  whatever='bt'></div><div style='width:20%;float:left;'><a class='btn btn-primary GM_userInput' data-toggle='modal' data-target='#GM_diskSuffixAdd' >增加 </a></div></div></caption> <tbody id='GM_usersTbody'></tbody></table></div>";
		GM_div2.innerHTML = GM_str3;
	} else if(GM_str == 'other') {
		GM_seIndexActive(7);
		var GM_div1 = document.getElementById("GM_title");
		GM_div1.innerHTML = "<div> <ol class='breadcrumb GM_breadcrumb'> <li>控制台</li> <li>网盘</li><li>后缀</li> <li style='color: #080808'>其它</li> </ol> </div>";
		var GM_div2 = document.getElementById("GM_exhibition");
		GM_div2.innerHTML = "";
		var GM_str3 =
			"<div class='col-md-12' id='GM_usersTa'> <table  style='table-layout:fixed;'class='table table-condensed' border='0'> <caption><div style='width:70%;float:left;'>其它后缀表</div><div style='width:30%;float:left;'><div style='width:80%;float:left;' ><input id='GM_disksSuffixAdd'class='form-control'  placeholder='后缀名增加'  whatever='other'></div><div style='width:20%;float:left;'><a class='btn btn-primary GM_userInput' data-toggle='modal' data-target='#GM_diskSuffixAdd' >增加 </a></div></div></caption> <tbody id='GM_usersTbody'></tbody></table></div>";
		GM_div2.innerHTML = GM_str3;
	}
}

function GM_ShowDisksSuffixTable(GM_data1) //加载网盘后缀表单
{
	var str1 = "";
	for(var i = 0; i < GM_data1.length - 1; i++) {
		if(i % 5 == 0)
			str1 = str1 + "<tr><td><div class='alert alert-info alert-dismissable'><button type='button' class='close' data-whatever='" + GM_data1[i]['type_name'] + ' ' + GM_data1[i]['group_name'] + "' data-toggle='modal' data-target='#GM_diskSuffixDelete'> &times; </button>" + GM_data1[i]['type_name'] + "</div></td>";
		else if((i + 1) % 5 == 0)
			str1 = str1 + "<td><div class='alert alert-info alert-dismissable'> <button type='button' class='close' data-whatever='" + GM_data1[i]['type_name'] + ' ' + GM_data1[i]['group_name'] + "' data-toggle='modal' data-target='#GM_diskSuffixDelete'> &times; </button>" + GM_data1[i]['type_name'] + "</div></td></tr>";
		else
			str1 = str1 + "<td><div class='alert alert-info alert-dismissable'><button type='button' class='close' data-whatever='" + GM_data1[i]['type_name'] + ' ' + GM_data1[i]['group_name'] + "' data-toggle='modal' data-target='#GM_diskSuffixDelete'> &times; </button>" + GM_data1[i]['type_name'] + "</div></td>";
	}
	if((GM_data1.length - 1) % 5 != 0)
		str1 = str1 + "</tr>";
	var GM_div1 = document.getElementById("GM_usersTbody");
	GM_div1.innerHTML = str1;
}

function GM_getDisksSuffixList(type, page, size, flag) //后缀分页ajax
{

	$("#GM_Show").show();
	$("#DeleteFile").hide();
	$.ajax({
		url: '/admin/sky_drive/get_suffix',
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
			console.log(data);
			if(flag == false) {
				GM_clearAddition();
				GM_showDisksSuffixFrame();
				GM_DisksSuffixSelect();
			}
			GM_DisksSuffixShow(type);
			GM_ShowDisksSuffixTable(data);
			if(flag == false)
				GM_ShowDisksSuffixPaging(type, Math.ceil(data[data.length - 1] / size), size, true);
		},
		error: function() {
			$('#GM_information').find('.modal-body').text('数据读入出错');
			document.getElementById('GM_informationBtn').click();
		}
	});
}

function GM_AddDisksSuffix() //增加后缀ajax
{

	var type = $('#GM_disksSuffixAdd').attr('whatever');
	var name = $('#GM_disksSuffixAdd').val();
	$.ajax({
		url: '/admin/sky_drive/add_suffix',
		type: 'post',
		async: false,
		data: {
			'type': type,
			'name': name
		},
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},
		success: function(data) {

			GM_getDisksSuffixList(type, 0, 25, false);
			$('#GM_information').find('.modal-body').text('增加成功');
			document.getElementById('GM_informationBtn').click();
		},
		error: function() {
			$('#GM_information').find('.modal-body').text('数据读入出错');
			document.getElementById('GM_informationBtn').click();
		}
	});
}

function GM_DeleteDisksSuffix() //删除后缀ajax
{
	var type = $('#GM_disksSuffixAdd').attr('whatever');
	var GM_name = $('#GM_diskSuffixDelete').attr('whatever').split(' ');
	var name = GM_name[0];
	$.ajax({
		url: '/admin/sky_drive/delete_suffix',
		type: 'post',
		async: false,
		data: {
			'type_name': name,
			'group_name': type
		},
		headers: {
			'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		},
		success: function(data) {
			GM_getDisksSuffixList(type, 0, 25, false);
			$('#GM_information').find('.modal-body').text('删除成功');
			document.getElementById('GM_informationBtn').click();
		},
		error: function() {
			$('#GM_information').find('.modal-body').text('数据读入出错');
			document.getElementById('GM_informationBtn').click();
		}
	});
}

function GM_ShowDisksSuffixPaging(type, sum, size, flag) //加载分页
{
	var GM_div1 = document.getElementById("show_paging");
	GM_div1.innerHTML = "";

	$('#show_paging').Paging({
		pagesize: size,
		count: sum * 10,
		toolbar: false,
		callback: function(page, size, count) {
			GM_getDisksSuffixList(type, page - 1, size, flag);
		}
	});
}