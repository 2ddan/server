export class RTPL {
    static "AkApC5UviYVY3iDfEGoURA.rtpl" = ( it: any )=>{
        return AkApC5UviYVY3iDfEGoURA( it );
    }
    static "DG3DGQbJj1oZUQbJjfbmqi.rtpl" = ( it: any )=>{
        return DG3DGQbJj1oZUQbJjfbmqi( it );
    }

    static "NKpNBfaoet7ARPBjJFwSty.rtpl" = ( it: any )=>{
        return NKpNBfaoet7ARPBjJFwSty( it );
    }

    static "GAj9jND8TKB6bcDV434xpQ.rtpl" = ( it: any )=>{
      return GAj9jND8TKB6bcDV434xpQ( it );
    }

    static "Vs726oovdsg6EXUzCjGeND.rtpl" = ( it: any )=>{
      return Vs726oovdsg6EXUzCjGeND( it );
    }

    static "BRTxqUDJfgfJg5Ly38u6sy.rtpl" = ( it: any )=>{
      return Vs726oovdsg6EXUzCjGeND( it );
    }

    static "GjJR8q1iRhMKHF36ou7jDG.rtpl" = ( it: any )=>{
      return Vs726oovdsg6EXUzCjGeND( it );
    }

    static "QSNcTENPskVGc5Z36XkWWY.rtpl" = ( it: any )=>{
      return QSNcTENPskVGc5Z36XkWWY( it );
    }
    
    static "XvmoB8Vdjkduf3DyxXAQ6o.rtpl" = ( it: any )=>{
      return XvmoB8Vdjkduf3DyxXAQ6o( it );
    }
    
    static "5v7ozmicTAFZsWEXzAZxQg.rtpl" = ( it: any )=>{
      return _5v7ozmicTAFZsWEXzAZxQg( it );
    }
    
    static "T4i3GKBU6aFbxvDsU3BxkT.rtpl" = ( it: any )=>{
      return T4i3GKBU6aFbxvDsU3BxkT( it );
    }
    
    static "JcVnuMLdk52SbQ9Fo25veB.rtpl" = ( it: any )=>{
      return JcVnuMLdk52SbQ9Fo25veB( it );
    }

    static "eff_guaiwuguang" = ( it: any )=>{
      return eff_guaiwuguang( it );
    }

    static eff_xuanzhong = ( it: any )=>{
      return eff_xuanzhong( it );
    }

    static eff_rolem_sk1 = ( it: any )=>{
        return eff_rolem_sk1( it );
    }

    static eff_hit_rolem_common = ( it: any )=>{
        return eff_hit_rolem_common( it );
    }

    static eff_hit_monster_common = ( it: any  )=>{
      return eff_hit_monster_common( it );
    }
}

const complied = ( it: any, node: any )=>{
    return {
        "name" : it.names[0],
        "type" : "node",
        "transform" : {
            "position" : it.position?[it.position[0], it.position[1], it.position[2]]:[0,0,0],
            "scale"    : it.scale?[it.scale[0], it.scale[1], it.scale[2]]:[1,1,1],
            "rotate"   : it.rotate?[it.rotate[0], it.rotate[1], it.rotate[2]]:[0,0,0]
        },
        "children": [
            node
        ]
    }
}

const eff_hit_rolem_common = ( it: any )=>{
  return {
      "name" : "eff_hit_rolem_common",
      "type" : "node",
      "transform" : {
        "position" : it.position ? [ it.position[0], it.position[1], it.position[2] ] : [ 0.0, 0.0, 0.0],
        "scale"    : it.scale ? [ it.scale[0], it.scale[1], it.scale[2] ] : [1,1,1],
        "rotate"   : it.rotate ? [ it.rotate[0], it.rotate[1], it.rotate[2] ] : [0.0,0.0,0.0]
      },
      "children"  : [
        {
          "name" : "eff_hit_rolem_common",
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
          "animator"  : {
            "controller" : {
              "eff_hit_rolem_common" : "9zgCHDyX2tFJJGSYYebtgB.ai"
            },
            "aniBox"     : {
              "eff_hit_rolem_common" : {
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
              "name" : "mingzong_1",
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
              "geometry"  : {
                "type" : "BufferGeometry",
                "res"  : "CRDaCPXRknpTtym6H6a5pH.geo"
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
                        "name" : "AtHAQjcPaCYCJ5FnChUsdq.png"
                      }
                    },
                    "transparent" : true,
                    "blendSrc"    : 204,
                    "blendDst"    : 201,
                    "side"        : 2,
                    "tintColor"   : 8421504,
                    "tintOpacity" : 0.0,
                    "layer"       : 4500,
                    "blending"    : 5
                  }
                ]
              }
            },
            {
              "name" : "mingzong_2",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.0,
                  0.0,
                  0.0
                ],
                "scale"    : [
                  1.64337992668152,
                  1.64337861537933,
                  1.64337861537933
                ],
                "rotate"   : [
                  0.0,
                  0.0,
                  0.0
                ]
              },
              "geometry"  : {
                "type" : "BufferGeometry",
                "res"  : "CRDaCPXRknpTtym6H6a5pH.geo"
              },
              "meshRender" : {
                "material" : [
                  {
                    "type" : "MeshParticlesMaterial",
                    "map"  : {
                      "repeat" : [
                        0.25,
                        1.0
                      ],
                      "filter" : [
                        1006,
                        1007
                      ],
                      "generateMipmaps" : true,
                      "image"           : {
                        "name" : "HT27KTPwEHtNjFrrfv7VcV.png"
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

const eff_xuanzhong = ( it: any )=>{
  return {
    "name" : "eff_xuanzhong",
    "type" : "node",
    "transform" : {
      "position" : it.position ? [ it.position[0], it.position[1], it.position[2] ] : [ 0.0, 0.0, 0.0],
      "scale"    : it.scale ? [ it.scale[0], it.scale[1], it.scale[2] ] : [1,1,1],
      "rotate"   : it.rotate ? [ it.rotate[0], it.rotate[1], it.rotate[2] ] : [0.0,0.0,0.0]
    },
    "animator"  : {
      "controller" : {
        "eff_xuanzhong" : "Vp6iGVwUJvfSztcMsDswrE.ai"
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
        "name" : "demoeff_xz01",
        "type" : "node",
        "transform" : {
          "position" : [
            0.0,
            0.0700000002980232,
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
          "res"  : "CjGkwP84N5Yn9WWJhpYTS5.geo"
        },
        "meshRender" : {
          "material" : [
            {
              "type" : "MeshParticlesMaterial",
              "map"  : {
                "generateMipmaps" : false,
                "image"           : {
                  "name" : "tuNt3eFcYBxWUPiXSJmor.png"
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
        "name" : "demoeff_xz02",
        "type" : "node",
        "transform" : {
          "position" : [
            0.0,
            0.0700000002980232,
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
          "res"  : "KWWEte7ZUX8fGzif9jEmcT.geo"
        },
        "meshRender" : {
          "material" : [
            {
              "type" : "MeshParticlesMaterial",
              "map"  : {
                "generateMipmaps" : false,
                "image"           : {
                  "name" : "tuNt3eFcYBxWUPiXSJmor.png"
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
        "name" : "demoxzjt01",
        "type" : "node",
        "transform" : {
          "position" : [
            0.0,
            0.0700000002980232,
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
          "res"  : "H3aSYTjWPTAzqhxBC2k23S.geo"
        },
        "meshRender" : {
          "material" : [
            {
              "type" : "MeshParticlesMaterial",
              "map"  : {
                "generateMipmaps" : false,
                "image"           : {
                  "name" : "tuNt3eFcYBxWUPiXSJmor.png"
                }
              },
              "transparent" : true,
              "blendSrc"    : 201,
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
        "name" : "demoxzjt02",
        "type" : "node",
        "transform" : {
          "position" : [
            0.0,
            0.0700000002980232,
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
          "res"  : "VzRA6LzqWMBWLFMELh81H8.geo"
        },
        "meshRender" : {
          "material" : [
            {
              "type" : "MeshParticlesMaterial",
              "map"  : {
                "generateMipmaps" : false,
                "image"           : {
                  "name" : "tuNt3eFcYBxWUPiXSJmor.png"
                }
              },
              "transparent" : true,
              "blendSrc"    : 201,
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
        "name" : "demoxzjt03",
        "type" : "node",
        "transform" : {
          "position" : [
            0.0,
            0.0700000002980232,
            0.0
          ],
          "scale"    : [
            1.0,
            1.0,
            1.0
          ],
          "rotate"   : [
            4.71238899230957,
            1.74845553146952E-07,
            0.0
          ]
        },
        "geometry"  : {
          "type" : "BufferGeometry",
          "res"  : "VnSb2kA2A9ywUXayuZPyBn.geo"
        },
        "meshRender" : {
          "material" : [
            {
              "type" : "MeshParticlesMaterial",
              "map"  : {
                "generateMipmaps" : false,
                "image"           : {
                  "name" : "tuNt3eFcYBxWUPiXSJmor.png"
                }
              },
              "transparent" : true,
              "blendSrc"    : 201,
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
        "name" : "demoxzjt04",
        "type" : "node",
        "transform" : {
          "position" : [
            0.0,
            0.0700000002980232,
            0.0
          ],
          "scale"    : [
            1.0,
            1.0,
            1.0
          ],
          "rotate"   : [
            4.71238899230957,
            1.74845553146952E-07,
            0.0
          ]
        },
        "geometry"  : {
          "type" : "BufferGeometry",
          "res"  : "Gc1i4Ru2EVXSFMb2sBD6tX.geo"
        },
        "meshRender" : {
          "material" : [
            {
              "type" : "MeshParticlesMaterial",
              "map"  : {
                "generateMipmaps" : false,
                "image"           : {
                  "name" : "tuNt3eFcYBxWUPiXSJmor.png"
                }
              },
              "transparent" : true,
              "blendSrc"    : 201,
              "blendDst"    : 205,
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

const eff_rolem_sk1 = ( it: any )=>{
  return {
      "name" : "eff_rolem_sk1",
      "type" : "node",
      "transform" : {
        "position" : it.position ? [ it.position[0], it.position[1], it.position[2] ] : [ 0.0, 0.0, 0.0],
        "scale"    : it.scale ? [ it.scale[0], it.scale[1], it.scale[2] ] : [0.3,0.3,0.3],
        "rotate"   : it.rotate ? [ it.rotate[0], it.rotate[1], it.rotate[2] ] : [0.0,0.0,0.0]
      },
      "children"  : [
        {
          "name" : "eff_rolem_sk1",
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
          "animator"  : {
            "controller" : {
              "eff_rolem_sk1" : "85BTcfjRTNLKPpgvRQit5L.ai"
            },
            "aniBox"     : {
              "eff_rolem_sk1" : {
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
              "name" : "Moxing_5",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.12810318171978,
                  1.40738999843597,
                  0.968133449554443
                ],
                "scale"    : [
                  1.31694173812866,
                  1.31694173812866,
                  1.31694173812866
                ],
                "rotate"   : [
                  1.54781305789948,
                  2.47620248794556,
                  4.50621271133423
                ]
              },
              "geometry"  : {
                "type" : "BufferGeometry",
                "res"  : "CbbSPaWFcnxZj7dQ1CeGfx.geo"
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
                      "filter" : [
                        1006,
                        1007
                      ],
                      "generateMipmaps" : true,
                      "image"           : {
                        "name" : "PBN1aE1FYQyPNHDcqzE6dY.png"
                      }
                    },
                    "transparent" : true,
                    "blendSrc"    : 204,
                    "blendDst"    : 201,
                    "side"        : 2,
                    "tintColor"   : 16777215,
                    "tintOpacity" : 0.0,
                    "layer"       : 3000,
                    "blending"    : 5
                  }
                ]
              }
            },
            {
              "name" : "chongjibo_1",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.109999999403954,
                  0.740679979324341,
                  -0.670000016689301
                ],
                "scale"    : [
                  1.0,
                  -1.82638669013977,
                  1.96596956253052
                ],
                "rotate"   : [
                  1.57045114040375,
                  0.0,
                  0.0
                ]
              },
              "geometry"  : {
                "type" : "BufferGeometry",
                "res"  : "KtrJ63VtxMQmfpkcKBxGmQ.geo"
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
                        "name" : "T7tNKZQTFseKRc3uj3uLJ3.png"
                      }
                    },
                    "transparent" : true,
                    "blendSrc"    : 204,
                    "blendDst"    : 205,
                    "side"        : 2,
                    "tintColor"   : 16777215,
                    "tintOpacity" : 0.0,
                    "layer"       : 3000,
                    "blending"    : 5
                  }
                ]
              }
            },
            {
              "name" : "chongjibo_2",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.109999999403954,
                  0.649779975414276,
                  -0.43571001291275
                ],
                "scale"    : [
                  1.26110601425171,
                  -2.41496205329895,
                  1.6229932308197
                ],
                "rotate"   : [
                  1.57045114040375,
                  0.0,
                  0.0
                ]
              },
              "geometry"  : {
                "type" : "BufferGeometry",
                "res"  : "KtrJ63VtxMQmfpkcKBxGmQ.geo"
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
                        "name" : "T7tNKZQTFseKRc3uj3uLJ3.png"
                      }
                    },
                    "transparent" : true,
                    "blendSrc"    : 204,
                    "blendDst"    : 205,
                    "side"        : 2,
                    "tintColor"   : 16777215,
                    "tintOpacity" : 0.0,
                    "layer"       : 3000,
                    "blending"    : 5
                  }
                ]
              }
            },
            {
              "name" : "chongjibo_3",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.109999999403954,
                  0.649779975414276,
                  -0.43571001291275
                ],
                "scale"    : [
                  1.26110994815826,
                  -2.41495895385742,
                  1.62298953533173
                ],
                "rotate"   : [
                  1.57045114040375,
                  0.0,
                  0.0
                ]
              },
              "geometry"  : {
                "type" : "BufferGeometry",
                "res"  : "KtrJ63VtxMQmfpkcKBxGmQ.geo"
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
                        "name" : "T7tNKZQTFseKRc3uj3uLJ3.png"
                      }
                    },
                    "transparent" : true,
                    "blendSrc"    : 204,
                    "blendDst"    : 205,
                    "side"        : 2,
                    "tintColor"   : 16777215,
                    "tintOpacity" : 0.0,
                    "layer"       : 3000,
                    "blending"    : 5
                  }
                ]
              }
            },
            {
              "name" : "chongjibo_4",
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
                  1.85495853424072
                ],
                "rotate"   : [
                  4.71238899230957,
                  0.0,
                  0.0
                ]
              },
              "geometry"  : {
                "type" : "BufferGeometry",
                "res"  : "9ajk3yJBaczNo7d3d8vvHn.geo"
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
                        "name" : "NNGXPHjKn1GzJ1mWpcn5as.png"
                      }
                    },
                    "transparent" : true,
                    "blendSrc"    : 204,
                    "blendDst"    : 201,
                    "side"        : 2,
                    "tintColor"   : 27647,
                    "tintOpacity" : 0.0,
                    "layer"       : 3000,
                    "blending"    : 5
                  }
                ]
              }
            },
            {
              "name" : "chongjibo_5",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.109999999403954,
                  -0.0353670008480549,
                  0.593480587005615
                ],
                "scale"    : [
                  1.81564199924469,
                  -2.84165978431702,
                  0.531237006187439
                ],
                "rotate"   : [
                  1.57045114040375,
                  0.0,
                  0.0
                ]
              },
              "geometry"  : {
                "type" : "BufferGeometry",
                "res"  : "KtrJ63VtxMQmfpkcKBxGmQ.geo"
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
                        "name" : "T7tNKZQTFseKRc3uj3uLJ3.png"
                      }
                    },
                    "transparent" : true,
                    "blendSrc"    : 204,
                    "blendDst"    : 205,
                    "side"        : 2,
                    "tintColor"   : 16777215,
                    "tintOpacity" : 0.0,
                    "layer"       : 3000,
                    "blending"    : 5
                  }
                ]
              }
            },
            {
              "name" : "chongjibo_6",
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
                  1.85495853424072
                ],
                "rotate"   : [
                  4.71238899230957,
                  0.0,
                  0.0
                ]
              },
              "geometry"  : {
                "type" : "BufferGeometry",
                "res"  : "9ajk3yJBaczNo7d3d8vvHn.geo"
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
                        "name" : "NNGXPHjKn1GzJ1mWpcn5as.png"
                      }
                    },
                    "transparent" : true,
                    "blendSrc"    : 204,
                    "blendDst"    : 201,
                    "side"        : 2,
                    "tintColor"   : 27647,
                    "tintOpacity" : 0.0,
                    "layer"       : 3000,
                    "blending"    : 5
                  }
                ]
              }
            },
            {
              "name" : "xuanzhuan_1",
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
                "res"  : "AQ8Gy4V1Jp3D7p5BGPpECW.geo"
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
                        "name" : "UprDKeBaEBBv7WhanYV8fs.png"
                      }
                    },
                    "transparent" : true,
                    "blendSrc"    : 204,
                    "blendDst"    : 201,
                    "side"        : 2,
                    "tintColor"   : 16777215,
                    "tintOpacity" : 0.0,
                    "layer"       : 3000,
                    "blending"    : 5
                  }
                ]
              }
            },
            {
              "name" : "shanguang_1",
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
                  4.3711398944879E-08,
                  4.71238899230957,
                  0.0
                ]
              },
              "geometry"  : {
                "type" : "BufferGeometry",
                "res"  : "CRDaCPXRknpTtym6H6a5pH.geo"
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
                      "filter" : [
                        1006,
                        1007
                      ],
                      "generateMipmaps" : true,
                      "image"           : {
                        "name" : "7bUevdZeFmVdXXhz8BM7ri.png"
                      }
                    },
                    "transparent" : true,
                    "blendSrc"    : 204,
                    "blendDst"    : 201,
                    "side"        : 2,
                    "tintColor"   : 16777215,
                    "tintOpacity" : 0.0,
                    "layer"       : 3000,
                    "blending"    : 5
                  }
                ]
              }
            },
            {
              "name" : "shanguang_2",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.0,
                  0.0,
                  0.0
                ],
                "scale"    : [
                  1.0,
                  1.00000047683716,
                  1.85496091842651
                ],
                "rotate"   : [
                  4.71238899230957,
                  0.0,
                  0.0
                ]
              },
              "geometry"  : {
                "type" : "BufferGeometry",
                "res"  : "9ajk3yJBaczNo7d3d8vvHn.geo"
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
                      "filter" : [
                        1006,
                        1007
                      ],
                      "generateMipmaps" : true,
                      "image"           : {
                        "name" : "7bUevdZeFmVdXXhz8BM7ri.png"
                      }
                    },
                    "transparent" : true,
                    "blendSrc"    : 204,
                    "blendDst"    : 201,
                    "side"        : 2,
                    "tintColor"   : 16777215,
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


const GAj9jND8TKB6bcDV434xpQ = ( it: any )=>{
  let node: any;

  node = {
    "name" : it.names[0],
    "type" : "node",
    "transform" : {
      "position" : [0,0,0],
      "scale"    : [1,1,1],
      "rotate"   : [0,0,0]
    },
    "lookatOnce": it.lookAtOnce || null,
    "animator"  : {
      "controller" : {
        "act_attack" : it.controller.act_attack,
        "act_run"    : it.controller.act_run,
        "act_standby" : it.controller.act_standby,
        "act_jump"    : it.controller.act_jump,
        "act_down"    : it.controller.act_down,
        "act_die"     : it.controller.act_die,
        "act_hit"     : it.controller.act_hit
      },
      "aniBox"     : it.aniBoxs[0],
      "playAnim"   : it.playAnim?it.playAnim:null
    },
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
        rayID  : it.rayID || 0,
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
  
  return complied( it, node );
}


const NKpNBfaoet7ARPBjJFwSty = ( it: any )=>{
  let node: any;

  node = {
    "name" : it.names[0],
    "type" : "node",
    "transform" : {
      "position" : [0,0,0],
      "scale"    : [1,1,1],
      "rotate"   : [0,0,0]
    },
    "animator"  : {
      "controller" : {
        "act_die" : it.controller.act_die,
        "act_run" : it.controller.act_run,
        "act_skill1_1" : it.controller.act_skill1_1,
        "act_standby"  : it.controller.act_standby,
        "act_diefly"   : it.controller.act_diefly
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
        rayID  : it.rayID || 0,
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
                "generateMipmaps" : true,
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
  }
  
  return complied( it, node );
}

const DG3DGQbJj1oZUQbJjfbmqi = ( it: any )=>{
  let node: any;

  node    = {
              "name" : it.names[0],
              "type" : "node",
              "transform" : {
                  "position" : [0,0,0],
                  "scale"    : [1,1,1],
                  "rotate"   : [0,0,0]
              },
              "animator"  : {
                  "controller" : {
                      "act_attack" : it.controller.act_attack,
                      "act_run"    : it.controller.act_run,
                      "act_standby" : it.controller.act_standby,
                      "act_jump"    : it.controller.act_jump,
                      "act_down"    : it.controller.act_down
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
                      rayID  : it.rayID || 0,
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

  return complied( it, node );
}

const AkApC5UviYVY3iDfEGoURA = ( it: any )=>{
        
  let node =  {
      "name" : it.names[0],
      "type" : "node",
      "transform" : {
          "position" : [0,0,0],
          "scale"    : [1,1,1],
          "rotate"   : [0,0,0]
      },
      "animator"  : {
          "controller" : {
              "act_rolem_die" : it.controller.act_rolem_die,
              "act_rolem_run" : it.controller.act_rolem_run,
              "act_rolem_standby" : it.controller.act_rolem_standby,
              "act_rolem_sk1"     : it.controller.act_rolem_sk1,
              "act_rolem_sk2"     : it.controller.act_rolem_sk2,
              "act_rolem_sk3"     : it.controller.act_rolem_sk3,
              "act_rolem_sk4"     : it.controller.act_rolem_sk4,
              "act_rolem_sk5"     : it.controller.act_rolem_sk5,
              "act_rolem_attack"  : it.controller.act_rolem_attack,
              "act_rolem_poss"    : it.controller.act_rolem_poss,
              "act_rolem_show"    : it.controller.act_rolem_show
          },
          "aniBox"     : it.aniBoxs[0],
          "playAnim"   : it.playAnim?it.playAnim:null
      },
      "lookatOnce": it.lookAtOnce || null,
      "children"  : [
          {
              "type" : "Skeleton",
              "res"  : it.res[2],
              rayID  : it.rayID || 0
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
                              "generateMipmaps" : true,
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

  return complied( it, node );
}

const eff_hit_monster_common = ( it: any )=>{
  return {
    "name" : "eff_hit_monster_common",
    "type" : "node",
    "transform" : {
      "position" : it.position ? [ it.position[0], it.position[1], it.position[2] ] : [ 0.0, 0.0, 0.0],
      "scale"    : it.scale ? [ it.scale[0], it.scale[1], it.scale[2] ] : [1,1,1],
      "rotate"   : it.rotate ? [ it.rotate[0], it.rotate[1], it.rotate[2] ] : [0.0,0.0,0.0]
    },
    "animator"  : {
      "controller" : {
        "eff_hit_monster_common" : "DnbvnmRDvMGBubkoZXAx7p.ai"
      },
      "aniBox"     : {
        "eff_hit_monster_common" : {
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
        "name" : "mingzong_1",
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
        "geometry"  : {
          "type" : "BufferGeometry",
          "res"  : "CRDaCPXRknpTtym6H6a5pH.geo"
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
                  "name" : "STFgmQdzvAuAgXaCWdFhza.png"
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
        "name" : "mingzong_2",
        "type" : "node",
        "transform" : {
          "position" : [
            0.0,
            0.0,
            0.0
          ],
          "scale"    : [
            1.64337992668152,
            1.64337992668152,
            1.64337992668152
          ],
          "rotate"   : [
            0.0,
            0.0,
            0.0
          ]
        },
        "geometry"  : {
          "type" : "BufferGeometry",
          "res"  : "CRDaCPXRknpTtym6H6a5pH.geo"
        },
        "meshRender" : {
          "material" : [
            {
              "type" : "MeshParticlesMaterial",
              "map"  : {
                "repeat" : [
                  0.25,
                  1.0
                ],
                "filter" : [
                  1006,
                  1007
                ],
                "generateMipmaps" : true,
                "image"           : {
                  "name" : "XkRmf2XatThfwQ8p8srEvN.png"
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
}

const Vs726oovdsg6EXUzCjGeND = ( it: any )=>{
  let node: any;

  node = {
    "name" : it.names[0],
    "type" : "node",
    "transform" : {
      "position" : [0,0,0],
      "scale"    : [1,1,1],
      "rotate"   : [0,0,0]
    },
    "children"  : [
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
            1.4210854715202E-14,
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
  
  return complied( it, node );
}


const QSNcTENPskVGc5Z36XkWWY = ( it: any )=>{
  let node = 
  {
    "name" : it.names[0],
    "type" : "node",
    "transform" : {
      "position" : [0,0,0],
      "scale"    : [1,1,1],
      "rotate"   : [0,0,0]
    },
    "animator"  : {
      "controller" : {
        "act_die" : it.controller.act_die,
        "act_diefly" : it.controller.act_diefly,
        "act_run"    : it.controller.act_run,
        "act_skill1_1" : it.controller.act_skill1_1,
        "act_standby"  : it.controller.act_standby
      },
      "aniBox"     : it.aniBoxs[0],
      "playAnim"   : it.playAnim?it.playAnim:null
    },
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
        rayID: it.rayID || 0,
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
                "generateMipmaps" : true,
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
  }

  return complied( it, node );
}
const XvmoB8Vdjkduf3DyxXAQ6o = ( it: any )=>{
  let node = 
  {
    "name" : it.names[0],
    "type" : "node",
    "transform" : {
      "position" : [0,0,0],
      "scale"    : [1,1,1],
      "rotate"   : [0,0,0]
    },
    "animator"  : {
      "controller" : {
        "act_die" : it.controller.act_die,
        "act_diefly" : it.controller.act_diefly,
        "act_run"    : it.controller.act_run,
        "act_skill1_1" : it.controller.act_skill1_1,
        "act_standby"  : it.controller.act_standby
      },
      "aniBox"     : it.aniBoxs[0],
      "playAnim"   : it.playAnim?it.playAnim:null
    },
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
        rayID: it.rayID || 0,
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
                "generateMipmaps" : true,
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
  }

  return complied( it, node );
}
const _5v7ozmicTAFZsWEXzAZxQg = ( it: any )=>{
  let node = 
  {
    "name" : it.names[0],
    "type" : "node",
    "transform" : {
      "position" : [0,0,0],
      "scale"    : [1,1,1],
      "rotate"   : [0,0,0]
    },
    "animator"  : {
      "controller" : {
        "act_die" : it.controller.act_die,
        "act_diefly" : it.controller.act_diefly,
        "act_run"    : it.controller.act_run,
        "act_skill1_1" : it.controller.act_skill1_1,
        "act_standby"  : it.controller.act_standby
      },
      "aniBox"     : it.aniBoxs[0],
      "playAnim"   : it.playAnim?it.playAnim:null
    },
    "children"  : [
      {
        "type" : "Skeleton",
        "res"  : it.res[2]
      },
      {
        "name" : it.names[45],
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
        "rayID": it.rayID || 0,
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
                "generateMipmaps" : true,
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
  }

  return complied( it, node );
}
const JcVnuMLdk52SbQ9Fo25veB = ( it: any )=>{
  let node = 
  {
    "name" : it.names[0],
    "type" : "node",
    "transform" : {
      "position" : [0,0,0],
      "scale"    : [1,1,1],
      "rotate"   : [0,0,0]
    },
    "animator"  : {
      "controller" : {
        "act_standby" : it.controller.act_standby,
        "act_die"     : it.controller.act_die,
        "act_diefly"  : it.controller.act_diefly,
        "act_run"     : it.controller.act_run,
        "act_skill1_1" : it.controller.act_skill1_1
      },
      "aniBox"     : it.aniBoxs[0],
      "playAnim"   : it.playAnim?it.playAnim:null
    },
    "children"  : [
      {
        "type" : "Skeleton",
        "res"  : it.res[2]
      },
      {
        "name" : it.names[45],
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
        "rayID": it.rayID || 0,
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
                "generateMipmaps" : true,
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
  }
  return complied( it, node );
}
const T4i3GKBU6aFbxvDsU3BxkT = ( it: any )=>{

  let node = {
    "name" : it.names[0],
    "type" : "node",
    "transform" : {
      "position" : [0,0,0],
      "scale"    : [1,1,1],
      "rotate"   : [0,0,0]
    },
    "animator"  : {
      "controller" : {
        "act_die" : it.controller.act_die,
        "act_diefly" : it.controller.act_diefly,
        "act_run"    : it.controller.act_run,
        "act_skill1_1" : it.controller.act_skill1_1,
        "act_standby"  : it.controller.act_standby
      },
      "aniBox"     : it.aniBoxs[0],
      "playAnim"   : it.playAnim?it.playAnim:null
    },
    "children"  : [
      {
        "type" : "Skeleton",
        "res"  : it.res[2]
      },
      {
        "name" : it.names[45],
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
        "rayID": it.rayID || 0,
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
                "generateMipmaps" : true,
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
        "name" : it.names[46],
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
        "skinnedMeshRender" : {
          "bones" : it.bones[0],
          "bounds" : it.bounds[0],
          "rootbone" : it.rootbone,
          "material" : [
            {
              "type" : "MeshBasicMaterial",
              "map"  : {
                "offset" : it.offset1 || [0,0],
                "repeat" : it.repeat1 || [1, 1],
                "wrap"   : it.wrap1 || [1000, 1000],
                "filter" : it.filter1 || [1006, 1006],
                "generateMipmaps" : true,
                "image"           : {
                  "name" : it.res[3]
                }
              }
            }
          ],
          "geometry" : {
            "type" : "BufferGeometry",
            "res"  : it.res[4]
          }
        }
      }
    ]
  }
  return complied( it, node );
}


const eff_guaiwuguang = ( it: any )=>{
  return {
    "name" : "eff_guaiwuguang",
    "type" : "node",
    "transform" : {
      "position" : it.position ? [ it.position[0], it.position[1], it.position[2] ] : [ 0.0, 0.0, 0.0],
      "scale"    : it.scale ? [ it.scale[0], it.scale[1], it.scale[2] ] : [1,1,1],
      "rotate"   : it.rotate ? [ it.rotate[0], it.rotate[1], it.rotate[2] ] : [0.0,0.0,0.0]
    },
    "animator"  : {
      "controller" : {
        "eff_guaiwuguang03" : "N84pwuamPX4NLrpN794zNJ.ai",
        "eff_guaiwuguang01" : "WWyngsY4X6MbAzFWMYettX.ai",
        "eff_guaiwuguang02" : "L6UgGMSk3H7791VidwvHFU.ai"
      },
      "aniBox"     : {
        "eff_guaiwuguang03" : {
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
        },
        "eff_guaiwuguang01" : {
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
        },
        "eff_guaiwuguang02" : {
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
        "name" : "demoeff_baodianx",
        "type" : "node",
        "transform" : {
          "position" : [
            0.0,
            3.41300010681152,
            0.0
          ],
          "scale"    : [
            1.0,
            1.0,
            1.0
          ],
          "rotate"   : [
            5.72467994689941,
            5.75958681106567,
            -1.75711249994492E-08
          ]
        },
        "geometry"  : {
          "type" : "BufferGeometry",
          "res"  : "4KgTPCwAotxcUYPMiwgYA6.geo"
        },
        "meshRender" : {
          "material" : [
            {
              "type" : "MeshParticlesMaterial",
              "map"  : {
                "generateMipmaps" : false,
                "image"           : {
                  "name" : "RSiFaDAhimiGxrGipkkwPg.png"
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
        "name" : "demo_guang01",
        "type" : "node",
        "transform" : {
          "position" : [
            -2.5,
            2.90000009536743,
            -4.44999980926514
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
          "res"  : "7kBNxid9ERhfx5aVGiGuCW.geo"
        },
        "meshRender" : {
          "material" : [
            {
              "type" : "MeshParticlesMaterial",
              "map"  : {
                "generateMipmaps" : false,
                "image"           : {
                  "name" : "JWp6GQqp72ksa4cqEMwmrT.png"
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
        "name" : "demo_guang02",
        "type" : "node",
        "transform" : {
          "position" : [
            -3.20000004768372,
            3.95000004768372,
            -7.09999990463257
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
          "res"  : "KqFdcV2ctfopP2t5TRqUUW.geo"
        },
        "meshRender" : {
          "material" : [
            {
              "type" : "MeshParticlesMaterial",
              "map"  : {
                "generateMipmaps" : false,
                "image"           : {
                  "name" : "JWp6GQqp72ksa4cqEMwmrT.png"
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
        "name" : "demo_guang03",
        "type" : "node",
        "transform" : {
          "position" : [
            2.97000002861023,
            3.13000011444092,
            -5.86999988555908
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
          "res"  : "RVyz3vQt987qynSFEhBov2.geo"
        },
        "meshRender" : {
          "material" : [
            {
              "type" : "MeshParticlesMaterial",
              "map"  : {
                "generateMipmaps" : false,
                "image"           : {
                  "name" : "JWp6GQqp72ksa4cqEMwmrT.png"
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
        "name" : "demoeff_baodian01",
        "type" : "node",
        "transform" : {
          "position" : [
            0.0,
            0.200000002980232,
            -5.5
          ],
          "scale"    : [
            1.0,
            1.0,
            1.0
          ],
          "rotate"   : [
            5.75958681106567,
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
              "type" : "MeshParticlesMaterial",
              "map"  : {
                "generateMipmaps" : false,
                "image"           : {
                  "name" : "RSiFaDAhimiGxrGipkkwPg.png"
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
        "name" : "demoeff_baodian02",
        "type" : "node",
        "transform" : {
          "position" : [
            -2.5,
            0.200000002980232,
            -10.5
          ],
          "scale"    : [
            1.0,
            1.0,
            1.0
          ],
          "rotate"   : [
            5.75958681106567,
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
              "type" : "MeshParticlesMaterial",
              "map"  : {
                "generateMipmaps" : false,
                "image"           : {
                  "name" : "RSiFaDAhimiGxrGipkkwPg.png"
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
        "name" : "demoeff_baodian03",
        "type" : "node",
        "transform" : {
          "position" : [
            2.5,
            0.200000002980232,
            -10.5
          ],
          "scale"    : [
            1.0,
            1.0,
            1.0
          ],
          "rotate"   : [
            5.75958681106567,
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
              "type" : "MeshParticlesMaterial",
              "map"  : {
                "generateMipmaps" : false,
                "image"           : {
                  "name" : "RSiFaDAhimiGxrGipkkwPg.png"
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
}