// 加载监控代码
//(!winit.debug) && winit.loadJS(["http://hm.baidu.com"], "/hm.js?d8755f7f88e15470ad68a792c631daa5", "utf8");
//(!winit.debug) && winit.loadJS(["http://s4.cnzz.com"], "/z_stat.php?id=1256077742&web_id=1256077742", "utf8");
// 显示加载的动画效果，全屏， 遮挡后面的目录加载进度条和第一个组件。先显示一个播放一次的动画logo（TODO改成svg或gif动画显示logo），然后显示一个无限循环的动画，直到基础模块加载完毕
var md = navigator.userAgent.match(/\(([^\)]+)\)/),
    from = gcStorage.ptFrom?JSON.parse(gcStorage.ptFrom).from:"ganchukeji",
    next = true;
//(new Image()).src=pi.config.server+"log?sid="+pi.config.sid+"&step=1";

winit.div_node = document.createElement('div');
winit.div_node.setAttribute("pi", "1");
winit.div_node.setAttribute("style", "position:absolute;width:100%;height:100%;z-index:10000;background:url("+winit.domains[0]+"/dst/app/style/images/bg.jpg) 0 0 no-repeat/100% 100%;");
winit.div_node.id = "circle"; 
document.body.appendChild(winit.div_node);
winit.pic_list = [winit.domains[0]+"/dst/app/style/images/logo.png?6"];

winit.open_anim=function(list){
	var str = "position:absolute;top: 40px;left: 17%;width: 66%;margin: auto 0;-webkit-transition: all 1s linear;-moz-transition: all 1s linear;-o-transition: all 1s linear;-ms-transition: all 1s linear;";
	var index = 0;
	if(!winit.time_flag)winit.time_flag = new Date().getTime();
	if(list[index]){
		var _node = document.createElement("img");
		_node.src = list[index];
		_node.setAttribute("style",str + "opacity:0;");
		winit.div_node.appendChild(_node);
		
		index++;
		_node.onload = function(){
			setTimeout(function(){
				_node.setAttribute("style",str+"opacity:1;");
				setTimeout(function(){
                    
                    var __func = function(_cb){
                        _node.setAttribute("style",str+"opacity:0;");
                        setTimeout(function(){
                            if(list[index]){
                                winit.open_anim(list.splice(1,list.length));
                            }else{
                                _cb();
                                //winit.moveTime = (index+1)*(50+1500+1000);
                                
                            }
                        },600);
                    };
                    if(list[index]){
                        __func();
                        return;
                    }
					if(winit&&winit.contiue_anim){
                        __func(function(){
                            document.body.removeChild(winit.div_node);
                            winit = undefined;
                        });
                    }else{
                        winit.contiue_anim = (function(_cb){
                            return function(){
                                __func(_cb);
                            }
                        })(function(){
                            document.body.removeChild(winit.div_node);
                            winit = undefined;
                        });
                    }
				},600);
			},50);
		}
	}
}
winit.open_anim(winit.pic_list);

// 依赖表加载成功后的回调函数
winit.initNext = function() {
    next = undefined;
    var win = winit.win;
	var startTime = winit.startTime;
	console.log("init time:", Date.now() - startTime);
    pi_modules.depend.exports.init(winit.deps, winit.path); 
    //进度条
    var div = document.createElement('div');
	div.setAttribute("pi", "1");
    div.setAttribute("style", "position:absolute;width:100%;height:15px;bottom:0px;background:url("+winit.domains[0]+"/dst/app/style/images/load_back.png) 0 0 no-repeat;z-index:100001;background-size: 100% 100%;");
    
	var divProcess = document.createElement('div');
    divProcess.setAttribute("style", "width: 0; float: left; height: 100%; background:url("+winit.domains[0]+"/dst/app/style/images/load_fore.png) 1px -1px no-repeat;background-size: 100% 100%;");
    div.appendChild(divProcess);

    var divText = document.createElement("div");
    divText.innerText = "拼命加载中 请耐心等待";
    divText.setAttribute("style", "position:absolute;font-size:22px;color:#fff;width:324px;left:50%;margin-left:-162px;height:85px;text-align:center;line-height:85px;top:-106px;background:url("+winit.domains[0]+"/dst/app/style/images/text_bg.png) 0 0 no-repeat;text-shadow:1px 0px 0px #000, -1px 0px 0px #000, 0px 1px 0px #000, 0px -1px 0px #000");
    div.appendChild(divText);
	winit.div_node.appendChild(div);
    var modProcess = pi_modules.commonjs.exports.getProcess();
	var dirProcess = pi_modules.commonjs.exports.getProcess();
    modProcess.value = 0;
    dirProcess.value = 0;
	modProcess.show(function(r){
		modProcess.value = r*0.3;
		divProcess.style.width = (modProcess.value + dirProcess.value) * 100 + "%";
	});
	dirProcess.show(function(r){
		dirProcess.value = r*.7;
		divProcess.style.width = (modProcess.value + dirProcess.value) * 100 + "%";
	});
    console.log("第一次加载开始："+(Date.now() - startTime));
    //第一次加载模块
    var firstLoad = pi_modules.commonjs.exports.require(["pi/util/html", "pi/widget/util","app/mod/db","app/mod/pi","pi/worker/client"],{}, function(mods,fm) {
 		var time = Date.now() - startTime;
		console.log("first mods time:", time, mods);
		var html = mods[0], util = mods[1], pi=mods[3].Pi,setLog=mods[3].setLog,findGlobalReceive = mods[3].findGlobalReceive, worker = mods[4], markFilesLoad = mods[3].markFilesLoad;
        // 判断是显示片头界面还是开始界面
        var flags = html.userAgent(winit.flags);
        pi_modules.commonjs.exports.flags = flags;
        var domains = winit.domains,
            remote  = winit.remote,
            main = winit.main;
        // TODO 显示加载进度条
        pi.openUrl = "ws://" + remote+main + ":11001";
        pi.flags = flags;
        pi.startTime = startTime;
        pi.mod = {global:[], absUrl:pi_modules.butil.exports.relativePath};
        
        pi.sid = Date.now().toString(36) +"X" + Math.floor(Math.random() * 0xffffffff).toString(36);
        pi.localStorage = gcStorage;
        pi.location = {
            main : main,
            domains : domains,
            remote : remote
        };
        pi.server = domains[domains.length-1]+"/";
        pi.debug = winit.debug;
        //平台登录接口绑定
        pi.regist = winit.piRegister;
        pi.login = winit.piLogin;
        pi.ptId = winit.piPtId;
        pi.pay = winit.piPay;
        pi.ptUpload = winit.ptUpload;
        
        //文件下载标记
        markFilesLoad(firstLoad.fileMap);
        firstLoad = null;

        setLog("log",{
            sid : pi.sid,
            step : 1,
            platform : (from?from:"ganchukeji"),
            phone : encodeURI(md?md[1].replace(";", ""):"pc")
        });
        // 启动计算线程
        worker.create("calc", 2, ["pi/util/img"], fm);
            worker.request("calc", "pi/util/hash", "calcHashTime", ["asdf", 1000], undefined, 900, 0, function (r) {
                var cpu = r.count/r.time | 0;
                if(!gcStorage.cpu || gcStorage.cpu < cpu)gcStorage.cpu = cpu;
                if(winit && winit.setSceneScale){
                    winit.setSceneScale(gcStorage.cpu);
                    delete winit.setSceneScale;
                }
                console.log("calc hash count per ms: "+ (r.count/r.time | 0));
            }, function(err) {
                console.log(err);
            });
        // 加载基础及初始目录，显示加载目录的进度动画
        console.log("二次加载开始："+(Date.now() - startTime));
        //第一次加载app模块
        var loadFirstApp = function(){
            // alert("loaddir !!");
            util.loadDir([
                "pi/ui/","pi/browser/","pi/lang/mod",
                //"pi/render3d/", "pi/net/", 
                "app/mod/", "app/scene/", "app/scene_res/res/scene/", "app/style/","app/widget/", 
                "app_a/","cfg/a/"
            ], flags,{}, {png:"download", jpg:"download", jpeg:"download", webp:"download", gif:"download", svg:"download", mp3:"download", ogg:"download", aac:"download"}, function(fileMap) {
                
                let gotoGame = function () {
                    //播放音乐
                    var Music = pi_modules["app/mod/music"].exports.Music;
                    Music.playBgMusci("forest_bg");
                    console.log("二次加载结束："+(Date.now() - startTime));
                    var fms = fileMap;
                    console.log(fileMap);
                    setLog("log",{
                        sid : pi.sid,
                        step : 2
                    });
                    //文件下载标记
                    markFilesLoad(fms);
                    //绑定全局广播函数
                    findGlobalReceive(fms);
                    // alert("loadCssRes start");
                    var tab = util.loadCssRes(fms);
                    // 将预加载的资源缓冲60秒，释放
                    tab.timeout = 120000;
                    // if(pi.flags.os.name == "ios")
                    // tab.release();
                    //clear();
                    // alert("loadCssRes end");
                    //初始化场景
                    var scene = pi_modules["app/scene/scene"].exports;
                    if(gcStorage.cpu){
                        scene.setScale(gcStorage.cpu,pi.flags);
                    }else{
                        winit.setSceneScale = scene.setScale;
                    }
                    try{
                        scene.mgr.init();
                    }catch(e){
                        if(e.message.indexOf("getExtension")>=0){
                            alert("😥webgl不见了，游戏场景将无法正常运行（"+e.message+"）");
                        }else alert(e.message);
                    }
                    // alert("addSceneRes start");
                    //添加场景资源
                    pi_modules["pi/render3d/load"].exports.addSceneRes(fms, "app/scene_res/");
                    // alert("addSceneRes end");
                    //解析场景模型模板
                    var template = pi_modules["app/scene/scene"].exports.set_cfg;
                    template(fms);
                    // alert("scene template end");
                    // 加载根组件
                    var root = pi_modules.commonjs.exports.relativeGet("pi/ui/root").exports;
                    root.cfg.width = 540;
                    root.cfg.height = 900;
                    var w = pi_modules.commonjs.exports.relativeGet("pi/widget/widget").exports.factory("app-widget-root");
                    w.paint();
                    document.body.appendChild(w.tree.link);
                    // w = pi_modules.commonjs.exports.relativeGet("pi/widget/widget").exports.factory("app-widget-ani");
                    // w.paint();
                    // document.body.appendChild(w.tree.link);
                    setLog("log",{
                        sid : pi.sid,
                        step : 3
                    });
                    var loadForelet = function(){
                        pi_modules["app_a/connect/main"].exports.initOK(function(){
                            setLog("log",{
                                sid : pi.sid,
                                step : 4
                            });
                            try{
                                pi_modules["app_a/user/user"].exports.initOK();
                            }catch(e){
                                alert(e);
                            }
                            setLog("log",{
                                sid : pi.sid,
                                step : 5
                            });
                            if(winit.contiue_anim){
                                winit.contiue_anim();
                            }else winit.contiue_anim = Date.now();
                        });
                    };
                    try{
                        // alert("open connect");
                        //打开网络通讯组件
                        root.open("app_a-connect-main");
                        loadForelet();
                        //初始化引导配置
                        pi_modules["app_a/guide/guide"].exports.init();
                        //初始化提示
                        // var tipFun = pi_modules["app/mod/tip_fun"].exports.TipFun,
                        // tipsCfg = pi_modules["app/mod/tips_cfg"].exports.tipsCfg;
                        // tipFun.init(tipsCfg());
                        //清除storage
                        if(!pi_modules.store.exports.check())
                            pi_modules.load.exports.clear();
                        
                        for(var k in fileMap){
                            delete fileMap[k];
                        }
                    }catch(e){
                        alert(e);
                    }
                }
                if (pi_modules.load.exports.isNativeBrowser()) {
                    let sdk = pi_modules["app/mod/sdk"].exports;
                    console.log(sdk);
                    //绑定平台上传用户信息接口
                    pi.ptUpload = sdk.ptUpload;
                    // 绑定平台支付
                    pi.pay = sdk.piPay;
                    sdk.sdkLogin(gotoGame);
                } else {
                    gotoGame();
                }
            }, function(r) {
                alert("加载目录失败, " + r.error + ":" + r.reason);
            }, dirProcess.handler);
        };
        // try{
            html.checkWebpFeature(function(r){
                flags.webp = flags.webp;
                loadFirstApp();
            });
        // }catch(e){
        //     alert(e);
        // }
        
        // loadFirstApp();
        
    }, function(result) {
        alert("加载基础模块失败, " + result.error + ":" + result.reason);
    }, modProcess.handler);
};

// 初始化开始
(winit.init = function() {
    //winit.deps && self.pi_modules && winit.initNext();
    winit.setLog && winit.setLog();
    if(!next) return;
	winit.deps && self.pi_modules && self._babelPolyfill && winit.initNext();
	(!self._babelPolyfill) && setTimeout(winit.init, 100);
})();