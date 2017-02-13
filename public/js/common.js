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
