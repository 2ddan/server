/**
 * model_char_001
 */
export const char_002_rtpl = (it: any) => {
    let node: any;
    
    node = {
      "name" : it.names[0],
      "type" : "node",
      "transform" : {
        "position" : [0,0,0],
        "scale"    : (!it.is2D && it.scale) ? [it.scale[0], it.scale[1], it.scale[2]]:[1,1,1],
        "rotate"   : it.rotate?[it.rotate[0], it.rotate[1], it.rotate[2]]:[0,0,0]
      },
      "animator"  : {
        "controller" : {
          "anim_char_002_attack" : it.controller.anim_char_002_attack,
          "anim_char_002_die"    : it.controller.anim_char_002_die,
          "anim_char_002_hurt"   : it.controller.anim_char_002_hurt,
          "anim_char_002_idle"   : it.controller.anim_char_002_idle,
          "anim_char_002_poss"   : it.controller.anim_char_002_poss,
          "anim_char_002_run"    : it.controller.anim_char_002_run,
          "anim_char_002_sad"    : it.controller.anim_char_002_sad,
          "anim_char_002_show"   : it.controller.anim_char_002_show,
          "anim_char_002_standby" : it.controller.anim_char_002_standby,
          "anim_char_002_show02"  : it.controller.anim_char_002_show02
        },
        "aniBox"     : it.aniBoxs[0],
        "playAnim"   : it.playAnim?it.playAnim:null
      },
      "lookatOnce": it.lookAtOnce || null,
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
        },
        {
          "type" : "Skeleton",
          "res"  : it.res[2]
        }
      ]
    };
    return node;
  }