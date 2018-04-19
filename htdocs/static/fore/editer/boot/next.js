'use strict';
// 加载监控代码
//(!winit.debug) && winit.loadJS(["http://hm.baidu.com"], "/hm.js?d8755f7f88e15470ad68a792c631daa5", "utf8");
//(!winit.debug) && winit.loadJS(["http://s4.cnzz.com"], "/z_stat.php?id=1256077742&web_id=1256077742", "utf8");
// 依赖表加载成功后的回调函数
winit.initNext = function() {
	var win = winit.win;
	win._babelPolyfill = 1;
	win.pi_modules = 1;
	win.Map = 1;
	var startTime = winit.startTime;
	console.log("init time:", Date.now() - startTime);
	// 清除运营商注入的代码
	var clear = function() {
		//清除window上新增的对象
		var k;
		for(k in window){
			if(window.hasOwnProperty(k) && !win[k])
				window[k] = null;
		}
		//清除body里面的非pi元素（自己添加的元素都有pi属性）
		var i, arr = document.body.children;
		for(i = arr.length - 1; i >= 0; i--) {
			k = arr[i];
			if(!k.getAttribute("pi"))
				document.body.removeChild(k);
		}
	};

	//clear();
	pi_modules.depend.exports.init(winit.deps, winit.path);
	var flags = winit.flags;
	winit = undefined;//一定要立即释放，保证不会重复执行
	var div = document.createElement('div');
	div.setAttribute("pi", "1");
	div.setAttribute("style", "position:absolute;bottom:10px;left: 2%;width: 95%;height: 10px;background: #262626;padding: 1px;border-radius: 20px;border-top: 1px solid #000;border-bottom: 1px solid #7992a8;");
	var divProcess = document.createElement('div');
	divProcess.setAttribute("style", "width: 0%;height: 100%;background-color: rgb(162, 131, 39);border-radius: 20px;");
	div.appendChild(divProcess);
	document.body.appendChild(div);
	var modProcess = pi_modules.commonjs.exports.getProcess();
	var dirProcess = pi_modules.commonjs.exports.getProcess();
	modProcess.show(function(r){
		modProcess.value = r*0.2;
		divProcess.style.width = (modProcess.value + dirProcess.value) * 100 + "%";
	});
	dirProcess.show(function(r){
		dirProcess.value = r*0.8;
		divProcess.style.width = (modProcess.value + dirProcess.value) * 100 + "%";
	});

    //加载基础模块
	pi_modules.commonjs.exports.require(["pi/util/html","pi/util/tpl", "pi/widget/util","pi/compile/vdom", "pi/compile/genvdom","pi/worker/client"], {}, function(mods, fm) {
		console.log("first mods time:", Date.now() - startTime, mods, Date.now());
		var html = mods[0], tpl = mods[1], util = mods[2], vdom = mods[3], genvdom = mods[4], worker = mods[5];
		// 判断是否第一次进入,决定是显示片头界面还是开始界面
		var userinfo = html.getCookie("userinfo");
		pi_modules.commonjs.exports.flags = html.userAgent(flags);
		flags.userinfo = userinfo;

		util.setTplFun(function(tplStr, filename) {return { value: tpl.toFun(genvdom.gen(vdom.parserTpl(tplStr)), filename), path: filename, wpath: null, str: tplStr}});

        //加载基础组件
		util.loadDir(["pi/worker/init.wjs","editer/temp/", "editer/mgr/widget_mgr.js","editer/style/","editer/ui_component/", "pi/ui/", "pi/util/","editer/environment/", "editer/forelet/"], flags, fm, {png:"download", jpg:"download", jpeg:"download", webp:"download", gif:"download", svg:"download", mp3:"download", ogg:"download", aac:"download"}, function(fileMap) {
			console.log("first load dir time:", Date.now() - startTime, fileMap, Date.now());
			var tab = util.loadCssRes(fileMap);
			// 将预加载的资源缓冲90秒，释放
			tab.timeout = 90000;
			tab.release();
			//clear();
			console.log("res time:", Date.now() - startTime);
			// 启动计算线程
			worker.create("calc", 2, ["pi/util/img"], fm);
			worker.request("calc", "pi/util/hash", "calcHashTime", ["asdf", 1000], undefined, 900, 0, function (r) {
				console.log("calc hash count per ms: "+ (r.count/r.time | 0));
			}, function(err) {
				console.log(err);
			});

            //加载编辑器依赖组件
            let widgetMgr = pi_modules.commonjs.exports.relativeGet("editer/mgr/widget_mgr").exports;
			let loadDirs = pi_modules.commonjs.exports.relativeGet("editer/user_cfg").exports.userCfg.loadDirs;
			
            util.loadDir(loadDirs, flags, fm, {png:"download", jpg:"download", jpeg:"download", webp:"download", gif:"download", svg:"download", mp3:"download", ogg:"download", aac:"download"}, function(fileMap) {
                var tab = util.loadCssRes(fileMap);
                // 将预加载的资源缓冲90秒，释放
                tab.timeout = 90000;
                tab.release();
           
                var root = pi_modules.commonjs.exports.relativeGet("pi/ui/root").exports;// 加载根组件
                root.cfg.full = true;//PC模式
				util.addWidget(document.body, "pi-ui-root");//打开根组件
				document.oncontextmenu = function(){return false;};//禁用浏览器右键菜单           
                setTimeout(function() {
					widgetMgr.init();//打开编辑器界面
				}, 1000);
                document.body.removeChild(div);//移除初始进度条

                }, function(result){
                    alert("加载基础模块失败, "+result.error + ":" + result.reason);
                }, modProcess.handler)
			
		}, function(r){
			alert("加载目录失败, "+r.error + ":" + r.reason);
		}, dirProcess.handler);
	}, function(result){
		alert("加载基础模块失败, "+result.error + ":" + result.reason);
	}, modProcess.handler);
};
// 初始化开始
(winit.init = function () {
	if(!winit) return;
	winit.deps && self.pi_modules && self.pi_modules.butil && self._babelPolyfill && winit.initNext();
	(!self._babelPolyfill) && setTimeout(winit.init, 100);
})();
