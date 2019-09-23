/**
 * eff_ui_kapaishengji_rtpl
 */
export const eff_ui_kapaishengji_rtpl = (it: any) => {
    return {
        "name" : "eff_ui_kapaishengji",
        "type" : "node",
        "transform" : {
            "position" : it.position?[it.position[0], it.position[1], it.position[2]] : [-670, -490, 200.0],
            "scale"    : it.scale?[it.scale[0], it.scale[1], it.scale[2]] : [59.5, 59.5, 59.5],
            "rotate"   : it.rotate?[it.rotate[0], it.rotate[1], it.rotate[2]] : [0, 0, 0]
        },
        "attachment": '2D',
        "animator"  : {
          "controller" : {
            "eff_ui_kapaishengji" : "2vT9hcPV5sXe18QqFnaBZL.ai"
          },
          "aniBox"     : {
            "eff_ui_kapaishengji" : {
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
                  "tintOpacity" : 0.001,
                  "layer"       : 3000,
                  "blending"    : 5
                }
              ]
            }
          },
          {
            "name" : "liuguang1",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0,
                2.70000004768372,
                0.0
              ],
              "scale"    : [
                8.19999980926514,
                10.0,
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
                      "name" : "PWp5qQLNoSxB4VppM5EWjb.png"
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
                0.0500000007450581,
                2.58999991416931,
                0.100000001490116
              ],
              "scale"    : [
                5.44999980926514,
                7.0,
                1.0
              ],
              "rotate"   : [
                0.0,
                3.14159274101257,
                3.14159274101257
              ]
            },
            "geometry"  : {
              "type" : "BufferGeometry",
              "res"  : "JKPyzYFBNrNxt3yAojCbTG.geo"
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
                      "name" : "8NfrtKpgMHhWpiZLWkAoMQ.png"
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
            "name" : "glow1",
            "type" : "node",
            "transform" : {
              "position" : [
                0.181999996304512,
                2.66000008583069,
                0.100000001490116
              ],
              "scale"    : [
                9.0,
                9.19999980926514,
                1.0
              ],
              "rotate"   : [
                0.0,
                3.14159274101257,
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
                      "name" : "CUjaZgASZUAXexp4uat2gf.png"
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
            "name" : "glow3",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0,
                2.72000002861023,
                0.100000001490116
              ],
              "scale"    : [
                6.0,
                7.0,
                1.0
              ],
              "rotate"   : [
                0.0,
                3.14159274101257,
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
                      "name" : "4afWRUysxS92yZGdPFMnQ3.png"
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
                0.00999999977648258,
                2.72000002861023,
                0.100000001490116
              ],
              "scale"    : [
                9.0,
                9.19999980926514,
                1.0
              ],
              "rotate"   : [
                0.0,
                3.14159274101257,
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
                      "name" : "8miU7Svm3EyhTEkMx5T5iT.png"
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
            "name" : "tx_yuanhuan_07",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0,
                2.85999989509583,
                0.0
              ],
              "scale"    : [
                12.0,
                12.0,
                12.0
              ],
              "rotate"   : [
                0.0,
                0.0,
                5.44647455215454
              ]
            },
            "geometry"  : {
              "type" : "BufferGeometry",
              "res"  : "KiBJdLDmbCcV6vr1PviTjU.geo"
            },
            "meshRender" : {
              "material" : [
                {
                  "type" : "MeshParticlesMaterial",
                  "map"  : {
                    "generateMipmaps" : false,
                    "image"           : {
                      "name" : "LezTjvUdEzxY2h8fmMpTYW.png"
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
            "name" : "smoke2",
            "type" : "node",
            "transform" : {
              "position" : [
                -0.819999992847443,
                1.62999999523163,
                0.0
              ],
              "scale"    : [
                2.70460247993469,
                3.00000190734863,
                3.0
              ],
              "rotate"   : [
                0.0,
                0.0,
                4.0264744758606
              ]
            },
            "geometry"  : {
              "type" : "BufferGeometry",
              "res"  : "V4dm2qxfYB8WrpPiK2haNK.geo"
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
                      "name" : "CrbvDB8oxhT2EJ5SeN87rD.png"
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
            "name" : "smoke1",
            "type" : "node",
            "transform" : {
              "position" : [
                0.119999997317791,
                3.49000000953674,
                0.0
              ],
              "scale"    : [
                3.0,
                3.0,
                3.0
              ],
              "rotate"   : [
                0.0,
                0.0,
                1.57079637050629
              ]
            },
            "geometry"  : {
              "type" : "BufferGeometry",
              "res"  : "V4dm2qxfYB8WrpPiK2haNK.geo"
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
                      "name" : "CrbvDB8oxhT2EJ5SeN87rD.png"
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
            "name" : "smoke3",
            "type" : "node",
            "transform" : {
              "position" : [
                -0.319999992847443,
                1.22000002861023,
                0.0
              ],
              "scale"    : [
                2.5,
                4.0,
                3.0
              ],
              "rotate"   : [
                0.0,
                0.0,
                4.52895450592041
              ]
            },
            "geometry"  : {
              "type" : "BufferGeometry",
              "res"  : "V4dm2qxfYB8WrpPiK2haNK.geo"
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
                      "name" : "CrbvDB8oxhT2EJ5SeN87rD.png"
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
            "name" : "smoke4",
            "type" : "node",
            "transform" : {
              "position" : [
                0.529999971389771,
                1.72000002861023,
                0.0
              ],
              "scale"    : [
                2.50000047683716,
                4.00000095367432,
                3.0
              ],
              "rotate"   : [
                0.0,
                0.0,
                5.33477354049683
              ]
            },
            "geometry"  : {
              "type" : "BufferGeometry",
              "res"  : "V4dm2qxfYB8WrpPiK2haNK.geo"
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
                      "name" : "CrbvDB8oxhT2EJ5SeN87rD.png"
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
            "name" : "glow5",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0,
                2.72000002861023,
                0.100000001490116
              ],
              "scale"    : [
                6.0,
                8.0,
                1.0
              ],
              "rotate"   : [
                0.0,
                3.14159274101257,
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
                      "name" : "4afWRUysxS92yZGdPFMnQ3.png"
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
            "name" : "glow6",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0,
                5.01000022888184,
                0.100000001490116
              ],
              "scale"    : [
                5.5,
                5.0,
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
              "res"  : "JKPyzYFBNrNxt3yAojCbTG.geo"
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
                      "name" : "8NfrtKpgMHhWpiZLWkAoMQ.png"
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
            "name" : "fire",
            "type" : "node",
            "transform" : {
              "position" : [
                0.167999997735024,
                2.66000008583069,
                0.0
              ],
              "scale"    : [
                3.0,
                3.09999990463257,
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
                      "name" : "ERMFSvwFuYvdH7RGxXhWNF.png"
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
            "name" : "ray_B",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0,
                2.61999988555908,
                0.0
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
                      "name" : "TUd6PJJTxW2r7dy44f3vc8.png"
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
            "name" : "trail_1",
            "type" : "node",
            "transform" : {
              "position" : [
                -0.529999971389771,
                1.66999995708466,
                -1.48000001907349
              ],
              "scale"    : [
                1.0,
                1.0,
                1.39999997615814
              ],
              "rotate"   : [
                4.71238899230957,
                3.14159274101257,
                0.0
              ]
            },
            "geometry"  : {
              "type" : "BufferGeometry",
              "res"  : "973SYheh3vYkE8WpZzXYBB.geo"
            },
            "meshRender" : {
              "material" : [
                {
                  "type" : "MeshParticlesMaterial",
                  "map"  : {
                    "generateMipmaps" : false,
                    "image"           : {
                      "name" : "AgF7Cq3jBxPMYyaNeqdjKA.png"
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
                0.600000023841858,
                1.19000005722046,
                -1.32000005245209
              ],
              "scale"    : [
                1.00000095367432,
                1.00000047683716,
                1.00000047683716
              ],
              "rotate"   : [
                4.71238899230957,
                0.0,
                0.0
              ]
            },
            "geometry"  : {
              "type" : "BufferGeometry",
              "res"  : "973SYheh3vYkE8WpZzXYBB.geo"
            },
            "meshRender" : {
              "material" : [
                {
                  "type" : "MeshParticlesMaterial",
                  "map"  : {
                    "generateMipmaps" : false,
                    "image"           : {
                      "name" : "AgF7Cq3jBxPMYyaNeqdjKA.png"
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
            "name" : "hit3",
            "type" : "node",
            "transform" : {
              "position" : [
                -0.00999999977648258,
                2.73000001907349,
                0.100000001490116
              ],
              "scale"    : [
                9.0,
                9.19999980926514,
                1.0
              ],
              "rotate"   : [
                0.0,
                3.14159274101257,
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
                      "name" : "8miU7Svm3EyhTEkMx5T5iT.png"
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
            "name" : "glow7",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0,
                2.61999988555908,
                0.0
              ],
              "scale"    : [
                5.0,
                5.0,
                5.0
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
                  "tintOpacity" : 0.501960813999176,
                  "layer"       : 3000,
                  "blending"    : 5
                }
              ]
            }
          },
          {
            "name" : "glow_hit",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0,
                2.61999988555908,
                0.0
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
                      "name" : "4afWRUysxS92yZGdPFMnQ3.png"
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
            "name" : "lizi1",
            "type" : "node",
            "transform" : {
              "position" : [
                2.44000005722046,
                2.94000005722046,
                0.0
              ],
              "scale"    : [
                1.60000002384186,
                8.0,
                7.0
              ],
              "rotate"   : [
                0.0,
                3.14159274101257,
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
                      "name" : "5aVrA2pFBkmAzREZuBEjx4.png"
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
            "name" : "lizi2",
            "type" : "node",
            "transform" : {
              "position" : [
                -2.39000010490417,
                2.94000005722046,
                0.0
              ],
              "scale"    : [
                1.60000002384186,
                8.0,
                7.0
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
                      "name" : "5aVrA2pFBkmAzREZuBEjx4.png"
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
    };
}