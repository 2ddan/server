/**
 * eff_ui_xiaohaopai_rtpl
 */
export const eff_ui_xiaohaopai_rtpl = (it: any) => {
    return {
        "name" : "eff_ui_xiaohaopai",
        "type" : "node",
        "transform" : {
            "position" : it.position ? [it.position[0], it.position[1], it.position[2]] : [-670, -490, 200.0],
            "scale"    : it.scale    ? [it.scale[0],    it.scale[1],    it.scale[2]]    : [60.0, 60.0, 60.0],
            "rotate"   : it.rotate   ? [it.rotate[0],   it.rotate[1],   it.rotate[2]]   : [0, 0, 0]
        },
        "attachment": "2D",
        "animator"  : {
          "controller" : {
            "eff_ui_xiaohaopai" : "5zMSjFFPSbXbp3gEuwbn6K.ai"
          },
          "aniBox"     : {
            "eff_ui_xiaohaopai" : {
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
            "name" : "glow2",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0,
                2.52999997138977,
                0.0
              ],
              "scale"    : [
                8.80000019073486,
                9.5,
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
                      "name" : "8miU7Svm3EyhTEkMx5T5iT.png"
                    }
                  },
                  "transparent" : true,
                  "blendSrc"    : 204,
                  "blendDst"    : 205,
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
            "name" : "glow1",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0299999993294477,
                2.62000012397766,
                0.100000001490116
              ],
              "scale"    : [
                8.69999980926514,
                9.5,
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
            "name" : "glow3",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0500000007450581,
                2.86999988555908,
                0.100000001490116
              ],
              "scale"    : [
                8.0,
                8.0,
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
                    "generateMipmaps" : false,
                    "image"           : {
                      "name" : "UWBfw1cNTQc3TLiQTjbSAE.png"
                    }
                  },
                  "vertexColors" : 2,
                  "transparent"  : true,
                  "blendSrc"     : 204,
                  "blendDst"     : 201,
                  "side"         : 2,
                  "tintColor"    : 8421504,
                  "tintOpacity"  : 0.0,
                  "layer"        : 3000,
                  "blending"     : 5
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
                8.0,
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
                      "name" : "S9QBA6TBqnqUxCF1xFxhuf.png"
                    }
                  },
                  "vertexColors" : 2,
                  "transparent"  : true,
                  "blendSrc"     : 204,
                  "blendDst"     : 201,
                  "side"         : 2,
                  "tintColor"    : 8421504,
                  "tintOpacity"  : 0.0,
                  "layer"        : 3000,
                  "blending"     : 5
                }
              ]
            }
          },
          {
            "name" : "other1",
            "type" : "node",
            "transform" : {
              "position" : [
                -0.0299999993294477,
                3.53999996185303,
                -0.200000002980232
              ],
              "scale"    : [
                7.0,
                9.60000038146973,
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
                      "name" : "W1C8PQb1rVDHsgptxLqtAN.png"
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
      
    };
}