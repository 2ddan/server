/**
 * eff_ui_yichupai_rtpl
 */
export const eff_ui_yichupai_rtpl = (it: any) => {
    return {
      "name" : "eff_ui_yichupai",
      "type" : "node",
      "transform" : {
        "position" : it.position ? [it.position[0], it.position[1], it.position[2]] : [-670, -495, 200.0],
        "scale"    : it.scale    ? [it.scale[0],    it.scale[1],    it.scale[2]]    : [59.6, 59.6, 59.6],
        "rotate"   : it.rotate   ? [it.rotate[0],   it.rotate[1],   it.rotate[2]]   : [0, 0, 0]
    },
    "attachment": "2D",
      "animator"  : {
        "controller" : {
          "eff_ui_yichupai" : "KHYzVYZo6Q2wGEaXBRcABH.ai"
        },
        "aniBox"     : {
          "eff_ui_yichupai" : {
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
          "name" : "eff_ui_yichupai",
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
              "name" : "glow1",
              "type" : "node",
              "transform" : {
                "position" : [
                  -1.35000002384186,
                  3.82399988174438,
                  1.25
                ],
                "scale"    : [
                  60.0,
                  18.0,
                  60.0
                ],
                "rotate"   : [
                  1.28979885578156,
                  4.71238899230957,
                  3.14159274101257
                ]
              },
              "geometry"  : {
                "type" : "BufferGeometry",
                "res"  : "tsxhWsicjkBfeicFZPmT6.geo"
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
                      "filter" : [
                        1006,
                        1007
                      ],
                      "generateMipmaps" : true,
                      "image"           : {
                        "name" : "Jdy4HYsTf5iww2r3g9da3j.png"
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
              "name" : "glow2",
              "type" : "node",
              "transform" : {
                "position" : [
                  -0.550000011920929,
                  1.50999999046326,
                  1.25
                ],
                "scale"    : [
                  60.0,
                  30.0,
                  60.0
                ],
                "rotate"   : [
                  0.226892828941345,
                  1.57079637050629,
                  0.0
                ]
              },
              "geometry"  : {
                "type" : "BufferGeometry",
                "res"  : "tsxhWsicjkBfeicFZPmT6.geo"
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
                      "filter" : [
                        1006,
                        1007
                      ],
                      "generateMipmaps" : true,
                      "image"           : {
                        "name" : "Jdy4HYsTf5iww2r3g9da3j.png"
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
              "name" : "glow3",
              "type" : "node",
              "transform" : {
                "position" : [
                  1.25999999046326,
                  3.10999989509583,
                  1.25
                ],
                "scale"    : [
                  60.0000495910645,
                  23.0,
                  60.0000495910645
                ],
                "rotate"   : [
                  4.95429134368896,
                  1.57079637050629,
                  0.0
                ]
              },
              "geometry"  : {
                "type" : "BufferGeometry",
                "res"  : "tsxhWsicjkBfeicFZPmT6.geo"
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
                      "filter" : [
                        1006,
                        1007
                      ],
                      "generateMipmaps" : true,
                      "image"           : {
                        "name" : "Jdy4HYsTf5iww2r3g9da3j.png"
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
              "name" : "glow4",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.270000010728836,
                  5.05999994277954,
                  1.25
                ],
                "scale"    : [
                  60.0000495910645,
                  25.0,
                  60.0000495910645
                ],
                "rotate"   : [
                  6.04756593704224,
                  4.71238899230957,
                  3.14159274101257
                ]
              },
              "geometry"  : {
                "type" : "BufferGeometry",
                "res"  : "tsxhWsicjkBfeicFZPmT6.geo"
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
                      "filter" : [
                        1006,
                        1007
                      ],
                      "generateMipmaps" : true,
                      "image"           : {
                        "name" : "Jdy4HYsTf5iww2r3g9da3j.png"
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
              "name" : "hit1_1",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.0,
                  2.76999998092651,
                  0.300000011920929
                ],
                "scale"    : [
                  8.69999980926514,
                  9.14999961853027,
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
                        "name" : "WfdJCrEN3yzUtbUhw27Cdh.png"
                      }
                    },
                    "transparent" : true,
                    "blendSrc"    : 204,
                    "blendDst"    : 205,
                    "side"        : 2,
                    "tintColor"   : 9211020,
                    "tintOpacity" : 0.0,
                    "layer"       : 3000,
                    "blending"    : 5
                  }
                ]
              }
            },
            {
              "name" : "hit2_1",
              "type" : "node",
              "transform" : {
                "position" : [
                  -0.00999999977648258,
                  2.77999997138977,
                  0.300000011920929
                ],
                "scale"    : [
                  9.30000019073486,
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
                        "name" : "DxCnD3x84r6dYh14kDSweN.png"
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
              "name" : "hit1",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.0,
                  3.14000010490417,
                  0.300000011920929
                ],
                "scale"    : [
                  15.0,
                  15.0,
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
                        "name" : "L1dtnfTv8RTHekQNv2D7ZL.png"
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
              "name" : "ray1",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.0,
                  3.14000010490417,
                  0.300000011920929
                ],
                "scale"    : [
                  9.0,
                  9.0,
                  9.0
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
                        "name" : "VC7uobrSsBZ2rvMG22sDrj.png"
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
              "name" : "smoke1",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.0,
                  3.14000010490417,
                  0.300000011920929
                ],
                "scale"    : [
                  11.0,
                  11.0,
                  11.0
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
                        "name" : "N2JdKo6k8Z649owxSTcXVX.png"
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
              "name" : "ray2",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.0,
                  3.14000010490417,
                  0.25
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
                        "name" : "CMqQEgvWymRey97LRqvFLE.png"
                      }
                    },
                    "transparent" : true,
                    "blendSrc"    : 204,
                    "blendDst"    : 205,
                    "side"        : 2,
                    "tintColor"   : 16777215,
                    "tintOpacity" : 0.0,
                    "layer"       : 3000,
                    "blending"    : 5
                  }
                ]
              }
            },
            {
              "name" : "tx_plane_01",
              "type" : "node",
              "transform" : {
                "position" : [
                  -0.200000002980232,
                  2.58999991416931,
                  0.400000005960464
                ],
                "scale"    : [
                  8.30000019073486,
                  8.30000019073486,
                  1.0
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
                        "name" : "PUTjXh7vgoBXsL6bGpBcGU.png"
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
              "name" : "mesh_pai001a",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.0,
                  2.19000005722046,
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
                    "tintOpacity" : 0.0001,
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