@extends('app')

@section('content')
    <link href="{{ asset('/css/style.css')}}" rel="stylesheet" type="text/css">
    <link href="{{ asset('/css2/style.css') }}" rel="stylesheet" >
    <link href="{{ asset('/css2/reset.css') }}" rel="stylesheet" >
    <script src="{{asset('/js/jquery.js')}}" type="text/javascript" charset='utf8'></script>
    <script src="{{asset("/js/jplayer.playlist.min.js")}}"></script>
    <script src="{{asset("/js/jquery.jplayer.min.js")}}"></script>
    <script>
        var IsCreateFileNow=false;//判断有没有点击新建文件夹
        //给预览图片新建一个数组
        var  listOfPicture=new Array(10000);
        var cntInPicture=0;
        var cntNowP=0;
        //给预览音乐新建一个数组
        var listOfMusic=new Array(10001);
        var cntInMusic=0;
        var cntNowM=0;
        //给预览视频新建一个数组
        var listOfVideo=new Array(10001);
        var cntInVideo=0;
        var cntNowV=0;
        //给预览txt新建一个数组
        var listOfTxt=new Array(10001);
        var cntInTxt=0;
        var cntNowT=0;
        //保存下载文件的地址和文件名
        var DownloadFileAddress=new Array(100001);
        var DownloadFileName=new Array(100001);
        var DownloadFileID=new Array(100101);
        var cntInFileAddress=0;
        var cntInFileName=0;
        var cntInFileID=0;
        //保存当前目录的所有子目录
        var catalogOfSonF=new Array(100111);
        var catalogOfSonFId=new Array(100111);
        var catalogOfSonFcnt=0;
        //移动文件夹的每个文件添加一个标记值
        var cntOfEveryCatalog=1;
        var EverycatalogFlag=new Array(1000002);
        function ChuShiHuaFlagOfmove(){
            for(var i=0;i<1000000;i++){
                EverycatalogFlag[i]=0;
            }
        }
        //移动文件夹移动到哪个文件夹下面的ID
        var SureMoveId=0;
        //保存移动的文件夹有哪些
        var numOfMoveFile=new Array(100);
        var cntOfMoveFile=0;
        $(document).ready(function(){

            refresh('','catalog');
            var str=GetFileName();
            SetTileOfEntry(str);

            //预览背景隐藏
            $("#LookPicture").hide();
            $("#leftBtn").hide();
            $("#rightBtn").hide();

            $("#LookPictureContent").mouseover(function(){
                $("#leftBtn").show();
                $("#rightBtn").show();
            });
            $("#LookPictureContent").mouseout(function(){
                $("#leftBtn").hide();
                $("#rightBtn").hide();
            });
            //下一张图片的预览
            $("#rightBtn").click(function(){
                var nn=parseInt(cntNowP)+1;

                if(nn>=cntInPicture){
                    $("#DIVaa").show();
                    $("#DIVaa").fadeOut(5000);
                }else{

                    cntNowP++;
                    $("#NowPicture").remove();
                    var F="";
                    F+="<img id='NowPicture' src='"+listOfPicture[cntNowP]+"'>";
                    $("#LookPicture i").after(F);
                }

            });
            //上一张图片的预览
            $("#leftBtn").click(function(){
                if(cntNowP<=0){
                    $("#DIVbb").show();
                    $("#DIVbb").fadeOut(5000);
                }else{
                    cntNowP--;
                    $("#NowPicture").remove();
                    var F="";
                    F+="<img id='NowPicture' src='"+listOfPicture[cntNowP]+"'>";
                    $("#LookPicture i").after(F);
                }

            });

        });
        //显示图片
        function ShowThePicture(){
            $("#LookPicture").addClass("blackgroudOfLookPicture");
            $("#LookPicture").show();
            $("#NowPicture").css("background-color","#ffffff");

        }
        $("#ajaxForm").ajaxForm(function () {

            refresh('','catalog');

        });

        //关闭预览图片
        function SpanClickClose(){
            $("#navOFAllDIvHead").show();
            $(".TwoDivInYunpan").show();
            $("#LookPicture").hide();
            $("#NowPicture").remove();
        }
        //打开移动文件夹模态框
        function MoveTheFile(){
            cnt=0;
//        获取哪些被选中
            $("#ContentIntwoInTwoDiv").find(':checkbox[id!=FatherOfcheckbox]').each(function(){
                if($(this).prop("checked")){
                    numOfMoveFile[cntOfMoveFile++]=$(this).attr('id');
            }
            });

            var F="<div class='modal fade' id='myModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>";
            F+="<div class='modal-dialog'>";
            F+="<div class='modal-content'>";
            F+="<div class='modal-header'>";
            F+="<button type='button' class='close' data-dismiss='modal'aria-hidden='true'>×</button>";
            F+="<h4 class='modal-title' id='myModalLabel'>移动文件夹</h4></div>";
            F+="<div class='modal-body' style='height:360px;'>";
            F+="<div style='height:100%;padding:10px 5px; border: 1px solid saddlebrown;overflow: auto;'>";
            //添加浏览目录
            F+="<li style='list-style-type:none;' class='treeheadOflist ' id='0'>";
            F+="<div style='height:100%;' data-toggle='collapse' href='#collapse"+cntOfEveryCatalog+"'>";
            F+="<span class='glyphicon glyphicon-plus'>全部文件</span></div></li>";

            F+="</div>";
            F+="</div>";
            F+="<div class='modal-footer'>";
            F+="<button type='button' class='btn btn-default' style='float:left;'>新建文件夹</button>";
            F+="<button id='QueDingOfMoveFile' type='button' class='btn btn-primary'>确定</button>";
            F+="<button id='quxiaoOfMoveFile' type='button' class='btn btn-default' data-dismiss='modal'>取消</button>";
            F+="</div></div></div></div>";

            $("#xiangangID").prepend(F);
            $("#0").children('div').addClass('bcOfmoveFileList');
            $("#myModal").modal('show');
            showAllFilelist();
        }
        $(document).on('mouseover','.treeheadOflist',function(){
            if($(this).attr('id')==SureMoveId){
                return ;
            }
            $(this).children('div').addClass('bcOfoverFileList');
        })
        $(document).on('mouseout','.treeheadOflist',function(){
            $(this).children('div').removeClass('bcOfoverFileList');
        })
        //刚进来移动文件夹的时候 显示全部文件下面的所有的子菜单
        function showAllFilelist(){
            EverycatalogFlag[0]=1;
            GetFatherUnder_catalog(0);
            var F="";
            F+="<ul class='collapse in' id='collapse1'>";
            for(var i=0;i<catalogOfSonFcnt;i++){
                cntOfEveryCatalog++;
                F+="<li style='list-style-type:none;' class='treeheadOflist ' id='"+catalogOfSonFId[i]+"'>";
                F+="<div style='height:100%;padding-left: 15px;'  data-toggle='collapse' href='#collapse"+cntOfEveryCatalog+"'>";
                F+="<span class='glyphicon glyphicon-plus'>"+catalogOfSonF[i]+"</span></div></li>";
            }
            F+="</ul>";
            $('.treeheadOflist').after(F);
        }
        //给移动文件夹的选项添加下拉选项
        $(document).on('click','.treeheadOflist',function(){
//            alert($(this).attr('id'));
//            alert();
            $('div').filter('.bcOfmoveFileList').removeClass('bcOfmoveFileList');
            SureMoveId=$(this).attr('id');//让id等于当前点击的ID值

            $(this).children('div').addClass('bcOfmoveFileList');
            //ul的id值
            var idOfcollapse=$(this).children().attr('href');
            var idOfcollapse2=idOfcollapse.substring(1,idOfcollapse.length);
            var strOfcatalog=$(this).attr('id');
            if(EverycatalogFlag[strOfcatalog]==1){
                return ;
            }

            EverycatalogFlag[strOfcatalog]=1;
            GetFatherUnder_catalog(strOfcatalog);
            if(catalogOfSonFcnt==0){
                return ;
            }
            var JianJuZhi=$(this).children().css('padding-left');
            var JianJuZhi2=JianJuZhi.substring(0,JianJuZhi.length-2);
            var JianJuZhi3=parseInt(JianJuZhi2)+15;

            var F="";
            F+="<ul class='collapse in' id='"+idOfcollapse2+"'>";
            for(var i=0;i<catalogOfSonFcnt;i++){
                cntOfEveryCatalog++;
                F+="<li style='list-style-type:none;' class='treeheadOflist ' id='"+catalogOfSonFId[i]+"'>";
                F+="<div style='height:100%;padding-left: "+JianJuZhi3+"px;'  data-toggle='collapse' href='#collapse"+cntOfEveryCatalog+"'>";
                F+="<span class='glyphicon glyphicon-plus'>"+catalogOfSonF[i]+"</span></div></li>";
            }
            F+="</ul>";
            $(this).after(F);
        });
        //当关闭移动文件夹框的时候
        $(document).on('hide.bs.modal', "#myModal",function () {
            SureMoveId=0;//标记ID值
            ChuShiHuaFlagOfmove();//将数组重置，表示没有li标签被打开过
            $("#myModal").remove();//移走模态框
        })
        //当确定移动文件夹的时候
        $(document).on('click','#QueDingOfMoveFile',function(){
            MoveFileOfYidongwenjianjia();
            SureMoveId=0;//标记ID值
            ChuShiHuaFlagOfmove();//将数组重置，表示没有li标签被打开过
            $("#myModal").modal('hide');
            $("#myModal").remove();//移走模态框

        })

        //下载函数
        $(document).on('click','#DownLoadTheFile',function(){


            var addressN=new Array(100101);
            var filenameN=new Array(100101);

            var shuliang=0;
            var HaveFileJiaflag=false;
            $("#ContentIntwoInTwoDiv").find(':checkbox[id!=FatherOfcheckbox]').each(function(){
                if($(this).prop("checked")){
                    addressN[shuliang]=DownloadFileAddress[$(this).val()];
                    filenameN[shuliang++]=DownloadFileName[$(this).val()];

//                  alert($(this).parent().siblings(".col-md-3").children("p").text());
                    if($(this).parent().siblings(".col-md-3").children("p").text()==-1){
                        HaveFileJiaflag=true;
                    }
                }
            });

            if(shuliang==0){
                alert("请选择文件");
            }
            else{
                if(HaveFileJiaflag==false){
                    for(var i=0;i<shuliang;i++){
                        var aLink=document.createElement("a");
                        evt=document.createEvent("HTMLEvents");

                        evt.initEvent("click");
                        aLink.download=filenameN[i];
                        aLink.href=addressN[i];

                        aLink.dispatchEvent(evt);
                    }

                }else{
                    alert("下载不可以有文件夹");
                }

            }
        })




        $(document).ready(function(){
            $("#btn").click(function(){
                $(".controls").slideToggle();
            });
            $("#btn2").click(function(){
                $(".info").slideToggle();
            });
            $("#btn3").click(function(){
//                $(".music-player").animate({'top':'270'},1000);
                $(".music-player").animate({'height':'20'},1000);
            });
            $("#btn4").click(function(){
                $(".music-player").animate({'height':'290'},1000);
            });
            $("#btn5").click(function(){
                $("#KJmusic").hide();

            });
        });
    </script>
    <div  id="LookPicture" style="display:none;" >
        <div class="row">
            <div class="col-md-11" id="LookPictureContent">
                <div id="DIVaa" class="alert alert-warning" style="margin:100px 500px; ;position: absolute; display: none;z-index:1;">
                    这是最后一张图片了
                    <span onclick="$('#DIVaa').stop(true,true);"  style="float:right;cursor: pointer;" >&times;</span>
                </div>
                <div id="DIVbb" class="alert alert-warning" style="margin:100px 500px; ;position: absolute; display: none;z-index:1;">
                    这是第一张图片了
                    <span onclick="$('#DIVbb').stop(true,true);" style="float:right;cursor: pointer;" >&times;</span>
                </div>
                <img id="leftBtn" style="float:left; z-index:1;height:50px;width: 20px;margin-top:300px;" src="/img/left.png">
                <img id="rightBtn" style="float:right;z-index:1;height:50px;width: 20px; margin-top:300px;" src="/img/right.png">
                <div  style="display: table-cell;height:600px;width:1241px;text-align: center;vertical-align: middle;">

                    <i></i>

                </div>
            </div>
            <div  class="col-md-1" style="opacity: 1;background-color: black;">
                <span style=" float: right;cursor: pointer;text-decoration: none;font-size: xx-large;" onmouseover="$(this).addClass('bcaaaaaa');"onmouseout="$(this).removeClass('bcaaaaaa');" onclick="javascript:SpanClickClose();" > &#10006</span>
            </div>
        </div>

    </div>

    <div id="KJmusic" style=" position:fixed;margin-left:180px;overflow: hidden;z-index:10;bottom: 0px;display: none;">

        <div class="music-player">
            <!--<div style="background-image: url(http://i.imgur.com/yqB0erk.jpg);" class="album"></div>-->
            <button id="btn3" style="margin: 0px;padding:0px;rihgt:330px;" >隐藏</button>
            <button id="btn" style="margin: 0px;padding:0px;rihgt:330px;" >缩小</button>
            <button id="btn2" style="margin: 0px;padding:0px;rihgt:330px;" >还原</button>
            <button id="btn4" style="float:right;">显示</button>
            <button id="btn5" style="float:right;">关闭</button>
            <div class="info">
                <div class="left">
                    <a href="javascript:;" class="icon-shuffle"></a>
                    <a href="javascript:;" class="icon-heart"></a>
                </div>
                <div class="center">
                    <div class="jp-playlist">
                        <ul>
                            <li></li>
                        </ul>
                    </div>

                </div>
                <div class="right">
                    <a href="javascript:;" class="icon-repeat"></a>
                    <a href="javascript:;" class="icon-share"></a>
                </div>

                <div class="progress jp-seek-bar" style="margin:0px;padding:0px;">
                    <span class="jp-play-bar" ></span>
                </div>
            </div>

            <div class="controls" >
                <div class="current jp-current-time">00:00</div>
                <div class="play-controls">
                    <a href="javascript:;" class="icon-previous jp-previous" title="previous"></a>
                    <a href="javascript:;" class="icon-play jp-play" title="play"></a>
                    <a href="javascript:;" class="icon-pause jp-pause" title="pause"></a>
                    <a href="javascript:;" class="icon-next jp-next" title="next"></a>
                </div>
                <div class="volume-level jp-volume-bar">
                    <span class="jp-volume-bar-value" style="width: 0%"></span>
                    <a href="javascript:;" class="icon-volume-up jp-volume-max" title="max volume"></a>
                    <a href="javascript:;" class="icon-volume-down jp-mute" title="mute"></a>
                </div>
            </div>

            <div id="jquery_jplayer" class="jp-jplayer"></div>

        </div>
    </div>
    <div class="TwoDivInYunpan"  >
        <div class="row" >
            <div class="oneInTwoDiv col-md-2" style="padding:0;" >
                <ul id="systemSetting" class=" nav nav-pills nav-stacked" style="text-align: justify;" >
                    <li id="AllFileDiv" onclick="refresh('','catalog');"><a  href="#" ><span style=" padding-left: 30px;" class="glyphicon glyphicon-home " ></span><strong style="color: gray;">全部文件</strong></a></li>
                    <li id="PictureDiv" onclick="refresh('','picture')" ><a  href="#"><span style=" padding-left: 30px;" class="glyphicon glyphicon-picture" ></span><strong style="color: gray;">图片</strong></a></li>
                    <li id="FillDiv"   onclick="refresh('','text')"><a  href="#"><span style=" padding-left: 30px;" class="glyphicon glyphicon-folder-close"></span><strong style="color: gray;">文档</strong></a></li>
                    <li id="VideoDiv"  onclick="refresh('','video')"><a  href="#"><span style=" padding-left: 30px;" class="glyphicon glyphicon-film" ></span><strong style="color: gray;">视频</strong></a></li>
                    <li id="ZhongziDiv" onclick="refresh('','bt')"><a  href="#"><span style=" padding-left: 30px;" class="glyphicon glyphicon-tree-conifer" ></span><strong style="color: gray;">种子</strong></a></li>
                    <li id="MiuseDiv"  onclick="refresh('','music')"><a   href="#"><span style=" padding-left: 30px;" class="glyphicon glyphicon-headphones" ></span><strong style="color: gray;">音乐</strong></a></li>
                    <li id="OtherDiv"  ><a   href="#"><span style=" padding-left: 30px;" class="glyphicon glyphicon-qrcode"></span><strong style="color: gray;">我的分享</strong></a></li>
                    <li><HR></li>
                    <li id="RecycleDiv" onclick="refresh('','garbage')"><a  href="#"><span style="padding-left: 30px;" class="glyphicon glyphicon-calendar"></span><strong style="color:gray;font-size:large;">回收站</strong></a></li>
                    <li><HR></li>
                </ul>
                <div  class="col-md-offset-2"  style="width:70%;margin-bottom: 0px;padding-bottom:  0px;">
                    <div class="progress progress-striped active" >
                        <div class="progress-bar progress-bar-success " role="progressbar" aria-valuenow="60"
                             aria-valuemin="0" aria-valuemax="100" style="width:80%">
                        </div>
                    </div><strong>8G/10G</strong>
                </div>
            </div>
            <div class=" twoInTwoDiv col-md-10" style="margin:0;padding: 0;">
                <div id="headerIntwoInTwoDiv" style="height:10%;background-color: #cccccc;border: 1px solid #c0c0c0;">
                    <div style="float:left; margin-left: 10px;margin-top: 10px; ">
                        <form id="ajaxForm" enctype="multipart/form-data" action="{{url('/sky_drive/upload')}}" method="POST" style="display: none;">
                            <input type="hidden" name="_token" value="{{ csrf_token() }}">
                            <input type="file" name="file" id="file" class="file" data-language="zh" onchange="sb.click()">
                            <input name="sb" type="submit" id="sb">
                        </form>
                        <button   onclick="file.click();" type="button" class="btn btn-default"><a><span class="glyphicon glyphicon-cloud-upload"></span></a>
                            上传文件
                        </button>
                        <button id="DownLoadTheFile" type="button" class="btn btn-default"><a><span class="glyphicon glyphicon-cloud-upload"></span></a>
                            下载
                        </button>
                        <button id="createNewFile" type="button" class="btn btn-default">
                            <a><span class="glyphicon glyphicon-plus"></span></a>
                            新建文件
                        </button>
                        <button type="button" class="btn btn-default">
                            <a><span class="glyphicon glyphicon-cloud-download"></span></a>
                            离线下载
                        </button>
                        <button type="button" class="btn btn-default" onclick="delete_and_restore_getdate(0)">
                            删除
                        </button>
                        <button type="button" class="btn btn-default" onclick="delete_and_restore_getdate(1)">
                            恢复
                        </button>

                    </div>

                    <div class="btn-group " style="float:right;margin:10px 10px;">
                        <div class="btn-group btn-sm " id="LeftPicture" style="border: 1px solid #c0c0c0; background-color: gray;cursor: pointer;">
                            <a href="#"><span class="glyphicon glyphicon-th-list" ></span></a>
                        </div>
                        <div class="btn-group btn-sm " id="RightPicture" style="border: 1px solid #c0c0c0;cursor: pointer;">
                            <a href="#"><span class="glyphicon glyphicon-th"></span></a>
                        </div>
                    </div>
                </div>
                <div >
                    <div style="float:left; margin-left:20px;" >
                        <div  id="MeuOfHeader">
                        </div>
                    </div>
                    <p style="float:right; margin-right: 10px;">已加载</p>
                </div>
                <br>
                <div id="ContentIntwoInTwoDiv" style="margin:10px;height:90%;" >
                    <div  style="background-color: #cccccc; height:30px; border: 1px solid #000000;">
                        <div  class="col-md-7 "style="height:100%;border-right: 1px solid #000000 ; "  >
                            <input id="FatherOfcheckbox"  type="checkbox" >
                            <p style="margin-top: 5px;">文件名
                                <button id="moveFileButton" style='float:right;background-color: red;display: none;'  onclick="javascript:MoveTheFile();">
                                    移动
                                </button>
                            </p>

                            <div id="OneDivOfContentIntwoInTwoDiv" style="width:100%;">
                                <div >
                                    <!--<input style="height:20px;width:20px;margin-top: 5px; float: left;" type="checkbox">-->
                                    <!--<a > <span class="glyphicon glyphicon-folder-open" style="float:left;margin: 5px;color:gray;"></span><p id="FileNameP" style=" margin:5px;padding-left: 10px;float:left;">文件名</p> </a>-->
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 " style="height:100%;border-right: 1px solid #000000;">
                            <p style="margin-top: 5px;">大小</p>
                            <div id="TwoDivOfContentIntwoInTwoDiv" >
                                <!--<strong style="float:left;">-</strong>-->
                            </div>
                        </div>
                        <div  class="col-md-2 ">
                            <p style="margin-top: 5px;">修改日期</p>
                            <div id="ThreeDivOfContentIntwoInTwoDiv">
                                <!--<p >data</p>-->
                            </div>
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

@endsection
