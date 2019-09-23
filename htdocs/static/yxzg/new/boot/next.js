// 加载监控代码
//(!winit.debug) && winit.loadJS(["http://hm.baidu.com"], "/hm.js?d8755f7f88e15470ad68a792c631daa5", "utf8");
//(!winit.debug) && winit.loadJS(["http://s4.cnzz.com"], "/z_stat.php?id=1256077742&web_id=1256077742", "utf8");
// 显示加载的动画效果，全屏， 遮挡后面的目录加载进度条和第一个组件。先显示一个播放一次的动画logo（TODO改成svg或gif动画显示logo），然后显示一个无限循环的动画，直到基础模块加载完毕
var md = navigator.userAgent.match(/\(([^\)]+)\)/),
    from = gcStorage.ptFrom ? JSON.parse(gcStorage.ptFrom).from : 'ganchukeji',
    next = true
//(new Image()).src=pi.config.server+"log?sid="+pi.config.sid+"&step=1";

winit.div_node = document.createElement('div')
winit.div_node.setAttribute('pi', '1')
winit.div_node.setAttribute(
    'style',
    `position:absolute;width:100%;height:100%;z-index:10000;background-image:url(${winit.domains[0] + '/dst/app/images/loginBg.jpg?8'});background-size:100% 100%;`
)
winit.div_node.id = 'circle'
document.body.appendChild(winit.div_node)
winit.pic_list = [winit.domains[0] + '/dst/app/images/LOGO.png?8']

winit.open_anim = function(list) {
    var clientHeight    = document.body.clientHeight || document.documentElement.clientHeight || document.documentElement.screen.availHeight;
    var lh = clientHeight/9;
    var sc = lh/256;
    var str =
        `position:absolute;top: ${clientHeight/25}px;left: ${clientHeight/25}px;height:${lh}px;width: ${512*sc}px;-webkit-transition: all 1s linear;-moz-transition: all 1s linear;-o-transition: all 1s linear;-ms-transition: all 1s linear;`
    var index = 0
    if (!winit.time_flag) winit.time_flag = new Date().getTime()
    if (list[index]) {
        var _node = document.createElement('img')
        _node.src = list[index]
        _node.setAttribute('style', str + 'opacity:0;')
        winit.div_node.appendChild(_node)

        index++
        _node.onload = function() {
            setTimeout(function() {
                _node.setAttribute('style', str + 'opacity:1;')
                setTimeout(function() {
                    var __func = function(_cb) {
                        _node.setAttribute('style', str + 'opacity:0;')
                        setTimeout(function() {
                            if (list[index]) {
                                winit.open_anim(list.splice(1, list.length))
                            } else {
                                _cb()
                                //winit.moveTime = (index+1)*(50+1500+1000);
                            }
                        }, 600)
                    }
                    if (list[index]) {
                        __func()
                        return
                    }
                    if (winit && winit.contiue_anim) {
                        __func(function() {
                            document.body.removeChild(winit.div_node)
                            // winit = undefined
                        })
                    } else {
                        winit.contiue_anim = (function(_cb) {
                            return function() {
                                __func(_cb)
                            }
                        })(function() {
                            document.body.removeChild(winit.div_node)
                            // winit = undefined
                        })
                    }
                }, 600)
            }, 50)
        }
    }
}
winit.open_anim(winit.pic_list)

// 依赖表加载成功后的回调函数
winit.initNext = function() {
    next = undefined
    var win = winit.win
    var startTime = winit.startTime
    console.log('init time:', Date.now() - startTime)
    pi_modules.depend.exports.init(winit.deps, winit.path)
    //进度条
    var div = document.createElement('div')
    div.setAttribute('pi', '1')
    div.setAttribute(
        'style',
        'position:absolute;width:100%;height:88px;bottom:0px;background:url(' +
            winit.domains[0] +
            '/dst/boot/title/loadbg.png) 0 0 repeat-x;z-index:100001;'
    )

    var divLight = document.createElement('div'),
        divProcess = document.createElement('div'),
        divProcLeft = document.createElement('div'),
        divProcRight = document.createElement('div'),
        loader = document.createElement("div"),
        loaderBar = document.createElement("div"),
        hel = document.createElement("div");
    hel.setAttribute("style","position:absolute;bottom:100px;left:50%;margin-left:-200px;width:400px;height:50px;line-height:25px;font-size:14px;text-align:center;color:#fff;")
    hel.innerText = "抵制不良游戏，拒绝盗版游戏。注意自我保护，谨防受骗上当。\n适度游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活。"
    divLight.setAttribute(
        'style',
        'position:absolute;top:0;left:0;width:100%;height:88px; background:url(' +
            winit.domains[0] +
            '/dst/boot/title/light.png) center -29px no-repeat;'
    )
    divProcess.setAttribute(
        'style',
        'position:absolute;top:15px;left:55px;right:55px; height: 11px; background:url(' +
            winit.domains[0] +
            '/dst/boot/title/pro_m.png) 0 0 repeat-x;'
    )
    divProcLeft.setAttribute(
        "style",
        "position:absolute;left:-4px;top:0;background:url(" +
        winit.domains[0] +
        "/dst/boot/title/pro_l.png) 0 0 no-repeat;"
    )
    divProcRight.setAttribute(
        "style",
        "position:absolute;right:-4px;top:0;background:url(" +
        winit.domains[0] +
        "/dst/boot/title/pro_r.png) 0 0 no-repeat;"
    )
    loader.setAttribute(
        "style",
        "position:absolute;left:1px;right:2px;top:1px;"
    )
    loaderBar.setAttribute(
        "style",
        "position:absolute;width:0;height:7px;background:url(" +
        winit.domains[0] +
        "/dst/boot/title/pro_light_m.jpg) 0 0 repeat-x;"
    )
    divProcess.appendChild(divProcLeft);
    divProcess.appendChild(divProcRight);
    loader.appendChild(loaderBar);
    divProcess.appendChild(loader);
    div.appendChild(divLight);
    div.appendChild(divProcess);
    var divText = document.createElement('div'),
        divPercent = document.createElement('div');
    divText.innerText = '拼命加载中 请耐心等待'
    divText.setAttribute(
        'style',
        'position:absolute;font-size:18px;color:#fff;width:324px;left:55px;height:85px;white-space:nowrap;line-height:85px;bottom:0;font-family:hanyi'
    )
    divPercent.innerText = "0%";
    divPercent.setAttribute(
        'style',
        'position:absolute;font-size:18px;color:#fff;width:324px;right:55px;height:85px;white-space:nowrap;text-align:right;line-height:85px;bottom:0;font-family:hanyi'
    )
    div.appendChild(divText)
    div.appendChild(divPercent)
    winit.div_node.appendChild(div)
    winit.div_node.appendChild(hel)
    var modProcess = pi_modules.commonjs.exports.getProcess()
    var dirProcess = pi_modules.commonjs.exports.getProcess()
    modProcess.value = 0
    dirProcess.value = 0
    modProcess.show(function(r) {
        modProcess.value = r * 0.3
        loaderBar.style.width =
            (modProcess.value + dirProcess.value) * 100 + '%';
        divPercent.innerText = Math.floor((modProcess.value + dirProcess.value) * 100) + '%';
    })
    dirProcess.show(function(r) {
        dirProcess.value = r * 0.7
        loaderBar.style.width =
            (modProcess.value + dirProcess.value) * 100 + '%'
        divPercent.innerText = Math.floor((modProcess.value + dirProcess.value) * 100) + '%';
    })
    console.log('第一次加载开始：' + (Date.now() - startTime))
    //第一次加载模块
    pi_modules.commonjs.exports.require(
        [
            'pi/util/html',
            "pi/gui_virtual/util",
            'app/mod/db',
            'app/mod/pi',
            'pi/worker/client',
            'pi/widget/util'
        ],
        {},
        function(mods, fm) {
            var time = Date.now() - startTime
            // console.log('first mods time:', time, mods)
            var html = mods[0],
                util = mods[1],
                pi = mods[3].Pi,
                setLog = mods[3].setLog,
                findGlobalReceive = mods[3].findGlobalReceive,
                worker = mods[4],
                widgetUtil = mods[5]
            // 判断是显示片头界面还是开始界面
            var flags = html.userAgent(winit.flags)
            pi_modules.commonjs.exports.flags = flags
            var domains = winit.httpDomains || winit.domains,
                remote = winit.remote,
                main = winit.main
            // TODO 显示加载进度条
            pi.openUrl =
                winit.remoteDomain.indexOf('https') === 0
                    ? 'wss://' + remote + main + ':11002'
                    : 'ws://' + remote + main + ':11001'
            // pi.openUrl = "ws://" + remote+main + ":11002";
            pi.flags = flags
            pi.startTime = startTime
            pi.mod = {
                global: [],
                absUrl: pi_modules.butil.exports.relativePath
            }

            pi.sid =
                Date.now().toString(36) +
                'X' +
                Math.floor(Math.random() * 0xffffffff).toString(36)
            pi.localStorage = gcStorage
            pi.location = {
                main: main,
                domains: domains,
                remote: remote
            }
            pi.server = domains[domains.length - 1] + '/'
            pi.debug = winit.debug
            //平台登录接口绑定
            pi.regist = winit.piRegister
            pi.login = winit.piLogin
            pi.ptId = winit.piPtId
            pi.pay = winit.piPay
            pi.ptUpload = winit.ptUpload
            pi.language = "ch"

            setLog('log', {
                sid: pi.sid,
                step: 1,
                platform: from ? from : 'ganchukeji',
                phone: encodeURI(md ? md[1].replace(';', '') : 'pc')
            })
            // 启动计算线程
            worker.create('calc', 2, ['pi/util/img'], fm)
            worker.request(
                'calc',
                'pi/util/hash',
                'calcHashTime',
                ['asdf', 1000],
                undefined,
                900,
                0,
                function(r) {
                    var cpu = (r.count / r.time) | 0
                    if (!gcStorage.cpu || gcStorage.cpu < cpu)
                        gcStorage.cpu = cpu
                    if (winit && winit.setSceneScale) {
                        winit.setSceneScale(gcStorage.cpu, flags)
                        delete winit.setSceneScale
                    }
                    console.log(
                        'calc hash count per ms: ' + ((r.count / r.time) | 0)
                    )
                },
                function(err) {
                    console.log(err)
                }
            )
            // 加载基础及初始目录，显示加载目录的进度动画
            console.log('二次加载开始：' + (Date.now() - startTime))
            //第一次加载app模块
            var loadFirstApp = function() {
                // alert("loaddir !!");
                util.loadDir(
                    [
                        // "pi/ui/",
                        //"pi/render3d/", "pi/net/",
                        "pi/gui_root/",
                        "pi/gui_ui/",
                        'app/',
                        'fight/',
                        'app/scene_res',
                        'app_b/',
                        'app_c/',
                        'cfg/',
                        'app_a/',
                        'tool/'
                    ],
                    flags,
                    {},
                    {
                        png: 'download',
                        jpg: 'download',
                        jpeg: 'download',
                        webp: 'download',
                        gif: 'download',
                        svg: 'download',
                        mp3: 'download',
                        ogg: 'download',
                        aac: 'download'
                    },
                    function(fileMap) {
                        var Music = pi_modules["app/mod/music"].exports.Music;
                        // Music.playBgMusci("wild_bg");
                        // alert("loaddir back");
                        //播放音乐
                        // var Music = pi_modules["app/mod/music"].exports.Music;
                        // Music.playBgMusci("forest_bg");
                        var butil = pi_modules.butil.exports,
                            cfgMgr =
                                pi_modules['app/mod/cfg_mgr'].exports.CfgMgr
                        var words = [],
                            findCh = function(str) {
                                var ch = str.match(/[^\x00-\xff]/g)
                                if (!ch) {
                                    return
                                }
                                for (let i = 0, len = ch.length; i < len; i++) {
                                    if (words.indexOf(ch[i]) >= 0) {
                                        continue
                                    }
                                    words.push(ch[i])
                                }
                            }
                        //解析配置
                        for (var k in fileMap) {
                            if (butil.fileSuffix(k) === 'config') {
                                if (k == 'cfg/init.config') {
                                    cfgMgr.init(
                                        JSON.parse(butil.utf8Decode(fileMap[k]))
                                    )
                                    continue
                                }
                                cfgMgr.add(
                                    k,
                                    JSON.parse(butil.utf8Decode(fileMap[k]))
                                )
                                // findCh(butil.utf8Decode(fileMap[k]))
                            }
                        }
                        // words.sort()
                        // console.log(words.join(''))
                        // console.log('二次加载结束：' + (Date.now() - startTime))
                        setLog('log', {
                            sid: pi.sid,
                            step: 2
                        })

                        var tab = widgetUtil.loadCssRes(fileMap)
                        // 将预加载的资源缓冲60秒，释放
                        tab.timeout = 300000
                        if (pi.flags.os.name === 'ios') tab.release()

                        var root = pi_modules.commonjs.exports.relativeGet(
                            'app/mod/pi'
                        ).exports
                        root.rootCfg.width = 900
                        root.rootCfg.height = 540
                        //初始化场景
                        var scene = pi_modules['app/scene/scene'].exports;
                        // var UIListener =
                        //     pi_modules['app/scene/uiNodeListener'].exports
                        // if (gcStorage.cpu) {
                        //     scene.setScale(gcStorage.cpu, pi.flags)
                        // } else {
                        //     winit.setSceneScale = scene.setScale
                        // }
                        try {
                            // scene.Mgr.init();
                            // scene.initScene();
                            // UIListener.init()
                        } catch (e) {
                            if (e.message.indexOf('getExtension') >= 0) {
                                alert(
                                    '😥webgl不见了，游戏场景将无法正常运行（' +
                                        e.message +
                                        '）'
                                )
                            } else alert(e.message)
                        }
                        // 加载根组件
                        // if(canvas)document.body.appendChild(canvas);
                        // alert("addSceneRes start");
                        //添加场景资源
                        pi_modules['pi/render3d/load'].exports.addSceneRes(
                            fileMap,
                            'app/scene_res/'
                        )
                        // alert("addSceneRes end");
                        pi_modules.commonjs.exports
                            .relativeGet('app_a/connect/connect')
                            .exports.main(function() {
                                // pi_modules.commonjs.exports.relativeGet("app_a/user/user").exports.main();
                                pi_modules['app/main'].exports.initOK();
                                // pi_modules['app_a/user/login'].exports.goLogin()
                            })
                        if (winit.contiue_anim) {
                            winit.contiue_anim()
                        } else winit.contiue_anim = Date.now()
                        for(let k in fileMap){
                            delete fileMap[k];
                        }
                    },
                    function(r) {
                        alert('加载目录失败, ' + r.error + ':' + r.reason)
                    },
                    dirProcess.handler
                )
            }
            html.checkWebpFeature(function(r) {
                flags.webp = flags.webp
                loadFirstApp()
            })
        },
        function(result) {
            alert('加载基础模块失败, ' + result.error + ':' + result.reason)
        },
        modProcess.handler
    )
}

// 初始化开始
;(winit.init = function() {
    //winit.deps && self.pi_modules && winit.initNext();
    winit.setLog && winit.setLog()
    if (!next) return
    winit.deps && self.pi_modules && self._babelPolyfill && winit.initNext()
    !self._babelPolyfill && setTimeout(winit.init, 100)
})()
