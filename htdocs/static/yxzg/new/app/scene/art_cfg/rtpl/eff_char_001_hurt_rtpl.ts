/**
 * eff_char_001_hurt_rtpl
 */
export const eff_char_001_hurt_rtpl = (it: any) => {
    return  {
      "name" : "eff_char_001_hurt",
      "type" : "node",
      "transform" : {
        "position" : it.position?[it.position[0], it.position[1], it.position[2]] : [0, 0, 0],
        "scale"    : it.scale?[it.scale[0], it.scale[1], it.scale[2]] : [1, 1, 1],
        "rotate"   : it.rotate?[it.rotate[0], it.rotate[1], it.rotate[2]] : [0, 0, 0]
      },
      "animator"  : {
        "controller" : {
          "eff_char_001_hurt" : "H2mExDVvBA3tuuvmLJ1vgV.ai"
        },
        "aniBox"     : {
          "eff_char_001_hurt" : {
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
          "name" : "eff_char_001_attack ",
          "type" : "node",
          "transform" : {
            "position" : [
              0.0,
              1.54999995231628,
              1.95000004768372
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
              "name" : "hit_01",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.0,
                  -0.100000001490116,
                  -0.46000000834465
                ],
                "scale"    : [
                  5.0,
                  5.0,
                  1.0
                ],
                "rotate"   : [
                  0.0,
                  0.0,
                  1.57079637050629
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
                        "name" : "RBrxFrpxMrT4sGMCB8j4te.png"
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
            },
            {
              "name" : "hit_02",
              "type" : "node",
              "transform" : {
                "position" : [
                  -0.529999971389771,
                  -0.600000023841858,
                  -0.439999997615814
                ],
                "scale"    : [
                  4.0,
                  4.0,
                  1.0
                ],
                "rotate"   : [
                  0.0,
                  0.0,
                  1.97134923934937
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
                        "name" : "RBrxFrpxMrT4sGMCB8j4te.png"
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
            },
            {
              "name" : "daoguang",
              "type" : "node",
              "transform" : {
                "position" : [
                  4.15000009536743,
                  0.0,
                  0.0
                ],
                "scale"    : [
                  1.0,
                  1.20000004768372,
                  1.0
                ],
                "rotate"   : [
                  0.0,
                  3.14159274101257,
                  0.726929664611816
                ]
              },
              "geometry"  : {
                "type" : "BufferGeometry",
                "res"  : "6TrTaQrnwrRtKnxzFRPRq5.geo"
              },
              "meshRender" : {
                "material" : [
                  {
                    "type" : "MeshParticlesMaterial",
                    "map"  : {
                      "repeat" : [
                        1.0,
                        0.800000011920929
                      ],
                      "wrap"   : [
                        1001,
                        1001
                      ],
                      "generateMipmaps" : false,
                      "image"           : {
                        "name" : "UyfgCKqJ4Sw1c9qQ4NwRnF.png"
                      }
                    },
                    "transparent" : true,
                    "blendSrc"    : 204,
                    "blendDst"    : 205,
                    "side"        : 2,
                    "tintColor"   : 5973760,
                    "tintOpacity" : 0.0,
                    "layer"       : 3000,
                    "blending"    : 5
                  }
                ]
              }
            },
            {
              "name" : "di_1",
              "type" : "node",
              "transform" : {
                "position" : [
                  -0.150000005960464,
                  -1.83000004291534,
                  -0.672999978065491
                ],
                "scale"    : [
                  4.0,
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
                        "name" : "7p4cHGcXZ3MYBtCuZcvyFv.png"
                      }
                    },
                    "transparent" : true,
                    "blendSrc"    : 204,
                    "blendDst"    : 205,
                    "side"        : 2,
                    "tintColor"   : 4008449,
                    "tintOpacity" : 0.0,
                    "layer"       : 3000,
                    "blending"    : 5
                  }
                ]
              }
            },
            {
              "name" : "other_01",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.0299999993294477,
                  -0.230000004172325,
                  -0.0500000007450581
                ],
                "scale"    : [
                  2.0,
                  3.0,
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
                        "name" : "Vffi8veiMHHJZPNPbY77ry.png"
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
            },
            {
              "name" : "di_02",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.0,
                  -1.2940000295639,
                  0.186000004410744
                ],
                "scale"    : [
                  6.0,
                  3.0,
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
                        "name" : "ARZwZ8SEGwthrUZz2bVosz.png"
                      }
                    },
                    "transparent" : true,
                    "blendSrc"    : 204,
                    "blendDst"    : 205,
                    "side"        : 2,
                    "tintColor"   : 4008449,
                    "tintOpacity" : 0.0,
                    "layer"       : 3000,
                    "blending"    : 5
                  }
                ]
              }
            },
            {
              "name" : "di_01",
              "type" : "node",
              "transform" : {
                "position" : [
                  -0.150000005960464,
                  -1.83000004291534,
                  -0.672999978065491
                ],
                "scale"    : [
                  4.0,
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
                        "name" : "7p4cHGcXZ3MYBtCuZcvyFv.png"
                      }
                    },
                    "transparent" : true,
                    "blendSrc"    : 204,
                    "blendDst"    : 205,
                    "side"        : 2,
                    "tintColor"   : 4008449,
                    "tintOpacity" : 0.0,
                    "layer"       : 3000,
                    "blending"    : 5
                  }
                ]
              }
            },
            {
              "name" : "smoke_l",
              "type" : "node",
              "transform" : {
                "position" : [
                  1.33000004291534,
                  -0.740000009536743,
                  0.186000004410744
                ],
                "scale"    : [
                  4.0,
                  2.0,
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
                "res"  : "2AEFUTEoeyCdQPQyVh1SMh.geo"
              },
              "meshRender" : {
                "material" : [
                  {
                    "type" : "MeshParticlesMaterial",
                    "map"  : {
                      "generateMipmaps" : false,
                      "image"           : {
                        "name" : "MrFGWS6W2gPEWpaQuCmuZ8.png"
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
            },
            {
              "name" : "smoke_r",
              "type" : "node",
              "transform" : {
                "position" : [
                  -1.25,
                  -0.239999994635582,
                  0.186000004410744
                ],
                "scale"    : [
                  5.0,
                  3.0,
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
                "res"  : "2AEFUTEoeyCdQPQyVh1SMh.geo"
              },
              "meshRender" : {
                "material" : [
                  {
                    "type" : "MeshParticlesMaterial",
                    "map"  : {
                      "generateMipmaps" : false,
                      "image"           : {
                        "name" : "MrFGWS6W2gPEWpaQuCmuZ8.png"
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
            },
            {
              "name" : "smoke_r2",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.0799999237060547,
                  -0.860000014305115,
                  -0.280000001192093
                ],
                "scale"    : [
                  2.5,
                  2.5,
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
                "res"  : "9FEcknzv1PPyC8XoEsRLGm.geo"
              },
              "meshRender" : {
                "material" : [
                  {
                    "type" : "MeshParticlesMaterial",
                    "map"  : {
                      "generateMipmaps" : false,
                      "image"           : {
                        "name" : "MmihTRykvZ1gzafbUPav1p.png"
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
            },
            {
              "name" : "smoke_l2",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.0799999982118607,
                  -0.860000014305115,
                  -0.569999992847443
                ],
                "scale"    : [
                  2.5,
                  2.5,
                  2.5
                ],
                "rotate"   : [
                  0.0,
                  0.0,
                  0.0
                ]
              },
              "geometry"  : {
                "type" : "BufferGeometry",
                "res"  : "9FEcknzv1PPyC8XoEsRLGm.geo"
              },
              "meshRender" : {
                "material" : [
                  {
                    "type" : "MeshParticlesMaterial",
                    "map"  : {
                      "generateMipmaps" : false,
                      "image"           : {
                        "name" : "MmihTRykvZ1gzafbUPav1p.png"
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
        },
        {
          "name" : "eff_char_001_hurt1",
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
              "name" : "eff_char_001_hurt ",
              "type" : "node",
              "transform" : {
                "position" : [
                  -0.800000011920929,
                  2.09999990463257,
                  1.95000004768372
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
                  "name" : "trail_1",
                  "type" : "node",
                  "transform" : {
                    "position" : [
                      1.05999994277954,
                      0.930000007152557,
                      0.0
                    ],
                    "scale"    : [
                      4.0,
                      4.0,
                      4.0
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
                            "name" : "XTsp1RHvEatAkoXWQH17YK.png"
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
                  "name" : "trail_2",
                  "type" : "node",
                  "transform" : {
                    "position" : [
                      1.02999997138977,
                      0.0599999986588955,
                      0.0
                    ],
                    "scale"    : [
                      3.0,
                      3.40000009536743,
                      1.0
                    ],
                    "rotate"   : [
                      0.0,
                      0.0,
                      5.49778747558594
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
                            "name" : "XTsp1RHvEatAkoXWQH17YK.png"
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
                  "name" : "hit_2",
                  "type" : "node",
                  "transform" : {
                    "position" : [
                      0.379999995231628,
                      -0.00999999046325684,
                      0.0
                    ],
                    "scale"    : [
                      6.0,
                      6.0,
                      6.0
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
                            "name" : "NDYC8NemnzmzmCgiLNwiYN.png"
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
                  "name" : "hit_1",
                  "type" : "node",
                  "transform" : {
                    "position" : [
                      0.200000002980232,
                      0.0,
                      0.0
                    ],
                    "scale"    : [
                      3.40000009536743,
                      3.40000009536743,
                      3.40000009536743
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
                            "name" : "PWnCTfLJYeuYCDDXgwVYcQ.png"
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
      ]
    };
}