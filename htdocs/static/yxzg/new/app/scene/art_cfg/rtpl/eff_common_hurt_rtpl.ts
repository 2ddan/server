/**
 * eff_common_hurt_rtpl
 */
export const eff_common_hurt_rtpl = (it: any) => {
    return {
        "name" : "eff_common_hurt ",
        "type" : "node",
        "transform" : {
            "position" : it.position?[it.position[0], it.position[1], it.position[2]] : [0, 0, 0],
            "scale"    : it.scale?[it.scale[0], it.scale[1], it.scale[2]] : [1, 1, 1],
            "rotate"   : it.rotate?[it.rotate[0], it.rotate[1], it.rotate[2]] : [0, 0, 0]
        },
        "animator"  : {
          "controller" : {
            "eff_common_hurt" : "K5xgZi52VjZxENwCp3uQkd.ai"
          },
          "aniBox"     : {
            "eff_common_hurt" : {
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
            "name" : "bk",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0,
                0.0,
                0.449999988079071
              ],
              "scale"    : [
                1.20000004768372,
                1.20000004768372,
                1.20000004768372
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
                    -1.19209289550781E-07,
                    0.0,
                    0.0
                  ],
                  "scale"    : [
                    4.30000019073486,
                    4.30000019073486,
                    4.30000019073486
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
                          "name" : "Hs4UeSvP4wY57pXCd6w9dD.png"
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
                "name" : "glow1",
                "type" : "node",
                "transform" : {
                  "position" : [
                    -1.19209289550781E-07,
                    0.0,
                    0.0
                  ],
                  "scale"    : [
                    10.0,
                    10.0,
                    10.0
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
                          "name" : "Nojf5Wg9KXwzCwGAxwD2YL.png"
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
                "name" : "lizi1",
                "type" : "node",
                "transform" : {
                  "position" : [
                    -1.19209289550781E-07,
                    0.0,
                    0.0
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
                          "name" : "YTPVr5ZxPLxJZhKfQHwhaQ.png"
                        }
                      },
                      "transparent" : true,
                      "blendSrc"    : 204,
                      "blendDst"    : 205,
                      "side"        : 2,
                      "tintColor"   : 16777215,
                      "tintOpacity" : 0.5,
                      "layer"       : 3000,
                      "blending"    : 5
                    }
                  ]
                }
              },
              {
                "name" : "hit_2",
                "type" : "node",
                "transform" : {
                  "position" : [
                    -1.19209289550781E-07,
                    0.0,
                    -0.100000001490116
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
                          "name" : "VHeBgT34xqA6tutWnD43xq.png"
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
                "name" : "hit_1",
                "type" : "node",
                "transform" : {
                  "position" : [
                    0.0,
                    0.0,
                    0.189999997615814
                  ],
                  "scale"    : [
                    4.0,
                    4.0,
                    4.0
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
                          "name" : "JCcq8Y1TswTsSA9wjMMuJq.png"
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