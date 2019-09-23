/**
 * eff_ui_qipai
 */
export const eff_ui_qipai_rtpl = (it: any) => {
    return {
        "name" : "eff_ui_qipai",
        "type" : "node",
        "transform" : {
          "position" : it.position ? [it.position[0], it.position[1], it.position[2]] : [-670, -490, 200.0],
          "scale"    : it.scale    ? [it.scale[0],    it.scale[1],    it.scale[2]]    : [60.0, 60.0, 60.0],
          "rotate"   : it.rotate   ? [it.rotate[0],   it.rotate[1],   it.rotate[2]]   : [0, 0, 0]
        },
        "attachment": "2D",
        "animator"  : {
          "controller" : {
            "eff_ui_qipai" : "Su9zaXd2NbMitfdk7sDUnq.ai"
          },
          "aniBox"     : {
            "eff_ui_qipai" : {
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
        "rayID": it.rayID,
        "children"  : [
          {
            "name" : "eff_ui_qipai",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0,
                2.70000004768372,
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
                "name" : "glow1",
                "type" : "node",
                "transform" : {
                  "position" : [
                    -0.0578086636960506,
                    0.0,
                    0.0507943630218506
                  ],
                  "scale"    : [
                    9.0,
                    9.19999980926514,
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
                          "name" : "SyNep6X92Rh5adB4JhWox8.png"
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
                    -0.0578086636960506,
                    -0.0799999982118607,
                    0.0507943630218506
                  ],
                  "scale"    : [
                    9.0,
                    9.5,
                    1.00000047683716
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
                          "name" : "8miU7Svm3EyhTEkMx5T5iT.png"
                        }
                      },
                      "transparent" : true,
                      "blendSrc"    : 204,
                      "blendDst"    : 201,
                      "side"        : 2,
                      "tintColor"   : 8421504,
                      "tintOpacity" : 0.5,
                      "layer"       : 3000,
                      "blending"    : 5
                    }
                  ]
                }
              },
              {
                "name" : "glow3",
                "type" : "node",
                "transform" : {
                  "position" : [
                    -0.0578086636960506,
                    0.0799999982118607,
                    0.0507943630218506
                  ],
                  "scale"    : [
                    9.0,
                    9.0,
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
                          "name" : "UWBfw1cNTQc3TLiQTjbSAE.png"
                        }
                      },
                      "transparent" : true,
                      "blendSrc"    : 204,
                      "blendDst"    : 201,
                      "side"        : 2,
                      "tintColor"   : 8421504,
                      "tintOpacity" : 0.501960813999176,
                      "layer"       : 3000,
                      "blending"    : 5
                    }
                  ]
                }
              },
              {
                "name" : "mesh_pai001a",
                "type" : "node",
                "transform" : {
                  "position" : [
                    0.0,
                    -0.509999990463257,
                    -1.73000001907349
                  ],
                  "scale"    : [
                    1.73299992084503,
                    1.73299992084503,
                    1.73299992084503
                  ],
                  "rotate"   : [
                    6.02138614654541,
                    0.0,
                    0.0
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "FSHG4UDGZfQQrsGCtQ4AkH.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : "L3HJx6XotqNnBhgrxNQcDL.png"
                        }
                      },
                      "transparent" : true,
                      "blendSrc"    : 204,
                      "blendDst"    : 205,
                      "side"        : 2,
                      "tintColor"   : 8355711,
                      "tintOpacity" : 0.501960813999176,
                      "layer"       : 3000,
                      "blending"    : 5
                    }
                  ]
                }
              },
              {
                "name" : "tuowei1",
                "type" : "node",
                "transform" : {
                  "position" : [
                    -6.11999988555908,
                    -2.34999990463257,
                    0.0
                  ],
                  "scale"    : [
                    2.53999996185303,
                    2.53999996185303,
                    2.53999996185303
                  ],
                  "rotate"   : [
                    0.0,
                    3.14159274101257,
                    5.75958681106567
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "2QuDae1q6WzuR3yRaLEUgV.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "offset" : [
                          0.310000002384186,
                          0.0
                        ],
                        "wrap"   : [
                          1001,
                          1001
                        ],
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : "LZLZajP6g8oJCvCESYhcVn.png"
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
                "name" : "tuowei2",
                "type" : "node",
                "transform" : {
                  "position" : [
                    -6.09999990463257,
                    -2.39000010490417,
                    0.0
                  ],
                  "scale"    : [
                    2.54000091552734,
                    2.54000020027161,
                    2.54000282287598
                  ],
                  "rotate"   : [
                    0.0,
                    3.14159274101257,
                    5.75958681106567
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "2QuDae1q6WzuR3yRaLEUgV.geo"
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
                          "name" : "Ftn7qMYZwNQom1kLQ42NoV.png"
                        }
                      },
                      "vertexColors" : 2,
                      "transparent"  : true,
                      "blendSrc"     : 204,
                      "blendDst"     : 201,
                      "side"         : 2,
                      "tintColor"    : 8355711,
                      "tintOpacity"  : 0.5,
                      "layer"        : 3000,
                      "blending"     : 5
                    }
                  ]
                }
              },
              {
                "name" : "glow4",
                "type" : "node",
                "transform" : {
                  "position" : [
                    -0.0578086636960506,
                    0.0799999237060547,
                    0.0507943630218506
                  ],
                  "scale"    : [
                    5.0,
                    8.0,
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
                          "name" : "24C6wntLU6gPPafSCCQBXs.png"
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