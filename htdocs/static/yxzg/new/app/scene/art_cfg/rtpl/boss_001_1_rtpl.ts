/**
 * boss_001_1_rtpl
 */
export const boss_001_1_rtpl = (it: any) => {
    let node = {
      "name" : it.names[0],
      "type" : "node",
      "transform" : {
        "position" : [0,0,0],
        "scale"    : (!it.is2D && it.scale) ? [it.scale[0], it.scale[1], it.scale[2]]:[1,1,1],
        "rotate"   : it.rotate?[it.rotate[0], it.rotate[1], it.rotate[2]]:[0,0,0]
      },
      "animator"  : {
        "controller" : {
          "anim_boss_001_1_attack" : it.controller.anim_boss_001_1_attack,
          "anim_boss_001_1_die"    : it.controller.anim_boss_001_1_die,
          "anim_boss_001_1_hurt"   : it.controller.anim_boss_001_1_hurt,
          "anim_boss_001_1_idle"   : it.controller.anim_boss_001_1_idle
        },
        "aniBox"     : it.aniBoxs[0],
        "playAnim"   : it.playAnim?it.playAnim:null
      },
      "lookatOnce": it.lookAtOnce || null,
      "children"  : [
        {
          "type" : "Skeleton",
          "res"  : it.res[2]
        },
        {
          "name" : it.names[0],
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
          rayID: it.rayID,
          "skinnedMeshRender" : {
            "bones" : it.bones[0],
            "bounds" : it.bounds[0],
            "rootbone" : it.rootbone,
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
                    "name" : it.res[0]
                  }
                }
              }
            ],
            "geometry" : {
              "type" : "BufferGeometry",
              "res"  : it.res[1]
            }
          }
        }
      ]
    };
    return node;
}