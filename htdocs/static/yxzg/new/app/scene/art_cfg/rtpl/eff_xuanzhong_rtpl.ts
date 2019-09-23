/**
 * eff_kexuan_rtpl
 */
export const eff_xuanzhong_rtpl = (it: any) => {
    return {
        "name" : "eff_xuanzhong",
        "type" : "node",
        "transform" : {
            "position" : it.position?[it.position[0], it.position[1], it.position[2]] : [0, 0, 0],
            "scale"    : it.scale?[it.scale[0], it.scale[1], it.scale[2]] : [1, 1, 1],
            "rotate"   : it.rotate?[it.rotate[0], it.rotate[1], it.rotate[2]] : [0, 0, 0]
        },
        "animator"  : {
          "controller" : {
            "eff_xuanzhong" : "YGCH8ccpyMmArkGowmxoXm.ai"
          },
          "aniBox"     : {
            "eff_xuanzhong" : {
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
            "name" : "mesh_xzdi01",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0,
                0.0299999993294477,
                0.0
              ],
              "scale"    : [
                1.0,
                1.0,
                1.0
              ],
              "rotate"   : [
                4.71238899230957,
                0.0,
                0.0
              ]
            },
            "geometry"  : {
              "type" : "BufferGeometry",
              "res"  : "AkErJ99J45fPT6RGCWxjYH.geo"
            },
            "meshRender" : {
              "material" : [
                {
                  "type" : "MeshParticlesMaterial",
                  "map"  : {
                    "generateMipmaps" : false,
                    "image"           : {
                      "name" : "B1ECESAjYJxLkXK21k2boT.png"
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
            "name" : "mesh_xzgz01",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0,
                10.0,
                3.0
              ],
              "scale"    : [
                1.35122489929199,
                1.0,
                1.0
              ],
              "rotate"   : [
                4.71238899230957,
                0.0,
                0.0
              ]
            },
            "geometry"  : {
              "type" : "BufferGeometry",
              "res"  : "G2Ffx46rTDTWWDDizsBS2B.geo"
            },
            "meshRender" : {
              "material" : [
                {
                  "type" : "MeshParticlesMaterial",
                  "map"  : {
                    "generateMipmaps" : false,
                    "image"           : {
                      "name" : "N5z1hDdcVS9pfD7ZwcZ85.png"
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
            "name" : "mesh_xzgz02",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0,
                9.0,
                2.0
              ],
              "scale"    : [
                1.0,
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
              "res"  : "G2Ffx46rTDTWWDDizsBS2B.geo"
            },
            "meshRender" : {
              "material" : [
                {
                  "type" : "MeshParticlesMaterial",
                  "map"  : {
                    "generateMipmaps" : false,
                    "image"           : {
                      "name" : "N5z1hDdcVS9pfD7ZwcZ85.png"
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
          }
        ]
    };
}