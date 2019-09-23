/**
 * eff_ui_skillcd01_rtpl
 */
export const eff_ui_skillcd01_rtpl = (it: any) => {
    return{
      "name" : "eff_ui_skillcd01",
      "type" : "node",
      "transform" : {
        "position" : it.position ? [it.position[0], it.position[1], it.position[2]] : [-1264, -107, 200.0],   
        "scale"    : it.scale    ? [it.scale[0],    it.scale[1],    it.scale[2]]    : [60.0, 60.0, 60.0],
        "rotate"   : it.rotate   ? [it.rotate[0],   it.rotate[1],   it.rotate[2]]   : [0, 0, 0]
      },   
      "attachment": "2D",
      "animator"  : {
        "controller" : {
          "eff_ui_skillcd01" : "CzkNoJwSehENxTXLh74G1M.ai"
        },
        "aniBox"     : {
          "eff_ui_skillcd01" : {
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
          "name" : "eff_ui_skillcd01",
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
              "name" : "ray1",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.0260000005364418,
                  -0.0529999993741512,
                  0.0
                ],
                "scale"    : [
                  5.19999980926514,
                  5.19999980926514,
                  5.0
                ],
                "rotate"   : [
                  6.02138614654541,
                  0.0,
                  0.0
                ]
              },
              "geometry"  : {
                "type" : "BufferGeometry",
                "res"  : "SjX8HESNAdjs3qL774HTJH.geo"
              },
              "meshRender" : {
                "material" : [
                  {
                    "type" : "MeshParticlesMaterial",
                    "map"  : {
                      "wrap" : [
                        1001,
                        1001
                      ],
                      "generateMipmaps" : false,
                      "image"           : {
                        "name" : "7JFfHRHC1hxJSu6JbwK8Vs.png"
                      }
                    },
                    "vertexColors" : 2,
                    "transparent"  : true,
                    "blendSrc"     : 204,
                    "blendDst"     : 201,
                    "side"         : 2,
                    "tintColor"    : 16762235,
                    "tintOpacity"  : 0.0,
                    "layer"        : 3000,
                    "blending"     : 5
                  }
                ]
              }
            },
            {
              "name" : "trail1",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.0,
                  0.0,
                  0.0
                ],
                "scale"    : [
                  2.0,
                  2.0,
                  2.0
                ],
                "rotate"   : [
                  0.0,
                  0.0,
                  1.57079637050629
                ]
              },
              "geometry"  : {
                "type" : "BufferGeometry",
                "res"  : "Pwpr36pL6LyDBBwMjzdKQC.geo"
              },
              "meshRender" : {
                "material" : [
                  {
                    "type" : "MeshParticlesMaterial",
                    "map"  : {
                      "wrap" : [
                        1001,
                        1001
                      ],
                      "generateMipmaps" : false,
                      "image"           : {
                        "name" : "FsWqewrBZ6NGA71SeN5rkg.png"
                      }
                    },
                    "vertexColors" : 2,
                    "transparent"  : true,
                    "blendSrc"     : 204,
                    "blendDst"     : 201,
                    "side"         : 2,
                    "tintColor"    : 8355711,
                    "tintOpacity"  : 0.0,
                    "layer"        : 3000,
                    "blending"     : 5
                  }
                ]
              }
            },
            {
              "name" : "glow_di_1",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.0,
                  -0.0570000000298023,
                  0.0
                ],
                "scale"    : [
                  3.40000009536743,
                  3.40000009536743,
                  3.40000009536743
                ],
                "rotate"   : [
                  6.02138614654541,
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
                        "name" : "4afWRUysxS92yZGdPFMnQ3.png"
                      }
                    },
                    "transparent" : true,
                    "blendSrc"    : 204,
                    "blendDst"    : 201,
                    "side"        : 2,
                    "tintColor"   : 8355711,
                    "tintOpacity" : 0.0,
                    "layer"       : 3000,
                    "blending"    : 5
                  }
                ]
              }
            },
            {
              "name" : "ray_4",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.0,
                  -0.0289998054504395,
                  0.0
                ],
                "scale"    : [
                  1.5,
                  1.5,
                  1.5
                ],
                "rotate"   : [
                  6.02138614654541,
                  -7.71340857852465E-09,
                  5.41052103042603
                ]
              },
              "geometry"  : {
                "type" : "BufferGeometry",
                "res"  : "Pwpr36pL6LyDBBwMjzdKQC.geo"
              },
              "meshRender" : {
                "material" : [
                  {
                    "type" : "MeshParticlesMaterial",
                    "map"  : {
                      "generateMipmaps" : false,
                      "image"           : {
                        "name" : "MjDjo6hF2qgGY1WY12rNpf.png"
                      }
                    },
                    "vertexColors" : 2,
                    "transparent"  : true,
                    "blendSrc"     : 204,
                    "blendDst"     : 201,
                    "side"         : 2,
                    "tintColor"    : 8355711,
                    "tintOpacity"  : 0.0,
                    "layer"        : 3000,
                    "blending"     : 5
                  }
                ]
              }
            },
            {
              "name" : "glow_01",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.0469999983906746,
                  -0.0570001602172852,
                  0.0
                ],
                "scale"    : [
                  2.20000004768372,
                  2.20000004768372,
                  2.20000004768372
                ],
                "rotate"   : [
                  6.02138614654541,
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
                        "name" : "SMEaADmTDJWTVbi4Ny5QhR.png"
                      }
                    },
                    "transparent" : true,
                    "blendSrc"    : 204,
                    "blendDst"    : 201,
                    "side"        : 2,
                    "tintColor"   : 8355711,
                    "tintOpacity" : 0.0,
                    "layer"       : 3000,
                    "blending"    : 5
                  }
                ]
              }
            }
          ]
        }
      ]
    }
}