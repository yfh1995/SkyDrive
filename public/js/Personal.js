

$("#mytab2").click(function(e){
    e.prventDefault();
    $(this).tab("show");

});

function jujiao1(){
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
function bujujiao1(){
//            if($("#now").val()==""){
//                $("#firstofpassword").addClass('font-colorOfTixing');
//            }
//            else{
//                $("#firstofpassword").hide();
//            }
    $("#firstofpassword").hide();

    var lengthofnowpassword=$("#now").val().length;
    if(lengthofnowpassword>0)
    {
        $("#firstofpassword4").show();

        $("#firstofpassword2").hide();
        $("#firstofpassword3").hide();
    }
    else if(lengthofnowpassword==0)
    {
        $("#firstofpassword2").show();

        $("#firstofpassword3").hide();
        $("#firstofpassword4").hide();
    }

}
function jujiao2(){
//            alert(111);
    $("#secondofpassword").show();
    $("#secondofpassword2").hide();
    $("#secondofpassword3").hide();
    $("#secondofpassword4").hide();
    $("#secondofpassword5").hide();

}
function bujujiao2(){
    $("#secondofpassword").hide();

    var lengthOftext=$("#new").val().length;
    if(lengthOftext>=6&&lengthOftext<=16)
    {
        $("#secondofpassword3").show();

        $("#secondofpassword2").hide();
        $("#secondofpassword4").hide();
        $("#secondofpassword5").hide();
    }
    else if(lengthOftext<6&&lengthOftext>0)
    {
        $("#secondofpassword4").show();

        $("#secondofpassword2").hide();
        $("#secondofpassword3").hide();
        $("#secondofpassword5").hide();
    }
    else if(lengthOftext>16)
    {
        $("#secondofpassword5").show();

        $("#secondofpassword2").hide();
        $("#secondofpassword3").hide();
        $("#secondofpassword4").hide();
    }
    else if(lengthOftext==0){
        $("#secondofpassword2").show();

        $("#secondofpassword3").hide();
        $("#secondofpasswor4").hide();
        $("#secondofpassword5").hide();

    }





}
function jujiao3(){
//            alert(111);
    $("#thirdofpassword").show();
    $("#thirdofpassword2").hide();
    $("#thirdofpassword3").hide();
    $("#thirdofpassword4").hide();
    $("#thirdofpassword5").hide();
    $("#thirdofpassword6").hide();
}
function bujujiao3(){
//            alert(111);
    $("#thirdofpassword").hide();

    var lengthofpassword=$("#sure").val().length;
    if(lengthofpassword>0&&lengthofpassword<6)
    {
        $("#htirdofpassword3").show();

        $("#thirdofpassword2").hide();
        $("#thirdofpassword4").hide();
        $("#thirdofpassword5").hide();
        $("#thirdofpassword6").hide();
    }
    else if(lengthofpassword>=6&&lengthofpassword<=16)
    {
        if($("#new").val()==$("#sure").val())
        {
            $("#thirdofpassword2").show();

            $("#thirdofpassword3").hide();
            $("#thirdofpassword4").hide();
            $("#thirdofpassword5").hide();
            $("#thirdofpassword6").hide();
        }
        else
        {
            $("#thirdofpassword5").show();

            $("#thirdofpassword2").hide();
            $("#thirdofpassword3").hide();
            $("#thirdofpassword4").hide();
            $("#thirdofpassword6").hide();
        }
    }
    else if(lengthofpassword>16)
    {
        $("#thirdofpassword4").show();

        $("#thirdofpassword2").hide();
        $("#thirdofpassword3").hide();
        $("#thirdofpassword5").hide();
        $("#thirdofpassword6").hide();
    }
    else if(lengthofpassword==0)
    {
        $("#thirdofpassword6").show();

        $("#thirdofpassword2").hide();
        $("#thirdofpassword3").hide();
        $("#thirdofpassword4").hide();
        $("#thirdofpassword5").hide();
    }





}


function CharMode(iN){
    if (iN>=48 && iN <=57) //数字
        return 1;
    if (iN>=65 && iN <=90) //大写字母
        return 2;
    if (iN>=97 && iN <=122) //小写
        return 4;
    else
        return 8; //特殊字符
}

//bitTotal函数
//计算出当前密码当中一共有多少种模式
function bitTotal(num){
    modes=0;
    for (i=0;i<4;i++){
        if (num & 1) modes++;
        num>>>=1;
    }
    return modes;
}

//checkStrong函数
//返回密码的强度级别

function checkStrong(sPW){
//            if (sPW.length<=5)
//                return 0; //密码太短
    Modes=0;
    for (i=0;i<sPW.length;i++){
//测试每一个字符的类别并统计一共有多少种模式.
        Modes|=CharMode(sPW.charCodeAt(i));
    }

    return bitTotal(Modes);

}


//pwStrength函数
//当用户放开键盘或密码输入框失去焦点时,根据不同的级别显示不同的颜色

function pwStrength(pwd){

    O_color="#eeeeee";
    L_color="#FF0000";
    M_color="#FF9900";
    H_color="#33CC00";
    if (pwd==null||pwd==''){
        Lcolor=Mcolor=Hcolor=O_color;
    }
    else if(pwd.length<=5)
    {
        Lcolor=Mcolor=Hcolor=O_color;
    }
    else{
        S_level=checkStrong(pwd);
        switch(S_level) {

            case 0:
                Lcolor=Mcolor=Hcolor=O_color;
            case 1:
                Lcolor=L_color;
                Mcolor=Hcolor=O_color;
                break;
            case 2:
                Lcolor=Mcolor=M_color;
                Hcolor=O_color;
                break;
            default:
                Lcolor=Mcolor=Hcolor=H_color;
        }
    }

    document.getElementById("strength_L").style.background=Lcolor;
    document.getElementById("strength_M").style.background=Mcolor;
    document.getElementById("strength_H").style.background=Hcolor;
    return;
}



$(document).ready(function(){
    akak();
//            bkbk();
//            ckck();
    $("#div2,#div3").hide();//隐藏除第一个之外的所有的
    $("#List_1").addClass("hehecolor");

    $("#List_1").click(function(){
        $("#div1").show();
//                show_basic();
        $("#div2,#div3").hide();
        $("#List_1").addClass("hehecolor");
        $("#List_2,#cao_1").removeClass("hehecolor");

        $("#div2,#div3").remove();
    });

    $("#List_2").click(function(){
        $("#div2").show();//只显示第二个

        $("#div1,#div3").hide();//不显示的 都写在这里面
        $("#List_2").addClass("hehecolor");//菜单背景颜色 显示被选中
        $("#List_1,#cao_1").removeClass("hehecolor");//其他菜单都移除

        $("#div1,#div3").remove();
    });

    $("#cao_1").click(function(){
        $("#div3").show();

        $("#div1,#div2").hide();
        $("#cao_1").addClass("hehecolor");
        $("#List_1,#List_2").removeClass("hehecolor");

        $("#div1,#div2").remove();
    });


    $("#btnone").click(function(){
    });




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
function GetFileName(){
    var catalog;
    $.ajax({
        url:'/personal_center/get_basic',
        type:'post',
        async:false,
        headers:{
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
        },
        success:function(data){
            catalog=data;

        },
        error:function(){
            alert('11数据读取发生错误11！');
        }
    });
    return catalog;
}

function reset_password()
{
    alert(document.getElementById('new').value+document.getElementById('sure').value);
    $.ajax({
        url:'/personal_center/reset_password',
        type:'post',
        async:false,
        headers:{
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
        },

        data:{
            'oldpassword':document.getElementById('now').value,
            'newpassword':document.getElementById('new').value,
            'repeatnewpassword':document.getElementById('sure').value
        },
        success:function(data)
        {
            if(data==1)
            {
                alert('修改密码成功');
                $("#firstofpassword4").hide();
                $("#secondofpassword3").hide();
                $("#thirdofpassword2").hide();
            }

            else
            {
                $("#firstofpassword3").show();

                $("#firstofpassword4").hide();
                $("#firstofpassword2").hide();
            }

        },
        error:function()
        {
            alert('数据读取错误');
        }
    })


    document.getElementById('xiugai').reset();
    document.getElementById("strength_L").style.background="#eeeeee";
    document.getElementById("strength_M").style.background="#eeeeee";
    document.getElementById("strength_H").style.background="#eeeeee";

}


$(window).load(function(){


    var F="<div id='cao_2' style='width: 100px;height: 100px; '>";
    F+="<img src='/website/head_picture/"+username+".jpg' style='width: 100px;height: 100px;'>";
    F+="</div>";

    $("#cao_1").prepend(F);


    var F="<iframe style='display:none'id='img_header' src='/website/head_picture/"+username+".jpg'> </iframe>";
    $("#KJKJKJ").prepend(F);




    var options =
    {
        thumbBox: '.cutPicture_thumbBox',
        spinner: '.cutPicture_spinner',
                imgSrc: '/website/head_picture/yfh.jpg'
    };
    var cropper = $('.cutPicture_imageBox').cropbox(options);
    $(document).on('change','#cutPicture_upload-file',function(){
        //alert("cutPicture_upload-file");

        var reader = new FileReader();
        reader.onload = function(e) {
            options.imgSrc = e.target.result;
            cropper = $('.cutPicture_imageBox').cropbox(options);
        };
        reader.readAsDataURL(this.files[0]);
        this.files = [];

    });
    $(document).on('click','#cutPicture_btnCrop',function(){

        var img = cropper.getDataURL();
        $('.cutPicture_cropped').html('');
        $('.cutPicture_cropped').append('<img src="'+img+'" align="absmiddle" style="width:64px;margin-top:4px;border-radius:64px;box-shadow:0px 0px 12px #7E7E7E;" ><p>64px*64px</p>');
        $('.cutPicture_cropped').append('<img src="'+img+'" align="absmiddle" style="width:128px;margin-top:4px;border-radius:128px;box-shadow:0px 0px 12px #7E7E7E;"><p>128px*128px</p>');
        $('.cutPicture_cropped').append('<img src="'+img+'" align="absmiddle" style="width:180px;margin-top:4px;border-radius:180px;box-shadow:0px 0px 12px #7E7E7E;"><p>180px*180px</p>');

        upload_head_picture(img);
    });
    $(document).on('click','#cutPicture_btnZoomIn',function(){
        cropper.zoomIn();
    });
    $(document).on('click','#cutPicture_btnZoomOut',function(){
        cropper.zoomOut();
    });
});

function upload_head_picture(img){

    $.ajax({
        url:'/personal_center/storage_head',
        type:'post',
        async:false,
        data:{
            'head':img
        },
        headers:{
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
        },
        success:function(data){
            document.getElementById("img_header").contentDocument.location.reload();
            show_head_picture();

        },
        error:function(){
            alert("图片上传出错");
        }

    });

}
function show_head_picture(){
    $("#cao_2").remove();
    var F="<div id='cao_2' style='width: 100px;height: 100px; '>";
    F+="<img src='/website/head_picture/"+username+".jpg' style='width: 100px;height: 100px;'>";
//            F+="<img src='documen t.getElementById('img_header').contentDocument.location.reload()' style='width: 64px;height: 64px;'>";
    F+="</div>";
    $("#cao_1").prepend(F);


    $("#photoofhead2").remove();
    var F="<div id='photoofhead2' style='width: 50px;height: 50px; '>";
    F+="<a href='http://localhost/personal_center'><img src='/website/head_picture/"+username+".jpg' style='width: 50px;height: 50px;'></a>";
    F+="</div>";
    $("#photoofhead1").prepend(F);

}



function akak(){
    $("#div1").remove();
    $("#div2").remove();

    var data1=GetFileName();
    username=data1[0]['name'];
    var F="<div id='div1' class='right-1 col-md-offset-2'>";
    F+=" <div class='right-top'>";
    F+=" <ul id='table-1' class='list-group col-md-12'>";
    F+=" <li class='list-group-item' style='border-bottom: none' ><br><a><h3 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;基本资料</h3></a><br></li>";
    F+="<li class='list-group-item ' style='height: 70px; font-size: large; border-top: none;' ><a class='hehe col-md-2'>昵称：</a> <a>"+data1[0]['name']+"</a></li>"
    F+="<li class='list-group-item'style='height: 70px;font-size: large;border-top: none;'>";
    F+="<a class='hehe col-md-2 ' >性别：</a>";
    F+="<a>"+data1[0]['sex']+"</a>";
    F+="</li>";
    F+="<li class='list-group-item' style='height: 70px;font-size: large;border-top: none;'><a class='hehe col-md-2'>邮箱：</a><a>"+data1[0]['email']+"</a></li>"
    F+="</ul>";
    F+="</div>";

    F+="</div>";
    $("#aaaa").prepend(F);
}


function bkbk(){
    $("#div1").remove();
    $("#div2").remove();
    var F=" <div id='div2' class='right-3 col-md-offset-2'>";
    F+=" <div class='right-top'>";
    F+=" <form id='xiugai'>";
    F+=" <ul id='table-3' class='list-group col-md-12'>";
    F+=" <li class='list-group-item' style='border-bottom: none'><a><h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;修改密码</h3></a><br></li>";
    F+=" <li class='list-group-item' style='border-top: none'>";
    F+=" <a class='hehe col-md-2'>当前密码</a>";
    F+=" <input id='now' type='password' onclick='jujiao1();' onblur='bujujiao1();' value=''>";
    F+=" <a id='firstofpassword'  style='display: none;'>请输入密码</a>";
    F+=" <a id='firstofpassword2'  style='display: none; color: red;'>请输入密码</a>";
    F+=" <a id='firstofpassword3'  style='display: none;color:red;'>密码错误</a>";
    F+=" <span id='firstofpassword4' class='glyphicon glyphicon-ok' style='display: none;color:green;'></span>";
    F+=" </li>";
    F+="<li class='list-group-item' style='border-top: none'>";
    F+="  <a class='hehe col-md-2'>新密码</a>";
    F+="<input  id='new' type='password'  onKeyUp=pwStrength(this.value); onblur='bujujiao2();'onBlur=pwStrength(this.value); onclick='jujiao2();'>";
    F+="<a id='secondofpassword' style='display: none;'>请输入6-16位半角字符（由数字，字符，符号组成）</a>";
    F+="<a id='secondofpassword2' style='display: none;color:red;'>请输入密码</a>";
    F+=" <span id='secondofpassword3' class='glyphicon glyphicon-ok' style='display: none;color:green;'></span>";
    F+=" <a id='secondofpassword4'  style='display: none;color: red;'>密码不足6位</a>";
    F+=" <a id='secondofpassword5'  style='display: none;color: red;'>密码超过16位</a>";
    F+="</li>";
    F+="<li class='list-group-item' style='border-top: none'>";
    F+=" <a class='hehe col-md-2'>密码强度</a>";
    F+="<table border='1' cellspacing='0' cellpadding='1' style='border: none;display:inline'  >";
    F+=" <tr align='center'  class='' >";
    F+="  <td class=''  id='strength_L' width='50px;'  >11</td>";
    F+=" <td  class='' id='strength_M' width='50px;' >22</td>";
    F+=" <td class='' id='strength_H' width='50px;' >33</td>";
    F+=" </tr>";
    F+="</table>";
    F+="</li>";
    F+="<li class='list-group-item' style='border-top: none'>";
    F+=" <a class='hehe col-md-2'>确认密码</a>";
    F+="<input  id='sure' type='password' onfocus='jujiao3();' onblur='bujujiao3();'>";
    F+=" <a id='thirdofpassword' style='display: none;'>请确认密码</a>";
    F+=" <span id='thirdofpassword2' class='glyphicon glyphicon-ok' style='display: none;color:green;'></span>";
    F+=" <a id='thirdofpassword3'  style='display: none;color: red;'>密码不足6位</a>";
    F+=" <a id='thirdofpassword4'  style='display: none;color: red;'>密码超过16位</a>";
    F+=" <a id='thirdofpassword5'  style='display: none;color: red;'>两次输入的密码不一致</a>";
    F+=" <a id='thirdofpassword6' style='display: none;color:red;'>请输入密码</a>";
    F+="</li>";
    F+="<li class='list-group-item' style='border-top: none'>";
    F+=" <button id='submit' onclick='reset_password()' type='submit'  class='btn btn-primary col-md-offset-2'>保存</button><br><br>";
    F+="</li>";
    F+="</ul>";
    F+="</form>";
    F+="</div>";
    F+="</div>";

    $("#bbbb").prepend(F);
}

function ckck(){
    $("#div3").remove();
    var F="<div id='div3' class='right-3 col-md-offset-2'>";
    F+="<div class='cutPicture_container'>";
    F+="<div class='cutPicture_imageBox'>";
    F+="<div class='cutPicture_thumbBox'></div>";
    F+="<div class='cutPicture_spinner' style='display: none'>Loading...</div>";
    F+="</div>";
    F+="<div class='cutPicture_action'>";
    F+="<div class='cutPicture_new-contentarea tc'>";
    F+="<a href='javascript:void(0)' class='cutPicture_upload-img'>";
    F+="<label for='upload-file'>上传图像</label>";
    F+="</a>";
    F+="<input type='file' class='' name='cutPicture_upload-file' id='cutPicture_upload-file' />";
    F+="</div>";
    F+="<input type='button' id='cutPicture_btnCrop'  class='cutPicture_Btnsty_peyton' value='裁切'>";
    F+="<input type='button' id='cutPicture_btnZoomIn' class='cutPicture_Btnsty_peyton' value='+'  >";
    F+="<input type='button' id='cutPicture_btnZoomOut' class='cutPicture_Btnsty_peyton' value='-' >";
    F+="</div>";
    F+="<div class='cutPicture_cropped'></div>";
    F+="</div>";
    F+="</div>";
    $("#cccc").prepend(F);
}
