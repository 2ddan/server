/**
 * eff_char_001_attack_rtpl
 */
export const eff_char_001_attack_rtpl = (it: any) => {
    return {
      "name" : "eff_char_001_attack ",
      "type" : "node",
      "transform" : {
        "position" : it.position?[it.position[0], it.position[1], it.position[2]] : [0, 0, 0],
        "scale"    : it.scale?[it.scale[0], it.scale[1], it.scale[2]] : [1, 1, 1],
        "rotate"   : it.rotate?[it.rotate[0], it.rotate[1], it.rotate[2]] : [0, 0, 0]
      },
      "animator"  : {
        "controller" : {
          "eff_char_001_attack" : "XwxgbG9Xfq4jUkvByBS7xt.ai"
        },
        "aniBox"     : {
          "eff_char_001_attack" : {
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
                    "tintOpacity" : 0.501960813999176,
                    "layer"       : 3000,
                    "blending"    : 5
                  }
                ]
              }
            },
            {
              "name" : "stone1",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.0,
                  -1.14999997615814,
                  -0.949999988079071
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
              "particlesystem" : {
                "randomSeed" : 500250686,
                "useAutoRandomSeed" : true,
                "main"              : {
                  "duration" : 1.0,
                  "gravityModifierMultiplier" : 1.29999995231628,
                  "loop"                      : false,
                  "prewarm"                   : false,
                  "maxParticles"              : 7,
                  "playOnAwake"               : true,
                  "randomizeRotationDirection" : 0.0,
                  "simulationSpeed"            : 1.0,
                  "startDelayMultiplier"       : 0.899999976158142,
                  "startLifetimeMultiplier"    : 0.800000011920929,
                  "startRotation3D"            : false,
                  "startRotationMultiplier"    : 6.28318500518799,
                  "startRotationXMultiplier"   : 3.14159274101257,
                  "startRotationYMultiplier"   : 3.14159274101257,
                  "startRotationZMultiplier"   : 6.28318500518799,
                  "startSize3D"                : false,
                  "startSizeMultiplier"        : 0.300000011920929,
                  "startSizeXMultiplier"       : 0.300000011920929,
                  "startSizeYMultiplier"       : 1.0,
                  "startSizeZMultiplier"       : 1.0,
                  "startSpeedMultiplier"       : 12.0,
                  "customSimulationSpace"      : false,
                  "scalingMode"                : 1,
                  "simulationSpace"            : 0,
                  "gravityModifier"            : {
                    "mode" : 0,
                    "constant" : 1.29999995231628
                  },
                  "startColor"                 : {
                    "mode" : 0,
                    "color" : {
                      "r" : 1.0,
                      "g" : 1.0,
                      "b" : 1.0,
                      "a" : 1.0
                    }
                  },
                  "startDelay"                 : {
                    "mode" : 0,
                    "constant" : 0.899999976158142
                  },
                  "startLifetime"              : {
                    "mode" : 3,
                    "constantMax" : 0.800000011920929,
                    "constantMin" : 0.400000005960464
                  },
                  "startSize"                  : {
                    "mode" : 3,
                    "constantMax" : 0.100000001490116,
                    "constantMin" : 0.300000011920929
                  },
                  "startSizeX"                 : {
                    "mode" : 3,
                    "constantMax" : 0.100000001490116,
                    "constantMin" : 0.300000011920929
                  },
                  "startSizeY"                 : {
                    "mode" : 3,
                    "constantMax" : 1.0,
                    "constantMin" : 0.0
                  },
                  "startSizeZ"                 : {
                    "mode" : 3,
                    "constantMax" : 1.0,
                    "constantMin" : 0.0
                  },
                  "startSpeed"                 : {
                    "mode" : 3,
                    "constantMax" : 3.0,
                    "constantMin" : 12.0
                  },
                  "startRotation"              : {
                    "mode" : 3,
                    "constantMax" : 6.28318500518799,
                    "constantMin" : 0.0
                  },
                  "startRotationX"             : {
                    "mode" : 3,
                    "constantMax" : 0.0,
                    "constantMin" : 0.0
                  },
                  "startRotationY"             : {
                    "mode" : 3,
                    "constantMax" : 0.0,
                    "constantMin" : 0.0
                  },
                  "startRotationZ"             : {
                    "mode" : 3,
                    "constantMax" : 6.28318500518799,
                    "constantMin" : 0.0
                  }
                },
                "emission"          : {
                  "rateOverDistanceMultiplier" : 0.0,
                  "rateOverTimeMultiplier"     : 0.0,
                  "rateOverDistance"           : {
                    "mode" : 0,
                    "constant" : 0.0
                  },
                  "rateOverTime"               : {
                    "mode" : 0,
                    "constant" : 0.0
                  },
                  "bursts"                     : [
                    {
                      "minCount" : 30,
                      "maxCount" : 30,
                      "time"     : 0.0
                    }
                  ]
                },
                "shape"             : {
                  "alignToDirection" : false,
                  "angle"            : 60.0,
                  "arc"              : 360.0,
                  "length"           : 5.0,
                  "meshScale"        : 1.0,
                  "meshShapeType"    : 0,
                  "normalOffset"     : 0.0,
                  "radius"           : 0.100000001490116,
                  "randomDirectionAmount" : 0.0,
                  "shapeType"             : 4,
                  "box"                   : {
                    "x" : 1.50999999046326,
                    "y" : 1.25,
                    "z" : 0.0599999986588955
                  },
                  "sphericalDirectionAmount" : 0.0,
                  "useMeshColors"            : true,
                  "useMeshMaterialIndex"     : false
                },
                "textureSheetAnimation" : {
                  "animation" : 0,
                  "cycleCount" : 1,
                  "flipU"      : 0.0,
                  "flipV"      : 0.0,
                  "frameOverTimeMultiplier" : 0.999899983406067,
                  "numTilesX"               : 2,
                  "numTilesY"               : 2,
                  "rowIndex"                : 0,
                  "startFrameMultiplier"    : 0.0,
                  "useRandomRow"            : true,
                  "uvChannelMask"           : -1,
                  "frameOverTime"           : {
                    "mode" : 1,
                    "curveMultiplier" : 0.999899983406067,
                    "curve"           : {
                      "keys" : [
                        {
                          "inTangent" : 0.0,
                          "outTangent" : 1.0,
                          "time"       : 0.0,
                          "value"      : 0.0,
                          "tangentMode" : 0
                        },
                        {
                          "inTangent" : 1.0,
                          "outTangent" : 0.0,
                          "time"       : 1.0,
                          "value"      : 1.0,
                          "tangentMode" : 0
                        }
                      ]
                    }
                  },
                  "startFrame"              : {
                    "mode" : 0,
                    "constant" : 0.0
                  }
                },
                "sizeOverLifetime"      : {
                  "separateAxes" : false,
                  "sizeMultiplier" : 1.0,
                  "xMultiplier"    : 1.0,
                  "yMultiplier"    : 1.0,
                  "zMultiplier"    : 1.0,
                  "size"           : {
                    "mode" : 1,
                    "curveMultiplier" : 1.0,
                    "curve"           : {
                      "keys" : [
                        {
                          "inTangent" : -0.050621721893549,
                          "outTangent" : -0.050621721893549,
                          "time"       : 0.0,
                          "value"      : 1.0,
                          "tangentMode" : 0
                        },
                        {
                          "inTangent" : -0.19184947013855,
                          "outTangent" : -0.19184947013855,
                          "time"       : 0.615361332893372,
                          "value"      : 0.927123785018921,
                          "tangentMode" : 0
                        },
                        {
                          "inTangent" : -2.14168262481689,
                          "outTangent" : -2.14168262481689,
                          "time"       : 1.0,
                          "value"      : 0.470565795898438,
                          "tangentMode" : 0
                        }
                      ]
                    }
                  },
                  "x"              : {
                    "mode" : 1,
                    "curveMultiplier" : 1.0,
                    "curve"           : {
                      "keys" : [
                        {
                          "inTangent" : -0.050621721893549,
                          "outTangent" : -0.050621721893549,
                          "time"       : 0.0,
                          "value"      : 1.0,
                          "tangentMode" : 0
                        },
                        {
                          "inTangent" : -0.19184947013855,
                          "outTangent" : -0.19184947013855,
                          "time"       : 0.615361332893372,
                          "value"      : 0.927123785018921,
                          "tangentMode" : 0
                        },
                        {
                          "inTangent" : -2.14168262481689,
                          "outTangent" : -2.14168262481689,
                          "time"       : 1.0,
                          "value"      : 0.470565795898438,
                          "tangentMode" : 0
                        }
                      ]
                    }
                  },
                  "y"              : {
                    "mode" : 1,
                    "curveMultiplier" : 1.0,
                    "curve"           : {
                      "keys" : [
                        {
                          "inTangent" : 0.0,
                          "outTangent" : 0.0,
                          "time"       : 0.0,
                          "value"      : 1.0,
                          "tangentMode" : 0
                        },
                        {
                          "inTangent" : 0.0,
                          "outTangent" : 0.0,
                          "time"       : 1.0,
                          "value"      : 1.0,
                          "tangentMode" : 0
                        }
                      ]
                    }
                  },
                  "z"              : {
                    "mode" : 1,
                    "curveMultiplier" : 1.0,
                    "curve"           : {
                      "keys" : [
                        {
                          "inTangent" : 0.0,
                          "outTangent" : 0.0,
                          "time"       : 0.0,
                          "value"      : 1.0,
                          "tangentMode" : 0
                        },
                        {
                          "inTangent" : 0.0,
                          "outTangent" : 0.0,
                          "time"       : 1.0,
                          "value"      : 1.0,
                          "tangentMode" : 0
                        }
                      ]
                    }
                  }
                },
                "renderer"              : {
                  "sortingFudge" : 0.0,
                  "geometry"     : {
                    "type" : "BufferGeometry",
                    "res"  : "LTwoXteMoPXPsH4BNHLxab.geo"
                  },
                  "meshRender"   : {
                    "material" : [
                      {
                        "type" : "MeshParticlesMaterial",
                        "map"  : {
                          "generateMipmaps" : false,
                          "image"           : {
                            "name" : "9GMT3PoVZFJtxnjEhmbwgY.png"
                          }
                        },
                        "transparent" : true,
                        "blendSrc"    : 204,
                        "blendDst"    : 205,
                        "side"        : 2,
                        "tintColor"   : 5846020,
                        "tintOpacity" : 0.5,
                        "layer"       : 3000,
                        "blending"    : 5
                      },
                      {
                        "type" : "MeshParticlesMaterial",
                        "map"  : {
                          "generateMipmaps" : false,
                          "image"           : {
                            "name" : "9GMT3PoVZFJtxnjEhmbwgY.png"
                          }
                        },
                        "transparent" : true,
                        "blendSrc"    : 204,
                        "blendDst"    : 205,
                        "side"        : 2,
                        "tintColor"   : 5846020,
                        "tintOpacity" : 0.5,
                        "layer"       : 3000,
                        "blending"    : 5
                      }
                    ]
                  }
                }
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
                    "tintOpacity" : 0.501960813999176,
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
                    "tintOpacity" : 0.5,
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
                    "tintOpacity" : 0.5,
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
                    "tintOpacity" : 0.5,
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
                    "tintOpacity" : 0.5,
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
                    "tintOpacity" : 0.5,
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
                    "tintOpacity" : 0.5,
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