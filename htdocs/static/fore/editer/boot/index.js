
document.body.style.backgroundColor = "#000000";

winit.path = "/dst1/";//"/pi/0.1/";

winit.loadJS(winit.domains, '/dst1/pi/boot/init.js?5', "utf8", winit.initFail, "load init error");

winit.loadJS(winit.domains, '/dst1/editer/boot/next.js?418', "utf8", winit.initFail, "load next error");
winit.loadJS(winit.domains, '/dst1/editer/util/shortcuts.js', "utf8", winit.initFail, "load next error");

winit.loadJS(winit.domains, winit.path + '.depend?' + Math.random(), "utf8", winit.initFail, "load list error");
