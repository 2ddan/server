/**
 * eff_char_001_attack_rtpl
 */
export const effect_monster_017_attack_rtpl = (it: any) => {
    return {
      "name" : "effect_monster_017_attack",
      "type" : "node",
      "transform" : {
            "position" : it.position?[it.position[0], it.position[1], it.position[2]] : [0, 0, 0],
            "scale"    : it.scale?[it.scale[0], it.scale[1], it.scale[2]] : [1, 1, 1],
            "rotate"   : it.rotate?[it.rotate[0], it.rotate[1], it.rotate[2]] : [0, 0, 0]
          },
      "animator"  : {
        "controller" : {
          "effect_monster_017_attack" : "Aderm7xa1ByLo4aw5RRS5L.ai"
        },
        "aniBox"     : {
          "effect_monster_017_attack" : {
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
          "name" : "effect_monster_017_attack",
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
              "name" : "dg_xiao",
              "type" : "node",
              "transform" : {
                "position" : [
                  -2.9300000667572,
                  1.67941427230835,
                  1.66999995708466
                ],
                "scale"    : [
                  7.0,
                  7.0,
                  7.0
                ],
                "rotate"   : [
                  1.53814744949341,
                  0.61687034368515,
                  0.342708706855774
                ]
              },
              "geometry"  : {
                "type" : "BufferGeometry",
                "res"  : "UK8j2eA3Q1Avj4eqvPtAkT.geo"
              },
              "meshRender" : {
                "material" : [
                  {
                    "type" : "MeshParticlesMaterial",
                    "map"  : {
                      "generateMipmaps" : false,
                      "image"           : {
                        "name" : "FpAfypszg13RPvsjkMPXbh.png"
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
              "name" : "dg_add",
              "type" : "node",
              "transform" : {
                "position" : [
                  -2.9300000667572,
                  1.67941427230835,
                  1.66999995708466
                ],
                "scale"    : [
                  7.0,
                  7.0,
                  7.0
                ],
                "rotate"   : [
                  1.53814744949341,
                  0.61687034368515,
                  0.342708706855774
                ]
              },
              "geometry"  : {
                "type" : "BufferGeometry",
                "res"  : "UK8j2eA3Q1Avj4eqvPtAkT.geo"
              },
              "meshRender" : {
                "material" : [
                  {
                    "type" : "MeshParticlesMaterial",
                    "map"  : {
                      "generateMipmaps" : false,
                      "image"           : {
                        "name" : "Jsd6vAKbqYzo6V1oYPbpUh.png"
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
              "name" : "dg_wenli",
              "type" : "node",
              "transform" : {
                "position" : [
                  -2.9300000667572,
                  1.67941427230835,
                  1.66999995708466
                ],
                "scale"    : [
                  7.0,
                  7.0,
                  7.0
                ],
                "rotate"   : [
                  1.53814744949341,
                  0.61687034368515,
                  0.342708706855774
                ]
              },
              "geometry"  : {
                "type" : "BufferGeometry",
                "res"  : "UK8j2eA3Q1Avj4eqvPtAkT.geo"
              },
              "meshRender" : {
                "material" : [
                  {
                    "type" : "MeshParticlesMaterial",
                    "map"  : {
                      "generateMipmaps" : false,
                      "image"           : {
                        "name" : "MMy7Nv1snbp8wiMG6AMkU7.png"
                      }
                    },
                    "transparent" : true,
                    "blendSrc"    : 204,
                    "blendDst"    : 205,
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
              "name" : "dg_di",
              "type" : "node",
              "transform" : {
                "position" : [
                  -2.9300000667572,
                  1.67941427230835,
                  1.66999995708466
                ],
                "scale"    : [
                  7.0,
                  7.0,
                  7.0
                ],
                "rotate"   : [
                  1.53814744949341,
                  0.61687034368515,
                  0.342708706855774
                ]
              },
              "geometry"  : {
                "type" : "BufferGeometry",
                "res"  : "UK8j2eA3Q1Avj4eqvPtAkT.geo"
              },
              "meshRender" : {
                "material" : [
                  {
                    "type" : "MeshParticlesMaterial",
                    "map"  : {
                      "generateMipmaps" : false,
                      "image"           : {
                        "name" : "7R7Z2wqHX8joMb9v2dHjwd.png"
                      }
                    },
                    "blendSrc" : 204,
                    "blendDst" : 205,
                    "side"     : 2,
                    "tintColor" : 8355711,
                    "tintOpacity" : 0.0,
                    "layer"       : 2800,
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
                  -0.0820655971765518,
                  1.8628396987915,
                  2.76125454902649
                ],
                "scale"    : [
                  8.0,
                  2.0,
                  1.00000023841858
                ],
                "rotate"   : [
                  5.18761301040649,
                  5.30749368667603,
                  2.96523118019104
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
                        "name" : "26hCbPrfskq41R7iE8wsKK.png"
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
              "name" : "xian",
              "type" : "node",
              "transform" : {
                "position" : [
                  -0.129999995231628,
                  1.87999999523163,
                  2.58999991416931
                ],
                "scale"    : [
                  6.5,
                  2.5,
                  1.0
                ],
                "rotate"   : [
                  5.02138900756836,
                  5.56954288482666,
                  5.79092788696289
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
              "name" : "tx_plane_01",
              "type" : "node",
              "transform" : {
                "position" : [
                  -0.219999998807907,
                  1.94000005722046,
                  2.27999997138977
                ],
                "scale"    : [
                  2.0,
                  4.5,
                  1.0
                ],
                "rotate"   : [
                  4.9649715423584,
                  5.69488716125488,
                  4.23611831665039
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
                        "name" : "JhoB9ZvTj1mGYQvqG7rrQ7.png"
                      }
                    },
                    "transparent" : true,
                    "blendSrc"    : 204,
                    "blendDst"    : 201,
                    "side"        : 2,
                    "tintColor"   : 16777215,
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