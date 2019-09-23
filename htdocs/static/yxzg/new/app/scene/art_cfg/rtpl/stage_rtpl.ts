import { SceneUtils } from "../../scene_utils";

/**
 * 关卡模型
 */
export const StageRTPL = {
    // 关卡模型
    "Gm5PFwWQGH8XMkDYCbxU71": (it: any) => {
        const node = {
            "name" : it.names[0],
            "type" : "node",
            "transform" : {
              "position" : [0,0,0],
              "scale"    : it.scale?[it.scale[0], it.scale[1], it.scale[2]]:[1,1,1],
              "rotate"   : it.rotate?[it.rotate[0], it.rotate[1], it.rotate[2]]:[0,0,0]
            },
            "children"  : [
              {
                "name" : it.names[1],
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
                  "res"  : it.res[0]
                },
                rayID  : it.rayID || 0,
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshBasicMaterial",
                      "map"  : {
                        "offset" : it.offset0 || [0,0],
                        "repeat" : it.repeat0 || [1, 1],
                        "wrap"   : it.wrap0 || [1000, 1000],
                        "filter" : it.filter0 || [1006, 1006],
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : it.res[1]
                        }
                      }
                    }
                  ]
                }
              }
            ]
        };
        return SceneUtils.complied(it, node);
    }
};