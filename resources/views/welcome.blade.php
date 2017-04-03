@extends('app')

@section('content')
    <a class="btn btn-link" href="{{ url('/sky_drive/home?type=0') }}">网盘</a><br/>
    <a class="btn btn-link" href="{{ url('/admin/sky_drive') }}">论坛</a>
    <style>
        #kkk:hover{
            text-decoration: antiquewhite;
        }
    </style>
@endsection