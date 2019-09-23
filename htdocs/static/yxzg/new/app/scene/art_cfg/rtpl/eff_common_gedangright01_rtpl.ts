/**
 * eff_common_gedangright01_rtpl
 */
export const eff_common_gedangright01_rtpl = (it: any) => {
    return {
        "name" : "eff_common_gedangright01 ",
        "type" : "node",
        "transform" : {
            "position" : it.position?[it.position[0], it.position[1], it.position[2]] : [0, 0, 0],
            "scale"    : it.scale?[it.scale[0], it.scale[1], it.scale[2]] : [1, 1, 1],
            "rotate"   : it.rotate?[it.rotate[0], it.rotate[1], it.rotate[2]] : [0, 0, 0]
        },
        "animator"  : {
          "controller" : {
            "eff_common_gedangright01" : "RUFsdxAP9BzgDAZpHKXye4.ai"
          },
          "aniBox"     : {
            "eff_common_gedangright01" : {
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
            "name" : "eff_common_gedang01",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0,
                0.0,
                0.509999990463257
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
                "name" : "glow3",
                "type" : "node",
                "transform" : {
                  "position" : [
                    -1.94000005722046,
                    1.60000002384186,
                    0.0
                  ],
                  "scale"    : [
                    3.70000004768372,
                    3.0,
                    3.0
                  ],
                  "rotate"   : [
                    4.71238899230957,
                    0.0,
                    0.0
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "CK4yXrFZtFnuJe2q5g5Gk8.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : "L1dtnfTv8RTHekQNv2D7ZL.png"
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
                "name" : "glow1",
                "type" : "node",
                "transform" : {
                  "position" : [
                    -1.13999998569489,
                    1.60000002384186,
                    0.0
                  ],
                  "scale"    : [
                    2.83607172966003,
                    2.54000091552734,
                    2.79028463363647
                  ],
                  "rotate"   : [
                    4.71238899230957,
                    0.0,
                    0.0
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "CK4yXrFZtFnuJe2q5g5Gk8.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : "N4Vo7tjwMJmLSpi4gHEufQ.png"
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
                "name" : "liuguang",
                "type" : "node",
                "transform" : {
                  "position" : [
                    -1.13999998569489,
                    1.60000002384186,
                    0.0
                  ],
                  "scale"    : [
                    2.83607172966003,
                    2.73837327957153,
                    2.79028463363647
                  ],
                  "rotate"   : [
                    0.0,
                    0.0,
                    0.0
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "CK4yXrFZtFnuJe2q5g5Gk8.geo"
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
                          "name" : "ANJcLxh33FzzDKxa2VSRVZ.png"
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
                "name" : "lizi_01",
                "type" : "node",
                "transform" : {
                  "position" : [
                    3.71000003814697,
                    2.21000003814697,
                    1.29999995231628
                  ],
                  "scale"    : [
                    6.0,
                    6.0,
                    6.0
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
                          "name" : "KUKRxR2xc4o1dXoSXDye6g.png"
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
                "name" : "ray_1",
                "type" : "node",
                "transform" : {
                  "position" : [
                    1.76999998092651,
                    1.77999997138977,
                    0.439999997615814
                  ],
                  "scale"    : [
                    6.0,
                    6.0,
                    1.0
                  ],
                  "rotate"   : [
                    6.27763652801514,
                    1.44719183444977,
                    -8.89147268026136E-05
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
                          "name" : "5vXZVUFKgBuvuHpju6yh4M.png"
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
    };
}