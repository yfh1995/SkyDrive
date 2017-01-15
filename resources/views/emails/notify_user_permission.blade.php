<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
</head>
<body>
用户 {{ $name }} 您好：<br/>
&nbsp;&nbsp;&nbsp;&nbsp;您在本站的权限已被管理员修改，您现在有一下权限：<br/>
{!! $permission !!}
&nbsp;&nbsp;&nbsp;&nbsp;如果您有任何疑问，请咨询管理员，谢谢！
</body>
</html>