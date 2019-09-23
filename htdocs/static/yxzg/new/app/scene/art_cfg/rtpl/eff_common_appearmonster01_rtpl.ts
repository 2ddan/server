/**
 * eff_common_appearmonster01_rtpl
 */
export const eff_common_appearmonster01_rtpl = (it: any) => {
    return {
        "name" : "eff_common_appearmonster01",
        "type" : "node",
        "transform" : {
            "position" : it.position?[it.position[0], it.position[1], it.position[2]] : [0, 0, 0],
            "scale"    : it.scale?[it.scale[0], it.scale[1], it.scale[2]] : [1, 1, 1],
            "rotate"   : it.rotate?[it.rotate[0], it.rotate[1], it.rotate[2]] : [0, 0, 0]
        },
        "animator"  : {
          "controller" : {
            "eff_common_appearmonster01" : "6nqoVyNDmh4rxAZxr6eiT8.ai"
          },
          "aniBox"     : {
            "eff_common_appearmonster01" : {
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
            "name" : "eff_common_appearmonster01 ",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0,
                -1.64999997615814,
                1.19000005722046
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
                "name" : "tx_plane_noise2",
                "type" : "node",
                "transform" : {
                  "position" : [
                    0.0,
                    0.430000007152557,
                    0.0
                  ],
                  "scale"    : [
                    4.0,
                    4.0,
                    2.0
                  ],
                  "rotate"   : [
                    0.0,
                    4.37113918394516E-08,
                    1.57079637050629
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "PKCDKY6PCwnkJ6mFR4jnXJ.geo"
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
                          "name" : "6SnEmRWVUcVknhcwdF1yEY.png"
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
                "name" : "tx_plane_noise1",
                "type" : "node",
                "transform" : {
                  "position" : [
                    -0.259999990463257,
                    4.51999998092651,
                    0.0
                  ],
                  "scale"    : [
                    6.0,
                    8.39999961853027,
                    2.53999996185303
                  ],
                  "rotate"   : [
                    0.0,
                    0.0,
                    1.57079637050629
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "Qph8oa5syjKCm7UKUe1c2n.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : "DzZQLyNpapBmG1kzUMGs1t.png"
                        }
                      },
                      "vertexColors" : 2,
                      "transparent"  : true,
                      "blendSrc"     : 204,
                      "blendDst"     : 201,
                      "side"         : 2,
                      "tintColor"    : 8355711,
                      "tintOpacity"  : 0.497000008821487,
                      "layer"        : 3000,
                      "blending"     : 5
                    }
                  ]
                }
              },
              {
                "name" : "trail_add",
                "type" : "node",
                "transform" : {
                  "position" : [
                    -0.0199999995529652,
                    2.04999995231628,
                    -0.209999993443489
                  ],
                  "scale"    : [
                    15.0,
                    4.0,
                    1.0
                  ],
                  "rotate"   : [
                    0.0,
                    0.0,
                    4.71238899230957
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "Wf7kG5LRLyWTsUUtU473ZD.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : "4rEHTU8jrxkfjyaaa8o3xq.png"
                        }
                      },
                      "transparent" : true,
                      "blendSrc"    : 204,
                      "blendDst"    : 201,
                      "side"        : 2,
                      "tintColor"   : 8421504,
                      "tintOpacity" : 0.501960813999176,
                      "layer"       : 3000,
                      "blending"    : 5
                    }
                  ]
                }
              },
              {
                "name" : "trail_di2",
                "type" : "node",
                "transform" : {
                  "position" : [
                    -0.0700000002980232,
                    1.05999994277954,
                    0.0
                  ],
                  "scale"    : [
                    7.5,
                    4.0,
                    1.0
                  ],
                  "rotate"   : [
                    0.0,
                    0.0,
                    4.71238899230957
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "BZ3w2NKdL5p3bbBnrzDVfg.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : "E3NLq2viki3phtJLGsTA8J.png"
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
                "name" : "trail",
                "type" : "node",
                "transform" : {
                  "position" : [
                    0.0,
                    0.46000000834465,
                    0.279999971389771
                  ],
                  "scale"    : [
                    15.0,
                    10.0,
                    1.0
                  ],
                  "rotate"   : [
                    0.0,
                    0.0,
                    4.71238899230957
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "Wf7kG5LRLyWTsUUtU473ZD.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : "ML9P9SAV8Wfk83AnPwThBE.png"
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
                "name" : "glow1",
                "type" : "node",
                "transform" : {
                  "position" : [
                    0.0,
                    1.92999994754791,
                    0.0
                  ],
                  "scale"    : [
                    7.0,
                    7.0,
                    7.0
                  ],
                  "rotate"   : [
                    4.79965543746948,
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
                          "name" : "4afWRUysxS92yZGdPFMnQ3.png"
                        }
                      },
                      "transparent" : true,
                      "blendSrc"    : 204,
                      "blendDst"    : 201,
                      "side"        : 2,
                      "tintColor"   : 8355711,
                      "tintOpacity" : 0.503000020980835,
                      "layer"       : 3000,
                      "blending"    : 5
                    }
                  ]
                }
              }
            ]
          }
        ]
    };
}