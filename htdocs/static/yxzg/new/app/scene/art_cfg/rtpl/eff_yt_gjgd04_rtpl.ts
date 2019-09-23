/**
 * eff_yt_gjgd04_rtpl
 */
export const eff_yt_gjgd04_rtpl = (it: any) => {
    return {
      "name" : "eff_yt_gjgd04",
      "type" : "node",
      "transform" : {
        "position" : it.position ? [it.position[0], it.position[1], it.position[2]] : [0, 0, 0],
        "scale"    : it.scale    ? [it.scale[0],    it.scale[1],    it.scale[2]]    : [1, 1, 1],
        "rotate"   : it.rotate   ? [it.rotate[0],   it.rotate[1],   it.rotate[2]]   : [0, 0, 0]
      },
      "animator"  : {
        "controller" : {
          "eff_yt_fuheyitu01" : "3f5KwR1JXE5FPskcyaJBQ5.ai",
          "eff_yt_cf02"       : "NSKGbPWbea5UDwpC5HB8zA.ai"
        },
        "aniBox"     : {
          "eff_yt_fuheyitu01" : {
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
          "eff_yt_cf02"       : {
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
              0.529198110103607,
              0.348651856184006,
              0.435000002384186
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
                    "name" : "KUFXjBxKN5Kpup9PCzeebL.png"
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
              0.319999992847443,
              0.00800000037997961,
              2.03099989891052
            ],
            "scale"    : [
              0.800000011920929,
              0.800000011920929,
              0.800000011920929
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
                    "name" : "MbTt7gpN4dJmkLfFSDAc6F.png"
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
          "name" : "mesh_ytdi02",
          "type" : "node",
          "transform" : {
            "position" : [
              -0.319999992847443,
              0.0,
              2.0
            ],
            "scale"    : [
              0.800000011920929,
              0.800000011920929,
              0.800000011920929
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
                    "name" : "NzSkPLTVUgUHm26oZ1GgUi.png"
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