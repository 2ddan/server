/**
 * eff_char_002_hurt_rtpl
 */
export const eff_char_002_hurt_rtpl = (it: any) => {
  return {
    "name" : "eff_char_002_hurt",
    "type" : "node",
    "transform" : {
      "position" : it.position?[it.position[0], it.position[1], it.position[2]] : [0, 0, 0],
      "scale"    : it.scale?[it.scale[0], it.scale[1], it.scale[2]] : [1, 1, 1],
      "rotate"   : it.rotate?[it.rotate[0], it.rotate[1], it.rotate[2]] : [0, 0, 0]
    },
    "animator"  : {
      "controller" : {
        "eff_char_002_hurt" : "QAtts2XuqMkU7DGGopaAT2.ai"
      },
      "aniBox"     : {
        "eff_char_002_hurt" : {
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
        "name" : "eff_char_002_hurt",
        "type" : "node",
        "transform" : {
          "position" : [
            0.0,
            0.0,
            1.91999995708466
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
            "name" : "glow_1",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0,
                0.170000001788139,
                -1.01999998092651
              ],
              "scale"    : [
                8.0,
                8.0,
                8.0
              ],
              "rotate"   : [
                1.48353004455566,
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
                      "name" : "Fot3ugp8jyaG69spLzCHbU.png"
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
            "name" : "glow_2",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0,
                0.170000001788139,
                -1.01999998092651
              ],
              "scale"    : [
                7.0,
                7.0,
                7.0
              ],
              "rotate"   : [
                1.48353004455566,
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
                  "tintOpacity" : 0.503000020980835,
                  "layer"       : 3000,
                  "blending"    : 5
                }
              ]
            }
          },
          {
            "name" : "glow_di1",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0,
                0.560000002384186,
                0.0799999833106995
              ],
              "scale"    : [
                14.0,
                14.0,
                14.0
              ],
              "rotate"   : [
                1.57079637050629,
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
                  "tintOpacity" : 0.503000020980835,
                  "layer"       : 3000,
                  "blending"    : 5
                }
              ]
            }
          },
          {
            "name" : "trail_di_L1",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0,
                0.649999976158142,
                -0.202000007033348
              ],
              "scale"    : [
                3.0,
                3.0,
                1.0
              ],
              "rotate"   : [
                0.0,
                0.0,
                4.71238899230957
              ]
            },
            "geometry"  : {
              "type" : "BufferGeometry",
              "res"  : "BZ3w2NKdL5p3bbBnrzDVfg.geo"
            },
            "meshRender" : {
              "material" : [
                {
                  "type" : "MeshParticlesMaterial",
                  "map"  : {
                    "generateMipmaps" : false,
                    "image"           : {
                      "name" : "JLJbAthJW4AzCJFWu8ZzVV.png"
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
            "name" : "fire1",
            "type" : "node",
            "transform" : {
              "position" : [
                -0.987999975681305,
                2.84999990463257,
                -0.123000003397465
              ],
              "scale"    : [
                2.0,
                3.0,
                2.0
              ],
              "rotate"   : [
                0.0,
                0.0,
                3.14159274101257
              ]
            },
            "geometry"  : {
              "type" : "BufferGeometry",
              "res"  : "BZ3w2NKdL5p3bbBnrzDVfg.geo"
            },
            "meshRender" : {
              "material" : [
                {
                  "type" : "MeshParticlesMaterial",
                  "map"  : {
                    "generateMipmaps" : false,
                    "image"           : {
                      "name" : "Lhq4oMjfXKUYT12pQRtRRd.png"
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
            "name" : "smoke_B",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0700000002980232,
                2.23000001907349,
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
                4.38653659820557
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
                      "name" : "HZLRtw2AQWZAopwSxQySFB.png"
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
            "name" : "trail_r",
            "type" : "node",
            "transform" : {
              "position" : [
                -0.5,
                1.44000005722046,
                0.0
              ],
              "scale"    : [
                5.0,
                5.0,
                6.0
              ],
              "rotate"   : [
                0.0,
                0.0,
                1.39626336097717
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
                      "name" : "JTXgJQEg1WQHAjb7XqFBZV.png"
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
            "name" : "trail_02",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0,
                0.319999992847443,
                0.28999999165535
              ],
              "scale"    : [
                2.0,
                3.0,
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
              "res"  : "9vQFhgVmJMNQQMWHMSEDxY.geo"
            },
            "meshRender" : {
              "material" : [
                {
                  "type" : "MeshParticlesMaterial",
                  "map"  : {
                    "generateMipmaps" : false,
                    "image"           : {
                      "name" : "oWtAxS2P6GA1bJGLCYahg.png"
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
            "name" : "trail_b",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0399999991059303,
                1.68700003623962,
                0.0
              ],
              "scale"    : [
                8.0,
                8.0,
                6.0
              ],
              "rotate"   : [
                0.0,
                0.0,
                0.872664570808411
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
                      "name" : "93gUJCWVT2vy2pDbzBio5b.png"
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
            "name" : "smoke_r",
            "type" : "node",
            "transform" : {
              "position" : [
                -1.23000001907349,
                0.759999990463257,
                0.0
              ],
              "scale"    : [
                0.100000001490116,
                0.100000001490116,
                0.100000001490116
              ],
              "rotate"   : [
                0.0,
                0.0,
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
                    "generateMipmaps" : false,
                    "image"           : {
                      "name" : "FMvQLz7CYRj5rpYwXZqbxS.png"
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
            "name" : "smoke_l",
            "type" : "node",
            "transform" : {
              "position" : [
                -0.699999988079071,
                1.63999998569489,
                0.0
              ],
              "scale"    : [
                4.0,
                3.0,
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
              "res"  : "Kd5Ffh6EgMmjHmHTeC5y4R.geo"
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
            "name" : "ray_1",
            "type" : "node",
            "transform" : {
              "position" : [
                -0.0189999993890524,
                1.30999994277954,
                0.870000004768372
              ],
              "scale"    : [
                6.0,
                7.5,
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
                      "name" : "LwEN8BzbigAE5n9ersSuR3.png"
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
            "name" : "glow",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0,
                1.16600000858307,
                0.949999988079071
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
                      "name" : "Fot3ugp8jyaG69spLzCHbU.png"
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