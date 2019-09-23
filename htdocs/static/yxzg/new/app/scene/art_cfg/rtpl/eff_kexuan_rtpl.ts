/**
 * eff_kexuan_rtpl
 */
export const eff_kexuan_rtpl = (it: any) => {
    return {
        "name" : "eff_kexuan",
        "type" : "node",
        "transform" : {
            "position" : it.position?[it.position[0], it.position[1], it.position[2]] : [0, 0, 0],
            "scale"    : it.scale?[it.scale[0], it.scale[1], it.scale[2]] : [1, 1, 1],
            "rotate"   : it.rotate?[it.rotate[0], it.rotate[1], it.rotate[2]] : [0, 0, 0]
        },
        "animator"  : {
          "controller" : {
            "eff_kexuan" : "8UHUowYSP8JuJEsysP9DEZ.ai"
          },
          "aniBox"     : {
            "eff_kexuan" : {
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
                0.0,
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
            "name" : "mesh_xzdi03",
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
                4.71238899230957,
                0.0,
                0.0
              ]
            },
            "geometry"  : {
              "type" : "BufferGeometry",
              "res"  : "NkkwCVWPUdiZu61iJCVeDi.geo"
            },
            "meshRender" : {
              "material" : [
                {
                  "type" : "MeshParticlesMaterial",
                  "map"  : {
                    "generateMipmaps" : false,
                    "image"           : {
                      "name" : "GA9fD27iQk4TtaYMyJLKBW.png"
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