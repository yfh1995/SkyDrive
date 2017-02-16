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
function GetQueryString(key){
        var reg = new RegExp("(^|&)"+key+"=([^&]*)(&|$)");
        var result = window.location.search.substr(1).match(reg);
        return result?decodeURIComponent(result[2]):null;
}