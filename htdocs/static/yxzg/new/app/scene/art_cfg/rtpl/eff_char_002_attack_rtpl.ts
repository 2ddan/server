/**
 * eff_char_002_attack_rtpl
 */
export const eff_char_002_attack_rtpl = (it: any) => {
    return {
        "name" : "eff_char_002_attack ",
        "type" : "node",
        "transform" : {
            "position" : it.position?[it.position[0], it.position[1], it.position[2]] : [0, 0, 0],
            "scale"    : it.scale?[it.scale[0], it.scale[1], it.scale[2]] : [1, 1, 1],
            "rotate"   : it.rotate?[it.rotate[0], it.rotate[1], it.rotate[2]] : [0, 0, 0]
        },
        "animator"  : {
          "controller" : {
            "eff_char_002_attack" : "8iAnD6GAefgzMK59jyY3dQ.ai"
          },
          "aniBox"     : {
            "eff_char_002_attack" : {
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
            "name" : "eff_char_002_attack ",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0,
                1.19000005722046,
                1.62999999523163
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
                "name" : "trail1",
                "type" : "node",
                "transform" : {
                  "position" : [
                    -0.699999988079071,
                    -0.00999999977648258,
                    0.319999992847443
                  ],
                  "scale"    : [
                    1.13194978237152,
                    0.830096662044525,
                    1.13194990158081
                  ],
                  "rotate"   : [
                    0.0,
                    5.84632444381714,
                    0.0
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "5SBThWAGb4mJLpPkBzckBL.geo"
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
                          "name" : "2HXF9kf9wHqVXcdQ5r2TZ2.png"
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
                "name" : "fire1",
                "type" : "node",
                "transform" : {
                  "position" : [
                    -0.389999985694885,
                    0.00899999961256981,
                    0.331999987363815
                  ],
                  "scale"    : [
                    0.899999976158142,
                    1.0,
                    0.899999976158142
                  ],
                  "rotate"   : [
                    0.0,
                    6.06345319747925,
                    3.14159274101257
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "5SBThWAGb4mJLpPkBzckBL.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : "95Xwb8ADY3T2KkKTyYWT6L.png"
                        }
                      },
                      "vertexColors" : 2,
                      "transparent"  : true,
                      "blendSrc"     : 204,
                      "blendDst"     : 205,
                      "side"         : 2,
                      "tintColor"    : 16777215,
                      "tintOpacity"  : 0.503000020980835,
                      "layer"        : 3000,
                      "blending"     : 5
                    }
                  ]
                }
              },
              {
                "name" : "fire_di",
                "type" : "node",
                "transform" : {
                  "position" : [
                    0.430000007152557,
                    -0.419999986886978,
                    -1.97000002861023
                  ],
                  "scale"    : [
                    12.0,
                    12.0,
                    12.0
                  ],
                  "rotate"   : [
                    6.09119939804077,
                    5.09597730636597,
                    3.14159226417542
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "CvZKaYexAQdzkZ6MwJPBFJ.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : "FMvQLz7CYRj5rpYwXZqbxS.png"
                        }
                      },
                      "vertexColors" : 2,
                      "transparent"  : true,
                      "blendSrc"     : 204,
                      "blendDst"     : 205,
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
                "name" : "trail_3",
                "type" : "node",
                "transform" : {
                  "position" : [
                    -0.779999971389771,
                    0.0500000007450581,
                    0.349999994039536
                  ],
                  "scale"    : [
                    0.120208196341991,
                    0.150000005960464,
                    0.150000005960464
                  ],
                  "rotate"   : [
                    0.0,
                    5.84632444381714,
                    0.0
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "3mfnF4MUbzNL4fnh5FMSn5.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "offset" : [
                          0.0299999993294477,
                          0.0
                        ],
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : "RfWCDaSn4vTNAQVKLw2AMq.png"
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
              }
            ]
          }
        ]
    };
}