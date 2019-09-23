/**
 *
 */
(<any>window).winit = {
    domains: ['http://192.168.31.22:8080'],// 资源服务器地址
    debug: false,
    path: '/',
    remoteDomain: '192.168.31.22',  // websocket连接IP
    port: 1234,                     // websocket端口
    init: () => void 0,
    limitSize: 1024 * 1024 * 45,    // 资源下载限制，下载的资源超过该大小后保存到本地临时目录中，需重复下载
    isWXMiniGame: navigator.userAgent.search("WX_GAME") >= 0,
};

// alert适配新的开发者具工
if (navigator.platform === 'devtools' && window.__global && window.__global.alert) {
    window.alert = window.__global.alert;
} else {
    window.alert = (str) => {
        console.log('alert:', str);
    };
}
