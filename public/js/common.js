function throttle(fn, time) {
	time = time || 200;
	var runId = null;
	return function() {
		var args = arguments;
		clearTimeout(runId);
		runId = setTimeout(function() {
			console.log(args);
			fn.apply(fn, args);
		}, time);
	}
}
/*
 * 获取url后的name对应的值
 */
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}