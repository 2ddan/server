
document.body.style.backgroundColor = "#000000";
winit.connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
if(!winit.connection || !winit.connection.type || winit.connection.type == "wifi")
    winit.wifi = 1;
if(!gcStorage.loaded && !winit.wifi){
    winit.wifi = confirm("第一次推荐wifi环境下运行，确认继续？");
}else winit.wifi = 1;
winit.step = 0;
winit.store = "srs";
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
(function(){
	var userAgent = navigator.userAgent.toLocaleLowerCase(),isIos,r = "";
	winit.path = winit.locPath = "/dst/";//"/pi/0.1/";
	try{
		winit.inApp = (userAgent.indexOf("yineng") >= 0 ? 1:0) || (userAgent.indexOf(winit.store) >= 0?2:0);
		if(winit.inApp == 1){
			isIos = navigator.userAgent.indexOf("YINENG_IOS") >= 0;
			if(isIos){
				r = location.href.replace("android_asset/res/boot/index_a.html","");
			}else{
				r = "file:///";
			}
			winit.locPath = "";//"/pi/0.1/";
			winit.nativePath = r+"android_asset/dst";
			if(userAgent.indexOf("tbs") >= 0){
				if(/chrome/g.test(userAgent)){
					var text = userAgent.split("chrome/");
					if(text[1].split(".")[0] - 0 < 36){
						alert("更新中！请稍后进入游戏！请不要关闭游戏");
					}
				}
			}
		}else if(winit.inApp == 2){
			var electron = require("electron"),
				pcCfg = electron.ipcRenderer.sendSync("request", "getCfg");
			winit.debug = pcCfg.debug;
			winit.locPath = "";
			winit.nativePath = "file:///"+window.process.cwd()+"/resources/app.asar/dst";
			
		}

	} catch (log) {
		console.log(log);
	}
})()
if(winit.wifi){
    
	winit.debug = winit.debug !== undefined?winit.debug:true;

	self._gui = true;
	
	winit.loadJS(winit.nativePath?[winit.nativePath+""]:winit.domains, winit.locPath + "/pi/polyfill/babel_polyfill.js", "utf8", winit.initFail, "load babel_polyfill error");
	
    winit.loadJS(winit.nativePath?[winit.nativePath+""]:winit.domains, winit.locPath + "/pi/boot/init.js?643", "utf8", winit.initFail, "load init error");

    winit.loadJS(winit.domains, "/dst/boot/next.js?19", "utf8", winit.initFail, "load next error");

    winit.loadJS(winit.httpDomains, "/dst/.depend?" + Math.random(), "utf8", winit.initFail, "load list error");
}
// alert(navigator.userAgent);


