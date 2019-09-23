/**
 * eff_ui_feiyongchar001
 */
export const eff_ui_feiyongchar001_rtpl = (it: any) => {
    return {
      "name" : "eff_ui_feiyongchar001",
      "type" : "node",
      "transform" : {
        "position" : it.position?[it.position[0], it.position[1], it.position[2]] : [-255, -572, 200.0],
        "scale"    : it.scale?[it.scale[0], it.scale[1], it.scale[2]] : [55.0, 55.0, 55.0],
        "rotate"   : it.rotate?[it.rotate[0], it.rotate[1], it.rotate[2]] : [0, 0, 0]
      },
      "attachment": '2D',
      "animator"  : {
        "controller" : {
          "eff_ui_feiyongchar001" : "BV3gL4Tk2uJmKEpnZvPufT.ai"
        },
        "aniBox"     : {
          "eff_ui_feiyongchar001" : {
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
          "name" : "eff_ui_feiyongchar00",
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
              "name" : "fire1",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.0399999991059303,
                  0.430000007152557,
                  0.0
                ],
                "scale"    : [
                  3.79999995231628,
                  4.19999980926514,
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
                        "name" : "XFBrEpw8n96kwEpejo759a.png"
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
              "name" : "fire2",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.100000001490116,
                  0.389999985694885,
                  0.46000000834465
                ],
                "scale"    : [
                  1.70000004768372,
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
                        "name" : "4bEYXGiMyKAeDztjREMKkc.png"
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
              "name" : "Particle System (6)",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.0260000005364418,
                  0.170000001788139,
                  0.0
                ],
                "scale"    : [
                  1.0,
                  1.00000047683716,
                  1.00000047683716
                ],
                "rotate"   : [
                  4.71238899230957,
                  0.0,
                  0.0
                ]
              },
              "particlesystem" : {
                "randomSeed" : 1281499971,
                "useAutoRandomSeed" : true,
                "main"              : {
                  "duration" : 1.0,
                  "gravityModifierMultiplier" : 0.0,
                  "loop"                      : true,
                  "prewarm"                   : false,
                  "maxParticles"              : 1,
                  "playOnAwake"               : true,
                  "randomizeRotationDirection" : 0.0,
                  "simulationSpeed"            : 1.0,
                  "startDelayMultiplier"       : 0.0,
                  "startLifetimeMultiplier"    : 1.0,
                  "startRotation3D"            : false,
                  "startRotationMultiplier"    : 0.0,
                  "startRotationXMultiplier"   : 0.0,
                  "startRotationYMultiplier"   : 0.0,
                  "startRotationZMultiplier"   : 0.0,
                  "startSize3D"                : true,
                  "startSizeMultiplier"        : 4.0,
                  "startSizeXMultiplier"       : 4.0,
                  "startSizeYMultiplier"       : 4.0,
                  "startSizeZMultiplier"       : 4.19999980926514,
                  "startSpeedMultiplier"       : 0.0,
                  "customSimulationSpace"      : false,
                  "scalingMode"                : 1,
                  "simulationSpace"            : 0,
                  "gravityModifier"            : {
                    "mode" : 0,
                    "constant" : 0.0
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
                    "constant" : 0.0
                  },
                  "startLifetime"              : {
                    "mode" : 0,
                    "constant" : 1.0
                  },
                  "startSize"                  : {
                    "mode" : 0,
                    "constant" : 4.0
                  },
                  "startSizeX"                 : {
                    "mode" : 0,
                    "constant" : 4.0
                  },
                  "startSizeY"                 : {
                    "mode" : 0,
                    "constant" : 4.0
                  },
                  "startSizeZ"                 : {
                    "mode" : 0,
                    "constant" : 4.19999980926514
                  },
                  "startSpeed"                 : {
                    "mode" : 0,
                    "constant" : 0.0
                  },
                  "startRotation"              : {
                    "mode" : 0,
                    "constant" : 0.0
                  },
                  "startRotationX"             : {
                    "mode" : 0,
                    "constant" : 0.0
                  },
                  "startRotationY"             : {
                    "mode" : 0,
                    "constant" : 0.0
                  },
                  "startRotationZ"             : {
                    "mode" : 0,
                    "constant" : 0.0
                  }
                },
                "emission"          : {
                  "rateOverDistanceMultiplier" : 0.0,
                  "rateOverTimeMultiplier"     : 10.0,
                  "rateOverDistance"           : {
                    "mode" : 0,
                    "constant" : 0.0
                  },
                  "rateOverTime"               : {
                    "mode" : 0,
                    "constant" : 10.0
                  },
                  "bursts"                     : [
                  ]
                },
                "textureSheetAnimation" : {
                  "animation" : 0,
                  "cycleCount" : 1,
                  "flipU"      : 0.0,
                  "flipV"      : 0.0,
                  "frameOverTimeMultiplier" : 0.999899983406067,
                  "numTilesX"               : 4,
                  "numTilesY"               : 4,
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
                "renderer"              : {
                  "sortingFudge" : 0.0,
                  "geometry"     : {
                    "type" : "BufferGeometry",
                    "res"  : "TEeH3nkY14YYYtxGdS7VjB.geo"
                  },
                  "meshRender"   : {
                    "material" : [
                      {
                        "type" : "MeshParticlesMaterial",
                        "map"  : {
                          "generateMipmaps" : false,
                          "image"           : {
                            "name" : "4bEYXGiMyKAeDztjREMKkc.png"
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
                      },
                      {
                        "type" : "MeshParticlesMaterial",
                        "map"  : {
                          "generateMipmaps" : false,
                          "image"           : {
                            "name" : "4bEYXGiMyKAeDztjREMKkc.png"
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
              }
            },
            {
              "name" : "tili",
              "type" : "node",
              "transform" : {
                "position" : [
                  0.0500000007450581,
                  -0.159999996423721,
                  0.0
                ],
                "scale"    : [
                  2.53090286254883,
                  2.38477969169617,
                  0.604692399501801
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
                        "name" : "qwUGpTMjJ2LmrvcAYcu8u.png"
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