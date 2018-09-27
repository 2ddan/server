
document.body.style.backgroundColor = "#000000";
winit.connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
if(!winit.connection || !winit.connection.type || winit.connection.type == "wifi")
    winit.wifi = 1;
if(!gcStorage.loaded && !winit.wifi){
    winit.wifi = confirm("第一次推荐wifi环境下运行，确认继续？");
}else winit.wifi = 1;
winit.setLog = (function(){
	var scores = {
		"deps":1001,
		"pi_modules":2002,
		"next":5005
	},
	count = 0,
	log = function(key){
        var img = new Image();
        count = count + scores[key];
		// img.src = winit.domains[winit.domains.length-1]+"/log?step="+((new Date()).getTime()-winit.startTime);
		delete scores[key];
	};
	return function(){
		if(winit.initNext && scores.next)log("next");
		if(winit.deps && scores.deps)log("deps");
		if(self.pi_modules && scores.pi_modules)log("pi_modules");
	} 
})();
if(winit.wifi){
    winit.step = 0;
	winit.store = "qqxx";
    winit.debug = true;

    winit.path = "/dst/";//"/pi/0.1/";
	winit.loadJS(winit.domains, "/dst/pi/polyfill/babel_polyfill.js", "utf8", winit.initFail, "load babel_polyfill error");
	
    winit.loadJS(winit.domains, "/dst/pi/boot/init.js?640", "utf8", winit.initFail, "load init error");

    winit.loadJS(winit.domains, "/dst/boot/next.js?7", "utf8", winit.initFail, "load next error");

    winit.loadJS(winit.domains, winit.path + ".depend?" + Math.random(), "utf8", winit.initFail, "load list error");
}
// alert(navigator.userAgent);
var userAgent = navigator.userAgent.toLocaleLowerCase();
try{
	if(userAgent.indexOf("yineng") >= 0){
		if(userAgent.indexOf("tbs") >= 0){
			if(/chrome/g.test(userAgent)){
				var text = userAgent.split("chrome/");
				if(text[1].split(".")[0] - 0 < 36){
					alert("更新中！请稍后进入游戏！请不要关闭游戏");
				}
			}
		}
	}
} catch (log) {
	console.log(log);
}
