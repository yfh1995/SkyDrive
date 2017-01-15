<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="refresh" content="3; url='{{ url('/') }}'" />
</head>
<body>
    @if($flag == 1)
        注册成功！KJ is a big sb!将在三秒后跳转至首页！
    @else
        注册失败！请重试！KJ is a big sb!将在三秒后跳转至首页！
    @endif
</body>
</html>