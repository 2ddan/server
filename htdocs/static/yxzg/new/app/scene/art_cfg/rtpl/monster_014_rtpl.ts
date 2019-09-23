/**
 * monster_014_rtpl
 */
export const monster_014_rtpl = (it: any) => {
    let node = {
      "name" : it.names[0],
      "type" : "node",
      "transform" : {
        "position" : [0,0,0],
        "scale"    : (!it.is2D && it.scale) ? [it.scale[0], it.scale[1], it.scale[2]]:[1,1,1],
        "rotate"   : it.rotate?[it.rotate[0], it.rotate[1], it.rotate[2]]:[0,0,0]
      },
      "animator"  : {
        "controller" : {
          "anim_monster_014_idle" : it.controller.anim_monster_014_idle,
          "anim_monster_014_hurt" : it.controller.anim_monster_014_hurt,
          "anim_monster_014_attack" : it.controller.anim_monster_014_attack,
          "anim_monster_014_die"    : it.controller.anim_monster_014_die
        },
        "aniBox"     : it.aniBoxs[0],
        "playAnim"   : it.playAnim?it.playAnim:null
      },
      "lookatOnce": it.lookAtOnce || null,
      "boxCollider" : {
        "max" : [
          1.0,
          1.25,
          1.25
        ],
        "min" : [
          -1.0,
          -1.25,
          -1.25
        ]
      },
      "rayID"       : it.rayID || 0,
      "children"    : [
        {
          "name" : it.names[1],
          "type" : "node",
          "transform" : {
            "position" : [
              0.0,
              0.0,
              1.29999995231628
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
              "name" : it.names[2],
              "type" : "node",
              "transform" : {
                "position" : [
                  -0.225999996066093,
                  1.50999999046326,
                  -1.09099996089935
                ],
                "scale"    : [
                  1.20000004768372,
                  1.20000004768372,
                  1.20000004768372
                ],
                "rotate"   : [
                  0.0,
                  2.20578193664551,
                  3.14159274101257
                ]
              },
              "geometry"  : {
                "type" : "BufferGeometry",
                "res"  : it.res[0]
              },
              "meshRender" : {
                "material" : [
                  {
                    "type" : "MeshParticlesMaterial",
                    "map"  : {
                      "offset" : it.offset0 || [0,0],
                      "repeat" : it.repeat0 || [1, 1],
                      "wrap"   : it.wrap0 || [1000, 1000],
                      "filter" : it.filter0 || [1006, 1006],
                      "generateMipmaps" : false,
                      "image"           : {
                        "name" : it.res[1]
                      }
                    },
                    "transparent" : true,
                    "blendSrc"    : 204,
                    "blendDst"    : 205,
                    "side"        : 2,
                    "tintColor"   : 8355711,
                    "tintOpacity" : 0.0,
                    "layer"       : 4000,
                    "blending"    : 5
                  }
                ]
              }
            },
            {
              "name" : it.names[3],
              "type" : "node",
              "transform" : {
                "position" : [
                  -0.0299999993294477,
                  1.38399994373322,
                  -0.449999988079071
                ],
                "scale"    : [
                  1.0,
                  1.0,
                  1.0
                ],
                "rotate"   : [
                  -8.74227694680485E-08,
                  2.20578193664551,
                  3.14159274101257
                ]
              },
              "geometry"  : {
                "type" : "BufferGeometry",
                "res"  : it.res[0]
              },
              "meshRender" : {
                "material" : [
                  {
                    "type" : "MeshParticlesMaterial",
                    "map"  : {
                      "offset" : it.offset1 || [0,0],
                      "repeat" : it.repeat1 || [1, 1],
                      "wrap"   : it.wrap1 || [1000, 1000],
                      "filter" : it.filter1 || [1006, 1006],
                      "generateMipmaps" : false,
                      "image"           : {
                        "name" : it.res[3]
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
              "name" : it.names[4],
              "type" : "node",
              "transform" : {
                "position" : [
                  -0.402999997138977,
                  1.38399994373322,
                  -0.449999988079071
                ],
                "scale"    : [
                  0.800000011920929,
                  0.800000011920929,
                  0.800000011920929
                ],
                "rotate"   : [
                  0.0,
                  2.20578193664551,
                  3.14159274101257
                ]
              },
              "geometry"  : {
                "type" : "BufferGeometry",
                "res"  : it.res[0]
              },
              "meshRender" : {
                "material" : [
                  {
                    "type" : "MeshParticlesMaterial",
                    "map"  : {
                      "offset" : it.offset2 || [0,0],
                      "repeat" : it.repeat2 || [1, 1],
                      "wrap"   : it.wrap2 || [1000, 1000],
                      "filter" : it.filter2 || [1006, 1006],
                      "generateMipmaps" : false,
                      "image"           : {
                        "name" : it.res[3]
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
              "name" : it.names[5],
              "type" : "node",
              "transform" : {
                "position" : [
                  -0.209000006318092,
                  1.21700000762939,
                  -0.449999988079071
                ],
                "scale"    : [
                  1.39999997615814,
                  1.39999997615814,
                  1.39999997615814
                ],
                "rotate"   : [
                  0.0,
                  2.20578193664551,
                  3.14159274101257
                ]
              },
              "geometry"  : {
                "type" : "BufferGeometry",
                "res"  : it.res[0]
              },
              "meshRender" : {
                "material" : [
                  {
                    "type" : "MeshParticlesMaterial",
                    "map"  : {
                      "offset" : it.offset3 || [0,0],
                      "repeat" : it.repeat3 || [1, 1],
                      "wrap"   : it.wrap3 || [1000, 1000],
                      "filter" : it.filter3 || [1006, 1006],
                      "generateMipmaps" : false,
                      "image"           : {
                        "name" : it.res[7]
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
            }
          ]
        }
      ]
    };
    return node;
}