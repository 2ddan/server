/**
 * eff_common_cardattack01_rtpl
 */
export const eff_common_cardattack01_rtpl = (it: any) => {
    return {
        "name" : "eff_common_cardattack01",
        "type" : "node",
        "transform" : {
            "position" : it.position?[it.position[0], it.position[1], it.position[2]] : [0, 0, 0],
            "scale"    : it.scale?[it.scale[0], it.scale[1], it.scale[2]] : [1, 1, 1],
            "rotate"   : it.rotate?[it.rotate[0], it.rotate[1], it.rotate[2]] : [0, 0, 0]
        },
        "animator"  : {
          "controller" : {
            "eff_common_cardattack01" : "LfXDGR2ZwWt28rkTf88vdG.ai"
          },
          "aniBox"     : {
            "eff_common_cardattack01" : {
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
            "name" : "eff_common_cardattack01",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0,
                2.46000003814697,
                0.930000007152557
              ],
              "scale"    : [
                1.0,
                1.0,
                1.0
              ],
              "rotate"   : [
                0.0,
                0.0,
                5.70722675323486
              ]
            },
            "children"  : [
              {
                "name" : "trail_1",
                "type" : "node",
                "transform" : {
                  "position" : [
                    0.0299999993294477,
                    0.0,
                    0.0
                  ],
                  "scale"    : [
                    2.0,
                    7.0,
                    1.0
                  ],
                  "rotate"   : [
                    0.0,
                    0.0,
                    3.14159274101257
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
                          "name" : "JydnRhhncoiwctfH4P4e7q.png"
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
                "name" : "trail_2",
                "type" : "node",
                "transform" : {
                  "position" : [
                    0.0,
                    0.0,
                    0.200000002980232
                  ],
                  "scale"    : [
                    7.0,
                    5.0,
                    1.0
                  ],
                  "rotate"   : [
                    0.0,
                    0.0,
                    1.57079637050629
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
                          "name" : "UoNJi3XJhCgtVz9ubmYSwQ.png"
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
                "name" : "trail_di",
                "type" : "node",
                "transform" : {
                  "position" : [
                    0.200000002980232,
                    0.119999997317791,
                    -0.140000000596046
                  ],
                  "scale"    : [
                    1.29999995231628,
                    7.0,
                    1.0
                  ],
                  "rotate"   : [
                    0.0,
                    0.0,
                    3.14159274101257
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
                          "name" : "QDxZxfMHEcCfRSaigjv1wg.png"
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
                "name" : "sd",
                "type" : "node",
                "transform" : {
                  "position" : [
                    -0.0599999986588955,
                    0.0,
                    0.25
                  ],
                  "scale"    : [
                    4.0,
                    7.0,
                    1.0
                  ],
                  "rotate"   : [
                    0.0,
                    0.0,
                    3.14159274101257
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
                          "name" : "8AsXMjaWnBMTjaM6QWLadq.png"
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
                "name" : "hit1",
                "type" : "node",
                "transform" : {
                  "position" : [
                    0.129999995231628,
                    0.349999994039536,
                    0.370000004768372
                  ],
                  "scale"    : [
                    3.0,
                    3.0,
                    4.0
                  ],
                  "rotate"   : [
                    0.0,
                    0.0,
                    0.215548276901245
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
                          "name" : "S8ebxdSwBWuqPzuyhyPHZi.png"
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
                "name" : "hit2",
                "type" : "node",
                "transform" : {
                  "position" : [
                    0.419999986886978,
                    0.0599999986588955,
                    0.370000004768372
                  ],
                  "scale"    : [
                    6.0,
                    6.0,
                    4.0
                  ],
                  "rotate"   : [
                    0.0,
                    0.0,
                    5.90916156768799
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
                          "name" : "S8ebxdSwBWuqPzuyhyPHZi.png"
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
                "name" : "trail_glow",
                "type" : "node",
                "transform" : {
                  "position" : [
                    -0.00999999977648258,
                    -0.0199999995529652,
                    0.0399999991059303
                  ],
                  "scale"    : [
                    1.30000042915344,
                    7.00000286102295,
                    1.0
                  ],
                  "rotate"   : [
                    0.0,
                    0.0,
                    3.14159274101257
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