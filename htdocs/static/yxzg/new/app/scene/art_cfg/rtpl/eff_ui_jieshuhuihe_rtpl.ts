/**
 * eff_ui_jieshuhuihe_rtpl
 */
export const eff_ui_jieshuhuihe_rtpl = (it: any) => {
    return {
        "name" : "eff_ui_jieshuhuihe",
        "type" : "node",
        "transform" : {
            "position" : it.position?[it.position[0], it.position[1], it.position[2]] : [-1086, -565, 200.0],
            "scale"    : it.scale?[it.scale[0], it.scale[1], it.scale[2]] : [53.5, 60.0, 60.0],
            "rotate"   : it.rotate?[it.rotate[0], it.rotate[1], it.rotate[2]] : [0, 0, 0]
        },
        "attachment": '2D',
        "animator"  : {
          "controller" : {
            "eff_ui_jieshuhuihe" : "33VP2hu5AjPq6jafdUVy1L.ai"
          },
          "aniBox"     : {
            "eff_ui_jieshuhuihe" : {
              "center" : [
                0.0,
                0.0,
                0.0
              ],
              "size"   : [
                1.0,
                1.0,
                1.0
              ]
            }
          },
          "playAnim"   : it.playAnim?it.playAnim:null
        },
        "children"  : [
          {
            "name" : "eff_ui_jieshuhuihe",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0,
                0.0,
                0.0
              ],
              "scale"    : [
                1.0,
                1.0,
                1.0
              ],
              "rotate"   : [
                0.0,
                0.0,
                0.0
              ]
            },
            "children"  : [
              {
                "name" : "fire",
                "type" : "node",
                "transform" : {
                  "position" : [
                    0.0799999982118607,
                    -0.0799999982118607,
                    0.0
                  ],
                  "scale"    : [
                    5.40000009536743,
                    4.40000009536743,
                    1.0
                  ],
                  "rotate"   : [
                    0.0,
                    0.0,
                    0.0
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "4RCTz8EDoKEFg52ZCCudfL.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : "GxD4hGXAWkSJ4xKtKknpgv.png"
                        }
                      },
                      "transparent" : true,
                      "blendSrc"    : 204,
                      "blendDst"    : 205,
                      "side"        : 2,
                      "tintColor"   : 8355711,
                      "tintOpacity" : 0.5,
                      "layer"       : 3000,
                      "blending"    : 5
                    }
                  ]
                }
              },
              {
                "name" : "glow1",
                "type" : "node",
                "transform" : {
                  "position" : [
                    0.0299999993294477,
                    -0.0299999993294477,
                    0.0
                  ],
                  "scale"    : [
                    5.30000019073486,
                    2.59999990463257,
                    1.0
                  ],
                  "rotate"   : [
                    0.0,
                    0.0,
                    0.0
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "4RCTz8EDoKEFg52ZCCudfL.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : "UrtwvCsjR4AysF6Vsg5xob.png"
                        }
                      },
                      "transparent" : true,
                      "blendSrc"    : 204,
                      "blendDst"    : 201,
                      "side"        : 2,
                      "tintColor"   : 8355711,
                      "tintOpacity" : 0.5,
                      "layer"       : 3000,
                      "blending"    : 5
                    }
                  ]
                }
              },
              {
                "name" : "glow2",
                "type" : "node",
                "transform" : {
                  "position" : [
                    0.0,
                    0.0,
                    0.0
                  ],
                  "scale"    : [
                    5.0,
                    2.5,
                    1.0
                  ],
                  "rotate"   : [
                    0.0,
                    0.0,
                    0.0
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "4RCTz8EDoKEFg52ZCCudfL.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : "7HqKmm44d6mJC6USKJD2vu.png"
                        }
                      },
                      "transparent" : true,
                      "blendSrc"    : 204,
                      "blendDst"    : 201,
                      "side"        : 2,
                      "tintColor"   : 8355711,
                      "tintOpacity" : 0.5,
                      "layer"       : 3000,
                      "blending"    : 5
                    }
                  ]
                }
              }
            ]
          }
        ]
    };
}