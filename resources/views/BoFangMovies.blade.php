@extends('app')

@section('content')
    {{--<h1>{{ $src }}</h1>--}}
    {{--<div class="container">--}}
        {{--<video src="{{ $src }}" controls="controls" width="700px" height="400px ">--}}

        {{--</video>--}}
    {{--</div>--}}
    <script type="text/javascript" src="{{asset('/js/jwplayer.js')}}"></script>
    <style type="text/css">
        body { font-size:12px;font-family:tahoma;
            background-image:url(/img/BPofVideo.png);
        }
        div#player {

            text-align:center;
        }
        div#container {
            text-align:center;
            font-size:16px;
            color:#333;
        }
        div#author {
            text-align:center;
            font-size:16px;
            color:#333;
        }

    </style>
    <script>
    </script>


    <div class="container" >
        <div id="player">

            <div id="container">Loading the player ...</div>
            <script type="text/javascript">
                jwplayer("container").setup({
                    flashplayer: "/swf/playerdiy.swf",
                    file:"{{ $src }}",
                    height:480,
                    width:600,
                    image:"/img/11.png",
                    controlbar: "over",
                    screencolor :"#fff"
                });
            </script>
        </div>
    </div>


@endsection
