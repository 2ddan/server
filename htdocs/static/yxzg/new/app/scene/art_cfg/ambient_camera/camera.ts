/**
 * 相机配置
 */
export const cameraJson = {
    /**
     * 2D相机
     */
    "camera2D": () => {
        const num = 2;
        return {
            "transform": {
                "position": [0.0, 0.0, 0.0],
                "rotate": [0.261799335479736, 3.14159297943115, 0.0],
                "scale": [1, 1, -1]
            },
            "camera": {
                "scene3D": false,
                "ortho" : [0, 1334, 0, -750, -10000, 10000]
            }
        };
        // "ortho" : [0, 1334, 0, -750, -10000, 10000]
    },
    /**
     * 地图
     */
    "map": () => {
        const num = 66;
        return {
            "transform": {
                "position" : [30.0, 24.0, 24.0],
                "rotate": [0.785398185253143, 3.14159297943115, 2.00971814331378E-14],
                "scale": [1, 1, -1]
            },
            "camera": {
                "scene3D": false,
                "ortho" : [-1334/num, 1334/num, 750/num, -750/num, -10000, 10000]
            }
        };
    },
    /**
     * 战斗
     */
    "fight": () => {
        const num = 114;
        return {
            "transform": {
                "position": [0.0, 6.0, 14.0],
                "rotate": [0.261799335479736, 3.14159297943115, 0.0],
                "scale": [1, 1, -1]
            },
            "camera": {
                "scene3D": false,
                "ortho" : [-1334/num, 1334/num, 750/num, -750/num, -10000, 10000]
            }   
        };
    },
    /**
     * 选角
     */
    "selectUser": () => {
        const num = 230;
        return {
            "transform" : {
                "position" : [-2.05999994277954, 5.59999990463257, 14.0],
                "rotate"   : [0.261799335479736, 3.14159297943115, 0.0],
                "scale"    : [1.0, 1.0, -1.0],
            },
            "camera": {
                "scene3D": false,
                "ortho" : [-1334/num, 1334/num, 750/num, -750/num, -10000, 10000]
            }   
        };
    }
};