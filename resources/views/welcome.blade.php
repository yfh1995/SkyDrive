@extends('app')

@section('content')
    <a class="btn btn-link" href="{{ url('/sky_drive/home') }}">网盘</a><br/>
    <a class="btn btn-link" href="{{ url('/forum/home') }}">论坛</a><br/>
    <style>
        #kkk:hover{
            text-decoration: antiquewhite;
        }
    </style>
@endsection