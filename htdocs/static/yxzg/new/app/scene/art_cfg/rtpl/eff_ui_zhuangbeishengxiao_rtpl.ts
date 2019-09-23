/**
 * eff_ui_zhuangbeishengxiao_rtpl
 */
export const eff_ui_zhuangbeishengxiao_rtpl = (it: any) => {
    return{
      "name" : "eff_ui_zhuangbeishengxiao",
      "type" : "node", 
      "transform": {
        "position" : it.position ? [it.position[0], it.position[1], it.position[2]] : [-78, -178, 200.0],                                             
        "scale"    : it.scale    ? [it.scale[0],    it.scale[1],    it.scale[2]]    : [60.0, 60.0, 60.0],               
        "rotate"   : it.rotate   ? [it.rotate[0],   it.rotate[1],   it.rotate[2]]   : [0, 0, 0]    
        },  
        "attachment": '2D',  
      "animator"  : {
        "controller" : {
          "eff_ui_zhuangbeishengxiao" : "CpQidcUUvy2rGeo6XpGJPj.ai"
        },
        "aniBox"     : {
          "eff_ui_zhuangbeishengxiao" : {
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
          "name" : "eff_ui_zhuangbeishengxiao",
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
              0.0
            ]
          },
          "children"  : [
            {
              "name" : "tx_plane_02",
              "type" : "node",
              "transform" : {
                "position" : [
                  -0.0359999984502792,
                  0.0130000002682209,
                  0.0
                ],
                "scale"    : [
                  1.10000002384186,
                  1.10000002384186,
                  1.0
                ],
                "rotate"   : [
                  0.0,
                  3.14159274101257,
                  3.33113551139832
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
              "name" : "glow",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.0,
                  0.0199999995529652,
                  0.0
                ],
                "scale"    : [
                  1.54999995231628,
                  1.54999995231628,
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
                "res"  : "4RCTz8EDoKEFg52ZCCudfL.geo"
              },
              "meshRender" : {
                "material" : [
                  {
                    "type" : "MeshParticlesMaterial",
                    "map"  : {
                      "generateMipmaps" : false,
                      "image"           : {
                        "name" : "Cjih8ssBeBfQVqLHEZxVuo.png"
                      }
                    },
                    "transparent" : true,
                    "blendSrc"    : 204,
                    "blendDst"    : 201,
                    "side"        : 2,
                    "tintColor"   : 8355711,
                    "tintOpacity" : 0.0,
                    "layer"       : 3000,
                    "blending"    : 5
                  }
                ]
              }
            },
            {
              "name" : "glow_di_1",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.0,
                  0.0199999809265137,
                  0.0
                ],
                "scale"    : [
                  2.29999995231628,
                  1.5,
                  1.0
                ],
                "rotate"   : [
                  6.02138614654541,
                  0.0,
                  5.97775268554688
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
                        "name" : "UWBfw1cNTQc3TLiQTjbSAE.png"
                      }
                    },
                    "transparent" : true,
                    "blendSrc"    : 204,
                    "blendDst"    : 201,
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
              "name" : "smoke_1",
              "type" : "node",
              "transform" : {
                "position" : [
                  -0.108999997377396,
                  0.0869999974966049,
                  0.0
                ],
                "scale"    : [
                  4.69999980926514,
                  4.69999980926514,
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
                "res"  : "SjX8HESNAdjs3qL774HTJH.geo"
              },
              "meshRender" : {
                "material" : [
                  {
                    "type" : "MeshParticlesMaterial",
                    "map"  : {
                      "filter" : [
                        1006,
                        1007
                      ],
                      "generateMipmaps" : true,
                      "image"           : {
                        "name" : "WP7udvHPah11z8ziRXFsHL.png"
                      }
                    },
                    "vertexColors" : 2,
                    "transparent"  : true,
                    "blendSrc"     : 204,
                    "blendDst"     : 201,
                    "side"         : 2,
                    "tintColor"    : 8355711,
                    "tintOpacity"  : 0.0,
                    "layer"        : 3000,
                    "blending"     : 5
                  }
                ]
              }
            },
            {
              "name" : "smoke_2",
              "type" : "node",
              "transform" : {
                "position" : [
                  -0.069000244140625,
                  0.129999995231628,
                  0.0
                ],
                "scale"    : [
                  5.5,
                  5.5,
                  1.0
                ],
                "rotate"   : [
                  0.0,
                  3.14159274101257,
                  0.0
                ]
              },
              "geometry"  : {
                "type" : "BufferGeometry",
                "res"  : "SjX8HESNAdjs3qL774HTJH.geo"
              },
              "meshRender" : {
                "material" : [
                  {
                    "type" : "MeshParticlesMaterial",
                    "map"  : {
                      "filter" : [
                        1006,
                        1007
                      ],
                      "generateMipmaps" : true,
                      "image"           : {
                        "name" : "WP7udvHPah11z8ziRXFsHL.png"
                      }
                    },
                    "vertexColors" : 2,
                    "transparent"  : true,
                    "blendSrc"     : 204,
                    "blendDst"     : 201,
                    "side"         : 2,
                    "tintColor"    : 8355711,
                    "tintOpacity"  : 0.0,
                    "layer"        : 3000,
                    "blending"     : 5
                  }
                ]
              }
            },
            {
              "name" : "glow_2",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.0,
                  0.0199999809265137,
                  0.0
                ],
                "scale"    : [
                  1.60000002384186,
                  1.60000002384186,
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
                "res"  : "4RCTz8EDoKEFg52ZCCudfL.geo"
              },
              "meshRender" : {
                "material" : [
                  {
                    "type" : "MeshParticlesMaterial",
                    "map"  : {
                      "generateMipmaps" : false,
                      "image"           : {
                        "name" : "6ykTaYoN3831Q2Znm5hb3G.png"
                      }
                    },
                    "transparent" : true,
                    "blendSrc"    : 204,
                    "blendDst"    : 201,
                    "side"        : 2,
                    "tintColor"   : 8355711,
                    "tintOpacity" : 0.0,
                    "layer"       : 3000,
                    "blending"    : 5
                  }
                ]
              }
            },
            {
              "name" : "glow_add",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.0,
                  0.0199999809265137,
                  0.0
                ],
                "scale"    : [
                  1.54999995231628,
                  1.54999995231628,
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
                "res"  : "4RCTz8EDoKEFg52ZCCudfL.geo"
              },
              "meshRender" : {
                "material" : [
                  {
                    "type" : "MeshParticlesMaterial",
                    "map"  : {
                      "generateMipmaps" : false,
                      "image"           : {
                        "name" : "E9gZZAyt22TkdrxJJKBbdD.png"
                      }
                    },
                    "transparent" : true,
                    "blendSrc"    : 204,
                    "blendDst"    : 201,
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
        }
      ]
    }
}