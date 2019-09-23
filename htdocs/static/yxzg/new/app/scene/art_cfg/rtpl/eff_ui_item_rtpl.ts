/**
 * eff_ui_item_rtpl
 */
export const eff_ui_item_rtpl = (it: any) => {
    return  {
      "name" : "eff_ui_item",
      "type" : "node",
      "transform" : {
        "position" : it.position?[it.position[0], it.position[1], it.position[2]] : [-640, -495, 200.0],
        "scale"    : it.scale?[it.scale[0], it.scale[1], it.scale[2]] : [60, 60, 60],
        "rotate"   : it.rotate?[it.rotate[0], it.rotate[1], it.rotate[2]] : [0, 0, 0]
      },
      "attachment": '2D',
      "animator"  : {
        "controller" : {
          "eff_ui_item" : "8BbDRZ14Zg53bUnnrveGFN.ai"
        },
        "aniBox"     : {
          "eff_ui_item" : {
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
          "name" : "zb1",
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
              0.244345963001251
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
                    "name" : (it.customData && it.customData.imageSrc) || "Xb2wbMpUAYC9uQ5k4jjKXx.png"
                  }
                },
                "transparent" : true,
                "blendSrc"    : 204,
                "blendDst"    : 205,
                "side"        : 2,
                "tintColor"   : 8355711,
                "tintOpacity" : 0.49099999666214,
                "layer"       : 3000,
                "blending"    : 5
              }
            ]
          }
        },
        {
          "name" : "tuowei2",
          "type" : "node",
          "transform" : {
            "position" : [
              -4.05000019073486,
              3.05999994277954,
              0.100000001490116
            ],
            "scale"    : [
              1.70000004768372,
              1.70000004768372,
              1.0
            ],
            "rotate"   : [
              0.0,
              0.0,
              2.62705850601196
            ]
          },
          "geometry"  : {
            "type" : "BufferGeometry",
            "res"  : "QKodUSNRC9SXh1aYTHCLcZ.geo"
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
                    "name" : "UaTWsBDDaTnC5FU7RRZVpc.png"
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
          "name" : "bb",
          "type" : "node",
          "transform" : {
            "position" : [
              -9.22000026702881,
              7.76000022888184,
              -1.02999997138977
            ],
            "scale"    : [
              1.5,
              1.5,
              1.5
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
                    "name" : "FGjGbsrrLfLNmY1we6kjSD.png"
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
    };
}