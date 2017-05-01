@extends('app')

@section('content')

    <link href="{{ asset('/css/GM.css') }}" rel="stylesheet" >
     <link href="{{ asset('/fancybox/jquery.fancybox.min.css') }}" rel="stylesheet" >

    <div class="col-md-2 sidebar" >
        <ul class="nav nav-tabs nav-pills nav-stacked">
            <li>
                <a href="#GM_people" class="nav-header collapsed" data-toggle="collapse"><span class="glyphicon glyphicon-paperclip"></span>&nbsp;&nbsp;人员管理<b class="caret"></b>
                </a>
                <ul id="GM_people" class="nav nav-list collapse secondmenu nav-pills nav-stacked" style='width:90%;float:right;' >
	
                </ul>
            </li>
        </ul>
        <ul class="nav nav-tabs nav-pills nav-stacked" style="display: none;">
            <li><a  href="#GM_homePage" class="nav-header collapsed" data-toggle="collapse"><span class="glyphicon glyphicon-home"></span>&nbsp;&nbsp;首页<b class="caret"></b></a>
                <ul id="GM_homePage" class="nav nav-list collapse secondmenu nav-pills nav-stacked" style='width:90%;float:right;'>
                </ul>
            </li>
        </ul>
        <ul class="nav nav-tabs nav-pills nav-stacked">
            <li><a href="#GM_onlineDisk" class="nav-header collapsed" data-toggle="collapse"><span class="glyphicon glyphicon-unchecked"></span>&nbsp;&nbsp;网盘<b class="caret"></b></a>
                <ul id="GM_onlineDisk" class="nav nav-list collapse secondmenu nav-pills nav-stacked" style='width:90%;float:right;'>

                </ul>
            </li>
        </ul>
        <div id="other">
            <div id='GM_information' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel' aria-hidden='true'><div class='modal-dialog modal-sm'> <div class='modal-content'> <div class='modal-header'><button type='button' class='close'data-dismiss='modal' aria-hidden='true'> &times;</button> <h4 class='modal-title' >消息</h4> </div><div class='modal-body'> <p></p> </div>  <div class='modal-footer'><div class='col-md-12'><button type='button' class='btn btn-default'data-dismiss='modal'>关闭</button></div> </div> </div> </div>
            </div>
            <div ><a id='GM_informationBtn' style="visibility: hidden" data-toggle='modal' data-target='#GM_information' ></a></div>
        </div>
    </div>
	
	<div id="GM_Show" class="col-md-8">
		<!--<div class="box">
			<span>单击文本框全选文字：</span><br>
				<div class="content">
					<input type="text" value="单击即可全选文字" aria-selected="true">
				</div>
		</div>-->
	</div>
	<div id='GM_addition' class='col-md-2' style='display: none;' >
		
	</div>
	<div id="DeleteFile" class="col-md-10" style="display: block;">
		
	</div>

    <!--{{--<div id="GM_Show" class="col-md-8">--}}
        {{--<div class="box">--}}
            {{--<span>单击文本框全选文字：</span><br>--}}
            {{--<div class="content">--}}
                {{--<input type="text" value="单击即可全选文字" aria-selected="true">--}}
            {{--</div>--}}
        {{--</div>--}}
    {{--</div>--}}-->
    <div id='GM_addition' class='col-md-2'  >
	</div>
    
<script src="{{asset('/fancybox/jquery.fancybox.min.js')}}" type="text/javascript"></script>
<script src="{{asset('/js/GM.js')}}" type="text/javascript"></script>
    <script>
        $(document).ready(function(){
        	/*
        	 * 点击删除按钮下面的具体哪类文件按钮
        	 */
        	$(document).on("click",".deleteBtn",function(){
        		var fileId=$(this).attr("data-id");
        		var a=new Array();
        		a.push(fileId);
				$.ajax({
	                url:'sky_drive/delete_files',
	                type:'post',
	                headers:{
	                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
	                },data:{
	                	ids:a
	                },
	                success:function(data){
	                	console.log(data);
	                	if(data==true){
	        	        	myAlert("删除成功！");
							$(".errorBtnSure").attr("Isreload","true");
	                	}else{
	                		myAlert("删除失败！");
							$(".errorBtnSure").attr("Isreload","true");
	                	}
	                },
	                error:function(){
	                    alert("数据读入出错");
	                }
	            });
        	});
			function showLoading(){
				$("#DeleteFile").empty();
				var str='<div class="csshub-loader"><span></span><span></span><span></span></div>';
				$("#DeleteFile").append(str);
			}
			
        	function hideShowDiv(){
        		$("#DeleteFile").hide();
        		$("#GM_addition").show();
        	}
        	function ShowPiCList(data){
        		$("#GM_Show").hide();
        		$("#DeleteFile").empty();
            	
            	var str="",imgurl;
            	for(var i=0;i<data.length;i++){
            		imgurl=data[i].address+"/"+data[i].md5+"."+data[i].type;
            		str+='<div class="show-pic">';
            		str+='<div class="imgbox"><span data-id="'+data[i].id+'" class="deleteBtn glyphicon glyphicon-remove" ></span><img src="'+imgurl+'" alt="" /></div>';
					str+='<a href="'+imgurl+'" class="imgbox" data-fancybox="group">';

					str+='<img src="'+imgurl+'" alt="" />';
					str+="</a></div>";
            	}
            	$("#DeleteFile").append(str);
        	}
        	function GetFileList(fileType,fileSize,fileLastId){
        		$("#DeleteFile").show();
        		$("#GM_addition").hide();
        		showLoading();
        		var toData={}
        		if(fileType!=null||fileType!=""){
        			toData.type=fileType;
        		}
        		if(fileSize!=null||fileSize!=""){
        			toData.size=fileSize;
        		}
        		if(fileLastId!=null||fileLastId!=""){
        			toData.last_id=fileLastId;
        		}
	        	$.ajax({
	                url:'sky_drive/get_different_files',
	                type:'get',
	                headers:{
	                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
	                },data:toData,
	                success:function(data){
	                	console.log(data);
	                	if(fileType=="picture"){
	                		ShowPiCList(data);
	                	}
	                },
	                error:function(){
	                    alert("数据读入出错");
	                }
	            });
        	}
        	$(document).on("click","a",function(){
        		var Atext=$(this).text().trim();
        		console.log(Atext+" "+Atext.length)
        		if(Atext==""){
        			return ;
        		}
        		if(Atext.indexOf("图片")>=0){
        			GetFileList("picture");
        		}else if(Atext.indexOf("种子")>=0){
        			GetFileList("bt");
        		}else{
        			hideShowDiv();
        		}
        	})		
        	/*
        	 * 获取按钮信息
        	 */
            $.ajax({
                url:'/admin/sky_drive/button_information',
                type:'post',
                async:false,
                headers:{
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                },
                success:function(data){
                	console.log(data);
                    for(var i=0;i<data.length;i++)
                    {
                        if(data[i]['permission_name']=='recycle') {
                            addGM_Recycle();
                        }
                        if(data[i]['permission_name']=='peoplev1') {
                            addGM_peoplev1();
                        }
                        if(data[i]['permission_name']=='peoplev2')
                            addGM_peoplev2();
                        if(data[i]['permission_name']=='homePagev1')
                            addGM_homePagev1();
                        if(data[i]['permission_name']=='homePagev2')
                            addGM_homePagev2();
                        if(data[i]['permission_name']=='homePagev3')
                            addGM_homePagev3();
                        if(data[i]['permission_name']=='homePagev4')
                            addGM_homePagev4();
                        if(data[i]['permission_name']=='suffix')
                            addGM_suffix();
                        if(data[i]['permission_name']=='delete')
                            addGM_delete();
                    }
                },
                error:function(){
                    alert("数据读入出错");
                }
            });
        });
    </script>
@endsection