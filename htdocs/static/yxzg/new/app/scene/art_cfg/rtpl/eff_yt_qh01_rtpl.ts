/**
 * eff_yt_qh01_rtpl
 */
export const eff_yt_qh01_rtpl = (it: any) => {
    return {
      "name" : "eff_yt_qh01",
      "type" : "node",
      "transform" : {
        "position" : it.position ? [it.position[0], it.position[1], it.position[2]] : [0, 0, 0],
        "scale"    : it.scale    ? [it.scale[0],    it.scale[1],    it.scale[2]]    : [1, 1, 1],
        "rotate"   : it.rotate   ? [it.rotate[0],   it.rotate[1],   it.rotate[2]]   : [0, 0, 0]
      },
      "animator"  : {
        "controller" : {
          "eff_yt_qh01" : "8k7EBYhmGyPpNHK945dt3V.ai",
          "eff_yt_cf01" : "3HrfBFQgJYwAw2n9jZXnRe.ai"
        },
        "aniBox"     : {
          "eff_yt_qh01" : {
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
          },
          "eff_yt_cf01" : {
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
          "name" : "meshdemop2",
          "type" : "node",
          "transform" : {
            "position" : [
              0.0,
              0.0799999982118607,
              1.80999994277954
            ],
            "scale"    : [
              0.418814986944199,
              0.335051983594894,
              0.418814986944199
            ],
            "rotate"   : [
              6.02138614654541,
              0.0,
              0.0
            ]
          },
          "geometry"  : {
            "type" : "BufferGeometry",
            "res"  : "EBHirtsjtNDgQaH59EVmhi.geo"
          },
          "meshRender" : {
            "material" : [
              {
                "type" : "MeshParticlesMaterial",
                "map"  : {
                  "offset" : [
                    0.0,
                    0.75
                  ],
                  "repeat" : [
                    0.25,
                    0.25
                  ],
                  "generateMipmaps" : false,
                  "image"           : {
                    "name" : "GreMPRSV4AoyuV1dBE5Vpt.png"
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
          "name" : "mesh_ytdi01",
          "type" : "node",
          "transform" : {
            "position" : [
              0.0,
              0.0900000035762787,
              2.04999995231628
            ],
            "scale"    : [
              1.0,
              1.0,
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
            "res"  : "Lcz1ymzPi8Kjmqe7H3iwav.geo"
          },
          "meshRender" : {
            "material" : [
              {
                "type" : "MeshParticlesMaterial",
                "map"  : {
                  "generateMipmaps" : false,
                  "image"           : {
                    "name" : "SQkADbRAJcCikAh2VP3Qmy.png"
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
          },
          "children"   : [
            {
              "name" : "mesh_ytdi01a",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.0,
                  0.0,
                  0.18299999833107
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
              "geometry"  : {
                "type" : "BufferGeometry",
                "res"  : "Lcz1ymzPi8Kjmqe7H3iwav.geo"
              },
              "meshRender" : {
                "material" : [
                  {
                    "type" : "MeshParticlesMaterial",
                    "map"  : {
                      "generateMipmaps" : false,
                      "image"           : {
                        "name" : "SQkADbRAJcCikAh2VP3Qmy.png"
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