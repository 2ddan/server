var canvas, gl, glRenderer, models,devices = {
    "Apple A7 GPU": {
        1136: ["iPhone 5", "iPhone 5s"],
        2048: ["iPad Air", "iPad Mini 2", "iPad Mini 3"]
    },

    "Apple A8 GPU": {
        1136: ["iPod touch (6th generation)"],
        1334: ["iPhone 6"],
        2208: ["iPhone 6 Plus"],
        2048: ["iPad Air 2", "iPad Mini 4"]
    },

    "Apple A9 GPU": {
        1136: ["iPhone SE"],
        1334: ["iPhone 6s"],
        2208: ["iPhone 6s Plus"],
        2224: ["iPad Pro (9.7-inch)"],
        2732: ["iPad Pro (12.9-inch)"]
    },

    "Apple A10 GPU": {
        1334: ["iPhone 7"],
        2208: ["iPhone 7 Plus"]
    },

    "Apple A11 GPU": {
        1334: ["iPhone 8"],
        2208: ["iPhone 8 Plus"],
        1624: ["iPhone x"]
    }
};
export class Device {



    static getCanvas() {
        if (canvas == null) {
            canvas = document.createElement('canvas');
        }

        return canvas;
    }

    static getGl() {
        if (gl == null) {
            gl = Device.getCanvas().getContext('experimental-webgl');
        }

        return gl;
    }

    static getScreenWidth() {
        return Math.max(screen.width, screen.height) * (window.devicePixelRatio || 1);

    }

    static getGlRenderer() {
        if (glRenderer == null) {
            var debugInfo = Device.getGl().getExtension('WEBGL_debug_renderer_info');
            glRenderer = debugInfo == null ? 'unknown' : Device.getGl().getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        }

        return glRenderer;
    }

    static getModels() {
        if (models == null) {
            var device = devices[Device.getGlRenderer()];

            if (device == undefined) {
                models = ['unknown'];
            } else {
                models = device[Device.getScreenWidth()];

                if (models == undefined) {
                    models = ['unknown'];
                }
            }
        }

        return models;
    }
    static getSystem(){
        var events = navigator.userAgent;
        let text = "";
        if(events.indexOf('Android')>-1 || events.indexOf('Linux')>-1 || events.indexOf('Adr')>-1){
            text = "android";
        }else if(events.indexOf('iPhone')>-1){
            //根据尺寸进行判断 苹果的型号
            // if(screen.height == 812 && screen.width == 375){
            //     console.log("苹果X");
            // }else if(screen.height == 736 && screen.width == 414){
            //     console.log("iPhone7P - iPhone8P - iPhone6");
            // }else if(screen.height == 667 && screen.width == 375){
            //     console.log("iPhone7 - iPhone8 - iPhone6");
            // }else if(screen.height == 568 && screen.width == 320){
            //     console.log("iPhone5");
            // }else{
            //     console.log("iPhone4");
            // }
            text = "IOS";
        }else if(events.indexOf('Windows Phone')>-1){
            //console.log("诺基亚手机");
            text = "Windows Phone";
        }else if(events.indexOf("iPad")>-1){
            //console.log("平板");
            text = "iPad";
        }else{
            text = "PC";
        }
        return text
    }
    
}


