/**
 * model_shadow_rtpl
 */
export const model_shadow_rtpl = (it: any) => {
    return {
        "name" : "model_shadow",
        "type" : "node",
        "transform" : {
            "position" : it.position?[it.position[0], it.position[1], it.position[2]] : [0, 0, 0],
            "scale"    : it.scale?[it.scale[0], it.scale[1], it.scale[2]] : [1, 1, 1],
            "rotate"   : it.rotate?[it.rotate[0], it.rotate[1], it.rotate[2]] : [0, 0, 0]
        },
        "children"  : [
          {
            "name" : "mesh_shadow",
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
              "res"  : "4KgTPCwAotxcUYPMiwgYA6.geo"
            },
            "meshRender" : {
              "material" : [
                {
                  "type" : "MeshBasicMaterial",
                  "map"  : {
                    "generateMipmaps" : false,
                    "image"           : {
                      "name" : "Y3oYCgyA9koddCzXZNoRki.png"
                    }
                  },
                  "transparent" : true,
                  "layer"       : 3000
                }
              ]
            }
          }
        ]
    };
}