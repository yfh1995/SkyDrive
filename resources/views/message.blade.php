

    <style>
        * {
            padding: 0;
            margin: 0;
        }
        #coverBg {
            background-color: rgba(0, 0, 0, .6);
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            display:none;
            z-index: 1000;;
        }
        #alertErrorBox {
            position: absolute;
            width: 400px;
            left: calc(50% - 200px);
            top: 50%;
            transform: translateY(-50%);
            background-color: #fff;
            border-radius: 5px;
        }

        .ErrorTips {
            padding-left: 5px;
            line-height: 25px;
            font-size: 1.5em;
        }
        .ErrorLine {
            display: block;
            height: 1px;
            width: 400px;
            background-color: grey;
            opacity: .4;
        }
        .errorBtnSure {
            width:80px;
            margin:10px;
            margin-left:300px;
        }
    </style>

<div id="coverBg">
    <div id="alertErrorBox">
        @foreach($errors->all() as $v)
            <p class='ErrorTips'>{{ $v }}</p>
        @endforeach
        <div class='ErrorLine'></div>
        <button class="btn btn-success errorBtnSure">确认</button>
    </div>
</div>

    <script>

        var bg = $('#coverBg');
        $('.errorBtnSure').on("click", function() {
            bg.css('display',"none");
        });

        $(function(){
            var cnt = parseInt("{{ count($errors) }}");
            if(cnt) bg.css('display','block');
        });
    </script>