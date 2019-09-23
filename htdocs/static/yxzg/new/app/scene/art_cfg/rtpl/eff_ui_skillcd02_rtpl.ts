/**
 * eff_ui_skillcd02_rtpl
 */
export const eff_ui_skillcd02_rtpl = (it: any) => {
    return {
      "name" : "eff_ui_skillcd02 ",
      "type" : "node",
      "transform" : {
        "position" : it.position ? [it.position[0], it.position[1], it.position[2]] : [-1264, -107, 200.0],   
        "scale"    : it.scale    ? [it.scale[0],    it.scale[1],    it.scale[2]]    : [60.0, 60.0, 60.0],
        "rotate"   : it.rotate   ? [it.rotate[0],   it.rotate[1],   it.rotate[2]]   : [0, 0, 0]
      },  
      "attachment": "2D",
      "animator"  : {
        "controller" : {
          "eff_ui_skillcd02" : "7d4ZuKtKQbNPVLmbqZD5Cw.ai"
        },
        "aniBox"     : {
          "eff_ui_skillcd02" : {
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
          "name" : "eff_ui_skillcd02 ",
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
              "name" : "glow_1",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.0379999987781048,
                  0.0,
                  0.0
                ],
                "scale"    : [
                  2.79999995231628,
                  2.79999995231628,
                  2.79999995231628
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
                        "name" : "XN7qu6zc7kVUzoaRjNHh15.png"
                      }
                    },
                    "transparent" : true,
                    "blendSrc"    : 204,
                    "blendDst"    : 201,
                    "side"        : 2,
                    "tintColor"   : 8421504,
                    "tintOpacity" : 0.0,
                    "layer"       : 3000,
                    "blending"    : 5
                  }
                ]
              }
            },
            {
              "name" : "ray",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.00999999977648258,
                  0.0,
                  0.0
                ],
                "scale"    : [
                  2.20000004768372,
                  2.20000004768372,
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
    }
}