/**
 * eff_yt_db01_rtpl
 */
export const eff_yt_db01_rtpl = (it: any) => {
    return {
      "name" : "eff_yt_db01",
      "type" : "node",
      "transform" : {
        "position" : it.position ? [it.position[0], it.position[1], it.position[2]] : [0, 0, 0],
        "scale"    : it.scale    ? [it.scale[0],    it.scale[1],    it.scale[2]]    : [1, 1, 1],
        "rotate"   : it.rotate   ? [it.rotate[0],   it.rotate[1],   it.rotate[2]]   : [0, 0, 0]
      },
      "animator"  : {
        "controller" : {
          "eff_yt_db01" : "4DJn6qbH9UMo9k4jYYh2xw.ai",
          "eff_yt_cf01" : "FUYrxxmjZxsgtbbRRfcvV7.ai"
        },
        "aniBox"     : {
          "eff_yt_db01" : {
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
              0.5,
              0.400000005960464,
              0.5
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
                    "name" : "6sPgV9SXcwmq8HKVrpz8Mj.png"
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
                    "name" : "6GqwLbdvyAuhUCboUhcAp3.png"
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
        }
      ]
    };
}