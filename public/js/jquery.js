﻿$(document).ready(function () {
    $("#mytab a").click(function(e){
        e.preventDefault();
        $(this).tab("show");
    });
    $("#caretHoverEvent ").hover(function(e){
        e.preventDefault();
        $(this).tab("show");
    });
    $("#LeftPicture").click(function(){
        $("#LeftPicture").css({"background-color":"gray"});
        $("#RightPicture").css({"background-color":"inherit"});
    });
    $("#RightPicture").click(function(){
        $("#LeftPicture").css({"background-color":"inherit"});
        $("#RightPicture").css({"background-color":"gray"});
    });
    $("#FileButtongShangChuang").click(function(){

    });

    //复选框事件和样式
    $("#FatherOfcheckbox").addClass("checkbox");

    //$("#FatherOfcheckbox").change(function(){
    //    //if($("#FatherOfcheckbox").prop("checked")){
    //    // alert("Y H C I");
    //    //}
    //    //else{
    //    //    alert("我没被选中");
    //    //}
    //    $("#ContentIntwoInTwoDiv").find(':checkbox[id!=FatherOfcheckbox]').each(function(){
    //        $("input[id=FatherOfcheckbox]").prop("checked", this.checked);
    //    });
    //
    //});
    $("#FatherOfcheckbox").click(function() {
        $("input[name='checkboxOfFile']").prop("checked", this.checked);
        $("#ContentIntwoInTwoDiv").find(':checkbox[id!=FatherOfcheckbox]').each(function(){
            var flag=0;
            if($(this).prop("checked")){
                $(this).parent().parent().parent().children().addClass('bcOfListWhileHover');
                flag=1;
            }
            else{
                $(this).parent().parent().parent().children().removeClass('bcOfListWhileHover');
            }
            if(flag==1){
                $("#IsChooseFile").show();
            }else{
                $("#IsChooseFile").hide();
            }
        });
    });
    //
    //$("input[name='checkboxOfFile']").click(function() {
    //    alert(2312);
    //    var $subs = $("input[name='checkboxOfFile']");
    //    $("#FatherOfcheckbox").prop("checked" , $subs.length == $subs.filter(":checked").length ? true :false);
    //});


    //新建文件夹按钮事件


    $("#createNewFile").click(function(){
        if(IsCreateFileNow)return ;
        IsCreateFileNow=true;
        var F="<div id='div1' class='row' style='margin: 5px;' style='background-color: #0000C2;' >";

        F+="<div  class='col-md-7'>";
        F+="<td><input  style='height:20px;width:20px; float: left;' type='checkbox'>";
        F+="<a > <span class='glyphicon glyphicon-folder-open' style='float:left;margin: 5px;color:gray;'></span>" ;
        F+="<a id='Filename' style='display: none;' href='#'  >文件名</a></a>";
        F+="<input type='text' id='text1' value='新建文件夹'><button onclick='SureButtonFunction();' id='createFileSure'>确定</button><button onclick='createFileQuXiao();' id='createFileFlase'>取消</button>";
        F+="</td> </div>";
        F+="<div class='col-md-3'>";
        F+="<td><p style='float:left;'>-</p></td>"
        F+="</div>";

        F+="<div class='col-md-2'>";
        F+="<td><p id='TimeOfCreateFile' style='float:left;'>data</p></td>";
        F+="</div>";
        F+="</div>";
        $("#xiangangID").prepend(F);
    });

});
//当复选框选中的时候判断纵选中的要不要选中和可以该行添加背景颜色
$(document).on('click','input[name="checkboxOfFile"]',function(){
    var $subs = $("input[name='checkboxOfFile']");
    $("#FatherOfcheckbox").prop("checked" , $subs.length == $subs.filter(":checked").length ? true :false);
    if($subs.filter(":checked").length>=1){
        $("#IsChooseFile").show();
    }
    else{
        $("#IsChooseFile").hide();
    }
    if($(this).prop("checked")){
        $(this).parent().parent().parent().children().addClass('bcOfListWhileHover');
    }
    else{
        $(this).parent().parent().parent().children().removeClass('bcOfListWhileHover');
    }
})
//$(document).on('click','input[name="checkboxOfFile"]',function(){
//	 if($(this).attr("ischecked")=="false"){
//	 	$(this).attr("ischecked","true")
//	 }else{
//	 	$(this).attr("ischecked","false")
//	 }
//	alert(11)
//})
////当鼠标移动其他文件夹的时候 也同样添加背景颜色
//$(document).on('mouseout','.FileShowLine',function(){
//  $(this).find("DIV #toggletuBiao").hide();
//  var T=$(this);
//  $("#ContentIntwoInTwoDiv").find(':checkbox[id!=FatherOfcheckbox]').each(function(){
//      if($(this).prop("checked")){
//          T.children().addClass('bcOfListWhileHover');
//      }
//      else{
//          T.children().removeClass('bcOfListWhileHover');
//      }
//  });
//
//})
//给列表绑定悬浮事件
$(document).on('mouseover','.FileShowLine',function(){
    $(this).children().addClass('bcOfListWhileHover');
    $(this).find("DIV #toggletuBiao").show();
}).on("mouseout",'.FileShowLine',function(){
    $(this).find("DIV #toggletuBiao").hide();
    if($(this).find("input").is(":checked")==false){
    	alert(11)
    	$(this).children().removeClass('bcOfListWhileHover');
    }

})

//返回上个目录
function BackTheBeforeFile(str){

    refresh(str,'catalog');
    $("#TitleDiv").remove();
    SetTileOfEntry(str);
}

//设置进入的标题目录
function SetTileOfEntry(str){
    var addr=str.split("/");
    var strCopy=addr[0];
    var strCopy2=addr[0];
    for(var i=1;i<addr.length-1;i++){
        strCopy2+="/";
        strCopy2+=addr[i];
    }
    $("#TitleDiv").remove();
    var F="<div id='TitleDiv'>";
    if(addr.length==1){
        F+="<strong>全部文件</strong>";
    }else{
        F+="<a href='#' onclick='javascript:BackTheBeforeFile(\""+strCopy2+"\")'>"+"返回上一级"+"</a>";
        F+=" | ";
        F+="<a href='#' onclick='javascript:BackTheBeforeFile(\""+strCopy+"\")'>"+"全部文件"+"</a>";
    }



    for(var i=1;i<addr.length;i++)
    {
        strCopy+="/";
        strCopy+=addr[i];
        F+=" > ";
        if(i==addr.length-1){
            F+="<strong>"+addr[i]+"</strong>";
        }
        else{
            F+="<a href='#' onclick='javascript:BackTheBeforeFile(\""+strCopy+"\")'>"+addr[i]+"</a>";

        }
    }
    F+="</div>";
    $("#MeuOfHeader").append(F);
}

//获取当前的目录
function GetFileName(){
    var catalog;
    $.ajax({
        url:'/sky_drive/return_session_catalog',
        type:'post',
        async:false,
        headers:{
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
        },
        success:function(data){
            catalog=data;
        },
        error:function(){
            alert('11数据读取发生错误！');
        }
    });
    return catalog;
}

//点击文件夹
function EntryNextFile (str){
    //alert("我们都爱笑"+str);
    var catalog=GetFileName();
    catalog+="/"+str;

    refresh(catalog,'catalog');
    SetTileOfEntry(catalog);
}

//点击文件,图片
function showTheFile(index){
    cntNowP=index;
    $("#navOFAllDIvHead").hide();
    $(".TwoDivInYunpan").hide();
    var F="";
    F+="<img id='NowPicture' src='"+listOfPicture[index]+"'>";
    //alert(F);
    $("#LookPicture i").after(F);
    ShowThePicture();
}
//点击音乐
function showTheFileMusic(index){

    cntNowM=index;//表示点击该目录下的第几个音乐

    UploadMusicList();
    //var F="";
    //F+="<div id='KJmusic' style='position:fixed;margin-left:180px;overflow: hidden;z-index:10;bottom: 0px;'>";
    //F+="<div class='music-player'>";
    //F+="<button id='btn3' style='margin: 0px;padding:0px;rihgt:330px;' >隐藏</button>";
    //F+="<button id='btn' style='margin: 0px;padding:0px;rihgt:330px;' >缩小</button>";
    //F+="<button id='btn2' style='margin: 0px;padding:0px;rihgt:330px;' >还原</button>";
    //F+="<button id='btn4' style='float:right;'>显示</button>";
    //F+="<button id='btn5' style='float:right;'>关闭</button>";
    //F+="<div class='info'>";
    //F+="<div class='left'>";
    //F+="<a href='javascript:;' class='icon-shuffle'></a>";
    //F+="<a href='javascript:;' class='icon-heart'></a>";
    //F+="</div>";
    //F+="<div class='center'>";
    //F+="<div class='jp-playlist'>";
    //F+="<ul>";
    //F+="<li></li>";
    //F+="</ul>";
    //F+="</div>";
    //F+="</div>";
    //F+="<div class='right'>";
    //F+="<a href='javascript:;' class='icon-repeat'></a>";
    //F+="<a href='javascript:;' class='icon-share'></a>";
    //F+="</div>";
    //F+="<div class='progress jp-seek-bar'>";
    //F+="<span class='jp-play-bar' ></span>";
    //F+="</div>";
    //F+="<div class='controls'>";
    //F+="<div class='current jp-current-time'>00:00</div>";
    //F+="<div class='play-controls'>";
    //F+="<a href='javascript:;' class='icon-previous jp-previous' title='previous'></a>";
    //F+="<a href='javascript:;' class='icon-play jp-play' title='play'></a>";
    //F+="<a href='javascript:;' class='icon-pause jp-pause' title='pause'></a>";
    //F+="<a href='javascript:;' class='icon-next jp-next' title='next'></a>";
    //F+="</div>";
    //F+="<div class='volume-level jp-volume-bar'>";
    //F+="<span class='jp-volume-bar-value' style='width: 0%'></span>";
    //F+="<a href='javascript:;' class='icon-volume-up jp-volume-max' title='max volume'></a>";
    //F+="<a href='javascript:;' class='icon-volume-down jp-mute' title='mute'></a>";
    //F+="</div>";
    //F+="</div>";
    //F+="<div id='jquery_jplayer' class='jp-jplayer'></div>";
    //F+="</div>";
    //F+="</div>";
    //console.log(F);
    //$("#xiangangID").prepend(F);
    $("#KJmusic").show();
}
function UploadMusicList(){
    //alert(cntInMusic);
    var playlist=new Array(cntInMusic+1);
    for(var i=0;i<cntInMusic;i++){
        playlist[i]={
            title:"KJBU2",
            artist:"KJ",
            mp3:listOfMusic[i],
            poster:"img/1.jpg"

        }
    }


    var cssSelector = {
        jPlayer: "#jquery_jplayer",
        cssSelectorAncestor: ".music-player"
    };

    var options = {
        swfPath: "Jplayer.swf",
        supplied: "ogv, m4v, oga, mp3"
    };

    var myPlaylist = new jPlayerPlaylist(cssSelector, playlist, options);
}

function SureButtonFunction(){
    //alert($("#text1").attr("value"));
    var cur_catalog_name=document.getElementById("text1").value;
    //alert(cur_catalog_name);
    if(cur_catalog_name==null && cur_catalog_name==""){
        alert("请重新输入");
    }else{
        $.ajax({
            url:'/sky_drive/set_up_catalog',
            type:'post',
            async:false,
            data:{
                'cur_catalog_name':cur_catalog_name
            },
            headers:{
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            },
            success:function(data){
                if(data=='ok'){
                    IsCreateFileNow=false;
                    alert('创建成功！');
                    $("#Filename").text(cur_catalog_name);
                    $("#Filename").show();
                    $("#text1").hide();
                    $("#createFileSure").hide();
                    $("#createFileFlase").hide();
                    $("#TimeOfCreateFile").text(getNowTime());
                    remove_data('div1');
                    refresh('','catalog');
                }
                else if(data=='duplication of name'){
                    alert('创建失败！此文件名和本目录下文件名重复！');
                }
                else{
                    alert('因为未知原因创建失败！');
                }
            },
            error:function(){
                alert('创建失败！');
            }
        });




    }

}

function createFileQuXiao(){
    IsCreateFileNow=false;
    $("#div1").remove();
}

//点击视频
function showTheFileVideo(str){
    //alert(str);
    //for(var i=0;i<cntInVideo;i++){
    //    alert(listOfVideo[i]);
    //}
    var strnum=str.split(".");

    $("#SRCOFvideo").val(listOfVideo[strnum[1]]);
    $("#IDOFvideo").val(strnum[0]);
    $("#FromOfVideo").submit();
}

function getNowTime(){
    var curDate = new Date();
    var curYear=curDate.getFullYear();
    var curMonth = curDate.getMonth()+1;  //获取当前月份(0-11,0代表1月)
    var curDay = curDate.getDate();       //获取当前日(1-31)
    var curHour = curDate.getHours();      //获取当前小时数(0-23)
    var curMinute = curDate.getMinutes();   // 获取当前分钟数(0-59)
    var curSecond = curDate.getSeconds();
    return curYear+"-"+curMonth+"-"+curDay+"  "+curHour+":"+curMinute+":"+curSecond;
}

function refresh(father_catalog_name,type){

    remove_data('show_paging');
    if(type=='catalog'){
        show_catalog(father_catalog_name,type,0,10,0);
    }
    else if(type=='garbage'){
        show_garbage(type,0,10,0);
    }
    else{
        show_type(type,0,10,0);
    }
}

//设置每个文件的图标
function GetTuBiaoLogo(str){
    switch (str){
        case "text":
            str="<img style='height:20px;width:20px;margin:8px 5px;' src='/img/txtlogo.jpg'>";
            break;
        case "picture":
            str="<img style='height:20px;width:20px;margin:8px 5px;' src='/img/pictureLogo.jpg'>";
            break;
        case "music":
            str="<img style='height:20px;width:20px;margin:8px 5px;' src='/img/musicLogo.jpg'>";
            break;
        case "bt":
            str="<img style='height:20px;width:20px;margin:8px 5px;' src='/img/btLogo.jpg'>";
            break;
        case "video":
            str="<img style='height:20px;width:20px;margin:8px 5px;' src='/img/videoLogo.jpg'>";
            break;
        case "archive":
            str="<img style='height:20px;width:20px;margin:8px 5px;' src='/img/archiveLogo.jpg'>";
            break;
        default :
            str="<img style='height:20px;width:20px;margin:8px 5px;' src='/img/otherLogo.jpg'>";
            break;

    }
    return str;
}
//点击移动文件夹按钮
$(document).on('click','#removeButton',function(){
    MoveTheFile();
})
//点击重命名按钮
$(document).on('click','#renameButton',function(){

    $(this).parent().parent().siblings("#Filename").hide();
    var ss=$(this).parent().parent().siblings("#Filename").text();
    var ss2=ss.substring(ss.lastIndexOf('.'),ss.length);
    $(this).parent().parent().siblings("#Filerename").show();
    $(this).parent().parent().siblings("#Filerename").children("input").select();
    //alert($(this).parent().parent().siblings("#Filerename").children("input").attr('type'));
})
//确定重命名
$(document).on('click','#renameFileSure',function(){
    var choose=$(this).parent().parent().attr('id');
    var GetId=$(this).parent().siblings("input").attr('id');
    //原先的名字
    var NameFirst=$(this).parent().siblings("#Filename").text();
    //原先名字的前缀
    var NameFirstMEIHOUZHUI=NameFirst.substring(0,NameFirst.lastIndexOf('.'));

    //原先名字的后缀
    var HouZhuiFileName=NameFirst.substring(NameFirst.lastIndexOf('.'),NameFirst.length);

    //修改之后的名字
    var NameNow=$(this).siblings("input").val();

    if(choose==0){//修改的是文件夹的名字

    }else{//其他情况
        NameNow+=HouZhuiFileName;
    }
    if(NameFirst==NameNow){
        $(this).parent().hide();
        $(this).parent().siblings("#Filename").text(NameNow);
        $(this).parent().siblings("#Filename").show();
    }else{
        var resultOfrename="";
        alert(NameNow);
        $.ajax({
            url:'/sky_drive/rename',
            type:'post',
            async:false,
            data:{
                'id':GetId,
                'rename':NameNow
            },
            headers:{
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            },
            success:function(data){
                resultOfrename=data;
            },
            error:function(){
                alert('命名失败！');
            }
        });
        alert(resultOfrename);
        if(resultOfrename=="ok"){
            $(this).parent().hide();
            $(this).parent().siblings("#Filename").text(NameNow);
            $(this).parent().siblings("#Filename").show();
        }
        else{
            alert("当前目录下已经有相同的目录请重新命名");
        }
    }



})
//对文件重命名取消renameFileFlase
$(document).on('click','#renameFileFlase',function(){
    $(this).parent().siblings("#Filename").show();
    $(this).parent().hide();
    var NameFirst=$(this).parent().siblings("#Filename").text();
    var HouZhuiFileName=NameFirst.substring(0,NameFirst.lastIndexOf('.'));
    $(this).siblings("input").val(HouZhuiFileName);
})

//当点击这一行的时候被选中
$(document).on('mousevoer','.FileShowLine',function(){
    $(this).children().children("input").prop("checked");
})


//上传文件之后显示数据
function show_data(data){

    $("#div1").remove();
    //将图片的地址整合成一个数组
    cntInPicture=0;
    for(var i=0;i<data.length-1;i++)
    {
        if(data[i]['md5']!=null) {
            var strOfLogoTypeGet=data[i]['address'].split("/");//获得后缀，判断文件类型
            if (strOfLogoTypeGet[strOfLogoTypeGet.length-1] == "picture") {
                listOfPicture[cntInPicture] = data[i]['address'];
                listOfPicture[cntInPicture] += "/";
                listOfPicture[cntInPicture] += data[i]['md5'];
                listOfPicture[cntInPicture++] += data[i]['cur_catalog_name'].substring(data[i]['cur_catalog_name'].lastIndexOf('.'), data[i]['cur_catalog_name'].length);
            }
        }
    }
    //将音乐的地址整合成一个数组
    cntInMusic=0;
    for(var i=0;i<data.length-1;i++)
    {
        if(data[i]['md5']!=null) {
            var strOfLogoTypeGet=data[i]['address'].split("/");//获得后缀，判断文件类型
            if (strOfLogoTypeGet[strOfLogoTypeGet.length-1] == "music") {
                listOfMusic[cntInMusic] = data[i]['address'];
                listOfMusic[cntInMusic] += "/";
                listOfMusic[cntInMusic] += data[i]['md5'];
                listOfMusic[cntInMusic++] += data[i]['cur_catalog_name'].substring(data[i]['cur_catalog_name'].lastIndexOf('.'), data[i]['cur_catalog_name'].length);
            }
        }
    }
    //将视频的地址整合成一个数组
    cntInVideo=0;
    for(var i=0;i<data.length-1;i++)
    {
        if(data[i]['md5']!=null) {
            var strOfLogoTypeGet=data[i]['address'].split("/");//获得后缀，判断文件类型
            if (strOfLogoTypeGet[strOfLogoTypeGet.length-1] == "video") {
                listOfVideo[cntInVideo] = data[i]['address'];
                listOfVideo[cntInVideo] += "/";
                listOfVideo[cntInVideo] += data[i]['md5'];
                listOfVideo[cntInVideo++] += data[i]['cur_catalog_name'].substring(data[i]['cur_catalog_name'].lastIndexOf('.'), data[i]['cur_catalog_name'].length);
            }
        }
    }
    var F="<div id='catalog' >";
    var strOfLogoType="";
    var cntInwhichp=0;//记录是第几张图片
    var cntInwhichm=0;//记录是第几个音乐
    var cntInwhichv=0;//记录是第几个视频
    cntInFileAddress=0;
    cntInFileName=0;
    cntInFileID=0;
    for(var i=0;i<data.length-1;i++){
        DownloadFileAddress[cntInFileAddress++]=data[i]['address']+"/"+data[i]['md5']+data[i]['cur_catalog_name'].substring(data[i]['cur_catalog_name'].lastIndexOf('.'), data[i]['cur_catalog_name'].length);
        DownloadFileName[cntInFileName++]=data[i]['cur_catalog_name'];
        DownloadFileID[cntInFileID++]=data[i]['id'];
        strOfLogoType=data[i]['address'];

        F+="<div class='FileShowLine' class='row' style='margin:0px;padding:0px; '   >";
        if(data[i]['address']==null){
            F+="<div id='0' class='col-md-7'>";
        }else{
            F+="<div id='1' class='col-md-7'>";
        }
//      F+="<td><input  style='height:20px;width:20px; margin:8px;float: left;'  type='checkbox' >";
		F+="<td><label class='mdui-checkbox' style='height:20px;width:20px; float: left;'><input id="+data[i]['id']+" type='checkbox' name='checkboxOfFile' value="+i+" /><i class='mdui-checkbox-icon'></i></label>"
        //设置文件图标
        if(data[i]['address']==null){
            F+=" <span  class='glyphicon glyphicon-folder-open' style='height:20px;width:20px;margin:8px 5px;color: gray;'></span>";
        }else{
            var strOfLogoTypeGet=strOfLogoType.split("/");//获得后缀，判断文件类型
            F+=GetTuBiaoLogo(strOfLogoTypeGet[strOfLogoTypeGet.length-1]);
        }
        //设置文件的点击事件类型
        if(data[i]['md5']!=null) {
            var strOfLogoTypeGet=strOfLogoType.split("/");//获得后缀，判断文件类型
            if (strOfLogoTypeGet[strOfLogoTypeGet.length-1] == "picture") {
                F += "<a id='Filename' href='JavaScript:;' onclick='showTheFile(\"" +cntInwhichp  + "\");' style='padding-bottom: 5px;'>" + data[i]['cur_catalog_name'] + "</a>";
                cntInwhichp++;
            }
            else if(strOfLogoTypeGet[strOfLogoTypeGet.length-1] == "music"){
                F += "<a id='Filename' href='JavaScript:;' onclick='showTheFileMusic(\"" +cntInwhichm  + "\");' style='padding-bottom: 5px;'>" + data[i]['cur_catalog_name'] + "</a>";
                cntInwhichm++;
            }else if(strOfLogoTypeGet[strOfLogoTypeGet.length-1] == "video"){
                F += "<a id='Filename' href='JavaScript:;' onclick='showTheFileVideo(\"" +data[i]['id']+"."+cntInwhichv  + "\");' style='padding-bottom: 5px;'>" + data[i]['cur_catalog_name'] + "</a>";
                cntInwhichv++;
            }
            else{
                F += "<a id='Filename' href='JavaScript:;'  style='padding-bottom: 5px;'>" + data[i]['cur_catalog_name'] + "</a>";
            }
        }
        else {
            F += "<a id='Filename' href='JavaScript:;' onclick='javascript:EntryNextFile(\"" + data[i]['cur_catalog_name'] + "\");'>" + data[i]['cur_catalog_name']+ "</a></a>";
        }
        var NoQianZhuiName=data[i]['cur_catalog_name'];
        var NoQianZhuiName2=NoQianZhuiName.substring(0,NoQianZhuiName.lastIndexOf('.'));
        if(data[i]['md5']!=null){
            F+="<a id='Filerename' style='display:none;'><input type='text'  value='"+NoQianZhuiName2+"'><button  id='renameFileSure'>确定</button><button  id='renameFileFlase'>取消</button></a>";

        }
        else{
            F+="<a id='Filerename' style='display:none;'><input type='text'  value='"+NoQianZhuiName+"'><button  id='renameFileSure'>确定</button><button  id='renameFileFlase'>取消</button></a>";

        }

        F+="<div id='toggletuBiao' class='dropdown' style='float:right;display: none;' > " ;
        F+="<a  role='button'data-toggle='dropdown' data-target='#'  ><span class='glyphicon glyphicon-triangle-bottom'style='margin-top:8px;'><span></a>"
        F+="<ul class='dropdown-menu' role='menu' aria-labelledby='dLabel' style='left:-50px;width:100px;' onmouseout='$(this).dropdown('toggle');'>";
        F+="<li id='removeButton' style='text-align: center;cursor: pointer;'><a>移动</a></a></li>";
        F+="<li role='presentation' class='divider'></li>";
        F+="<li id='renameButton'  style='text-align: center;cursor: pointer;' ><a>重命名</a></li>";
        F+="</ul>";
        F+="</div>"
        F+="</td> </div>";
        F+="<div class='col-md-3'>";
        F+="<td><p style='float:left;line-height:36px;'>"+data[i]['size']+"</p></td>";
        F+="</div>";

        F+="<div class='col-md-2'>";
        F+="<td><p id='TimeOfCreateFile' style='float:left;line-height:36px;'>"+data[i]['created_at']+"</p></td>";
        F+="</div>";

        F+="</div>";
        F+="<div  class='mdui-divider-inset'></div>"

    }
    if(data.length==0){
        F+="<h4>尚无此类文件或文件夹!</h4>";
    }
    F+="</div>";
    $("#xiangangID").prepend(F);

}

function mouseOnDIv(){

}

//整个移除显示
function remove_data(id){
    $("#"+id).remove();
}

//侧边菜单分类显示
function show_type(type,page,size,flag){
    $.ajax({
        url:'/sky_drive/type',
        type:'post',
        async:false,
        data:{
            'type':type,
            'skip':page*size,
            'size':size
        },
        headers:{
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
        },
        success:function(data){
            remove_data('catalog');
            show_data(data);
            if(flag==0){
                show_paging(Math.ceil(data[data.length-1]/size),type,size,1);
            }
        },
        error:function(){
            alert('数据读取发生错误！');
        }
    });
}
//获得哪些选中
function delete_and_restore_getdate(flag){
    var cnt=0;
    $("#ContentIntwoInTwoDiv").find(':checkbox[id!=FatherOfcheckbox]').each(function(){
        if($(this).prop("checked")){
            var str=$(this).attr("id");
            cnt++;
        }
    });
    var list = new Array(cnt);
    cnt=0;
    $("#ContentIntwoInTwoDiv").find(':checkbox[id!=FatherOfcheckbox]').each(function(){
        if($(this).prop("checked")){
            var str=$(this).attr("id");
            list[cnt++]=str;
        }
    });

    delete_and_restore(list,flag);
}

//设置文件为已在回收站
function delete_and_restore(list,flag){

    var date;
    if(flag==0) date=getNowTime();
    else date="0000-00-00 00:00:00";

    $.ajax({
        url:'/sky_drive/delete_and_restore',
        type:'post',
        async:false,
        data:{
            'list':list,
            'date':date
        },
        headers:{
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
        },
        success:function(data){
            if(flag==0) alert("删除成功！");
            else alert("还原成功！");
            refresh('','catalog');
        },
        error:function(){
            if(flag==0) alert("删除失败！");
            else alert("还原失败！");
        }
    });
}

function show_garbage(type,page,size,flag){
    $.ajax({
        url:'/sky_drive/get_garbage',
        type:'post',
        async:false,
        data:{
            'type':type,
            'skip':page*size,
            'size':size
        },
        headers:{
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
        },
        success:function(data){
            remove_data('catalog');
            show_data(data);
            if(flag==0){
                show_paging(Math.ceil(data[data.length-1]/size),type,size,1);
            }
        },
        error:function(){
            alert("数据读取错误！");
        }
    });
}

function show_catalog(father_catalog_name,type,page,size,flag){
    $.ajax({
        url:'/sky_drive/refresh',
        type:'post',
        async:false,
        //dataType : 'json',
        data:{
            'father_catalog_name':father_catalog_name,
            'skip':page*size,
            'size':size
        },
        headers:{
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
        },
        success:function(data){
            remove_data('catalog');
            show_data(data);
            if(flag==0){
                show_paging(Math.ceil(data[data.length-1]/size),type,size,1);
            }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
            alert('数据读取发生错误！');
        }
    });
}

function show_paging(sum,type,size,flag){

    var F="<div id=show_paging></div>";
    $("#ContentIntwoInTwoDiv").after(F);

    $('#show_paging').Paging({ pagesize:size,count:sum*10,toolbar:false, callback:function(page,size,count){
        if(type=='catalog'){
            show_catalog('',type,page-1,size,flag);
        }
        else if(type=='garbage'){
            show_garbage(type,page-1,size,flag);
        }
        else{
            show_type(type,page-1,size,flag);
        }
    }});
}


//获得移动文件夹的根目录
function GetFatherUnder_catalog(str){
    $.ajax({
        url:'/sky_drive/get_move_catalog',
        type:'post',
        async:false,
        data:{
            'id':str
        },
        headers:{
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
        },
        success:function(data){
            if(data==-1){
                catalogOfSonFcnt=0;
            }else{
                catalogOfSonFcnt=0;
                for(var i=0;i<data.length;i++){
                    if(data[i]['size']==-1){
                    catalogOfSonFId[catalogOfSonFcnt]=data[i]['id'];
                    catalogOfSonF[catalogOfSonFcnt++]=data[i]['cur_catalog_name'];}
                }
            }

        },
        error:function(){
                alert("提取子目录发生错误");
        }
    });
}

//移动文件夹，传选中ID和移动哪个目录下面
    function MoveFileOfYidongwenjianjia(){
    $.ajax({
        url:'/sky_drive/move_catalog',
        type:'post',
        async:false,
        data:{
            'move_id':numOfMoveFile,
            'be_moved_id':SureMoveId
        },
        headers:{
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
        },
        success:function(){
            alert('移动文件夹成功了');

        },
        error:function(){
            alert("移动文件夹错误");
        }
    });
}