/**
 * eff_ui_taozhuangjihuo_rtpl
 */
export const eff_ui_taozhuangjihuo_rtpl = (it: any) => {
    return { 
        "name": "eff_ui_taozhuangjihuo ",
        "type": "node", 
        "transform": {
            "position" : it.position ? [it.position[0], it.position[1], it.position[2]] : [-78, -178, 200.0],                                             
            "scale"    : it.scale    ? [it.scale[0],    it.scale[1],    it.scale[2]]    : [60.0, 60.0, 60.0],               
            "rotate"   : it.rotate   ? [it.rotate[0],   it.rotate[1],   it.rotate[2]]   : [0, 0, 0]    
        }, 
        "attachment": '2D', 
        "animator": {
            "controller": {
                "eff_ui_taozhuangjihuo": "JACRdcMxnGH9wxYYrShCAL.ai"
            },
            "aniBox": {
                "eff_ui_taozhuangjihuo": {
                    "center": [
                        0.0,
                        0.0,
                        0.0
                    ],
                    "size": [
                        1.0,
                        1.0,
                        1.0
                    ]
                }
            },
            "playAnim": it.playAnim ? it.playAnim : null
        },
        "children": [
            {
                "name": "eff_ui_taozhuangjihuo ",
                "type": "node",
                "transform": {
                    "position": [
                        0.0,
                        0.0,
                        0.0
                    ],
                    "scale": [
                        1.0,
                        1.0,
                        1.0
                    ],
                    "rotate": [
                        0.0,
                        0.0,
                        0.0
                    ]
                },
                "children": [
                    {
                        "name": "glow1",
                        "type": "node",
                        "transform": {
                            "position": [
                                0.0,
                                0.0700000002980232,
                                0.0
                            ],
                            "scale": [
                                2.79999995231628,
                                2.79999995231628,
                                2.79999995231628
                            ],
                            "rotate": [
                                6.02138614654541,
                                0.0,
                                0.0
                            ]
                        },
                        "geometry": {
                            "type": "BufferGeometry",
                            "res": "4RCTz8EDoKEFg52ZCCudfL.geo"
                        },
                        "meshRender": {
                            "material": [
                                {
                                    "type": "MeshParticlesMaterial",
                                    "map": {
                                        "generateMipmaps": false,
                                        "image": {
                                            "name": "AU4wZJco7fjRURzwv5C8kt.png"
                                        }
                                    },
                                    "transparent": true,
                                    "blendSrc": 204,
                                    "blendDst": 205,
                                    "side": 2,
                                    "tintColor": 9803157,
                                    "tintOpacity": 0.501960813999176,
                                    "layer": 3000,
                                    "blending": 5
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    }
}